import { Order } from "../model/OrderModel.js";
import { Product } from "../model/ProductModel.js";


export const placeOrder = async (req, res) => {
  try {
    const userId = req.user._id; // from auth middleware
    const { products } = req.body; // [{ productId, quantity }]

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "No products in order" });
    }

    // Calculate total price
    let totalPrice = 0;
    for (const item of products) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res
          .status(404)
          .json({ message: `Product not found: ${item.productId}` });
      }
      totalPrice += product.price * (item.quantity || 1);
    }

    // Create new order
    const newOrder = await Order.create({
      user: userId,
      products: products.map((item) => ({
        product: item.productId,
        quantity: item.quantity || 1,
      })),
      totalPrice,
      status: "Pending", // default order status
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// 📦 Get all orders (Admin)
export const getAllOrders = async (req, res) => {
  try {
    const allOrders = await Order.find()
      .populate("user", "name email")
      .populate("products.product", "product price image");

    if (!allOrders || allOrders.length === 0) {
      return res.status(404).json({
        message: "No orders found",
      });
    }

    res.status(200).json({
      success: true,
      message: "All orders retrieved successfully",
      orders: allOrders,
    });
  } catch (error) {
    console.error("Error retrieving all orders:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// 👤 Get specific user's orders
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user._id;

    const orders = await Order.find({ user: userId })
      .populate("products.product", "product price image")
      .sort({ createdAt: -1 });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    res.status(200).json({
      success: true,
      message: "User orders retrieved successfully",
      orders,
    });
  } catch (error) {
    console.error("Error retrieving user orders:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// 🔄 Update order status (Admin only)
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const validStatuses = ["Pending", "Assigned", "Delivered"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid order status" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { orderId } = req.params;

    // 1️⃣ Check if orderId is provided
    if (!orderId) {
      return res.status(400).json({ message: "Order ID is required" });
    }

    // 2️⃣ Find order and ensure it belongs to the logged-in user
    const order = await Order.findOne({ _id: orderId, user: userId });

    if (!order) {
      return res
        .status(404)
        .json({ message: "Order not found or unauthorized access" });
    }

    // 3️⃣ Check if already cancelled or delivered
    if (order.status === "Cancelled") {
      return res.status(400).json({ message: "Order is already cancelled" });
    }

    if (order.status === "Delivered") {
      return res
        .status(400)
        .json({ message: "Delivered orders cannot be cancelled" });
    }

    // 4️⃣ Update order status
    order.status = "Cancelled";
    await order.save();

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      order,
    });
  } catch (error) {
    console.error("Error cancelling order:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};