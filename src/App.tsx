import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import EnhancedHeader from './components/EnhancedHeader';
import EnhancedHomepage from './components/EnhancedHomepage';
import ProductListing from './components/ProductListing';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import UserAccount from './components/UserAccount';
import AdminDashboard from './components/AdminDashboard';
import { motion, AnimatePresence } from 'framer-motion';

type ViewType = 'home' | 'products' | 'product-detail' | 'cart' | 'checkout' | 'account' | 'admin';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  variant?: string;
}

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const addToCart = (product: any, quantity: number = 1, variant?: string) => {
    const existingItem = cartItems.find(item => 
      item.id === product.id && item.variant === variant
    );

    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id && item.variant === variant
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCartItems([...cartItems, {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity,
        variant
      }]);
    }
  };

  const updateCartQuantity = (id: number, variant: string | undefined, quantity: number) => {
    if (quantity === 0) {
      setCartItems(cartItems.filter(item => 
        !(item.id === id && item.variant === variant)
      ));
    } else {
      setCartItems(cartItems.map(item =>
        item.id === id && item.variant === variant
          ? { ...item, quantity }
          : item
      ));
    }
  };

  const removeFromCart = (id: number, variant?: string) => {
    setCartItems(cartItems.filter(item => 
      !(item.id === id && item.variant === variant)
    ));
  };

  const viewProduct = (product: any) => {
    setSelectedProduct(product);
    setCurrentView('product-detail');
  };

  const renderCurrentView = () => {
    const pageVariants = {
      initial: { opacity: 0, x: 20 },
      in: { opacity: 1, x: 0 },
      out: { opacity: 0, x: -20 }
    };

    const pageTransition = {
      type: 'tween',
      ease: 'anticipate',
      duration: 0.5
    };

    switch (currentView) {
      case 'home':
        return (
          <motion.div
            key="home"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <EnhancedHomepage 
              onViewProduct={viewProduct}
              onSearch={(query) => {
                setSearchQuery(query);
                setCurrentView('products');
              }}
              onAddToCart={addToCart}
            />
          </motion.div>
        );
      case 'products':
        return (
          <motion.div
            key="products"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <ProductListing 
              searchQuery={searchQuery}
              onViewProduct={viewProduct}
              onAddToCart={addToCart}
            />
          </motion.div>
        );
      case 'product-detail':
        return (
          <motion.div
            key="product-detail"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <ProductDetail 
              product={selectedProduct}
              onAddToCart={addToCart}
              onBack={() => setCurrentView('products')}
            />
          </motion.div>
        );
      case 'cart':
        return (
          <motion.div
            key="cart"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <Cart 
              items={cartItems}
              onUpdateQuantity={updateCartQuantity}
              onRemoveItem={removeFromCart}
              onCheckout={() => setCurrentView('checkout')}
            />
          </motion.div>
        );
      case 'checkout':
        return (
          <motion.div
            key="checkout"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <Checkout 
              items={cartItems}
              onOrderComplete={() => {
                setCartItems([]);
                setCurrentView('account');
              }}
            />
          </motion.div>
        );
      case 'account':
        return (
          <motion.div
            key="account"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <UserAccount 
              isLoggedIn={isLoggedIn}
              onLogin={() => setIsLoggedIn(true)}
              onLogout={() => setIsLoggedIn(false)}
            />
          </motion.div>
        );
      case 'admin':
        return (
          <motion.div
            key="admin"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <AdminDashboard />
          </motion.div>
        );
      default:
        return (
          <motion.div
            key="default"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <EnhancedHomepage 
              onViewProduct={viewProduct}
              onSearch={(query) => {
                setSearchQuery(query);
                setCurrentView('products');
              }}
              onAddToCart={addToCart}
            />
          </motion.div>
        );
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <EnhancedHeader 
          currentView={currentView}
          setCurrentView={setCurrentView}
          cartItems={cartItems}
          onSearch={(query) => {
            setSearchQuery(query);
            setCurrentView('products');
          }}
          onUpdateQuantity={updateCartQuantity}
          onRemoveItem={removeFromCart}
          onCheckout={() => setCurrentView('checkout')}
          isLoggedIn={isLoggedIn}
          isAdmin={isAdmin}
        />
        <main>
          <AnimatePresence mode="wait">
            {renderCurrentView()}
          </AnimatePresence>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;