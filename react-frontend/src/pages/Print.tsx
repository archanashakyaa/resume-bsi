import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { ModernTemplate } from "@/components/resume/templates/ModernTemplate";
import { ProfessionalTemplate } from "@/components/resume/templates/ProfessionalTemplate";
import { MinimalTemplate } from "@/components/resume/templates/MinimalTemplate";
import { ElegantTemplate } from "@/components/resume/templates/ElegantTemplate";
import { useResume } from "@/context/ResumeContext";

const PrintPage = () => {
  const [params] = useSearchParams();
  const { resumeData } = useResume();
  const template = (params.get("template") || "modern") as "modern" | "professional" | "minimal" | "elegant";

  // Signal to headless browser when the page is ready
  useEffect(() => {
    const done = () => {
      (window as any).__previewReady = true;
    };
    // Give a short delay for fonts/assets to settle
    const t = setTimeout(done, 300);
    return () => clearTimeout(t);
  }, []);

  // Fallback: if context is empty, try localStorage
  const effectiveData = useMemo(() => {
    const hasContextName = Boolean(resumeData?.personalInfo?.fullName);
    if (hasContextName) return resumeData;
    try {
      const raw = localStorage.getItem("resumeData");
      if (!raw) return resumeData;
      const parsed = JSON.parse(raw);
      return parsed || resumeData;
    } catch {
      return resumeData;
    }
  }, [resumeData]);

  const content = useMemo(() => {
    switch (template) {
      case "modern":
        return <ModernTemplate resumeData={effectiveData as any} />;
      case "professional":
        return <ProfessionalTemplate resumeData={effectiveData as any} />;
      case "minimal":
        return <MinimalTemplate resumeData={effectiveData as any} />;
      case "elegant":
        return <ElegantTemplate resumeData={effectiveData as any} />;
      default:
        return <ModernTemplate resumeData={effectiveData as any} />;
    }
  }, [template, effectiveData]);

  return (
    <div className="min-h-screen bg-white p-10">
      <div id="resume-content" className="max-w-[900px] mx-auto">
        {content}
      </div>
    </div>
  );
};

export default PrintPage;


