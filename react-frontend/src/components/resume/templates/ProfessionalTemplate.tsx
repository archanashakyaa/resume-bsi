import type { ResumeData } from "@/pages/Index";

interface ProfessionalTemplateProps {
  resumeData: ResumeData;
}

export const ProfessionalTemplate = ({ resumeData }: ProfessionalTemplateProps) => {
  const { personalInfo, experience, education, skills, projects } = resumeData;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const skillsArray = skills.split(',').map(skill => skill.trim()).filter(Boolean);
  
  // Parse projects into separate entries
  const projectsArray = projects
    .split(/\n\s*\n+/)
    .map(project => project.trim())
    .filter(Boolean);

  return (
    <div className="resume-template professional" id="resume-preview">
      {/* Professional Header */}
      <div className="border-b-4 border-primary pb-6 mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="text-gray-600 space-y-1">
          {personalInfo.email && (
            <div className="flex items-center gap-2">
              <span className="font-medium">Email:</span> {personalInfo.email}
            </div>
          )}
          <div className="flex flex-wrap gap-4">
            {personalInfo.phone && (
              <div className="flex items-center gap-2">
                <span className="font-medium">Phone:</span> {personalInfo.phone}
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-2">
                <span className="font-medium">Location:</span> {personalInfo.location}
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center gap-2">
                <span className="font-medium">LinkedIn:</span> {personalInfo.linkedin}
              </div>
            )}
            {personalInfo.github && (
              <div className="flex items-center gap-2">
                <span className="font-medium">GitHub:</span> {personalInfo.github}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Professional Summary */}
      {personalInfo.summary && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4 uppercase tracking-wide">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed bg-muted/30 p-4 rounded-lg border-l-4 border-primary text-base font-medium">
            {personalInfo.summary}
          </p>
        </div>
      )}

      {/* Work Experience */}
      {experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6 uppercase tracking-wide">
            Professional Experience
          </h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id} className="bg-muted/30 p-6 rounded-lg border-l-4 border-primary">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{exp.title}</h3>
                    <p className="text-lg text-primary font-semibold">{exp.company}</p>
                  </div>
                  <div className="text-gray-600 font-semibold bg-background px-3 py-1 rounded-md border">
                    {formatDate(exp.startDate)} - {exp.isCurrentJob ? 'Present' : formatDate(exp.endDate)}
                  </div>
                </div>
                {exp.description && (
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line text-base">
                    {exp.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6 uppercase tracking-wide">
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="bg-muted/30 p-4 rounded-lg border-l-4 border-warning">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{edu.degree}</h3>
                    <p className="text-primary font-semibold">{edu.school}</p>
                    {edu.gpa && (
                      <p className="text-sm text-gray-600 font-medium">
                        GPA: <span className="text-gray-800 font-semibold">{edu.gpa}</span>
                      </p>
                    )}
                  </div>
                  <div className="text-gray-600 font-semibold bg-background px-3 py-1 rounded-md border text-sm">
                    {formatDate(edu.graduationDate)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.trim() && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6 uppercase tracking-wide">
            Core Competencies
          </h2>
          <div className="bg-muted/30 p-6 rounded-lg border-l-4 border-success">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {skillsArray.map((skill, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                  <span className="text-foreground font-medium text-sm">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Projects */}
      {projectsArray.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6 uppercase tracking-wide">
            Key Projects
          </h2>
          <div className="bg-muted/30 p-6 rounded-lg border-l-4 border-warning">
            <div className="space-y-4">
              {projectsArray.map((project, index) => (
                <div key={index} className="text-gray-700 leading-relaxed text-base">
                  <div className="flex items-start">
                    <span className="text-warning font-semibold mr-2 mt-1">•</span>
                    <span>{project}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Empty state */}
      {!personalInfo.fullName && experience.length === 0 && education.length === 0 && !skills.trim() && !projects.trim() && (
        <div className="text-center py-16 text-gray-500">
          <div className="text-6xl mb-4">💼</div>
          <h3 className="text-xl font-semibold mb-2 text-gray-700">Professional Resume Template</h3>
          <p className="text-gray-600">Complete the form sections to build your professional resume</p>
        </div>
      )}
    </div>
  );
};