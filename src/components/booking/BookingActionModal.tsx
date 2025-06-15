
import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  action: "accept" | "cancel";
  onSubmit: (reason?: string) => void;
}

export function BookingActionModal({ isOpen, onClose, action, onSubmit }: Props) {
  const [reason, setReason] = useState("");

  return (
    <Dialog open={isOpen} onOpenChange={v => {if (!v) onClose();}}>
      <DialogContent>
        <DialogTitle>
          {action === "accept" ? "Accept Booking" : "Cancel Booking"}
        </DialogTitle>
        {action === "cancel" && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Please provide a reason for cancelling:
            </label>
            <Input
              value={reason}
              onChange={e => setReason(e.target.value)}
              placeholder="Reason (required)"
              required
            />
          </div>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Back</Button>
          <Button
            variant={action === "accept" ? "default" : "destructive"}
            onClick={() => {
              onSubmit(action === "cancel" ? reason : undefined);
              onClose();
            }}
            disabled={action === "cancel" && !reason.trim()}
          >
            {action === "accept" ? "Accept" : "Cancel"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
