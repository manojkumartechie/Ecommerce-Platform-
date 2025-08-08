import React, { useState } from 'react';
import { Filter, Grid, List, Star, Heart, ShoppingCart } from 'lucide-react';

interface ProductListingProps {
  searchQuery: string;
  onViewProduct: (product: any) => void;
  onAddToCart: (product: any) => void;
}

const ProductListing: React.FC<ProductListingProps> = ({ 
  searchQuery, 
  onViewProduct, 
  onAddToCart 
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('relevance');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState(0);

  const products = [
    {
      id: 1,
      name: "Wireless Noise-Canceling Headphones Pro",
      brand: "TechSound",
      price: 299.99,
      originalPrice: 399.99,
      rating: 4.8,
      reviews: 2847,
      image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Electronics",
      inStock: true,
      freeShipping: true,
      prime: true
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
      category: "Electronics",
      inStock: true,
      freeShipping: true,
      prime: false
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
      category: "Home & Kitchen",
      inStock: true,
      freeShipping: false,
      prime: true
    },
    {
      id: 4,
      name: "Ergonomic Office Chair with Lumbar Support",
      brand: "ComfortSeating",
      price: 399.99,
      originalPrice: 499.99,
      rating: 4.5,
      reviews: 634,
      image: "https://images.pexels.com/photos/586996/pexels-photo-586996.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Furniture",
      inStock: false,
      freeShipping: true,
      prime: false
    },
    {
      id: 5,
      name: "Bluetooth Portable Speaker",
      brand: "SoundWave",
      price: 79.99,
      originalPrice: 129.99,
      rating: 4.4,
      reviews: 1247,
      image: "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Electronics",
      inStock: true,
      freeShipping: true,
      prime: true
    },
    {
      id: 6,
      name: "Adjustable Laptop Stand",
      brand: "DeskTech",
      price: 45.99,
      originalPrice: 69.99,
      rating: 4.3,
      reviews: 892,
      image: "https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400",
      category: "Electronics",
      inStock: true,
      freeShipping: false,
      prime: false
    }
  ];

  const brands = ['TechSound', 'FitTech', 'BrewMaster', 'ComfortSeating', 'SoundWave', 'DeskTech'];
  const categories = ['Electronics', 'Home & Kitchen', 'Furniture', 'Fashion', 'Books'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    const matchesRating = selectedRating === 0 || product.rating >= selectedRating;
    
    return matchesSearch && matchesPrice && matchesBrand && matchesRating;
  });

  const ProductCard = ({ product }: { product: any }) => (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 group">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
        <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
          <Heart className="w-4 h-4 text-gray-600" />
        </button>
        {product.prime && (
          <div className="absolute top-3 left-3">
            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded font-medium">
              Prime
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-600 mb-1">{product.brand}</p>
        <h3 
          onClick={() => onViewProduct(product)}
          className="font-semibold text-gray-900 mb-2 line-clamp-2 cursor-pointer hover:text-blue-600 transition-colors"
        >
          {product.name}
        </h3>
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
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-lg font-bold text-gray-900">${product.price}</span>
          {product.originalPrice > product.price && (
            <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
          )}
        </div>
        {product.freeShipping && (
          <p className="text-sm text-green-600 mb-2">Free shipping</p>
        )}
        <div className="flex space-x-2">
          <button
            onClick={() => onAddToCart(product)}
            disabled={!product.inStock}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
              product.inStock
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            {product.inStock ? (
              <span className="flex items-center justify-center space-x-1">
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </span>
            ) : (
              'Out of Stock'
            )}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className="lg:w-64 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </h3>
            
            {/* Price Range */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>

            {/* Brands */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-900 mb-3">Brand</h4>
              <div className="space-y-2">
                {brands.map((brand) => (
                  <label key={brand} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedBrands([...selectedBrands, brand]);
                        } else {
                          setSelectedBrands(selectedBrands.filter(b => b !== brand));
                        }
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-900 mb-3">Customer Rating</h4>
              <div className="space-y-2">
                {[4, 3, 2, 1].map((rating) => (
                  <label key={rating} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="rating"
                      value={rating}
                      checked={selectedRating === rating}
                      onChange={() => setSelectedRating(rating)}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="text-sm text-gray-600">& up</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {searchQuery ? `Results for "${searchQuery}"` : 'All Products'}
              </h1>
              <p className="text-gray-600">{filteredProducts.length} products found</p>
            </div>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="relevance">Sort by Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
                <option value="newest">Newest First</option>
              </select>
              <div className="flex border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
              <button
                onClick={() => {
                  setPriceRange([0, 1000]);
                  setSelectedBrands([]);
                  setSelectedRating(0);
                }}
                className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListing;