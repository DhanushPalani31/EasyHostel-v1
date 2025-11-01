import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import {
    cancelOrder,
  getAllOrders,
  getUserOrders,
  placeOrder,
  updateOrderStatus,
} from "../controller/orderController.js"; // ✅ folder name should be "controllers"

const router = express.Router();

// ✅ Protect all routes
router.use(protect);

// 🧾 Student places an order
router.post("/place", authorizeRoles("Student"), placeOrder);

// 👤 Get logged-in student's orders
// (No need for :id param — we’ll use req.user._id in controller)
router.get("/my-orders", authorizeRoles("Student"), getUserOrders);

// 📦 Admin gets all orders
router.get("/all", authorizeRoles("Admin"), getAllOrders);

// 🔄 Admin updates order status
router.put("/update/:orderId", authorizeRoles("Admin"), updateOrderStatus);

router.put("/cancel/:orderId", authorizeRoles("Student"), cancelOrder);

export default router;
