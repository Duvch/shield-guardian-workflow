
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";

interface CreateUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateUserDialog({ open, onOpenChange }: CreateUserDialogProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState<"Demo" | "Premium" | "Pro">("Demo");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // In a real app, this would be an API call to create the user
    setTimeout(() => {
      // Simulate API call completion
      toast({
        title: "User Created",
        description: `${name} has been added with a ${plan} plan.`,
      });
      
      // Reset form
      setName("");
      setEmail("");
      setPlan("Demo");
      setIsSubmitting(false);
      onOpenChange(false);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New User</DialogTitle>
          <DialogDescription>
            Add a new user account with plan-specific limits.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name"
              placeholder="John Doe" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email"
              type="email" 
              placeholder="user@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Plan</Label>
            <RadioGroup value={plan} onValueChange={(value) => setPlan(value as "Demo" | "Premium" | "Pro")}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Demo" id="demo" />
                <Label htmlFor="demo" className="font-normal cursor-pointer">
                  Demo (5 scans, 1 takedown)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Premium" id="premium" />
                <Label htmlFor="premium" className="font-normal cursor-pointer">
                  Premium (50 scans, 10 takedowns)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Pro" id="pro" />
                <Label htmlFor="pro" className="font-normal cursor-pointer">
                  Pro (100 scans, Unlimited takedowns)
                </Label>
              </div>
            </RadioGroup>
          </div>

          <DialogFooter className="pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || !name || !email}>
              {isSubmitting ? "Creating..." : "Create User"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
