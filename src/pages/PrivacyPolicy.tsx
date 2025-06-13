
import SEOHead from '@/components/SEOHead';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
      <SEOHead 
        title="Privacy Policy | GymSpaYoga"
        description="Read our privacy policy to understand how we collect, use, and protect your personal information on GymSpaYoga platform."
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-block bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-4">
              Legal Document
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Privacy Policy
            </h1>
            <p className="text-gray-600 text-lg">
              Your privacy is important to us. Learn how we protect your data.
            </p>
          </div>

          {/* Content Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-blue-500 h-2"></div>
            
            <div className="p-8 md:p-12">
              <div className="prose prose-lg max-w-none">
                <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg mb-8">
                  <p className="text-amber-800 font-medium mb-1">
                    <strong>Last updated:</strong> {new Date().toLocaleDateString()}
                  </p>
                </div>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <span className="bg-emerald-100 text-emerald-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">1</span>
                    Information We Collect
                  </h2>
                  <div className="bg-gray-50 rounded-lg p-6 mb-4">
                    <p className="text-gray-700 mb-4">
                      We collect information you provide directly to us, such as when you create an account, 
                      make a booking, or contact us for support.
                    </p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">Personal Data</h4>
                      <ul className="text-blue-700 text-sm space-y-1">
                        <li>• Name, email, phone number</li>
                        <li>• Profile information</li>
                      </ul>
                    </div>
                    <div className="bg-emerald-50 rounded-lg p-4">
                      <h4 className="font-semibold text-emerald-800 mb-2">Usage Data</h4>
                      <ul className="text-emerald-700 text-sm space-y-1">
                        <li>• Booking and payment info</li>
                        <li>• Analytics and communications</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">2</span>
                    How We Use Your Information
                  </h2>
                  <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-lg p-6">
                    <p className="text-gray-700 mb-4">We use the information we collect to:</p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start">
                          <span className="text-emerald-500 mr-2">✓</span>
                          Provide and maintain our services
                        </li>
                        <li className="flex items-start">
                          <span className="text-emerald-500 mr-2">✓</span>
                          Process transactions and confirmations
                        </li>
                        <li className="flex items-start">
                          <span className="text-emerald-500 mr-2">✓</span>
                          Send technical notices and support
                        </li>
                      </ul>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">✓</span>
                          Respond to comments and questions
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">✓</span>
                          Improve services and develop features
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">✓</span>
                          Protect against fraud and abuse
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <span className="bg-purple-100 text-purple-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">3</span>
                    Information Sharing
                  </h2>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-4">
                    <p className="text-red-800 font-medium mb-2">🔒 We do not sell your personal information</p>
                    <p className="text-red-700 text-sm">
                      We do not sell, trade, or otherwise transfer your personal information to third parties 
                      without your consent, except as described in this policy.
                    </p>
                  </div>
                  <p className="text-gray-700 mb-4">We may share your information:</p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-amber-500 mr-2">•</span>
                      With service providers who assist us in operating our platform
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-500 mr-2">•</span>
                      With business partners (gyms, spas, trainers) to fulfill bookings
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-500 mr-2">•</span>
                      When required by law or to protect our rights
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-500 mr-2">•</span>
                      In connection with a business transfer or acquisition
                    </li>
                  </ul>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <span className="bg-green-100 text-green-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">4</span>
                    Data Security
                  </h2>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <div className="flex items-start">
                      <span className="text-green-600 text-2xl mr-3">🛡️</span>
                      <p className="text-green-800">
                        We implement appropriate security measures to protect your personal information against 
                        unauthorized access, alteration, disclosure, or destruction.
                      </p>
                    </div>
                  </div>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <span className="bg-indigo-100 text-indigo-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">5</span>
                    Your Rights
                  </h2>
                  <div className="bg-indigo-50 rounded-lg p-6">
                    <p className="text-indigo-800 mb-4 font-medium">You have the right to:</p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <ul className="space-y-2 text-indigo-700">
                        <li className="flex items-start">
                          <span className="text-indigo-500 mr-2">👤</span>
                          Access and update your personal information
                        </li>
                        <li className="flex items-start">
                          <span className="text-indigo-500 mr-2">🗑️</span>
                          Delete your account and associated data
                        </li>
                      </ul>
                      <ul className="space-y-2 text-indigo-700">
                        <li className="flex items-start">
                          <span className="text-indigo-500 mr-2">📧</span>
                          Opt out of marketing communications
                        </li>
                        <li className="flex items-start">
                          <span className="text-indigo-500 mr-2">📋</span>
                          Request a copy of your data
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <span className="bg-teal-100 text-teal-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">6</span>
                    Contact Us
                  </h2>
                  <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg p-6 border border-teal-200">
                    <p className="text-gray-700 mb-4">
                      If you have any questions about this Privacy Policy, please contact us at:
                    </p>
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center mb-2">
                        <span className="text-teal-600 mr-2">📧</span>
                        <span className="font-medium text-gray-800">Email:</span>
                        <a href="mailto:GymSpaYoga@gmail.com" className="text-teal-600 hover:text-teal-700 ml-2">
                          GymSpaYoga@gmail.com
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

export default PrivacyPolicy;
