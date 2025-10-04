import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ResumeHeader } from "@/components/resume/ResumeHeader";
import { useResume } from "@/context/ResumeContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ResumePreview } from "@/components/resume/ResumePreview";

const ReviewPage = () => {
  const navigate = useNavigate();
  const { resumeData, progress, setResumeData } = useResume();
  const [selectedTemplate, setSelectedTemplate] = useState<'modern' | 'professional' | 'minimal' | 'elegant'>("modern");

  const updatePI = (key: keyof typeof resumeData.personalInfo, value: string) => {
    setResumeData({ ...resumeData, personalInfo: { ...resumeData.personalInfo, [key]: value } });
  };

  const updateArrayField = (
    arrayKey: 'experience' | 'education',
    index: number,
    field: string,
    value: string
  ) => {
    const arr: any[] = (resumeData as any)[arrayKey] || [];
    const updated = arr.map((item, i) => (i === index ? { ...item, [field]: value } : item));
    setResumeData({ ...(resumeData as any), [arrayKey]: updated } as any);
  };

  const handleGenerate = async () => {
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          personalInfo: resumeData.personalInfo,
          experience: resumeData.experience,
          education: resumeData.education,
          skills: resumeData.skills,
          projects: resumeData.projects,
          enhance: true
        })
      });

      if (!res.ok) throw new Error('Failed to generate resume');

      // Download the file from the response stream
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Enhanced_Resume.docx';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (e) {
      // fallback to home on error
      navigate('/');
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...resumeData, template: selectedTemplate }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }

      // Create blob from response
      const blob = await response.blob();
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      // Get filename from response headers or use default
      const contentDisposition = response.headers.get('Content-Disposition');
      let filename = 'Resume.pdf';
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/);
        if (filenameMatch) {
          filename = filenameMatch[1];
        }
      }
      
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-background bg-[length:400%_400%] animate-gradient-shift">
      <div className="container mx-auto min-h-screen grid grid-rows-[auto_1fr] max-w-[1600px]">
        <ResumeHeader progress={progress} />
        <main className="p-6 md:p-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-[1600px]">
          {/* Left: Editable review form */}
          <div className="bg-glass-bg backdrop-blur-glass rounded-3xl p-6 md:p-8 shadow-glass border border-glass-border">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Review & Generate</h2>
              <Button variant="outline" onClick={() => navigate('/multistep/projects')}>Back</Button>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Personal Info</h3>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <div className="grid md:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">Name</label>
                      <Input value={resumeData.personalInfo.fullName}
                        onChange={(e) => updatePI('fullName', e.target.value)} />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">Email</label>
                      <Input value={resumeData.personalInfo.email}
                        onChange={(e) => updatePI('email', e.target.value)} />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">Phone</label>
                      <Input value={resumeData.personalInfo.phone}
                        onChange={(e) => updatePI('phone', e.target.value)} />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">Location</label>
                      <Input value={resumeData.personalInfo.location}
                        onChange={(e) => updatePI('location', e.target.value)} />
                    </div>
                  </div>
                  <div className="mt-3">
                    <label className="text-xs font-medium text-muted-foreground">Summary</label>
                    <Textarea value={resumeData.personalInfo.summary}
                      onChange={(e) => updatePI('summary', e.target.value)} className="min-h-[100px]" />
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Experience</h3>
                <div className="bg-muted/30 p-4 rounded-lg">
                  {resumeData.experience.length > 0 ? (
                    resumeData.experience.map((e, idx) => (
                      <div key={e.id ?? idx} className="mb-2">
                        <div className="grid md:grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs font-medium text-muted-foreground">Title</label>
                            <Input value={e.title}
                              onChange={(ev) => updateArrayField('experience', idx, 'title', ev.target.value)} />
                          </div>
                          <div>
                            <label className="text-xs font-medium text-muted-foreground">Company</label>
                            <Input value={e.company}
                              onChange={(ev) => updateArrayField('experience', idx, 'company', ev.target.value)} />
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{e.startDate} - {e.isCurrentJob ? 'Present' : e.endDate}</p>
                        <Textarea className="mt-2 min-h-[100px]" value={e.description}
                          onChange={(ev) => updateArrayField('experience', idx, 'description', ev.target.value)} />
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground">No experience added</p>
                  )}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Education</h3>
                <div className="bg-muted/30 p-4 rounded-lg">
                  {resumeData.education.length > 0 ? (
                    resumeData.education.map((e, idx) => (
                      <div key={e.id ?? idx} className="mb-2">
                        <div className="grid md:grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs font-medium text-muted-foreground">Degree</label>
                            <Input value={e.degree}
                              onChange={(ev) => updateArrayField('education', idx, 'degree', ev.target.value)} />
                          </div>
                          <div>
                            <label className="text-xs font-medium text-muted-foreground">School</label>
                            <Input value={e.school}
                              onChange={(ev) => updateArrayField('education', idx, 'school', ev.target.value)} />
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-3 mt-2">
                          <div>
                            <label className="text-xs font-medium text-muted-foreground">Graduation</label>
                            <Input value={e.graduationDate}
                              onChange={(ev) => updateArrayField('education', idx, 'graduationDate', ev.target.value)} />
                          </div>
                          <div>
                            <label className="text-xs font-medium text-muted-foreground">GPA</label>
                            <Input value={e.gpa || ""}
                              onChange={(ev) => updateArrayField('education', idx, 'gpa', ev.target.value)} />
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground">No education added</p>
                  )}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Skills</h3>
                <Textarea className="bg-muted/30 min-h-[80px]" value={resumeData.skills}
                  onChange={(e) => setResumeData({ ...resumeData, skills: e.target.value })} />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Projects</h3>
                <Textarea className="bg-muted/30 min-h-[100px]" value={resumeData.projects}
                  onChange={(e) => setResumeData({ ...resumeData, projects: e.target.value })} />
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <Button 
                variant="outline" 
                className="bg-gradient-primary text-white border-0" 
                onClick={handleDownloadPDF}
              >
                Download PDF
              </Button>
              <Button className="bg-gradient-success text-white border-0" onClick={handleGenerate}>Generate Resume</Button>
            </div>
          </div>
          {/* Right: Live preview with template selector */}
          <div className="h-full lg:sticky lg:top-8">
            <ResumePreview 
              resumeData={resumeData}
              selectedTemplate={selectedTemplate}
              onTemplateChange={setSelectedTemplate}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ReviewPage;


