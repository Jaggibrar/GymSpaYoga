
export const TrainerStatsHero = () => {
  return (
    <div className="text-center mb-16">
      <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
        Join Our Elite 
        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Trainer Network</span>
      </h1>
      <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
        Transform your passion into profit. Connect with thousands of clients and build your fitness empire with our premium platform.
      </p>
      
      {/* Professional Benefits Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
          <div className="text-4xl font-bold text-blue-600 mb-2">Professional</div>
          <div className="text-gray-600 font-medium">Growth Platform</div>
        </div>
        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
          <div className="text-4xl font-bold text-purple-600 mb-2">Flexible</div>
          <div className="text-gray-600 font-medium">Schedule Management</div>
        </div>
        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
          <div className="text-4xl font-bold text-emerald-600 mb-2">Premium</div>
          <div className="text-gray-600 font-medium">Earning Potential</div>
        </div>
      </div>
    </div>
  );
};
