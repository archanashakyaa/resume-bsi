import { useEffect, useMemo, useState, useCallback, memo } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Rocket, Plus, Trash2 } from "lucide-react";

interface ProjectsFormProps {
  data: string;
  onChange: (data: string) => void;
}

interface ProjectItem {
  id: string;
  content: string;
}

const ProjectsFormComponent = ({ data, onChange }: ProjectsFormProps) => {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Split incoming data into individual projects by blank line separator
  useEffect(() => {
    const parts = (data || "")
      .split(/\n\s*\n+/)
      .map(p => p.trim())
      .filter(Boolean);
    const newProjects = parts.length > 0 ? parts : [""];
    
    // Convert to ProjectItem format with stable IDs
    const newProjectItems = newProjects.map((content, index) => ({
      id: `project-${Date.now()}-${index}`,
      content
    }));
    
    // Only update if the content actually changed to prevent unnecessary re-renders
    const currentContent = projects.map(p => p.content);
    if (JSON.stringify(newProjects) !== JSON.stringify(currentContent)) {
      setProjects(newProjectItems);
    }
    setIsInitialized(true);
  }, [data]);

  const serialized = useMemo(() => {
    return projects.map(p => p.content.trim()).filter(Boolean).join("\n\n");
  }, [projects]);

  // Only call onChange when we're initialized and the serialized data is different
  useEffect(() => {
    if (isInitialized && serialized !== (data || "").trim()) {
      onChange(serialized);
    }
  }, [serialized, isInitialized, data, onChange]);

  const addProject = useCallback(() => {
    setProjects(prev => [...prev, { id: `project-${Date.now()}-${prev.length}`, content: "" }]);
  }, []);

  const removeProject = useCallback((id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  }, []);

  const updateProject = useCallback((id: string, value: string) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, content: value } : p));
  }, []);

  const enhanceProjects = useCallback(async () => {
    try {
      const res = await fetch('/enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section: 'projects', content: serialized || '' })
      });
      const json = await res.json();
      if (json.success && json.enhanced_content) {
        // Re-split enhanced content back into entries
        const parts = String(json.enhanced_content)
          .split(/\n\s*\n+/)
          .map((p: string) => p.trim())
          .filter(Boolean);
        const enhancedProjects = parts.length > 0 ? parts : [""];
        
        // Convert to ProjectItem format with new IDs
        const newProjectItems = enhancedProjects.map((content, index) => ({
          id: `project-enhanced-${Date.now()}-${index}`,
          content
        }));
        
        setProjects(newProjectItems);
      }
    } catch {}
  }, [serialized]);

  return (
    <Card className="p-6 mb-6 bg-white rounded-2xl shadow-card border-t-4 border-t-success">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Rocket className="w-5 h-5" />
          Projects
        </h3>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Projects
          </Label>
          <Button onClick={addProject} variant="outline" size="sm" className="bg-gradient-primary hover:shadow-button border-0 text-white">
            <Plus className="w-4 h-4 mr-1" />
            Add Project
          </Button>
        </div>

        {projects.map((proj, idx) => (
          <div key={proj.id} className="rounded-lg border border-muted/40 p-3 bg-muted/30 transition-all duration-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">Project {idx + 1}</span>
              {projects.length > 1 && (
                <Button onClick={() => removeProject(proj.id)} variant="ghost" size="icon" aria-label="Remove project">
                  <Trash2 className="w-4 h-4 text-muted-foreground" />
                </Button>
              )}
            </div>
            <Textarea
              placeholder={"Project name, tech stack, your role, impact/results."}
              value={proj.content}
              onChange={(e) => updateProject(proj.id, e.target.value)}
              className="border-2 focus:border-primary transition-colors bg-white min-h-[120px] resize-vertical"
            />
          </div>
        ))}

        <div className="text-center mt-2">
          <Button 
            onClick={enhanceProjects}
            variant="outline"
            size="sm"
            className="bg-gradient-warning hover:shadow-button border-0 text-white"
          >
            <Sparkles className="w-4 h-4 mr-1" />
            Enhance Projects
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Add each project separately. Include project name, technologies used, your role, and measurable outcomes.
        </p>
      </div>
    </Card>
  );
};

export const ProjectsForm = memo(ProjectsFormComponent);