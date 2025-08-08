import React from 'react';
import { Package } from 'lucide-react';

const TopProducts: React.FC = () => {
  const products = [
    { name: 'Wireless Headphones', sales: 145, revenue: '$2,890', trend: '+12%' },
    { name: 'Smart Watch', sales: 132, revenue: '$2,640', trend: '+8%' },
    { name: 'Laptop Stand', sales: 98, revenue: '$1,960', trend: '+15%' },
    { name: 'USB-C Hub', sales: 76, revenue: '$1,520', trend: '+5%' },
    { name: 'Desk Lamp', sales: 65, revenue: '$1,300', trend: '+3%' },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Top Products</h3>
          <p className="text-sm text-gray-600">Best selling items this month</p>
        </div>
        <Package className="w-5 h-5 text-gray-400" />
      </div>
      
      <div className="space-y-4">
        {products.map((product, index) => (
          <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="flex-1">
              <p className="font-medium text-gray-900">{product.name}</p>
              <p className="text-sm text-gray-600">{product.sales} sales</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900">{product.revenue}</p>
              <p className="text-sm text-green-600">{product.trend}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProducts;