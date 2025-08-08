import React, { useState } from 'react';
import { Search, Filter, Download, Eye, Package, CheckCircle, Clock, XCircle, Truck } from 'lucide-react';

const Orders: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  
  const orders = [
    {
      id: '#3851',
      customer: 'Sarah Johnson',
      email: 'sarah@example.com',
      products: 2,
      total: '$398.98',
      status: 'delivered',
      date: '2024-01-15',
      shipping: 'Standard'
    },
    {
      id: '#3850',
      customer: 'Michael Chen',
      email: 'michael@example.com',
      products: 1,
      total: '$499.99',
      status: 'processing',
      date: '2024-01-15',
      shipping: 'Express'
    },
    {
      id: '#3849',
      customer: 'Emma Wilson',
      email: 'emma@example.com',
      products: 3,
      total: '$254.97',
      status: 'shipped',
      date: '2024-01-14',
      shipping: 'Standard'
    },
    {
      id: '#3848',
      customer: 'David Brown',
      email: 'david@example.com',
      products: 1,
      total: '$45.99',
      status: 'cancelled',
      date: '2024-01-14',
      shipping: 'Standard'
    },
    {
      id: '#3847',
      customer: 'Lisa Garcia',
      email: 'lisa@example.com',
      products: 2,
      total: '$209.98',
      status: 'delivered',
      date: '2024-01-13',
      shipping: 'Express'
    },
    {
      id: '#3846',
      customer: 'James Wilson',
      email: 'james@example.com',
      products: 1,
      total: '$79.99',
      status: 'pending',
      date: '2024-01-13',
      shipping: 'Standard'
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'processing':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'shipped':
        return <Truck className="w-4 h-4 text-blue-500" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'pending':
        return <Package className="w-4 h-4 text-gray-500" />;
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
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'processing', label: 'Processing' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Orders</h2>
          <p className="text-gray-600">Manage customer orders and shipments</p>
        </div>
        <button className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Download className="w-4 h-4" />
          <span>Export Orders</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button className="inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            <span>More Filters</span>
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Order ID</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Customer</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Products</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Total</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Date</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Shipping</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <span className="font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
                      {order.id}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-medium text-gray-900">{order.customer}</p>
                      <p className="text-sm text-gray-600">{order.email}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-700">{order.products} items</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-semibold text-gray-900">{order.total}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center space-x-1 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="capitalize">{order.status}</span>
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-700">{order.date}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-700">{order.shipping}</span>
                  </td>
                  <td className="py-4 px-6">
                    <button className="inline-flex items-center space-x-1 px-3 py-1 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                      <Eye className="w-4 h-4" />
                      <span>View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;