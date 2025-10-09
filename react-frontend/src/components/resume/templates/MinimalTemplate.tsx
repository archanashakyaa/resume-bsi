import type { ResumeData } from "@/pages/Index";

interface MinimalTemplateProps {
  resumeData: ResumeData;
}

export const MinimalTemplate = ({ resumeData }: MinimalTemplateProps) => {
  const { personalInfo, experience, education, skills, projects } = resumeData;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const skillsArray = skills.split(',').map(s => s.trim()).filter(Boolean);
  
  // Parse projects into separate entries
  const projectsArray = projects
    .split(/\n\s*\n+/)
    .map(project => project.trim())
    .filter(Boolean);

  return (
    <div className="resume-template minimal" id="resume-preview">
      {/* Clean header */}
      <div className="-m-8 mb-8 p-8 border-b text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground mb-2">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="text-muted-foreground text-sm flex justify-center gap-3 flex-wrap">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.github && <span>{personalInfo.github}</span>}
        </div>
      </div>

      {personalInfo.summary && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold tracking-wide text-muted-foreground mb-2">Summary</h2>
          <p className="leading-relaxed text-foreground/90">{personalInfo.summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold tracking-wide text-muted-foreground mb-2">Experience</h2>
          <div className="space-y-5">
            {experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-foreground">{exp.title}</h3>
                    <p className="text-sm text-muted-foreground">{exp.company}</p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatDate(exp.startDate)} - {exp.isCurrentJob ? 'Present' : formatDate(exp.endDate)}
                  </div>
                </div>
                {exp.description && (
                  <p className="mt-2 whitespace-pre-line text-foreground/90">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold tracking-wide text-muted-foreground mb-2">Education</h2>
          <div className="space-y-3">
            {education.map(edu => (
              <div key={edu.id} className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-foreground">{edu.degree}</h3>
                  <p className="text-sm text-muted-foreground">{edu.school}{edu.gpa ? ` • GPA: ${edu.gpa}` : ''}</p>
                </div>
                <div className="text-xs text-muted-foreground">{formatDate(edu.graduationDate)}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {skillsArray.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold tracking-wide text-muted-foreground mb-2">Skills</h2>
          <div className="text-foreground/90">{skillsArray.join(' • ')}</div>
        </section>
      )}

      {projectsArray.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold tracking-wide text-muted-foreground mb-2">Projects</h2>
          <div className="space-y-2">
            {projectsArray.map((project, index) => (
              <div key={index} className="text-foreground/90">
                <div className="flex items-start">
                  <span className="text-muted-foreground mr-2 mt-1">•</span>
                  <span>{project}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};


