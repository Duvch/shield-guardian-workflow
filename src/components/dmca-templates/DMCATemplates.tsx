
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { DMCATemplate } from "./types";
import { initialTemplates } from "./initialData";
import { TemplateCard } from "./TemplateCard";
import { TemplateEditor } from "./TemplateEditor";
import { CreateTemplateDialog } from "./CreateTemplateDialog";

export function DMCATemplates() {
  const [templates, setTemplates] = useState<DMCATemplate[]>(initialTemplates);
  const [editingTemplate, setEditingTemplate] = useState<DMCATemplate | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [newTemplate, setNewTemplate] = useState<Partial<DMCATemplate>>({
    platform: "",
    subject: "",
    template: ""
  });
  const { toast } = useToast();

  const handleCreateNewTemplate = () => {
    setNewTemplate({
      platform: "",
      subject: "",
      template: "DMCA Takedown Notice\n\nTo Whom It May Concern,\n\n..."
    });
    setShowDialog(true);
  };

  const handleEditTemplate = (template: DMCATemplate) => {
    setEditingTemplate(template);
  };

  const handleSaveTemplate = (template: DMCATemplate) => {
    const updatedTemplates = templates.map(t => 
      t.id === template.id ? { ...template, lastModified: new Date().toISOString() } : t
    );
    setTemplates(updatedTemplates);
    setEditingTemplate(null);
    
    toast({
      title: "Template Updated",
      description: "The DMCA template has been successfully updated.",
    });
  };

  const handleCopyTemplate = (template: DMCATemplate) => {
    navigator.clipboard.writeText(template.template);
    
    toast({
      title: "Template Copied",
      description: "The DMCA template has been copied to clipboard.",
    });
  };

  const handleDeleteTemplate = (id: string) => {
    setTemplates(templates.filter(t => t.id !== id));
    
    toast({
      title: "Template Deleted",
      description: "The DMCA template has been deleted.",
      variant: "destructive",
    });
  };

  const handleSaveNewTemplate = () => {
    if (!newTemplate.platform || !newTemplate.subject || !newTemplate.template) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const newId = `dmca-${Date.now()}`;
    const createdTemplate: DMCATemplate = {
      id: newId,
      platform: newTemplate.platform || "",
      subject: newTemplate.subject || "",
      template: newTemplate.template || "",
      lastModified: new Date().toISOString()
    };
    
    setTemplates([...templates, createdTemplate]);
    setShowDialog(false);
    
    toast({
      title: "Template Created",
      description: `New DMCA template for ${createdTemplate.platform} has been created.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-slate-800">DMCA Notice Templates</h2>
        <Button onClick={handleCreateNewTemplate}>
          <Plus className="mr-2 h-4 w-4" />
          Create Template
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            onEdit={handleEditTemplate}
            onCopy={handleCopyTemplate}
            onDelete={handleDeleteTemplate}
          />
        ))}
      </div>
      
      {editingTemplate && (
        <TemplateEditor
          template={editingTemplate}
          onSave={handleSaveTemplate}
          onCancel={() => setEditingTemplate(null)}
          onChange={setEditingTemplate}
        />
      )}
      
      <CreateTemplateDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        newTemplate={newTemplate}
        onTemplateChange={setNewTemplate}
        onSave={handleSaveNewTemplate}
      />
    </div>
  );
}
