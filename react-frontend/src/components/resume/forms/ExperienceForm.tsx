import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2, Sparkles, Briefcase } from "lucide-react";
import type { ResumeData } from "@/pages/Index";
import { MonthPicker } from "@/components/resume/MonthPicker";

interface ExperienceFormProps {
  data: ResumeData['experience'];
  onChange: (data: ResumeData['experience']) => void;
}

export const ExperienceForm = ({ data, onChange }: ExperienceFormProps) => {
  const addExperience = () => {
    const newExperience = {
      id: Date.now().toString(),
      title: '',
      company: '',
      startDate: '',
      endDate: '',
      description: '',
      isCurrentJob: false,
    };
    onChange([...data, newExperience]);
  };

  const removeExperience = (id: string) => {
    onChange(data.filter(exp => exp.id !== id));
  };

  const updateExperience = (id: string, field: keyof ResumeData['experience'][0], value: any) => {
    onChange(data.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const enhanceDescription = async (id: string) => {
    const experience = data.find(exp => exp.id === id);
    if (!experience) return;
    const content = `${experience.title} at ${experience.company}: ${experience.description}`.trim();
    try {
      const res = await fetch('/enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section: 'experience', content })
      });
      const json = await res.json();
      if (json.success && json.enhanced_content) {
        const enhanced = String(json.enhanced_content);
        const colonIndex = enhanced.indexOf(':');
        const finalText = colonIndex !== -1 ? enhanced.slice(colonIndex + 1).trim() : enhanced;
        updateExperience(id, 'description', finalText);
      }
    } catch {}
  };

  return (
    <Card className="p-6 mb-6 bg-white rounded-2xl shadow-card border-t-4 border-t-success">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Briefcase className="w-5 h-5" />
          Work Experience
        </h3>
        <Button 
          onClick={addExperience}
          className="bg-gradient-success hover:shadow-success text-white border-0"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Experience
        </Button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <Briefcase className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No work experience added yet</p>
          <p className="text-sm">Add your professional experience to showcase your career journey</p>
        </div>
      ) : (
        <div className="space-y-6">
          {data.map((exp, index) => (
            <Card key={exp.id} className="p-4 bg-muted/30 border-2 border-muted hover:border-primary/30 transition-colors">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-semibold text-foreground">Experience #{index + 1}</h4>
                <div className="flex gap-2">
                  <Button
                    onClick={() => removeExperience(exp.id)}
                    size="sm"
                    variant="destructive"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    Job Title
                  </Label>
                  <Input
                    placeholder="Software Engineer"
                    value={exp.title}
                    onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                    className="border-2 focus:border-primary transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    Company
                  </Label>
                  <Input
                    placeholder="Tech Company Inc."
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                    className="border-2 focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    Start Date
                  </Label>
                  <MonthPicker
                    value={exp.startDate}
                    onChange={(val) => updateExperience(exp.id, 'startDate', val)}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    End Date
                  </Label>
                  <MonthPicker
                    value={exp.endDate}
                    onChange={(val) => updateExperience(exp.id, 'endDate', val)}
                    disabled={exp.isCurrentJob}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 mb-4">
                <Checkbox
                  id={`current-${exp.id}`}
                  checked={exp.isCurrentJob}
                  onCheckedChange={(checked) => updateExperience(exp.id, 'isCurrentJob', checked)}
                />
                <Label htmlFor={`current-${exp.id}`} className="text-sm font-medium">
                  I currently work here
                </Label>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Job Description
                </Label>
                <Textarea
                  placeholder="• Describe your key responsibilities and achievements&#10;• Use bullet points for better readability&#10;• Include quantifiable results when possible"
                  value={exp.description}
                  onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                  className="border-2 focus:border-primary transition-colors min-h-[120px] resize-vertical"
                />
                <div className="text-center mt-2">
                  <Button
                    onClick={() => enhanceDescription(exp.id)}
                    size="sm"
                    variant="outline"
                    className="bg-gradient-warning hover:shadow-button border-0 text-white"
                  >
                    <Sparkles className="w-3 h-3 mr-1" />
                    Enhance
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </Card>
  );
};