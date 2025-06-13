
import SEOHead from '@/components/SEOHead';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-emerald-50">
      <SEOHead 
        title="Terms of Service | GymSpaYoga"
        description="Read our terms of service to understand the rules and regulations for using the GymSpaYoga platform."
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-4">
              Legal Agreement
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Terms of Service
            </h1>
            <p className="text-gray-600 text-lg">
              Please read these terms carefully before using our platform.
            </p>
          </div>

          {/* Content Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2"></div>
            
            <div className="p-8 md:p-12">
              <div className="prose prose-lg max-w-none">
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg mb-8">
                  <p className="text-blue-800 font-medium mb-1">
                    <strong>Last updated:</strong> {new Date().toLocaleDateString()}
                  </p>
                </div>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">1</span>
                    Acceptance of Terms
                  </h2>
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
                    <div className="flex items-start">
                      <span className="text-blue-600 text-2xl mr-3">📋</span>
                      <p className="text-gray-700">
                        By accessing and using GymSpaYoga, you accept and agree to be bound by the terms 
                        and provision of this agreement.
                      </p>
                    </div>
                  </div>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <span className="bg-purple-100 text-purple-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">2</span>
                    Use License
                  </h2>
                  <div className="bg-purple-50 rounded-lg p-6 mb-4">
                    <p className="text-purple-800 mb-4">
                      Permission is granted to temporarily use GymSpaYoga for personal, non-commercial 
                      transitory viewing only.
                    </p>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h4 className="font-semibold text-red-800 mb-3">🚫 This license shall automatically terminate if you violate any of these restrictions:</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <ul className="space-y-2 text-red-700">
                        <li className="flex items-start">
                          <span className="text-red-500 mr-2">×</span>
                          Modify or copy the materials
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-500 mr-2">×</span>
                          Use for commercial purposes
                        </li>
                      </ul>
                      <ul className="space-y-2 text-red-700">
                        <li className="flex items-start">
                          <span className="text-red-500 mr-2">×</span>
                          Reverse engineer any software
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-500 mr-2">×</span>
                          Remove copyright notations
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <span className="bg-emerald-100 text-emerald-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">3</span>
                    User Accounts
                  </h2>
                  <div className="bg-emerald-50 rounded-lg p-6 mb-4">
                    <p className="text-emerald-800 mb-4">
                      When you create an account with us, you must provide accurate, complete, and 
                      up-to-date information.
                    </p>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-6">
                    <h4 className="font-semibold text-amber-800 mb-3">⚠️ You are responsible for:</h4>
                    <ul className="space-y-2 text-amber-700">
                      <li className="flex items-start">
                        <span className="text-amber-600 mr-2">🔐</span>
                        Safeguarding your password
                      </li>
                      <li className="flex items-start">
                        <span className="text-amber-600 mr-2">👤</span>
                        All activities that occur under your account
                      </li>
                      <li className="flex items-start">
                        <span className="text-amber-600 mr-2">🚨</span>
                        Notifying us of any unauthorized use
                      </li>
                    </ul>
                  </div>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <span className="bg-green-100 text-green-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">4</span>
                    Bookings and Payments
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                      <div className="flex items-center mb-3">
                        <span className="text-green-600 text-xl mr-2">📅</span>
                        <h4 className="font-semibold text-green-800">Bookings</h4>
                      </div>
                      <p className="text-green-700 text-sm">
                        All bookings are subject to availability and confirmation by the service provider.
                      </p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                      <div className="flex items-center mb-3">
                        <span className="text-blue-600 text-xl mr-2">💳</span>
                        <h4 className="font-semibold text-blue-800">Payments</h4>
                      </div>
                      <p className="text-blue-700 text-sm">
                        Payment terms, cancellation policies, and refund conditions may vary by service provider.
                      </p>
                    </div>
                  </div>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <span className="bg-red-100 text-red-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">5</span>
                    Prohibited Uses
                  </h2>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h4 className="font-semibold text-red-800 mb-4">🚫 You may not use our service:</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <ul className="space-y-2 text-red-700">
                        <li className="flex items-start">
                          <span className="text-red-500 mr-2">•</span>
                          For any unlawful purpose
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-500 mr-2">•</span>
                          To violate regulations or laws
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-500 mr-2">•</span>
                          To transmit spam or promotional material
                        </li>
                      </ul>
                      <ul className="space-y-2 text-red-700">
                        <li className="flex items-start">
                          <span className="text-red-500 mr-2">•</span>
                          To impersonate another person
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-500 mr-2">•</span>
                          To restrict others' use of service
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <span className="bg-orange-100 text-orange-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">6</span>
                    Disclaimer
                  </h2>
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                    <div className="flex items-start">
                      <span className="text-orange-600 text-2xl mr-3">⚠️</span>
                      <p className="text-orange-800">
                        The information on this platform is provided on an 'as is' basis. To the fullest 
                        extent permitted by law, this Company excludes all representations, warranties, 
                        conditions and terms.
                      </p>
                    </div>
                  </div>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <span className="bg-gray-100 text-gray-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">7</span>
                    Limitations
                  </h2>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                    <p className="text-gray-700">
                      In no event shall GymSpaYoga or its suppliers be liable for any damages arising 
                      out of the use or inability to use the materials on our platform.
                    </p>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <span className="bg-teal-100 text-teal-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">8</span>
                    Contact Information
                  </h2>
                  <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg p-6 border border-teal-200">
                    <p className="text-gray-700 mb-4">
                      If you have any questions about these Terms of Service, please contact us at:
                    </p>
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center mb-2">
                        <span className="text-teal-600 mr-2">📧</span>
                        <span className="font-medium text-gray-800">Email:</span>
                        <a href="mailto:legal@gymspayoga.com" className="text-teal-600 hover:text-teal-700 ml-2">
                          legal@gymspayoga.com
                        </a>
                      </div>
                      <div className="flex items-center">
                        <span className="text-teal-600 mr-2">📍</span>
                        <span className="font-medium text-gray-800">Address:</span>
                        <span className="text-gray-600 ml-2">123 Wellness Street, Health City, HC 12345</span>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
