import React from 'react';
import { Package, Clock, CheckCircle, XCircle } from 'lucide-react';

const RecentOrders: React.FC = () => {
  const orders = [
    {
      id: '#3847',
      customer: 'Sarah Johnson',
      product: 'Wireless Headphones',
      amount: '$299',
      status: 'delivered',
      date: '2 hours ago'
    },
    {
      id: '#3846',
      customer: 'Michael Chen',
      product: 'Smart Watch Pro',
      amount: '$499',
      status: 'processing',
      date: '4 hours ago'
    },
    {
      id: '#3845',
      customer: 'Emma Wilson',
      product: 'Laptop Stand',
      amount: '$79',
      status: 'shipped',
      date: '1 day ago'
    },
    {
      id: '#3844',
      customer: 'David Brown',
      product: 'USB-C Hub',
      amount: '$45',
      status: 'cancelled',
      date: '1 day ago'
    },
    {
      id: '#3843',
      customer: 'Lisa Garcia',
      product: 'Desk Lamp',
      amount: '$129',
      status: 'delivered',
      date: '2 days ago'
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'processing':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'shipped':
        return <Package className="w-4 h-4 text-blue-500" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
          <p className="text-sm text-gray-600">Latest customer orders</p>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-700">Order ID</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Customer</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Product</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Amount</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4">
                  <span className="font-medium text-blue-600">{order.id}</span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-gray-900">{order.customer}</span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-gray-700">{order.product}</span>
                </td>
                <td className="py-3 px-4">
                  <span className="font-semibold text-gray-900">{order.amount}</span>
                </td>
                <td className="py-3 px-4">
                  <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    <span className="capitalize">{order.status}</span>
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm text-gray-600">{order.date}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;