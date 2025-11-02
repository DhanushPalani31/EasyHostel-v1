import axiosInstance from './axios';

export const authService = {
  register: (data) => axiosInstance.post('/auth/register', data),
  login: (data) => axiosInstance.post('/auth/login', data),
};

export const productService = {
  getAll: () => axiosInstance.get('/products/get'),
  create: (data) => axiosInstance.post('/products/create', data),
  update: (id, data) => axiosInstance.put(`/products/update/${id}`, data),
  delete: (id) => axiosInstance.delete(`/products/delete/${id}`),
};

export const orderService = {
  create: (data) => axiosInstance.post('/orders/place', data),
  getAll: () => axiosInstance.get('/orders/all'),
  getUserOrders: () => axiosInstance.get(`/orders/my-orders`),
  updateStatus: (id, status) => axiosInstance.patch(`/orders/update/${id}/status`, { status }),
  cancel: (id) => axiosInstance.delete(`/orders/cancel/${id}`),
};
