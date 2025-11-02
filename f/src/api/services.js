import axiosInstance from './axios';

export const authService = {
  register: (data) => axiosInstance.post('/auth/register', data),
  login: (data) => axiosInstance.post('/auth/login', data),
};

export const productService = {
  getAll: () => axiosInstance.get('/products'),
  create: (data) => axiosInstance.post('/products', data),
  update: (id, data) => axiosInstance.put(`/products/${id}`, data),
  delete: (id) => axiosInstance.delete(`/products/${id}`),
};

export const orderService = {
  create: (data) => axiosInstance.post('/orders', data),
  getAll: () => axiosInstance.get('/orders'),
  getUserOrders: (userId) => axiosInstance.get(`/orders/user/${userId}`),
  updateStatus: (id, status) => axiosInstance.patch(`/orders/${id}/status`, { status }),
  cancel: (id) => axiosInstance.delete(`/orders/${id}`),
};
