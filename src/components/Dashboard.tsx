import React from 'react';
import StatsCard from './StatsCard';
import RecentOrders from './RecentOrders';
import SalesChart from './SalesChart';
import TopProducts from './TopProducts';
import { 
  TrendingUp, 
  ShoppingCart, 
  Users, 
  Package,
  DollarSign
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Total Revenue',
      value: '$45,231',
      change: '+12.5%',
      trend: 'up' as const,
      icon: DollarSign,
      color: 'blue'
    },
    {
      title: 'Total Orders',
      value: '1,429',
      change: '+8.2%',
      trend: 'up' as const,
      icon: ShoppingCart,
      color: 'green'
    },
    {
      title: 'Active Customers',
      value: '892',
      change: '+3.1%',
      trend: 'up' as const,
      icon: Users,
      color: 'purple'
    },
    {
      title: 'Products in Stock',
      value: '2,341',
      change: '-2.4%',
      trend: 'down' as const,
      icon: Package,
      color: 'orange'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesChart />
        <TopProducts />
      </div>

      {/* Recent Orders */}
      <RecentOrders />
    </div>
  );
};

export default Dashboard;