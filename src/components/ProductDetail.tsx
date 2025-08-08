import React, { useState } from 'react';
import { 
  Star, 
  Heart, 
  Share2, 
  Truck, 
  Shield, 
  RotateCcw, 
  ChevronLeft,
  Plus,
  Minus,
  ShoppingCart,
  Zap
} from 'lucide-react';

interface ProductDetailProps {
  product: any;
  onAddToCart: (product: any, quantity: number, variant?: string) => void;
  onBack: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onAddToCart, onBack }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState('');
  const [activeTab, setActiveTab] = useState('description');

  const images = [
    product.image,
    "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/3394651/pexels-photo-3394651.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/3394652/pexels-photo-3394652.jpeg?auto=compress&cs=tinysrgb&w=600"
  ];

  const variants = ['Black', 'White', 'Silver', 'Blue'];

  const reviews = [
    {
      id: 1,
      user: "John D.",
      rating: 5,
      date: "2024-01-15",
      title: "Excellent quality!",
      comment: "This product exceeded my expectations. Great build quality and works perfectly.",
      verified: true
    },
    {
      id: 2,
      user: "Sarah M.",
      rating: 4,
      date: "2024-01-10",
      title: "Good value for money",
      comment: "Really happy with this purchase. Fast delivery and exactly as described.",
      verified: true
    },
    {
      id: 3,
      user: "Mike R.",
      rating: 5,
      date: "2024-01-08",
      title: "Highly recommend",
      comment: "Outstanding product! I've been using it for weeks and it's been perfect.",
      verified: false
    }
  ];

  const relatedProducts = [
    {
      id: 10,
      name: "Wireless Charging Pad",
      price: 29.99,
      image: "https://images.pexels.com/photos/4219654/pexels-photo-4219654.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 4.3
    },
    {
      id: 11,
      name: "Phone Case Premium",
      price: 19.99,
      image: "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 4.6
    },
    {
      id: 12,
      name: "USB-C Cable",
      price: 12.99,
      image: "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 4.4
    }
  ];

  const handleAddToCart = () => {
    onAddToCart(product, quantity, selectedVariant);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
        <button onClick={onBack} className="flex items-center space-x-1 hover:text-gray-900">
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Products</span>
        </button>
        <span>/</span>
        <span>{product.category}</span>
        <span>/</span>
        <span className="text-gray-900">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
            <img
              src={images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square rounded-lg overflow-hidden border-2 ${
                  selectedImage === index ? 'border-blue-600' : 'border-gray-200'
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <p className="text-blue-600 font-medium mb-2">{product.brand}</p>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="text-lg font-medium text-gray-900">{product.rating}</span>
              </div>
              <span className="text-gray-600">({product.reviews} reviews)</span>
            </div>
          </div>

          <div className="border-t border-b border-gray-200 py-6">
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-3xl font-bold text-gray-900">${product.price}</span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-medium">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </span>
                </>
              )}
            </div>
            <p className="text-green-600 font-medium">In Stock</p>
          </div>

          {/* Variants */}
          {variants.length > 0 && (
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Color: {selectedVariant || 'Select'}</h3>
              <div className="flex space-x-2">
                {variants.map((variant) => (
                  <button
                    key={variant}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-4 py-2 border rounded-lg font-medium transition-colors ${
                      selectedVariant === variant
                        ? 'border-blue-600 bg-blue-50 text-blue-600'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {variant}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Quantity</h3>
            <div className="flex items-center space-x-3">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-gray-50"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-gray-50"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <span className="text-gray-600">({product.stock || 10} available)</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleAddToCart}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Add to Cart</span>
            </button>
            <button className="w-full bg-orange-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center space-x-2">
              <Zap className="w-5 h-5" />
              <span>Buy Now</span>
            </button>
            <div className="flex space-x-3">
              <button className="flex-1 border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                <Heart className="w-4 h-4" />
                <span>Add to Wishlist</span>
              </button>
              <button className="flex-1 border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>
          </div>

          {/* Features */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex items-center space-x-3">
              <Truck className="w-5 h-5 text-green-600" />
              <span className="text-sm">Free shipping on orders over $35</span>
            </div>
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-blue-600" />
              <span className="text-sm">2-year warranty included</span>
            </div>
            <div className="flex items-center space-x-3">
              <RotateCcw className="w-5 h-5 text-purple-600" />
              <span className="text-sm">30-day return policy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mb-12">
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            {['description', 'specifications', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          {activeTab === 'description' && (
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                Experience premium audio quality with our latest wireless headphones. Featuring advanced noise-canceling technology, 
                these headphones deliver crystal-clear sound while blocking out unwanted ambient noise.
              </p>
              <h4 className="font-semibold text-gray-900 mb-2">Key Features:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Active noise cancellation technology</li>
                <li>30-hour battery life with quick charge</li>
                <li>Premium comfort with memory foam ear cups</li>
                <li>Bluetooth 5.0 connectivity</li>
                <li>Built-in microphone for hands-free calls</li>
              </ul>
            </div>
          )}

          {activeTab === 'specifications' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Technical Specifications</h4>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Brand:</dt>
                    <dd className="font-medium">{product.brand}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Model:</dt>
                    <dd className="font-medium">WH-1000XM5</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Weight:</dt>
                    <dd className="font-medium">250g</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Battery Life:</dt>
                    <dd className="font-medium">30 hours</dd>
                  </div>
                </dl>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Connectivity</h4>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Bluetooth:</dt>
                    <dd className="font-medium">5.0</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Range:</dt>
                    <dd className="font-medium">10 meters</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Charging Port:</dt>
                    <dd className="font-medium">USB-C</dd>
                  </div>
                </dl>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-gray-900">Customer Reviews</h4>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Write a Review
                </button>
              </div>
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">{review.user}</span>
                        {review.verified && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            Verified Purchase
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-gray-600">{review.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-medium text-gray-900">{review.title}</span>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedProducts.map((relatedProduct) => (
            <div key={relatedProduct.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square overflow-hidden">
                <img
                  src={relatedProduct.image}
                  alt={relatedProduct.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{relatedProduct.name}</h3>
                <div className="flex items-center space-x-2 mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(relatedProduct.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({relatedProduct.rating})</span>
                </div>
                <p className="text-lg font-bold text-gray-900">${relatedProduct.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;