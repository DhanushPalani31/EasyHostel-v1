import React from 'react';
import StatusBadge from '../components/common/StatusBadge';
import { formatDate } from '../utils/helpers';

const OrderCard = ({ order, onStatusChange }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4">
        <div>
          <h3 className="font-semibold text-lg text-gray-800">
            {order.user?.name || 'Unknown User'}
          </h3>
          <p className="text-sm text-gray-500">{order.user?.email}</p>
          <p className="text-xs text-gray-400 mt-1">
            {formatDate(order.createdAt)}
          </p>
        </div>
        <StatusBadge status={order.status} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {order.products.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
          >
            {item.product?.image && (
              <img
                src={item.product.image}
                alt={item.product.product}
                className="w-16 h-16 object-cover rounded-lg"
              />
            )}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-800 truncate">
                {item.product?.product || 'Product'}
              </p>
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
            </div>
            <p className="font-bold text-blue-600 whitespace-nowrap">
              ₹{(item.product?.price || 0) * item.quantity}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-gray-200">
        <div className="text-lg font-bold text-gray-800">
          Total: ₹{order.totalPrice}
        </div>
        <select
          value={order.status}
          onChange={(e) => onStatusChange(order._id, e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
        >
          <option value="Pending">Pending</option>
          <option value="Assigned">Assigned</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>
    </div>
  );
};

export default OrderCard;