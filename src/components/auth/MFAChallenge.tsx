import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { KeyRound, Loader2 } from 'lucide-react';
import { useMFA } from '@/hooks/useMFA';
import { useAuth } from '@/hooks/useAuth';

interface MFAChallengeProps {
  areaLabel?: string;
}

/** Asks an already signed-in user for their TOTP code to upgrade the session to aal2. */
const MFAChallenge = ({ areaLabel = 'this dashboard' }: MFAChallengeProps) => {
  const { verifiedFactors, verifyCode } = useMFA();
  const { signOut } = useAuth();
  const [code, setCode] = useState('');
  const [busy, setBusy] = useState(false);

  const factorId = verifiedFactors[0]?.id;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!factorId) return;
    setBusy(true);
    try {
      await verifyCode(factorId, code);
      toast.success('Identity confirmed');
    } catch (err: any) {
      toast.error(err?.message ?? 'Invalid code. Please try again.');
      setCode('');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-3 h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <KeyRound className="h-6 w-6 text-primary" />
          </div>
          <CardTitle>Verify it's you</CardTitle>
          <CardDescription>
            Enter the 6-digit code from your authenticator app to open {areaLabel}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              inputMode="numeric"
              autoComplete="one-time-code"
              autoFocus
              placeholder="000000"
              aria-label="Authentication code"
              className="tracking-[0.5em] text-center text-lg"
            />
            <Button type="submit" className="w-full" disabled={busy || code.length !== 6}>
              {busy && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Verify
            </Button>
            <Button type="button" variant="ghost" className="w-full" onClick={signOut}>
              Sign out instead
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default MFAChallenge;
