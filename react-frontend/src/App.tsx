import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { ResumeProvider } from "@/context/ResumeContext";
import PersonalInfoPage from "@/pages/multistep/PersonalInfoPage";
import ExperiencePage from "@/pages/multistep/ExperiencePage";
import EducationPage from "@/pages/multistep/EducationPage";
import SkillsPage from "@/pages/multistep/SkillsPage";
import ProjectsPage from "@/pages/multistep/ProjectsPage";
import ReviewPage from "@/pages/multistep/ReviewPage";
import PrintPage from "@/pages/Print";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/app">
        <ResumeProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/multistep/personal" element={<PersonalInfoPage />} />
            <Route path="/multistep/experience" element={<ExperiencePage />} />
            <Route path="/multistep/education" element={<EducationPage />} />
            <Route path="/multistep/skills" element={<SkillsPage />} />
            <Route path="/multistep/projects" element={<ProjectsPage />} />
            <Route path="/multistep/review" element={<ReviewPage />} />
            <Route path="/print" element={<PrintPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ResumeProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
