import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Users, Package, ShoppingCart } from 'lucide-react';

const Analytics: React.FC = () => {
  const metrics = [
    {
      title: 'Revenue Growth',
      value: '+24.8%',
      description: 'vs last month',
      trend: 'up',
      icon: DollarSign,
      color: 'blue'
    },
    {
      title: 'Customer Acquisition',
      value: '+15.3%',
      description: 'new customers',
      trend: 'up',
      icon: Users,
      color: 'green'
    },
    {
      title: 'Product Performance',
      value: '+8.7%',
      description: 'avg sales per product',
      trend: 'up',
      icon: Package,
      color: 'purple'
    },
    {
      title: 'Conversion Rate',
      value: '-2.1%',
      description: 'needs attention',
      trend: 'down',
      icon: ShoppingCart,
      color: 'orange'
    },
  ];

  const topCategories = [
    { name: 'Electronics', sales: 45, revenue: '$12,450' },
    { name: 'Accessories', sales: 38, revenue: '$8,920' },
    { name: 'Wearables', sales: 32, revenue: '$15,680' },
    { name: 'Office', sales: 28, revenue: '$6,340' },
    { name: 'Home & Garden', sales: 22, revenue: '$4,580' },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 12400, orders: 145 },
    { month: 'Feb', revenue: 15600, orders: 189 },
    { month: 'Mar', revenue: 11200, orders: 132 },
    { month: 'Apr', revenue: 18900, orders: 221 },
    { month: 'May', revenue: 16700, orders: 198 },
    { month: 'Jun', revenue: 21300, orders: 267 },
  ];

  const maxRevenue = Math.max(...revenueData.map(d => d.revenue));

  const colorMap = {
    blue: { bg: 'bg-blue-50', icon: 'text-blue-600', trend: 'text-blue-600' },
    green: { bg: 'bg-green-50', icon: 'text-green-600', trend: 'text-green-600' },
    purple: { bg: 'bg-purple-50', icon: 'text-purple-600', trend: 'text-purple-600' },
    orange: { bg: 'bg-orange-50', icon: 'text-orange-600', trend: 'text-orange-600' },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Analytics</h2>
        <p className="text-gray-600">Track your business performance</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          const TrendIcon = metric.trend === 'up' ? TrendingUp : TrendingDown;
          const colors = colorMap[metric.color];

          return (
            <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-2">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</p>
                  <div className={`flex items-center space-x-1 ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    <TrendIcon className="w-4 h-4" />
                    <span className="text-sm font-medium">{metric.description}</span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${colors.bg}`}>
                  <Icon className={`w-6 h-6 ${colors.icon}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Monthly Revenue</h3>
            <p className="text-sm text-gray-600">Revenue and order trends</p>
          </div>
          
          <div className="space-y-4">
            {revenueData.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-900">{item.month}</span>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">${(item.revenue / 1000).toFixed(1)}k</p>
                    <p className="text-xs text-gray-600">{item.orders} orders</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${(item.revenue / maxRevenue) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Categories */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Top Categories</h3>
            <p className="text-sm text-gray-600">Best performing product categories</p>
          </div>
          
          <div className="space-y-4">
            {topCategories.map((category, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="font-medium text-gray-900">{category.name}</p>
                    <p className="text-sm text-gray-600">{category.sales}% of total sales</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{category.revenue}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Performance Insights</h3>
          <p className="text-sm text-gray-600">Key insights to improve your business</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Peak Sales Hours</h4>
            <p className="text-sm text-blue-700">Most sales occur between 2-6 PM. Consider running promotions during these hours.</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-semibold text-green-900 mb-2">Customer Retention</h4>
            <p className="text-sm text-green-700">Repeat customers generate 40% more revenue. Focus on loyalty programs.</p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg">
            <h4 className="font-semibold text-orange-900 mb-2">Inventory Alert</h4>
            <p className="text-sm text-orange-700">5 products are running low on stock. Reorder soon to avoid stockouts.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;