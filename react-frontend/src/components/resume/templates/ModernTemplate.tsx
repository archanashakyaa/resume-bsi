import type { ResumeData } from "@/pages/Index";

interface ModernTemplateProps {
  resumeData: ResumeData;
}

export const ModernTemplate = ({ resumeData }: ModernTemplateProps) => {
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
    <div className="resume-template modern" id="resume-preview">
      {/* Header with gradient background */}
      <div className="bg-gradient-primary text-white p-8 text-center -m-8 mb-8 rounded-t-xl">
        <h1 className="text-4xl font-bold mb-2">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="text-lg opacity-90 space-y-1">
          {personalInfo.email && <div>{personalInfo.email}</div>}
          <div className="flex justify-center items-center gap-4 flex-wrap">
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
            {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
            {personalInfo.github && <span>{personalInfo.github}</span>}
          </div>
        </div>
      </div>

      {/* Professional Summary */}
      {personalInfo.summary && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4 pb-2 border-b-2 border-primary">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed text-base font-medium">
            {personalInfo.summary}
          </p>
        </div>
      )}

      {/* Work Experience */}
      {experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4 pb-2 border-b-2 border-primary">
            Work Experience
          </h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id} className="pb-4 border-b border-border/50 last:border-b-0">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{exp.title}</h3>
                    <p className="text-primary font-semibold">{exp.company}</p>
                  </div>
                  <div className="text-gray-600 text-sm font-semibold text-right">
                    {formatDate(exp.startDate)} - {exp.isCurrentJob ? 'Present' : formatDate(exp.endDate)}
                  </div>
                </div>
                {exp.description && (
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line mt-2 text-base">
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
          <h2 className="text-2xl font-bold text-foreground mb-4 pb-2 border-b-2 border-primary">
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="pb-3 border-b border-border/30 last:border-b-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{edu.degree}</h3>
                    <p className="text-primary font-semibold">{edu.school}</p>
                    {edu.gpa && <p className="text-sm text-gray-600 font-medium">GPA: {edu.gpa}</p>}
                  </div>
                  <div className="text-gray-600 text-sm font-semibold">
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
          <h2 className="text-2xl font-bold text-foreground mb-4 pb-2 border-b-2 border-primary">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skillsArray.map((skill, index) => (
              <span 
                key={index} 
                className="bg-gradient-primary text-white px-4 py-2 rounded-full text-sm font-medium shadow-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projectsArray.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4 pb-2 border-b-2 border-primary">
            Projects
          </h2>
          <div className="space-y-4">
            {projectsArray.map((project, index) => (
              <div key={index} className="text-gray-700 leading-relaxed text-base">
                <div className="flex items-start">
                  <span className="text-primary font-semibold mr-2 mt-1">•</span>
                  <span>{project}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {!personalInfo.fullName && experience.length === 0 && education.length === 0 && !skills.trim() && !projects.trim() && (
        <div className="text-center py-16 text-gray-500">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold mb-2 text-gray-700">Start Building Your Resume</h3>
          <p className="text-gray-600">Fill out the form on the left to see your resume come to life!</p>
        </div>
      )}
    </div>
  );
};