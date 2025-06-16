
import React from 'react';
import CategoryBusinesses from '@/components/CategoryBusinesses';
import AppHeader from '@/components/AppHeader';
import AppFooter from '@/components/AppFooter';
import { useAuth } from '@/hooks/useAuth';

const Trainers = () => {
  const { signOut } = useAuth();

  return (
    <>
      <AppHeader onLogout={signOut} />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <CategoryBusinesses category="trainer" />
      </div>
      <AppFooter />
    </>
  );
};

export default Trainers;
