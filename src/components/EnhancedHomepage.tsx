import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Star, Truck, Shield, Headphones, ArrowRight, Zap, Award, Users } from 'lucide-react';
import ProductCard from './ui/ProductCard';
import SkeletonLoader from './ui/SkeletonLoader';
import AnimatedButton from './ui/AnimatedButton';

interface EnhancedHomepageProps {
  onViewProduct: (product: any) => void;
  onSearch: (query: string) => void;
  onAddToCart: (product: any) => void;
}

const EnhancedHomepage: React.FC<EnhancedHomepageProps> = ({ onViewProduct, onSearch, onAddToCart }) => {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const categories = [
    {
      name: "Electronics",
      image: "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=400",
      count: "2,500+ items",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      name: "Fashion",
      image: "https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=400",
      count: "5,200+ items",
      gradient: "from-pink-500 to-rose-600"
    },
    {
      name: "Home & Garden",
      image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400",
      count: "3,800+ items",
      gradient: "from-green-500 to-emerald-600"
    },
    {
      name: "Books",
      image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400",
      count: "12,000+ items",
      gradient: "from-amber-500 to-orange-600"
    },
    {
      name: "Sports",
      image: "https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=400",
      count: "1,900+ items",
      gradient: "from-red-500 to-pink-600"
    },
    {
      name: "Beauty",
      image: "https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=400",
      count: "2,100+ items",
      gradient: "from-purple-500 to-indigo-600"
    }
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "Wireless Noise-Canceling Headphones Pro",
      brand: "TechSound",
      price: 299.99,
      originalPrice: 399.99,
      rating: 4.8,
      reviews: 2847,
      image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400",
      badge: "Best Seller",
      inStock: true
    },
    {
      id: 2,
      name: "Smart Fitness Watch Series 5",
      brand: "FitTech",
      price: 249.99,
      originalPrice: 329.99,
      rating: 4.6,
      reviews: 1923,
      image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400",
      badge: "25% Off",
      inStock: true
    },
    {
      id: 3,
      name: "Premium Coffee Maker with Grinder",
      brand: "BrewMaster",
      price: 189.99,
      originalPrice: 249.99,
      rating: 4.7,
      reviews: 856,
      image: "https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=400",
      badge: "New Arrival",
      inStock: true
    },
    {
      id: 4,
      name: "Ergonomic Office Chair Premium",
      brand: "ComfortSeating",
      price: 399.99,
      originalPrice: 499.99,
      rating: 4.5,
      reviews: 634,
      image: "https://images.pexels.com/photos/586996/pexels-photo-586996.jpeg?auto=compress&cs=tinysrgb&w=400",
      badge: "Limited Time",
      inStock: true
    }
  ];

  const deals = [
    {
      id: 5,
      name: "Bluetooth Speaker Pro",
      price: 79.99,
      originalPrice: 129.99,
      discount: 38,
      image: "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=300",
      timeLeft: "2h 15m",
      inStock: true
    },
    {
      id: 6,
      name: "Adjustable Laptop Stand",
      price: 45.99,
      originalPrice: 69.99,
      discount: 34,
      image: "https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=300",
      timeLeft: "5h 42m",
      inStock: true
    },
    {
      id: 7,
      name: "Wireless Gaming Mouse",
      price: 29.99,
      originalPrice: 49.99,
      discount: 40,
      image: "https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=300",
      timeLeft: "1h 33m",
      inStock: true
    }
  ];

  const stats = [
    { icon: Users, value: "2M+", label: "Happy Customers" },
    { icon: Award, value: "50K+", label: "Products" },
    { icon: Truck, value: "24/7", label: "Fast Delivery" },
    { icon: Shield, value: "100%", label: "Secure" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="h-96 bg-gray-100 dark:bg-gray-800 rounded-2xl">
          <SkeletonLoader height="100%" />
        </div>
        <div className="max-w-7xl mx-auto px-4 space-y-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <SkeletonLoader height="200px" />
                <SkeletonLoader variant="text" lines={2} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section */}
      <motion.section
        className="relative h-96 bg-gradient-to-r from-primary via-primary-dark to-purple-700 overflow-hidden rounded-2xl mx-4"
        variants={itemVariants}
      >
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 2,
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <motion.div
            className="text-white max-w-2xl"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <motion.h1
              className="text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              Summer Electronics Sale
            </motion.h1>
            <motion.p
              className="text-xl mb-6 text-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              Up to 50% off on latest gadgets and accessories
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
            >
              <AnimatedButton
                variant="secondary"
                size="lg"
                icon={ArrowRight}
                iconPosition="right"
                onClick={() => onSearch('electronics')}
              >
                Shop Now
              </AnimatedButton>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <div className="max-w-7xl mx-auto px-4 space-y-12">
        {/* Stats Section */}
        <motion.section variants={itemVariants}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Icon className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Categories Grid */}
        <motion.section variants={itemVariants}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Shop by Category</h2>
              <p className="text-gray-600 dark:text-gray-400">Discover our wide range of products</p>
            </div>
            <AnimatedButton
              variant="ghost"
              icon={ChevronRight}
              iconPosition="right"
            >
              View All
            </AnimatedButton>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                onClick={() => onSearch(category.name)}
                className="group cursor-pointer bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg transition-all duration-200"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="relative aspect-square rounded-lg overflow-hidden mb-3">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient} opacity-20 group-hover:opacity-30 transition-opacity`} />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{category.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{category.count}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Featured Products */}
        <motion.section variants={itemVariants}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Featured Products</h2>
              <p className="text-gray-600 dark:text-gray-400">Hand-picked favorites just for you</p>
            </div>
            <AnimatedButton
              variant="ghost"
              icon={ChevronRight}
              iconPosition="right"
            >
              View All
            </AnimatedButton>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard
                  product={product}
                  onViewProduct={onViewProduct}
                  onAddToCart={onAddToCart}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Today's Deals */}
        <motion.section
          className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl p-6"
          variants={itemVariants}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                <Zap className="w-6 h-6 text-orange-500 mr-2" />
                Today's Deals
              </h2>
              <p className="text-gray-600 dark:text-gray-400">Limited time offers - Don't miss out!</p>
            </div>
            <AnimatedButton
              variant="outline"
              icon={ChevronRight}
              iconPosition="right"
            >
              View All Deals
            </AnimatedButton>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {deals.map((deal, index) => (
              <motion.div
                key={deal.id}
                onClick={() => onViewProduct(deal)}
                className="group cursor-pointer bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-200"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={deal.image}
                    alt={deal.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                      -{deal.discount}%
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                    {deal.timeLeft} left
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{deal.name}</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-red-600">${deal.price}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 line-through">${deal.originalPrice}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Trust Indicators */}
        <motion.section
          className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8"
          variants={itemVariants}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Truck, title: "Free Shipping", desc: "Free shipping on orders over $35", color: "blue" },
              { icon: Shield, title: "Secure Payment", desc: "Your payment information is safe", color: "green" },
              { icon: Headphones, title: "24/7 Support", desc: "Get help whenever you need it", color: "purple" }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className={`w-16 h-16 bg-${item.color}-100 dark:bg-${item.color}-900/20 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Icon className={`w-8 h-8 text-${item.color}-600`} />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default EnhancedHomepage;