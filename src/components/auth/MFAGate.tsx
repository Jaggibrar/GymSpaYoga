import { ReactNode } from 'react';
import { Loader2, ShieldCheck } from 'lucide-react';
import { useMFA } from '@/hooks/useMFA';
import MFASetupCard from './MFASetupCard';
import MFAChallenge from './MFAChallenge';

interface MFAGateProps {
  children: ReactNode;
  /** Human-readable name of the protected area, e.g. "the admin dashboard". */
  areaLabel: string;
  roleLabel: string;
}

/**
 * Blocks a privileged area until the session reaches assurance level aal2:
 * the user must have a verified TOTP factor AND have used it in this session.
 */
const MFAGate = ({ children, areaLabel, roleLabel }: MFAGateProps) => {
  const { loading, hasMFA, isVerifiedSession, needsChallenge } = useMFA();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Checking security settings...</p>
        </div>
      </div>
    );
  }

  if (needsChallenge && !isVerifiedSession) {
    return <MFAChallenge areaLabel={areaLabel} />;
  }

  if (!hasMFA) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="mx-auto h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <ShieldCheck className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              Two-factor authentication required
            </h1>
            <p className="text-muted-foreground">
              {areaLabel.charAt(0).toUpperCase() + areaLabel.slice(1)} handles customer bookings and
              contact details, so it needs a second factor before you can continue.
            </p>
          </div>
          <MFASetupCard required roleLabel={roleLabel} />
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default MFAGate;
