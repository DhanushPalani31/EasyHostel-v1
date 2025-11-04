import React from 'react';
import { ShoppingCart } from 'lucide-react';

const ProductGrid = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all transform hover:-translate-y-1 flex flex-col h-full">
      <div className="relative overflow-hidden group h-48 bg-gray-100">
        <img
          src={product.image}
          alt={product.product}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all" />
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2 min-h-[3.5rem]">
          {product.product}
        </h3>
        <div className="flex items-center justify-between mb-4">
          <p className="text-2xl font-bold text-blue-600">₹{product.price}</p>
          <span className="text-xs text-green-600 font-medium">In Stock</span>
        </div>
        <button
          onClick={() => onAddToCart(product)}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all mt-auto"
        >
          <ShoppingCart size={18} />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default ProductGrid;