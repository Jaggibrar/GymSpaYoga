
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
        <CategoryBusinesses 
          category="trainer"
          title="Professional Trainers"
          description="Find certified personal trainers to help you achieve your fitness goals"
        />
      </div>
      <AppFooter />
    </>
  );
};

export default Trainers;
