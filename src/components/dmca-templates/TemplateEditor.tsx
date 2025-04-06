
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DMCATemplate } from "./types";

interface TemplateEditorProps {
  template: DMCATemplate;
  onSave: (template: DMCATemplate) => void;
  onCancel: () => void;
  onChange: (updatedTemplate: DMCATemplate) => void;
}

export function TemplateEditor({ template, onSave, onCancel, onChange }: TemplateEditorProps) {
  return (
    <div className="mt-6 border rounded-md p-4 bg-white animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Editing {template.platform} Template</h3>
        <Button 
          variant="outline"
          size="sm"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="platform">Platform</Label>
          <Input
            id="platform"
            value={template.platform}
            onChange={(e) => onChange({ ...template, platform: e.target.value })}
          />
        </div>
        
        <div>
          <Label htmlFor="subject">Subject Line</Label>
          <Input
            id="subject"
            value={template.subject}
            onChange={(e) => onChange({ ...template, subject: e.target.value })}
          />
        </div>
        
        <div>
          <Label htmlFor="template" className="flex justify-between">
            <span>Template</span>
            <span className="text-xs text-slate-500">
              Use &#123;&#123;userName&#125;&#125;, &#123;&#123;contentURL&#125;&#125;, etc. as variables
            </span>
          </Label>
          <Textarea
            id="template"
            className="font-mono text-sm min-h-48"
            value={template.template}
            onChange={(e) => onChange({ ...template, template: e.target.value })}
          />
        </div>
        
        <Button onClick={() => onSave(template)} className="mt-2">
          <Save className="mr-2 h-4 w-4" />
          Save Template
        </Button>
      </div>
    </div>
  );
}
