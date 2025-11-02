import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Clock, CheckCircle, XCircle, Loader } from 'lucide-react';
import { orderService } from '../api/services';
import { useAuth } from '../contexts/AuthContext';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });
  const { user } = useAuth();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await orderService.getUserOrders(user._id || user.id);
      setOrders(response.data);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to load orders' });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (orderId) => {
    try {
      await orderService.cancel(orderId);
      setMessage({ type: 'success', text: 'Order cancelled successfully' });
      fetchOrders();
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to cancel order' });
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending':
        return <Clock className="status-icon pending" />;
      case 'Processing':
        return <Loader className="status-icon processing" />;
      case 'Delivered':
        return <CheckCircle className="status-icon delivered" />;
      case 'Cancelled':
        return <XCircle className="status-icon cancelled" />;
      default:
        return <Clock className="status-icon" />;
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
          <h1>My Orders</h1>
          <p>Track your order history and status</p>
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

      {orders.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="empty-state"
        >
          <Package size={64} />
          <h3>No orders yet</h3>
          <p>Start ordering your hostel essentials</p>
        </motion.div>
      ) : (
        <div className="orders-list">
          {orders.map((order, index) => (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="order-card"
            >
              <div className="order-header">
                <div>
                  <h3>{order.orderName}</h3>
                  <p className="order-date">
                    {new Date(order.createdAt).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div className="order-price">₹{order.price}</div>
              </div>

              <div className="order-footer">
                <div className="order-status">
                  {getStatusIcon(order.status)}
                  <span className={`status-text ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </div>

                {order.status === 'Pending' && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCancel(order._id)}
                    className="btn-cancel"
                  >
                    Cancel Order
                  </motion.button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
