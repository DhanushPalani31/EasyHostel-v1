import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Package, Truck, Clock, ArrowRight } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Package,
      title: 'Wide Range of Products',
      description: 'Snacks, stationery, toiletries, and more essentials',
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Get your orders delivered within the hostel premises',
    },
    {
      icon: Clock,
      title: 'Order Anytime',
      description: '24/7 ordering system for your convenience',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg mb-6">
            <ShoppingCart className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            HostelEase
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Your one-stop solution for all hostel essentials. Order from your room and get it delivered quickly.
          </p>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg rounded-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
          >
            <span>Get Started</span>
            <ArrowRight size={24} />
          </button>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 animate-slide-up">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="inline-block p-3 bg-blue-100 rounded-lg mb-4">
                <feature.icon size={32} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white shadow-xl animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to simplify your hostel life?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join hundreds of students already using HostelEase
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-8 py-4 bg-white text-blue-600 text-lg rounded-lg hover:shadow-xl transform hover:-translate-y-1 transition-all font-semibold"
          >
            Sign Up Now
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2025 HostelEase. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;