import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Copy, Loader2, ShieldCheck, ShieldAlert, Smartphone, Trash2 } from 'lucide-react';
import { useMFA, type EnrollmentData } from '@/hooks/useMFA';

interface MFASetupCardProps {
  /** Shown when MFA is mandatory for the area the user is trying to reach. */
  required?: boolean;
  roleLabel?: string;
  onEnrolled?: () => void;
}

const MFASetupCard = ({ required = false, roleLabel = 'your account', onEnrolled }: MFASetupCardProps) => {
  const { verifiedFactors, hasMFA, loading, startEnrollment, verifyCode, removeFactor } = useMFA();
  const [enrollment, setEnrollment] = useState<EnrollmentData | null>(null);
  const [code, setCode] = useState('');
  const [busy, setBusy] = useState(false);

  const handleStart = async () => {
    setBusy(true);
    try {
      setEnrollment(await startEnrollment('GymSpaYoga Authenticator'));
    } catch (err: any) {
      toast.error(err?.message ?? 'Could not start authenticator setup');
    } finally {
      setBusy(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!enrollment) return;
    setBusy(true);
    try {
      await verifyCode(enrollment.factorId, code);
      setEnrollment(null);
      setCode('');
      toast.success('Two-factor authentication is now active');
      onEnrolled?.();
    } catch (err: any) {
      toast.error(err?.message ?? 'That code was not valid. Try the next one.');
    } finally {
      setBusy(false);
    }
  };

  const handleRemove = async (factorId: string) => {
    setBusy(true);
    try {
      await removeFactor(factorId);
      toast.success('Authenticator removed');
    } catch (err: any) {
      toast.error(err?.message ?? 'Could not remove authenticator');
    } finally {
      setBusy(false);
    }
  };

  if (loading) {
    return (
      <Card className="w-full">
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              {hasMFA ? (
                <ShieldCheck className="h-5 w-5 text-primary" />
              ) : (
                <ShieldAlert className="h-5 w-5 text-primary" />
              )}
            </div>
            <div>
              <CardTitle className="text-xl">Two-factor authentication</CardTitle>
              <CardDescription>
                {hasMFA
                  ? 'An authenticator app is protecting this account.'
                  : `Add a time-based code from an authenticator app to protect ${roleLabel}.`}
              </CardDescription>
            </div>
          </div>
          <Badge variant={hasMFA ? 'default' : 'secondary'} className="shrink-0">
            {hasMFA ? 'Enabled' : required ? 'Required' : 'Off'}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        {hasMFA && (
          <div className="space-y-3">
            {verifiedFactors.map((factor) => (
              <div
                key={factor.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-border bg-secondary/40 p-4"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Smartphone className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">Authenticator app</p>
                    {factor.created_at && (
                      <p className="text-xs text-muted-foreground">
                        Added {new Date(factor.created_at).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={busy}
                  onClick={() => handleRemove(factor.id)}
                  className="text-destructive hover:text-destructive shrink-0"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Remove
                </Button>
              </div>
            ))}
            <p className="text-xs text-muted-foreground">
              Removing your last authenticator will lock you out of the dashboard until you set one up again.
            </p>
          </div>
        )}

        {!hasMFA && !enrollment && (
          <>
            <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
              <li>Install an authenticator app (Google Authenticator, Authy, 1Password).</li>
              <li>Scan the QR code we generate below.</li>
              <li>Enter the 6-digit code to confirm.</li>
            </ol>
            <Button onClick={handleStart} disabled={busy} className="w-full sm:w-auto">
              {busy && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Set up authenticator
            </Button>
          </>
        )}

        {enrollment && (
          <form onSubmit={handleVerify} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start">
              <img
                src={enrollment.qrCode}
                alt="QR code for two-factor authentication setup"
                className="h-44 w-44 rounded-xl bg-white p-2 shrink-0"
              />
              <div className="space-y-3 w-full">
                <p className="text-sm text-muted-foreground">
                  Scan this with your authenticator app, or enter the setup key manually:
                </p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 rounded-lg bg-secondary px-3 py-2 text-xs break-all text-foreground">
                    {enrollment.secret}
                  </code>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    aria-label="Copy setup key"
                    onClick={() => {
                      navigator.clipboard.writeText(enrollment.secret);
                      toast.success('Setup key copied');
                    }}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="mfa-enroll-code" className="text-sm font-medium text-foreground">
                6-digit verification code
              </label>
              <Input
                id="mfa-enroll-code"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                inputMode="numeric"
                autoComplete="one-time-code"
                placeholder="000000"
                className="tracking-[0.5em] text-center text-lg"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <Button type="submit" disabled={busy || code.length !== 6} className="flex-1">
                {busy && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Verify and enable
              </Button>
              <Button
                type="button"
                variant="outline"
                disabled={busy}
                onClick={() => { setEnrollment(null); setCode(''); }}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default MFASetupCard;
