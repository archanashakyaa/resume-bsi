import { useState } from "react";
import { ResumeHeader } from "@/components/resume/ResumeHeader";
import { ResumeForm } from "@/components/resume/ResumeForm";
import { MultiStepResume } from "@/components/resume/MultiStepResume";
import { useNavigate } from "react-router-dom";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { SuccessPage } from "@/components/resume/SuccessPage";
import { useToast } from "@/hooks/use-toast";

export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    summary: string;
  };
  experience: Array<{
    id: string;
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
    isCurrentJob: boolean;
  }>;
  education: Array<{
    id: string;
    degree: string;
    school: string;
    graduationDate: string;
    gpa?: string;
  }>;
  skills: string;
  projects: string;
}

const Index = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<'builder' | 'multistep' | 'success'>('builder');
  const [selectedTemplate, setSelectedTemplate] = useState<'modern' | 'professional' | 'minimal' | 'elegant'>('modern');
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      github: '',
      summary: '',
    },
    experience: [],
    education: [],
    skills: '',
    projects: '',
  });

  const { toast } = useToast();

  const calculateProgress = () => {
    let completedSections = 0;
    const totalSections = 5;

    // Check personal info completion
    if (resumeData.personalInfo.fullName && resumeData.personalInfo.email) {
      completedSections++;
    }
    
    // Check if any experience is added
    if (resumeData.experience.length > 0) {
      completedSections++;
    }
    
    // Check if any education is added
    if (resumeData.education.length > 0) {
      completedSections++;
    }
    
    // Check skills
    if (resumeData.skills.trim()) {
      completedSections++;
    }
    
    // Check projects
    if (resumeData.projects.trim()) {
      completedSections++;
    }

    return Math.round((completedSections / totalSections) * 100);
  };

  const handleCompleteResume = () => {
    if (!resumeData.personalInfo.fullName || !resumeData.personalInfo.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in at least your name and email before completing.",
        variant: "destructive",
      });
      return;
    }

    setCurrentPage('success');
    toast({
      title: "Resume Completed! 🎉",
      description: "Your professional resume is ready to impress employers.",
    });
  };

  const handleBackToBuilder = () => {
    setCurrentPage('builder');
  };

  const handleStartMultiStep = () => {
    navigate('/multistep/personal');
  };

  const handleBackFromMultiStep = () => {
    setCurrentPage('builder');
  };

  if (currentPage === 'success') {
    return (
      <SuccessPage 
        resumeData={resumeData}
        onBackToBuilder={handleBackToBuilder}
      />
    );
  }

  // legacy in-page multistep removed in favor of route-based pages

  return (
    <div className="min-h-screen bg-gradient-background bg-[length:400%_400%] animate-gradient-shift">
      <div className="container mx-auto min-h-screen grid grid-rows-[auto_1fr] max-w-[1800px]">
        <ResumeHeader progress={calculateProgress()} />
        
        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 h-[calc(100vh-200px)]">
          {/* Left side - Form sections */}
          <div className="space-y-6 overflow-y-auto">
            <ResumeForm 
              resumeData={resumeData}
              onResumeDataChange={setResumeData}
              onCompleteResume={handleCompleteResume}
              onStartMultiStep={handleStartMultiStep}
              selectedTemplate={selectedTemplate}
            />
          </div>
          
          {/* Right side - Live resume preview */}
          <div className="h-full">
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

export default Index;