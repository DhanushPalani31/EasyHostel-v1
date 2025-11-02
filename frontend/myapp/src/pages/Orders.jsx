import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Package, Clock, CheckCircle, XCircle, Loader } from "lucide-react";
import { orderService } from "../api/services";
import { useAuth } from "../contexts/AuthContext";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });
  const { user } = useAuth();

  useEffect(() => {
    if (user) fetchOrders();
  }, [user]);

  // ✅ Fetch user orders correctly
  const fetchOrders = async () => {
    try {
      const response = await orderService.getUserOrders(user._id || user.id);
      console.log("Fetched orders:", response.data);

      setOrders(response.data.orders || response.data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setMessage({ type: "error", text: "Failed to load orders" });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Cancel an order
  const handleCancel = async (orderId) => {
    try {
      await orderService.cancel(orderId);
      setMessage({ type: "success", text: "Order cancelled successfully" });
      fetchOrders();
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    } catch (error) {
      console.error("Cancel order error:", error);
      setMessage({ type: "error", text: "Failed to cancel order" });
    }
  };

  // ✅ Status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return <Clock className="text-yellow-500" />;
      case "Processing":
      case "Assigned":
        return <Loader className="text-blue-500 animate-spin" />;
      case "Delivered":
        return <CheckCircle className="text-green-600" />;
      case "Cancelled":
        return <XCircle className="text-red-500" />;
      default:
        return <Clock className="text-gray-400" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-10 bg-gray-50">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h1 className="text-3xl font-bold mb-2 text-gray-800">My Orders</h1>
        <p className="text-gray-600">Track your order history and status</p>
      </motion.div>

      {/* Message */}
      {message.text && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-6 px-6 py-3 rounded-lg text-white ${
            message.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {message.text}
        </motion.div>
      )}

      {/* Empty State */}
      {orders.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center text-center mt-20"
        >
          <Package size={64} className="text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold">No orders yet</h3>
          <p className="text-gray-500">Start ordering your hostel essentials</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
          {orders.map((order, index) => (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all"
            >
              {/* Order Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    Order #{order._id.slice(-6).toUpperCase()}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="text-lg font-bold text-gray-900">
                  ₹{order.totalPrice}
                </div>
              </div>

              {/* Ordered Products */}
              <div className="space-y-3 mb-4">
                {order.products.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-3 border-b border-gray-100 pb-2"
                  >
                    <img
                      src={item.product?.image || "/placeholder.png"}
                      alt={item.product?.product || "Product"}
                      className="w-12 h-12 rounded-md object-cover"
                    />
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-800">
                        {item.product?.product}
                      </span>
                      <span className="text-sm text-gray-500">
                        ₹{item.product?.price} × {item.quantity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Status + Cancel Button */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(order.status)}
                  <span
                    className={`font-medium capitalize ${
                      order.status === "Delivered"
                        ? "text-green-600"
                        : order.status === "Cancelled"
                        ? "text-red-500"
                        : "text-yellow-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                {order.status === "Pending" && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCancel(order._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Cancel
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
