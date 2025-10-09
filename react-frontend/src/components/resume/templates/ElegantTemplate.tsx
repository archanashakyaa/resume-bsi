import type { ResumeData } from "@/pages/Index";

interface ElegantTemplateProps {
  resumeData: ResumeData;
}

export const ElegantTemplate = ({ resumeData }: ElegantTemplateProps) => {
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
    <div className="resume-template elegant" id="resume-preview">
      <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8">
        {/* Sidebar */}
        <aside className="md:sticky md:top-0 h-max rounded-xl p-6 bg-gradient-to-b from-primary/20 via-primary/10 to-transparent border border-primary/20">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-extrabold text-foreground">{personalInfo.fullName || 'Your Name'}</h1>
            <div className="mt-2 text-xs text-muted-foreground space-y-1">
              {personalInfo.email && <div>{personalInfo.email}</div>}
              {personalInfo.phone && <div>{personalInfo.phone}</div>}
              {personalInfo.location && <div>{personalInfo.location}</div>}
              {personalInfo.linkedin && <div>{personalInfo.linkedin}</div>}
              {personalInfo.github && <div>{personalInfo.github}</div>}
            </div>
          </div>

          {skillsArray.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold tracking-wide text-muted-foreground mb-2">Skills</h3>
              <ul className="space-y-1">
                {skillsArray.map((skill, i) => (
                  <li key={i} className="text-sm text-foreground/90 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {projectsArray.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold tracking-wide text-muted-foreground mb-2">Projects</h3>
              <div className="space-y-2">
                {projectsArray.map((project, index) => (
                  <div key={index} className="text-sm text-foreground/90">
                    <div className="flex items-start">
                      <span className="text-muted-foreground mr-2 mt-1">•</span>
                      <span>{project}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* Main content */}
        <main>
          {personalInfo.summary && (
            <section className="mb-8">
              <h2 className="text-xl font-bold text-foreground mb-3">Professional Summary</h2>
              <p className="leading-relaxed text-foreground/90 bg-muted/40 p-4 rounded-lg border border-border/50">
                {personalInfo.summary}
              </p>
            </section>
          )}

          {experience.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-bold text-foreground mb-3">Experience</h2>
              <div className="space-y-6">
                {experience.map(exp => (
                  <article key={exp.id} className="border rounded-lg p-4 border-border/60">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{exp.title}</h3>
                        <p className="text-primary font-medium">{exp.company}</p>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {formatDate(exp.startDate)} - {exp.isCurrentJob ? 'Present' : formatDate(exp.endDate)}
                      </div>
                    </div>
                    {exp.description && (
                      <p className="mt-2 whitespace-pre-line text-foreground/90">{exp.description}</p>
                    )}
                  </article>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-bold text-foreground mb-3">Education</h2>
              <div className="space-y-4">
                {education.map(edu => (
                  <article key={edu.id} className="border rounded-lg p-4 border-border/60 flex justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">{edu.degree}</h3>
                      <p className="text-sm text-muted-foreground">{edu.school}{edu.gpa ? ` • GPA: ${edu.gpa}` : ''}</p>
                    </div>
                    <div className="text-xs text-muted-foreground">{formatDate(edu.graduationDate)}</div>
                  </article>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};


