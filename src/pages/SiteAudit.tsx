
import React from 'react';
import { Helmet } from 'react-helmet-async';
import SiteAuditChecklist from '@/components/SiteAuditChecklist';

const SiteAudit = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Helmet>
        <title>Site Audit - GymSpaYoga</title>
        <meta name="description" content="Comprehensive site audit and functionality check" />
      </Helmet>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Site Audit & Functionality Check
          </h1>
          <p className="text-lg text-gray-600">
            Comprehensive analysis of site functionality, performance, and user experience
          </p>
        </div>
        
        <SiteAuditChecklist />
      </div>
    </div>
  );
};

export default SiteAudit;
