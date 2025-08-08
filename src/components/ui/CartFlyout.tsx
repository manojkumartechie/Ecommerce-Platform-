import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';
import AnimatedButton from './AnimatedButton';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  variant?: string;
}

interface CartFlyoutProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, variant: string | undefined, quantity: number) => void;
  onRemoveItem: (id: number, variant?: string) => void;
  onCheckout: () => void;
}

const CartFlyout: React.FC<CartFlyoutProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 35 ? 0 : 5.99;
  const total = subtotal + shipping;

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const flyoutVariants = {
    hidden: { x: '100%' },
    visible: { 
      x: 0,
      transition: { type: 'spring', damping: 25, stiffness: 200 }
    },
    exit: { 
      x: '100%',
      transition: { duration: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1 }
    }),
    exit: { opacity: 0, x: 20 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />

          {/* Flyout */}
          <motion.div
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl z-50 flex flex-col"
            variants={flyoutVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <ShoppingCart className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Shopping Cart ({items.length})
                </h2>
              </div>
              <motion.button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </motion.button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <ShoppingCart className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">Your cart is empty</p>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <motion.div
                      key={`${item.id}-${item.variant}`}
                      className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      custom={index}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 dark:text-white truncate">
                          {item.name}
                        </h3>
                        {item.variant && (
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {item.variant}
                          </p>
                        )}
                        <p className="text-lg font-bold text-primary">
                          ${item.price}
                        </p>
                      </div>

                      <div className="flex flex-col items-end space-y-2">
                        <div className="flex items-center space-x-2">
                          <motion.button
                            onClick={() => onUpdateQuantity(item.id, item.variant, item.quantity - 1)}
                            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Minus className="w-4 h-4" />
                          </motion.button>
                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          <motion.button
                            onClick={() => onUpdateQuantity(item.id, item.variant, item.quantity + 1)}
                            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Plus className="w-4 h-4" />
                          </motion.button>
                        </div>
                        
                        <motion.button
                          onClick={() => onRemoveItem(item.id, item.variant)}
                          className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <motion.div
                className="border-t border-gray-200 dark:border-gray-700 p-6 space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t border-gray-200 dark:border-gray-700 pt-2">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <AnimatedButton
                  variant="primary"
                  size="lg"
                  onClick={() => {
                    onCheckout();
                    onClose();
                  }}
                  className="w-full"
                >
                  Checkout
                </AnimatedButton>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartFlyout;