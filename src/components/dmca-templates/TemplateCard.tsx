
import { Copy, Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { DMCATemplate } from "./types";
import { formatDate } from "./utils";

interface TemplateCardProps {
  template: DMCATemplate;
  onEdit: (template: DMCATemplate) => void;
  onCopy: (template: DMCATemplate) => void;
  onDelete: (id: string) => void;
}

export function TemplateCard({ template, onEdit, onCopy, onDelete }: TemplateCardProps) {
  return (
    <Card key={template.id} className="overflow-hidden">
      <CardHeader className="bg-slate-50 pb-3">
        <CardTitle className="flex justify-between items-center">
          <span>{template.platform}</span>
          <div className="flex gap-1">
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-slate-500 hover:text-slate-800"
              onClick={() => onCopy(template)}
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-slate-500 hover:text-slate-800"
              onClick={() => onEdit(template)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-slate-500 hover:text-red-600"
              onClick={() => onDelete(template.id)}
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
  );
}
