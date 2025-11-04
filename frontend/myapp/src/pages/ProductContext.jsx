import React from 'react';
import { ShoppingBag, Star } from 'lucide-react';

const ProductContent = ({ product, onAddToCart }) => {
  if (!product) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Select a product to view details</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Image Section */}
        <div className="relative">
          <img
            src={product.image}
            alt={product.product}
            className="w-full h-96 object-cover"
          />
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 bg-green-500 text-white text-sm font-medium rounded-full shadow-lg">
              In Stock
            </span>
          </div>
        </div>

        {/* Details Section */}
        <div className="p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {product.product}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={20}
                    className="text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <span className="text-gray-600">(4.5 / 5)</span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <span className="text-4xl font-bold text-blue-600">
                ₹{product.price}
              </span>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Product Details
              </h3>
              <p className="text-gray-600 leading-relaxed">
                High-quality {product.product.toLowerCase()} perfect for your daily needs. 
                Quick delivery within the hostel premises. Fresh stock always available.
              </p>
            </div>

            {/* Features */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Features
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  Premium Quality
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  Fast Delivery
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  Best Price Guarantee
                </li>
              </ul>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => onAddToCart(product)}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg rounded-lg hover:shadow-xl transition-all"
          >
            <ShoppingBag size={24} />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductContent;