import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  Settings, 
  ChevronLeft,
  ChevronRight,
  Store
} from 'lucide-react';

type ViewType = 'dashboard' | 'products' | 'orders' | 'customers' | 'analytics';

interface SidebarProps {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const menuItems = [
  { id: 'dashboard' as ViewType, label: 'Dashboard', icon: LayoutDashboard },
  { id: 'products' as ViewType, label: 'Products', icon: Package },
  { id: 'orders' as ViewType, label: 'Orders', icon: ShoppingCart },
  { id: 'customers' as ViewType, label: 'Customers', icon: Users },
  { id: 'analytics' as ViewType, label: 'Analytics', icon: BarChart3 },
];

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, collapsed, setCollapsed }) => {
  return (
    <div className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 shadow-sm transition-all duration-300 z-40 ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <Store className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">EcommerceHub</span>
          </div>
        )}
        {collapsed && (
          <Store className="w-8 h-8 text-blue-600 mx-auto" />
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
              title={collapsed ? item.label : ''}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
              {!collapsed && (
                <span className={`font-medium ${isActive ? 'text-blue-700' : 'text-gray-700'}`}>
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {!collapsed && (
        <div className="absolute bottom-4 left-4 right-4">
          <button className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
            <Settings className="w-5 h-5 text-gray-500" />
            <span className="font-medium">Settings</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;