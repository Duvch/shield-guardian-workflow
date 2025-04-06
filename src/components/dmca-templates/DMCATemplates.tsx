
import { useState } from "react";
import { Copy, Edit, Plus, Save, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

interface DMCATemplate {
  id: string;
  platform: string;
  subject: string;
  template: string;
  lastModified: string;
}

const initialTemplates: DMCATemplate[] = [
  {
    id: "dmca-001",
    platform: "YouTube",
    subject: "Copyright Infringement Notification - YouTube",
    template: `DMCA Takedown Notice

To Whom It May Concern at YouTube,

I am writing to notify you that my copyrighted content has been posted to your platform without my authorization.

Content URL: {{contentURL}}

The unauthorized content was posted by: {{contentOwner}}

I have a good faith belief that the use of the material in the manner complained of is not authorized by me, the copyright owner.

The information in this notification is accurate, and under penalty of perjury, I am the owner, or an agent authorized to act on behalf of the owner, of an exclusive right that is allegedly infringed.

Please remove this content immediately.

Sincerely,
{{userName}}`,
    lastModified: "2023-04-01T10:30:00Z"
  },
  {
    id: "dmca-002",
    platform: "Instagram",
    subject: "Copyright Infringement Notice - Instagram",
    template: `DMCA Takedown Notice

To Whom It May Concern at Instagram,

I am the copyright owner of the content that was posted to your platform without my authorization.

Infringing Content URL: {{contentURL}}

Original Work URL or Description: {{originalWorkDescription}}

I have a good faith belief that use of the copyrighted materials described above as allegedly infringing is not authorized by the copyright owner, its agent, or the law.

I swear, under penalty of perjury, that the information in the notification is accurate and that I am the copyright owner or am authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.

Please act expeditiously to remove the infringing content.

Sincerely,
{{userName}}`,
    lastModified: "2023-04-02T15:45:00Z"
  },
  {
    id: "dmca-003",
    platform: "TikTok",
    subject: "DMCA Takedown Request - TikTok",
    template: `DMCA Takedown Notice

To TikTok Legal Department,

This letter serves as notification under the Digital Millennium Copyright Act that my copyrighted work has been infringed.

The infringing content can be found at: {{contentURL}}

My original work can be found at or described as: {{originalWorkDescription}}

I have a good faith belief that use of the copyrighted materials described above on the infringing web pages is not authorized by the copyright owner, its agent, or the law.

I swear, under penalty of perjury, that the information in this notification is accurate and that I am the copyright owner, or am authorized to act on behalf of the owner, of an exclusive right that is allegedly infringed.

Thank you for your prompt attention to this matter.

Sincerely,
{{userName}}`,
    lastModified: "2023-04-03T11:20:00Z"
  }
];

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    }).format(date);
  };

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
          <Card key={template.id} className="overflow-hidden">
            <CardHeader className="bg-slate-50 pb-3">
              <CardTitle className="flex justify-between items-center">
                <span>{template.platform}</span>
                <div className="flex gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-slate-500 hover:text-slate-800"
                    onClick={() => handleCopyTemplate(template)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-slate-500 hover:text-slate-800"
                    onClick={() => handleEditTemplate(template)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-slate-500 hover:text-red-600"
                    onClick={() => handleDeleteTemplate(template.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="mb-2">
                <Label className="text-xs text-slate-500">Subject</Label>
                <p className="text-sm truncate">{template.subject}</p>
              </div>
              <div>
                <Label className="text-xs text-slate-500">Template Preview</Label>
                <div className="mt-1 p-2 bg-slate-50 rounded-md max-h-24 overflow-hidden text-xs text-slate-700 font-mono">
                  {template.template.slice(0, 150)}...
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-3 text-xs text-slate-500">
              Last modified: {formatDate(template.lastModified)}
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {editingTemplate && (
        <div className="mt-6 border rounded-md p-4 bg-white animate-fade-in">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Editing {editingTemplate.platform} Template</h3>
            <Button 
              variant="outline"
              size="sm"
              onClick={() => setEditingTemplate(null)}
            >
              Cancel
            </Button>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="platform">Platform</Label>
              <Input
                id="platform"
                value={editingTemplate.platform}
                onChange={(e) => setEditingTemplate({ ...editingTemplate, platform: e.target.value })}
              />
            </div>
            
            <div>
              <Label htmlFor="subject">Subject Line</Label>
              <Input
                id="subject"
                value={editingTemplate.subject}
                onChange={(e) => setEditingTemplate({ ...editingTemplate, subject: e.target.value })}
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
                value={editingTemplate.template}
                onChange={(e) => setEditingTemplate({ ...editingTemplate, template: e.target.value })}
              />
            </div>
            
            <Button onClick={() => handleSaveTemplate(editingTemplate)} className="mt-2">
              <Save className="mr-2 h-4 w-4" />
              Save Template
            </Button>
          </div>
        </div>
      )}
      
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
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
                onChange={(e) => setNewTemplate({ ...newTemplate, platform: e.target.value })}
              />
            </div>
            
            <div>
              <Label htmlFor="new-subject">Subject Line</Label>
              <Input
                id="new-subject"
                placeholder="e.g., Copyright Infringement Notice - [Platform]"
                value={newTemplate.subject}
                onChange={(e) => setNewTemplate({ ...newTemplate, subject: e.target.value })}
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
                onChange={(e) => setNewTemplate({ ...newTemplate, template: e.target.value })}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveNewTemplate}>
              Create Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
