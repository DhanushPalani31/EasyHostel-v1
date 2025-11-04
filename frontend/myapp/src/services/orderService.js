import api from './api';
import { API_ENDPOINTS } from '../utils/constant';

export const orderService = {
  placeOrder: async (orderData) => {
    const response = await api.post(API_ENDPOINTS.PLACE_ORDER, orderData);
    return response.data;
  },

  getMyOrders: async () => {
    const response = await api.get(API_ENDPOINTS.MY_ORDERS);
    return response.data;
  },

  getAllOrders: async () => {
    const response = await api.get(API_ENDPOINTS.ALL_ORDERS);
    return response.data;
  },

  updateOrderStatus: async (orderId, status) => {
    const response = await api.put(`${API_ENDPOINTS.UPDATE_ORDER}/${orderId}`, { status });
    return response.data;
  },

  cancelOrder: async (orderId) => {
    const response = await api.put(`${API_ENDPOINTS.CANCEL_ORDER}/${orderId}`);
    return response.data;
  },
};
