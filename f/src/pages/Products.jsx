import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Package } from 'lucide-react';
import { productService, orderService } from '../api/services';
import { useAuth } from '../contexts/AuthContext';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderLoading, setOrderLoading] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });
  const { user } = useAuth();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productService.getAll();
      setProducts(response.data);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to load products' });
    } finally {
      setLoading(false);
    }
  };

  const handleOrder = async (product) => {
    setOrderLoading(product._id);
    try {
      await orderService.create({
        orderName: product.productName,
        price: product.price,
        productId: product._id,
        userId: user._id || user.id
      });
      setMessage({ type: 'success', text: 'Order placed successfully!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to place order' });
    } finally {
      setOrderLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="page-header"
      >
        <div>
          <h1>Available Products</h1>
          <p>Browse and order your hostel essentials</p>
        </div>
      </motion.div>

      {message.text && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`message ${message.type}`}
        >
          {message.text}
        </motion.div>
      )}

      {products.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="empty-state"
        >
          <Package size={64} />
          <h3>No products available</h3>
          <p>Check back later for new items</p>
        </motion.div>
      ) : (
        <div className="products-grid">
          {products.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="product-card"
            >
              <div className="product-image">
                {product.image ? (
                  <img src={product.image} alt={product.productName} />
                ) : (
                  <div className="product-placeholder">
                    <Package size={48} />
                  </div>
                )}
              </div>
              <div className="product-content">
                <h3>{product.productName}</h3>
                <div className="product-price">₹{product.price}</div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleOrder(product)}
                  className="btn-order"
                  disabled={orderLoading === product._id}
                >
                  {orderLoading === product._id ? (
                    <div className="spinner-small"></div>
                  ) : (
                    <>
                      <ShoppingCart size={18} />
                      Order Now
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
