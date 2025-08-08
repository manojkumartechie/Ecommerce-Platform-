import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import AnimatedButton from './AnimatedButton';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    rating: number;
    reviews: number;
    image: string;
    badge?: string;
    inStock?: boolean;
  };
  onViewProduct: (product: any) => void;
  onAddToCart: (product: any) => void;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onViewProduct,
  onAddToCart,
  className = ''
}) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: { 
      y: -8,
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  };

  const imageVariants = {
    hover: { scale: 1.1 }
  };

  const overlayVariants = {
    initial: { opacity: 0 },
    hover: { opacity: 1 }
  };

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      className={`group bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-2xl transition-shadow duration-300 ${className}`}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-700">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse" />
        )}
        
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          variants={imageVariants}
          onLoad={() => setImageLoaded(true)}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {product.badge && (
            <motion.span
              className="bg-primary text-white text-xs px-2 py-1 rounded-full font-medium shadow-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              {product.badge}
            </motion.span>
          )}
          {discount > 0 && (
            <motion.span
              className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              -{discount}%
            </motion.span>
          )}
        </div>

        {/* Wishlist Button */}
        <motion.button
          className="absolute top-3 right-3 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-shadow"
          onClick={(e) => {
            e.stopPropagation();
            setIsWishlisted(!isWishlisted);
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart 
            className={`w-4 h-4 transition-colors ${
              isWishlisted 
                ? 'text-red-500 fill-current' 
                : 'text-gray-600 dark:text-gray-400'
            }`} 
          />
        </motion.button>

        {/* Hover Overlay */}
        <motion.div
          className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center space-x-3"
          variants={overlayVariants}
        >
          <AnimatedButton
            variant="secondary"
            size="sm"
            icon={Eye}
            onClick={(e) => {
              e.stopPropagation();
              onViewProduct(product);
            }}
          >
            Quick View
          </AnimatedButton>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div>
          <h3 
            className="font-semibold text-gray-900 dark:text-white line-clamp-2 cursor-pointer hover:text-primary transition-colors"
            onClick={() => onViewProduct(product)}
          >
            {product.name}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center space-x-1 mt-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300 dark:text-gray-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              ({product.reviews})
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            ${product.price}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <AnimatedButton
          variant="primary"
          size="sm"
          icon={ShoppingCart}
          onClick={() => onAddToCart(product)}
          disabled={!product.inStock}
          className="w-full"
        >
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </AnimatedButton>
      </div>
    </motion.div>
  );
};

export default ProductCard;