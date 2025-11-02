import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, ShoppingBag, Plus, Edit2, Trash2, X } from 'lucide-react';
import { productService, orderService } from '../api/services';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({ productName: '', price: '', image: '' });
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'products') {
        const response = await productService.getAll();
        setProducts(response.data);
      } else {
        const response = await orderService.getAll();
        setOrders(response.data);
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to load data' });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await productService.update(editingProduct._id, formData);
        setMessage({ type: 'success', text: 'Product updated successfully' });
      } else {
        await productService.create(formData);
        setMessage({ type: 'success', text: 'Product created successfully' });
      }
      setShowModal(false);
      setFormData({ productName: '', price: '', image: '' });
      setEditingProduct(null);
      fetchData();
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Operation failed' });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productService.delete(id);
        setMessage({ type: 'success', text: 'Product deleted successfully' });
        fetchData();
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      } catch (error) {
        setMessage({ type: 'error', text: 'Failed to delete product' });
      }
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await orderService.updateStatus(orderId, newStatus);
      setMessage({ type: 'success', text: 'Order status updated' });
      fetchData();
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update status' });
    }
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      productName: product.productName,
      price: product.price,
      image: product.image || ''
    });
    setShowModal(true);
  };

  return (
    <div className="page-container">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="page-header"
      >
        <div>
          <h1>Admin Dashboard</h1>
          <p>Manage products and orders</p>
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

      <div className="admin-tabs">
        <button
          className={`tab ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          <Package size={20} />
          Products
        </button>
        <button
          className={`tab ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          <ShoppingBag size={20} />
          Orders
        </button>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          {activeTab === 'products' && (
            <div className="admin-content">
              <div className="admin-actions">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setEditingProduct(null);
                    setFormData({ productName: '', price: '', image: '' });
                    setShowModal(true);
                  }}
                  className="btn-add"
                >
                  <Plus size={20} />
                  Add Product
                </motion.button>
              </div>

              <div className="admin-table">
                <table>
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>Price</th>
                      <th>Image</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <motion.tr
                        key={product._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <td>{product.productName}</td>
                        <td>₹{product.price}</td>
                        <td>
                          {product.image ? (
                            <img src={product.image} alt={product.productName} className="table-image" />
                          ) : (
                            'No image'
                          )}
                        </td>
                        <td>
                          <div className="table-actions">
                            <button
                              onClick={() => openEditModal(product)}
                              className="btn-icon edit"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(product._id)}
                              className="btn-icon delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="admin-content">
              <div className="admin-table">
                <table>
                  <thead>
                    <tr>
                      <th>Order Name</th>
                      <th>Price</th>
                      <th>Customer</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <motion.tr
                        key={order._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <td>{order.orderName}</td>
                        <td>₹{order.price}</td>
                        <td>{order.userId?.name || 'N/A'}</td>
                        <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                        <td>
                          <span className={`status-badge ${order.status.toLowerCase()}`}>
                            {order.status}
                          </span>
                        </td>
                        <td>
                          {order.status !== 'Delivered' && order.status !== 'Cancelled' && (
                            <select
                              value={order.status}
                              onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                              className="status-select"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Processing">Processing</option>
                              <option value="Delivered">Delivered</option>
                            </select>
                          )}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="modal-overlay"
          onClick={() => setShowModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
              <button onClick={() => setShowModal(false)} className="btn-close">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label>Product Name</label>
                <input
                  type="text"
                  value={formData.productName}
                  onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Price</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                  min="0"
                />
              </div>

              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="modal-actions">
                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingProduct ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default AdminDashboard;
