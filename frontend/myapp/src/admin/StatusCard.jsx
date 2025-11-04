import React from 'react';

const StatsCard = ({ label, value, icon: Icon, color, bgLight, trend }) => {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-gray-600 mb-1">{label}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
        <div className={`${bgLight} p-3 rounded-lg`}>
          <Icon size={24} className={color.replace('bg-', 'text-')} />
        </div>
      </div>
      
      {trend && (
        <div className="flex items-center gap-1 text-sm">
          <span className={trend.direction === 'up' ? 'text-green-600' : 'text-red-600'}>
            {trend.direction === 'up' ? '↑' : '↓'} {trend.value}%
          </span>
          <span className="text-gray-500">vs last month</span>
        </div>
      )}
    </div>
  );
};

export default StatsCard;