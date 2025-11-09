import { Home, Search, ArrowRight, ShoppingBag, HelpCircle, Mail } from 'lucide-react';
import {Link} from "react-router-dom"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Simple Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-light tracking-wider text-gray-900">
              MINIMAL
            </div>
            <Link to="/" className="text-gray-700 hover:text-gray-900 transition-colors cursor-pointer">
              <Home className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-2xl w-full text-center">
          {/* 404 Number */}
          <div className="mb-8">
            <h1 className="text-9xl md:text-[12rem] font-light text-gray-200 leading-none select-none">
              404
            </h1>
          </div>

          {/* Message */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              Page Not Found
            </h2>
            <p className="text-lg text-gray-600 max-w-md mx-auto leading-relaxed">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-12 max-w-lg mx-auto">
            <label className="block text-sm font-medium text-gray-700 mb-3 text-left">
              Try searching for what you need
            </label>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products, categories..."
                  className="w-full bg-white border border-gray-200 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:border-gray-400 transition-all"
                />
              </div>
              <button className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-all font-medium">
                Search
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/" className="group bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-all font-medium flex items-center justify-center space-x-2">
              <Home className="w-5 h-5" />
              <span>Back to Home</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="bg-white border border-gray-200 text-gray-900 px-8 py-3 rounded-lg hover:bg-gray-50 transition-all font-medium flex items-center justify-center space-x-2">
              <ShoppingBag className="w-5 h-5" />
              <span>Continue Shopping</span>
            </button>
          </div>

          {/* Popular Links */}
          <div className="border-t border-gray-200 pt-12">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-6">
              Popular Pages
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <button className="bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-300 hover:shadow-sm transition-all text-left group">
                <div className="text-gray-900 font-medium mb-1 group-hover:text-gray-600 transition-colors">
                  New Arrivals
                </div>
                <div className="text-xs text-gray-500">Latest products</div>
              </button>
              <button className="bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-300 hover:shadow-sm transition-all text-left group">
                <div className="text-gray-900 font-medium mb-1 group-hover:text-gray-600 transition-colors">
                  Best Sellers
                </div>
                <div className="text-xs text-gray-500">Top rated items</div>
              </button>
              <button className="bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-300 hover:shadow-sm transition-all text-left group">
                <div className="text-gray-900 font-medium mb-1 group-hover:text-gray-600 transition-colors">
                  Sale
                </div>
                <div className="text-xs text-gray-500">Special offers</div>
              </button>
              <button className="bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-300 hover:shadow-sm transition-all text-left group">
                <div className="text-gray-900 font-medium mb-1 group-hover:text-gray-600 transition-colors">
                  Collections
                </div>
                <div className="text-xs text-gray-500">Curated picks</div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className="bg-white border-t border-gray-200">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-light text-gray-900 mb-2">
                Need Help?
              </h3>
              <p className="text-gray-600">
                Our support team is here to assist you
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button className="flex flex-col items-center space-y-2 p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
                <Mail className="w-6 h-6 text-gray-700" />
                <span className="text-sm font-medium text-gray-900">Contact Support</span>
                <span className="text-xs text-gray-500">support@minimal.com</span>
              </button>
              <button className="flex flex-col items-center space-y-2 p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
                <HelpCircle className="w-6 h-6 text-gray-700" />
                <span className="text-sm font-medium text-gray-900">Help Center</span>
                <span className="text-xs text-gray-500">FAQs & Guides</span>
              </button>
              <button className="flex flex-col items-center space-y-2 p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
                <ShoppingBag className="w-6 h-6 text-gray-700" />
                <span className="text-sm font-medium text-gray-900">Track Order</span>
                <span className="text-xs text-gray-500">Check status</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              © 2024 Minimal Store. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <button className="hover:text-white transition-colors">Privacy</button>
              <button className="hover:text-white transition-colors">Terms</button>
              <button className="hover:text-white transition-colors">Contact</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}