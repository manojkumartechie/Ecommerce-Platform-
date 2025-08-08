import React, { useState } from 'react';
import Header from './components/Header';
import Homepage from './components/Homepage';
import ProductListing from './components/ProductListing';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import UserAccount from './components/UserAccount';
import AdminDashboard from './components/AdminDashboard';

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
    switch (currentView) {
      case 'home':
        return (
          <Homepage 
            onViewProduct={viewProduct}
            onSearch={(query) => {
              setSearchQuery(query);
              setCurrentView('products');
            }}
          />
        );
      case 'products':
        return (
          <ProductListing 
            searchQuery={searchQuery}
            onViewProduct={viewProduct}
            onAddToCart={addToCart}
          />
        );
      case 'product-detail':
        return (
          <ProductDetail 
            product={selectedProduct}
            onAddToCart={addToCart}
            onBack={() => setCurrentView('products')}
          />
        );
      case 'cart':
        return (
          <Cart 
            items={cartItems}
            onUpdateQuantity={updateCartQuantity}
            onRemoveItem={removeFromCart}
            onCheckout={() => setCurrentView('checkout')}
          />
        );
      case 'checkout':
        return (
          <Checkout 
            items={cartItems}
            onOrderComplete={() => {
              setCartItems([]);
              setCurrentView('account');
            }}
          />
        );
      case 'account':
        return (
          <UserAccount 
            isLoggedIn={isLoggedIn}
            onLogin={() => setIsLoggedIn(true)}
            onLogout={() => setIsLoggedIn(false)}
          />
        );
      case 'admin':
        return <AdminDashboard />;
      default:
        return (
          <Homepage 
            onViewProduct={viewProduct}
            onSearch={(query) => {
              setSearchQuery(query);
              setCurrentView('products');
            }}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        currentView={currentView}
        setCurrentView={setCurrentView}
        cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onSearch={(query) => {
          setSearchQuery(query);
          setCurrentView('products');
        }}
        isLoggedIn={isLoggedIn}
        isAdmin={isAdmin}
      />
      <main>
        {renderCurrentView()}
      </main>
    </div>
  );
}

export default App;