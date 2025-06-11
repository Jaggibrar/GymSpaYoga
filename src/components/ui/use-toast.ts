
// Unified toast system using sonner for consistency
import { toast } from "sonner";

export { toast };
export const useToast = () => ({ 
  toast: {
    success: (message: string) => toast.success(message),
    error: (message: string) => toast.error(message),
    info: (message: string) => toast.info(message),
    warning: (message: string) => toast.warning(message),
  }
});
