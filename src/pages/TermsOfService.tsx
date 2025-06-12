
import SEOHead from '@/components/SEOHead';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50">
      <SEOHead 
        title="Terms of Service | GymSpaYoga"
        description="Read our terms of service to understand the rules and regulations for using the GymSpaYoga platform."
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-600 mb-4">
                By accessing and using GymSpaYoga, you accept and agree to be bound by the terms 
                and provision of this agreement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Use License</h2>
              <p className="text-gray-600 mb-4">
                Permission is granted to temporarily use GymSpaYoga for personal, non-commercial 
                transitory viewing only.
              </p>
              <p className="text-gray-600 mb-4">This license shall automatically terminate if you violate any of these restrictions:</p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Modify or copy the materials</li>
                <li>Use the materials for commercial purposes</li>
                <li>Attempt to reverse engineer any software</li>
                <li>Remove any copyright or proprietary notations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. User Accounts</h2>
              <p className="text-gray-600 mb-4">
                When you create an account with us, you must provide accurate, complete, and 
                up-to-date information.
              </p>
              <p className="text-gray-600 mb-4">You are responsible for:</p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>Safeguarding your password</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us of any unauthorized use</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Bookings and Payments</h2>
              <p className="text-gray-600 mb-4">
                All bookings are subject to availability and confirmation by the service provider.
              </p>
              <p className="text-gray-600 mb-4">
                Payment terms, cancellation policies, and refund conditions may vary by service provider 
                and will be clearly displayed before booking confirmation.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Prohibited Uses</h2>
              <p className="text-gray-600 mb-4">You may not use our service:</p>
              <ul className="list-disc pl-6 text-gray-600 mb-4">
                <li>For any unlawful purpose</li>
                <li>To violate any international, federal, provincial, or state regulations or laws</li>
                <li>To transmit or procure the sending of advertising or promotional material</li>
                <li>To impersonate another person or entity</li>
                <li>To engage in any other conduct that restricts or inhibits anyone's use</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Disclaimer</h2>
              <p className="text-gray-600 mb-4">
                The information on this platform is provided on an 'as is' basis. To the fullest 
                extent permitted by law, this Company excludes all representations, warranties, 
                conditions and terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Limitations</h2>
              <p className="text-gray-600 mb-4">
                In no event shall GymSpaYoga or its suppliers be liable for any damages arising 
                out of the use or inability to use the materials on our platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Contact Information</h2>
              <p className="text-gray-600 mb-4">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <p className="text-gray-600">
                Email: legal@gymspayoga.com<br />
                Address: 123 Wellness Street, Health City, HC 12345
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
