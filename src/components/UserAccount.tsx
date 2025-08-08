import React, { useState } from 'react';
import { 
  User, 
  Package, 
  Heart, 
  MapPin, 
  CreditCard, 
  Settings, 
  Bell,
  Shield,
  LogOut,
  Edit,
  Eye,
  Truck
} from 'lucide-react';

interface UserAccountProps {
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

const UserAccount: React.FC<UserAccountProps> = ({ isLoggedIn, onLogin, onLogout }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);

  const orders = [
    {
      id: '#ORD-2024-001',
      date: '2024-01-15',
      status: 'Delivered',
      total: 299.99,
      items: 2,
      image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    {
      id: '#ORD-2024-002',
      date: '2024-01-12',
      status: 'Shipped',
      total: 149.99,
      items: 1,
      image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    {
      id: '#ORD-2024-003',
      date: '2024-01-08',
      status: 'Processing',
      total: 89.99,
      items: 3,
      image: 'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=200'
    }
  ];

  const wishlistItems = [
    {
      id: 1,
      name: 'Premium Wireless Earbuds',
      price: 199.99,
      image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=200',
      inStock: true
    },
    {
      id: 2,
      name: 'Smart Home Speaker',
      price: 129.99,
      image: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=200',
      inStock: false
    }
  ];

  const addresses = [
    {
      id: 1,
      type: 'Home',
      name: 'John Smith',
      address: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      isDefault: true
    },
    {
      id: 2,
      type: 'Work',
      name: 'John Smith',
      address: '456 Business Ave',
      city: 'New York',
      state: 'NY',
      zipCode: '10002',
      isDefault: false
    }
  ];

  const paymentMethods = [
    {
      id: 1,
      type: 'Visa',
      last4: '4242',
      expiry: '12/25',
      isDefault: true
    },
    {
      id: 2,
      type: 'Mastercard',
      last4: '8888',
      expiry: '08/26',
      isDefault: false
    }
  ];

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto px-4 py-12">
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <div className="text-center mb-6">
            <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign In</h2>
            <p className="text-gray-600">Access your account to view orders and manage preferences</p>
          </div>
          
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="button"
              onClick={onLogin}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Sign In
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account? 
              <button className="text-blue-600 hover:text-blue-700 font-medium ml-1">
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'payments', label: 'Payment Methods', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-gray-200">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">John Smith</h3>
                <p className="text-sm text-gray-600">john@example.com</p>
              </div>
            </div>
            
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
              <button
                onClick={onLogout}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="font-medium">Sign Out</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
                  >
                    <Edit className="w-4 h-4" />
                    <span>{isEditing ? 'Cancel' : 'Edit'}</span>
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      value="John"
                      disabled={!isEditing}
                      className={`w-full border border-gray-300 rounded-lg px-3 py-2 ${
                        isEditing ? 'focus:outline-none focus:ring-2 focus:ring-blue-500' : 'bg-gray-50'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value="Smith"
                      disabled={!isEditing}
                      className={`w-full border border-gray-300 rounded-lg px-3 py-2 ${
                        isEditing ? 'focus:outline-none focus:ring-2 focus:ring-blue-500' : 'bg-gray-50'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value="john@example.com"
                      disabled={!isEditing}
                      className={`w-full border border-gray-300 rounded-lg px-3 py-2 ${
                        isEditing ? 'focus:outline-none focus:ring-2 focus:ring-blue-500' : 'bg-gray-50'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value="+1 (555) 123-4567"
                      disabled={!isEditing}
                      className={`w-full border border-gray-300 rounded-lg px-3 py-2 ${
                        isEditing ? 'focus:outline-none focus:ring-2 focus:ring-blue-500' : 'bg-gray-50'
                      }`}
                    />
                  </div>
                </div>
                
                {isEditing && (
                  <div className="flex space-x-3">
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Save Changes
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Order History</h2>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-4">
                          <img
                            src={order.image}
                            alt="Order"
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-semibold text-gray-900">{order.id}</p>
                            <p className="text-sm text-gray-600">Placed on {order.date}</p>
                            <p className="text-sm text-gray-600">{order.items} items</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">${order.total}</p>
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-3">
                        <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm">
                          <Eye className="w-4 h-4" />
                          <span>View Details</span>
                        </button>
                        <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm">
                          <Truck className="w-4 h-4" />
                          <span>Track Order</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">My Wishlist</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlistItems.map((item) => (
                    <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2">{item.name}</h3>
                        <p className="text-lg font-bold text-gray-900 mb-3">${item.price}</p>
                        <div className="flex space-x-2">
                          <button
                            disabled={!item.inStock}
                            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                              item.inStock
                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            }`}
                          >
                            {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                          </button>
                          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                            <Heart className="w-4 h-4 text-red-500 fill-current" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Saved Addresses</h2>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Add New Address
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {addresses.map((address) => (
                    <div key={address.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-gray-900">{address.type}</span>
                          {address.isDefault && (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                        <button className="text-blue-600 hover:text-blue-700">
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-sm text-gray-600">
                        <p className="font-medium text-gray-900">{address.name}</p>
                        <p>{address.address}</p>
                        <p>{address.city}, {address.state} {address.zipCode}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Payment Methods Tab */}
            {activeTab === 'payments' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Payment Methods</h2>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Add New Card
                  </button>
                </div>
                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-8 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                            {method.type.toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              •••• •••• •••• {method.last4}
                            </p>
                            <p className="text-sm text-gray-600">Expires {method.expiry}</p>
                          </div>
                          {method.isDefault && (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-700">
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Account Settings</h2>
                
                <div className="space-y-6">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Bell className="w-5 h-5 mr-2" />
                      Notifications
                    </h3>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between">
                        <span className="text-gray-700">Order updates</span>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </label>
                      <label className="flex items-center justify-between">
                        <span className="text-gray-700">Promotional emails</span>
                        <input type="checkbox" className="rounded" />
                      </label>
                      <label className="flex items-center justify-between">
                        <span className="text-gray-700">SMS notifications</span>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </label>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Shield className="w-5 h-5 mr-2" />
                      Security
                    </h3>
                    <div className="space-y-3">
                      <button className="w-full text-left py-2 text-blue-600 hover:text-blue-700">
                        Change Password
                      </button>
                      <button className="w-full text-left py-2 text-blue-600 hover:text-blue-700">
                        Enable Two-Factor Authentication
                      </button>
                      <button className="w-full text-left py-2 text-red-600 hover:text-red-700">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAccount;