import { Navigate } from 'react-router-dom';
import { Loader2, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import SEOHead from '@/components/SEOHead';
import MFASetupCard from '@/components/auth/MFASetupCard';

const AccountSecurity = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  return (
    <>
      <SEOHead
        title="Account Security | GymSpaYoga"
        description="Manage two-factor authentication and sign-in security for your GymSpaYoga account."
        noindex={true}
      />
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          <header className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <ShieldCheck className="h-3.5 w-3.5" />
              Account security
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Keep your account protected
            </h1>
            <p className="text-muted-foreground max-w-xl">
              Two-factor authentication is required for business and admin dashboards, and
              recommended for everyone else.
            </p>
          </header>

          <MFASetupCard roleLabel="your account" />
        </div>
      </div>
    </>
  );
};

export default AccountSecurity;
