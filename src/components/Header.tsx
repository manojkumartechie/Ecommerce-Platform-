import React, { useState } from 'react';
import { 
  Search, 
  ShoppingCart, 
  User, 
  Menu, 
  MapPin, 
  Heart,
  Package,
  Settings,
  LogOut,
  Shield
} from 'lucide-react';

type ViewType = 'home' | 'products' | 'product-detail' | 'cart' | 'checkout' | 'account' | 'admin';

interface HeaderProps {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  cartItemCount: number;
  onSearch: (query: string) => void;
  isLoggedIn: boolean;
  isAdmin: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  currentView, 
  setCurrentView, 
  cartItemCount, 
  onSearch,
  isLoggedIn,
  isAdmin
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  const categories = [
    'Electronics', 'Fashion', 'Home & Garden', 'Books', 'Sports', 'Beauty', 'Automotive'
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Top Header */}
      <div className="bg-gray-900 text-white text-xs py-1">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <span>Free shipping on orders over $35</span>
          <div className="flex items-center space-x-4">
            <span>Customer Service</span>
            <span>Track Your Order</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setCurrentView('home')}
          >
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:block">EcommerceHub</span>
          </div>

          {/* Location */}
          <div className="hidden lg:flex items-center space-x-1 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <div>
              <p className="text-xs text-gray-500">Deliver to</p>
              <p className="font-medium">New York 10001</p>
            </div>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                className="w-full pl-4 pr-12 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Wishlist */}
            <button className="hidden sm:flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors">
              <Heart className="w-5 h-5" />
              <span className="text-sm">Wishlist</span>
            </button>

            {/* User Account */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <User className="w-5 h-5" />
                <div className="hidden sm:block text-left">
                  <p className="text-xs text-gray-500">Hello, {isLoggedIn ? 'John' : 'Sign in'}</p>
                  <p className="text-sm font-medium">Account & Lists</p>
                </div>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  {!isLoggedIn ? (
                    <div className="px-4 py-3 border-b border-gray-200">
                      <button 
                        onClick={() => setCurrentView('account')}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Sign In
                      </button>
                      <p className="text-xs text-gray-600 mt-2 text-center">
                        New customer? <span className="text-blue-600 cursor-pointer">Start here</span>
                      </p>
                    </div>
                  ) : (
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="font-medium text-gray-900">Hello, John</p>
                    </div>
                  )}
                  
                  <div className="py-1">
                    <button 
                      onClick={() => setCurrentView('account')}
                      className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                    >
                      <User className="w-4 h-4" />
                      <span>Your Account</span>
                    </button>
                    <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                      <Package className="w-4 h-4" />
                      <span>Your Orders</span>
                    </button>
                    <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                      <Heart className="w-4 h-4" />
                      <span>Your Wishlist</span>
                    </button>
                    {isAdmin && (
                      <button 
                        onClick={() => setCurrentView('admin')}
                        className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                      >
                        <Shield className="w-4 h-4" />
                        <span>Admin Dashboard</span>
                      </button>
                    )}
                    {isLoggedIn && (
                      <>
                        <hr className="my-1" />
                        <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Cart */}
            <button
              onClick={() => setCurrentView('cart')}
              className="relative flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
              <div className="hidden sm:block text-left">
                <p className="text-xs text-gray-500">Cart</p>
                <p className="text-sm font-medium">{cartItemCount} items</p>
              </div>
            </button>

            {/* Mobile Menu */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center space-x-6 py-2 overflow-x-auto">
            <button className="whitespace-nowrap text-sm hover:text-gray-300 transition-colors">
              All Categories
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  onSearch(category);
                }}
                className="whitespace-nowrap text-sm hover:text-gray-300 transition-colors"
              >
                {category}
              </button>
            ))}
            <button className="whitespace-nowrap text-sm text-yellow-400 hover:text-yellow-300 transition-colors">
              Today's Deals
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-2 space-y-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  onSearch(category);
                  setShowMobileMenu(false);
                }}
                className="block w-full text-left py-2 text-gray-700 hover:text-gray-900"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;