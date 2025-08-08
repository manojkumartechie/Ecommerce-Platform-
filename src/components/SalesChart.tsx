import React from 'react';
import { BarChart3 } from 'lucide-react';

const SalesChart: React.FC = () => {
  const data = [
    { month: 'Jan', sales: 65 },
    { month: 'Feb', sales: 78 },
    { month: 'Mar', sales: 52 },
    { month: 'Apr', sales: 91 },
    { month: 'May', sales: 76 },
    { month: 'Jun', sales: 88 },
  ];

  const maxSales = Math.max(...data.map(d => d.sales));

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Sales Overview</h3>
          <p className="text-sm text-gray-600">Monthly sales performance</p>
        </div>
        <BarChart3 className="w-5 h-5 text-gray-400" />
      </div>
      
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-3">
            <span className="w-8 text-sm font-medium text-gray-600">{item.month}</span>
            <div className="flex-1 bg-gray-100 rounded-full h-3 relative overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(item.sales / maxSales) * 100}%` }}
              ></div>
            </div>
            <span className="w-12 text-sm font-medium text-gray-900 text-right">{item.sales}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesChart;