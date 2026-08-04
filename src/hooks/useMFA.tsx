import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface MfaFactor {
  id: string;
  friendly_name?: string;
  status: string;
  created_at?: string;
}

export interface EnrollmentData {
  factorId: string;
  qrCode: string;
  secret: string;
  uri: string;
}

/**
 * Wraps Supabase's TOTP multi-factor APIs.
 *
 * `currentLevel` is the assurance level of the active session ('aal1' = password
 * only, 'aal2' = password + a verified second factor). `nextLevel` is the highest
 * level the user could reach — when it is 'aal2' while `currentLevel` is 'aal1',
 * the user has MFA enrolled but has not completed the challenge for this session.
 */
export const useMFA = () => {
  const [factors, setFactors] = useState<MfaFactor[]>([]);
  const [currentLevel, setCurrentLevel] = useState<string | null>(null);
  const [nextLevel, setNextLevel] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      const [factorsRes, aalRes] = await Promise.all([
        supabase.auth.mfa.listFactors(),
        supabase.auth.mfa.getAuthenticatorAssuranceLevel(),
      ]);

      if (factorsRes.error) throw factorsRes.error;

      setFactors((factorsRes.data?.totp ?? []) as MfaFactor[]);
      setCurrentLevel(aalRes.data?.currentLevel ?? null);
      setNextLevel(aalRes.data?.nextLevel ?? null);
      setError(null);
    } catch (err: any) {
      setError(err?.message ?? 'Unable to read security settings');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      // Defer: never call other Supabase APIs synchronously inside this callback.
      setTimeout(() => { refresh(); }, 0);
    });

    return () => subscription.unsubscribe();
  }, [refresh]);

  const verifiedFactors = factors.filter((f) => f.status === 'verified');

  /** Starts TOTP enrollment and returns the QR/secret to show the user. */
  const startEnrollment = useCallback(async (friendlyName: string): Promise<EnrollmentData> => {
    // Clean up abandoned (unverified) enrollments so repeated attempts don't collide.
    const stale = factors.filter((f) => f.status !== 'verified');
    await Promise.all(stale.map((f) => supabase.auth.mfa.unenroll({ factorId: f.id })));

    const { data, error: enrollError } = await supabase.auth.mfa.enroll({
      factorType: 'totp',
      friendlyName: `${friendlyName} ${Date.now()}`,
    });

    if (enrollError) throw enrollError;

    return {
      factorId: data.id,
      qrCode: data.totp.qr_code,
      secret: data.totp.secret,
      uri: data.totp.uri,
    };
  }, [factors]);

  /** Verifies a 6-digit code against a factor (works for both enrollment and login). */
  const verifyCode = useCallback(async (factorId: string, code: string) => {
    const { data: challenge, error: challengeError } =
      await supabase.auth.mfa.challenge({ factorId });

    if (challengeError) throw challengeError;

    const { error: verifyError } = await supabase.auth.mfa.verify({
      factorId,
      challengeId: challenge.id,
      code: code.replace(/\s/g, ''),
    });

    if (verifyError) throw verifyError;

    await refresh();
  }, [refresh]);

  const removeFactor = useCallback(async (factorId: string) => {
    const { error: unenrollError } = await supabase.auth.mfa.unenroll({ factorId });
    if (unenrollError) throw unenrollError;
    await refresh();
  }, [refresh]);

  return {
    factors,
    verifiedFactors,
    hasMFA: verifiedFactors.length > 0,
    /** Session already satisfied the second factor. */
    isVerifiedSession: currentLevel === 'aal2',
    /** Enrolled but this session is still password-only. */
    needsChallenge: currentLevel === 'aal1' && nextLevel === 'aal2',
    currentLevel,
    nextLevel,
    loading,
    error,
    refresh,
    startEnrollment,
    verifyCode,
    removeFactor,
  };
};
