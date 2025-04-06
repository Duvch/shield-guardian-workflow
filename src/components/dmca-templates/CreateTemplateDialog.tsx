
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DMCATemplate } from "./types";

interface CreateTemplateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newTemplate: Partial<DMCATemplate>;
  onTemplateChange: (template: Partial<DMCATemplate>) => void;
  onSave: () => void;
}

export function CreateTemplateDialog({
  open,
  onOpenChange,
  newTemplate,
  onTemplateChange,
  onSave
}: CreateTemplateDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New DMCA Template</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-2">
          <div>
            <Label htmlFor="new-platform">Platform</Label>
            <Input
              id="new-platform"
              placeholder="e.g., Facebook, Twitter, Reddit"
              value={newTemplate.platform}
              onChange={(e) => onTemplateChange({ ...newTemplate, platform: e.target.value })}
            />
          </div>
          
          <div>
            <Label htmlFor="new-subject">Subject Line</Label>
            <Input
              id="new-subject"
              placeholder="e.g., Copyright Infringement Notice - [Platform]"
              value={newTemplate.subject}
              onChange={(e) => onTemplateChange({ ...newTemplate, subject: e.target.value })}
            />
          </div>
          
          <div>
            <Label htmlFor="new-template" className="flex justify-between">
              <span>Template</span>
              <span className="text-xs text-slate-500">
                Use &#123;&#123;userName&#125;&#125;, &#123;&#123;contentURL&#125;&#125;, etc. as variables
              </span>
            </Label>
            <Textarea
              id="new-template"
              className="font-mono text-sm min-h-48"
              value={newTemplate.template}
              onChange={(e) => onTemplateChange({ ...newTemplate, template: e.target.value })}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onSave}>
            Create Template
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
