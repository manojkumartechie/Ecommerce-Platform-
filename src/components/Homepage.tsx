import React from 'react';
import { ChevronRight, Star, Truck, Shield, Headphones, ArrowRight } from 'lucide-react';

interface HomepageProps {
  onViewProduct: (product: any) => void;
  onSearch: (query: string) => void;
}

const Homepage: React.FC<HomepageProps> = ({ onViewProduct, onSearch }) => {
  const heroSlides = [
    {
      title: "Summer Electronics Sale",
      subtitle: "Up to 50% off on latest gadgets",
      image: "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=1200",
      cta: "Shop Now"
    },
    {
      title: "Fashion Forward",
      subtitle: "New arrivals for the season",
      image: "https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=1200",
      cta: "Explore Collection"
    }
  ];

  const categories = [
    {
      name: "Electronics",
      image: "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=400",
      count: "2,500+ items"
    },
    {
      name: "Fashion",
      image: "https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=400",
      count: "5,200+ items"
    },
    {
      name: "Home & Garden",
      image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400",
      count: "3,800+ items"
    },
    {
      name: "Books",
      image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400",
      count: "12,000+ items"
    },
    {
      name: "Sports",
      image: "https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=400",
      count: "1,900+ items"
    },
    {
      name: "Beauty",
      image: "https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=400",
      count: "2,100+ items"
    }
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "Wireless Noise-Canceling Headphones",
      price: 299.99,
      originalPrice: 399.99,
      rating: 4.8,
      reviews: 2847,
      image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400",
      badge: "Best Seller"
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 249.99,
      originalPrice: 329.99,
      rating: 4.6,
      reviews: 1923,
      image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400",
      badge: "25% Off"
    },
    {
      id: 3,
      name: "Premium Coffee Maker",
      price: 189.99,
      originalPrice: 249.99,
      rating: 4.7,
      reviews: 856,
      image: "https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=400",
      badge: "New Arrival"
    },
    {
      id: 4,
      name: "Ergonomic Office Chair",
      price: 399.99,
      originalPrice: 499.99,
      rating: 4.5,
      reviews: 634,
      image: "https://images.pexels.com/photos/586996/pexels-photo-586996.jpeg?auto=compress&cs=tinysrgb&w=400",
      badge: "Limited Time"
    }
  ];

  const deals = [
    {
      id: 5,
      name: "Bluetooth Speaker",
      price: 79.99,
      originalPrice: 129.99,
      discount: 38,
      image: "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=300",
      timeLeft: "2h 15m"
    },
    {
      id: 6,
      name: "Laptop Stand",
      price: 45.99,
      originalPrice: 69.99,
      discount: 34,
      image: "https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=300",
      timeLeft: "5h 42m"
    },
    {
      id: 7,
      name: "Wireless Mouse",
      price: 29.99,
      originalPrice: 49.99,
      discount: 40,
      image: "https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=300",
      timeLeft: "1h 33m"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-blue-600 to-purple-700 overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-5xl font-bold mb-4">Summer Electronics Sale</h1>
            <p className="text-xl mb-6 text-gray-200">Up to 50% off on latest gadgets and accessories</p>
            <button 
              onClick={() => onSearch('electronics')}
              className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
            >
              <span>Shop Now</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 space-y-12">
        {/* Categories Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Shop by Category</h2>
            <button className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center space-x-1">
              <span>View All</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <div
                key={category.name}
                onClick={() => onSearch(category.name)}
                className="group cursor-pointer bg-white rounded-xl border border-gray-200 p-4 hover:shadow-lg transition-all duration-200"
              >
                <div className="aspect-square rounded-lg overflow-hidden mb-3">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.count}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
            <button className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center space-x-1">
              <span>View All</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => onViewProduct(product)}
                className="group cursor-pointer bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      {product.badge}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center space-x-1 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({product.reviews})</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900">${product.price}</span>
                    <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Today's Deals */}
        <section className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Today's Deals</h2>
              <p className="text-gray-600">Limited time offers - Don't miss out!</p>
            </div>
            <button className="text-orange-600 hover:text-orange-700 font-medium inline-flex items-center space-x-1">
              <span>View All Deals</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {deals.map((deal) => (
              <div
                key={deal.id}
                onClick={() => onViewProduct(deal)}
                className="group cursor-pointer bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={deal.image}
                    alt={deal.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
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
                  <h3 className="font-semibold text-gray-900 mb-2">{deal.name}</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-red-600">${deal.price}</span>
                    <span className="text-sm text-gray-500 line-through">${deal.originalPrice}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="bg-white rounded-2xl border border-gray-200 p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Free Shipping</h3>
              <p className="text-gray-600">Free shipping on orders over $35</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Secure Payment</h3>
              <p className="text-gray-600">Your payment information is safe</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600">Get help whenever you need it</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Homepage;