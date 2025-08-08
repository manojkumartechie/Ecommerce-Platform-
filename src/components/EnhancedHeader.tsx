import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
import ThemeToggle from './ui/ThemeToggle';
import CartFlyout from './ui/CartFlyout';
import AnimatedButton from './ui/AnimatedButton';

type ViewType = 'home' | 'products' | 'product-detail' | 'cart' | 'checkout' | 'account' | 'admin';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  variant?: string;
}

interface EnhancedHeaderProps {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  cartItems: CartItem[];
  onSearch: (query: string) => void;
  onUpdateQuantity: (id: number, variant: string | undefined, quantity: number) => void;
  onRemoveItem: (id: number, variant?: string) => void;
  onCheckout: () => void;
  isLoggedIn: boolean;
  isAdmin: boolean;
}

const EnhancedHeader: React.FC<EnhancedHeaderProps> = ({ 
  currentView, 
  setCurrentView, 
  cartItems,
  onSearch,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  isLoggedIn,
  isAdmin
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showCartFlyout, setShowCartFlyout] = useState(false);

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  const categories = [
    'Electronics', 'Fashion', 'Home & Garden', 'Books', 'Sports', 'Beauty', 'Automotive'
  ];

  const headerVariants = {
    hidden: { y: -100 },
    visible: { 
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 20 }
    }
  };

  const logoVariants = {
    hover: { 
      scale: 1.05,
      transition: { type: 'spring', stiffness: 400, damping: 10 }
    }
  };

  return (
    <>
      <motion.header
        className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95"
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Top Header */}
        <div className="bg-gray-900 dark:bg-gray-800 text-white text-xs py-1">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Free shipping on orders over $35
            </motion.span>
            <div className="flex items-center space-x-4">
              <motion.span
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                Customer Service
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                Track Your Order
              </motion.span>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => setCurrentView('home')}
              variants={logoVariants}
              whileHover="hover"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent hidden sm:block">
                ZohoCommerce
              </span>
            </motion.div>

            {/* Location */}
            <div className="hidden lg:flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
              <MapPin className="w-4 h-4" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-500">Deliver to</p>
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
                  className="w-full pl-4 pr-12 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
                <motion.button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Search className="w-4 h-4" />
                </motion.button>
              </div>
            </form>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Wishlist */}
              <motion.button 
                className="hidden sm:flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart className="w-5 h-5" />
                <span className="text-sm">Wishlist</span>
              </motion.button>

              {/* User Account */}
              <div className="relative">
                <motion.button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <User className="w-5 h-5" />
                  <div className="hidden sm:block text-left">
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      Hello, {isLoggedIn ? 'John' : 'Sign in'}
                    </p>
                    <p className="text-sm font-medium">Account & Lists</p>
                  </div>
                </motion.button>

                {showUserMenu && (
                  <motion.div
                    className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {!isLoggedIn ? (
                      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                        <AnimatedButton
                          onClick={() => setCurrentView('account')}
                          variant="primary"
                          className="w-full"
                        >
                          Sign In
                        </AnimatedButton>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 text-center">
                          New customer? <span className="text-primary cursor-pointer">Start here</span>
                        </p>
                      </div>
                    ) : (
                      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                        <p className="font-medium text-gray-900 dark:text-white">Hello, John</p>
                      </div>
                    )}
                    
                    <div className="py-1">
                      <button 
                        onClick={() => setCurrentView('account')}
                        className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-2"
                      >
                        <User className="w-4 h-4" />
                        <span>Your Account</span>
                      </button>
                      <button className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-2">
                        <Package className="w-4 h-4" />
                        <span>Your Orders</span>
                      </button>
                      <button className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-2">
                        <Heart className="w-4 h-4" />
                        <span>Your Wishlist</span>
                      </button>
                      {isAdmin && (
                        <button 
                          onClick={() => setCurrentView('admin')}
                          className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-2"
                        >
                          <Shield className="w-4 h-4" />
                          <span>Admin Dashboard</span>
                        </button>
                      )}
                      {isLoggedIn && (
                        <>
                          <hr className="my-1" />
                          <button className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-2">
                            <LogOut className="w-4 h-4" />
                            <span>Sign Out</span>
                          </button>
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Cart */}
              <motion.button
                onClick={() => setShowCartFlyout(true)}
                className="relative flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <motion.span
                    className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  >
                    {cartItemCount}
                  </motion.span>
                )}
                <div className="hidden sm:block text-left">
                  <p className="text-xs text-gray-500 dark:text-gray-500">Cart</p>
                  <p className="text-sm font-medium">{cartItemCount} items</p>
                </div>
              </motion.button>

              {/* Mobile Menu */}
              <motion.button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="lg:hidden p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Menu className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Category Navigation */}
        <div className="bg-gray-800 dark:bg-gray-700 text-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center space-x-6 py-2 overflow-x-auto">
              <motion.button 
                className="whitespace-nowrap text-sm hover:text-gray-300 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                All Categories
              </motion.button>
              {categories.map((category, index) => (
                <motion.button
                  key={category}
                  onClick={() => onSearch(category)}
                  className="whitespace-nowrap text-sm hover:text-gray-300 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {category}
                </motion.button>
              ))}
              <motion.button 
                className="whitespace-nowrap text-sm text-yellow-400 hover:text-yellow-300 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                Today's Deals
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <motion.div
            className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="px-4 py-2 space-y-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    onSearch(category);
                    setShowMobileMenu(false);
                  }}
                  className="block w-full text-left py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </motion.header>

      {/* Cart Flyout */}
      <CartFlyout
        isOpen={showCartFlyout}
        onClose={() => setShowCartFlyout(false)}
        items={cartItems}
        onUpdateQuantity={onUpdateQuantity}
        onRemoveItem={onRemoveItem}
        onCheckout={onCheckout}
      />
    </>
  );
};

export default EnhancedHeader;