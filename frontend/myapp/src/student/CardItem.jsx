import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col sm:flex-row gap-4">
      <img
        src={item.image}
        alt={item.product}
        className="w-full sm:w-24 h-24 object-cover rounded-lg"
      />
      
      <div className="flex-1">
        <h3 className="font-semibold text-lg text-gray-800 mb-1">
          {item.product}
        </h3>
        <p className="text-blue-600 font-bold mb-3">₹{item.price}</p>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => onUpdateQuantity(item._id, item.quantity - 1)}
            className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Minus size={16} />
          </button>
          <span className="font-medium text-gray-800 w-8 text-center">
            {item.quantity}
          </span>
          <button
            onClick={() => onUpdateQuantity(item._id, item.quantity + 1)}
            className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
      
      <div className="flex flex-col items-end justify-between">
        <button
          onClick={() => onRemove(item._id)}
          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash2 size={18} />
        </button>
        <p className="text-xl font-bold text-gray-800">
          ₹{item.price * item.quantity}
        </p>
      </div>
    </div>
  );
};

export default CartItem;