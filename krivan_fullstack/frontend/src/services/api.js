import axios from 'axios';

// Base API configuration with environment variable support & production fallback
export const BASE_URL = import.meta.env.VITE_API_URL || 'https://krivan-fullstack.onrender.com';
export const API_BASE = `${BASE_URL.replace(/\/api\/?$/, '').replace(/\/+$/, '')}/api`;

// Reusable Axios instance with base URL configured
export const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});


export const api = {
  // Products
  getProducts: async (params = {}) => {
    const res = await axios.get(`${API_BASE}/products`, { params });
    return res.data;
  },
  
  getProductBySlug: async (slug) => {
    const res = await axios.get(`${API_BASE}/products/${slug}`);
    return res.data;
  },
  
  createProduct: async (productData) => {
    const res = await axios.post(`${API_BASE}/products`, productData);
    return res.data;
  },
  
  updateProduct: async (id, productData) => {
    const res = await axios.put(`${API_BASE}/products/${id}`, productData);
    return res.data;
  },
  
  deleteProduct: async (id) => {
    const res = await axios.delete(`${API_BASE}/products/${id}`);
    return res.data;
  },

  // QR Code
  getQrCode: async (slug) => {
    const res = await axios.get(`${API_BASE}/qr/${slug}`);
    return res.data;
  },

  // Company Info
  getCompanyInfo: async () => {
    const res = await axios.get(`${API_BASE}/company`);
    return res.data;
  },

  updateCompanyInfo: async (companyData) => {
    const res = await axios.put(`${API_BASE}/company`, companyData);
    return res.data;
  },

  // Blogs
  getBlogs: async () => {
    const res = await axios.get(`${API_BASE}/blogs`);
    return res.data;
  },

  getBlogBySlug: async (slug) => {
    const res = await axios.get(`${API_BASE}/blogs/${slug}`);
    return res.data;
  },

  createBlog: async (blogData) => {
    const res = await axios.post(`${API_BASE}/blogs`, blogData);
    return res.data;
  },

  updateBlog: async (id, blogData) => {
    const res = await axios.put(`${API_BASE}/blogs/${id}`, blogData);
    return res.data;
  },

  deleteBlog: async (id) => {
    const res = await axios.delete(`${API_BASE}/blogs/${id}`);
    return res.data;
  },

  // Contact / Enquiries
  submitEnquiry: async (enquiryData) => {
    const res = await axios.post(`${API_BASE}/contact`, enquiryData);
    return res.data;
  },

  getEnquiries: async () => {
    const res = await axios.get(`${API_BASE}/contact`);
    return res.data;
  },

  updateEnquiryStatus: async (id, statusData) => {
    const res = await axios.put(`${API_BASE}/contact/${id}`, statusData);
    return res.data;
  },

  deleteEnquiry: async (id) => {
    const res = await axios.delete(`${API_BASE}/contact/${id}`);
    return res.data;
  },

  // Inventory Management
  getInventory: async () => {
    const res = await axios.get(`${API_BASE}/inventory`);
    return res.data;
  },

  updateInventory: async (id, itemData) => {
    const res = await axios.put(`${API_BASE}/inventory/${id}`, itemData);
    return res.data;
  },

  adjustStock: async (id, change, reason = '') => {
    const res = await axios.post(`${API_BASE}/inventory/${id}/adjust`, { change, reason });
    return res.data;
  },

  // Customer Invoices & Billing
  getInvoices: async () => {
    const res = await axios.get(`${API_BASE}/invoices`);
    return res.data;
  },

  createInvoice: async (invoiceData) => {
    const res = await axios.post(`${API_BASE}/invoices`, invoiceData);
    return res.data;
  },

  updateInvoice: async (id, invoiceData) => {
    const res = await axios.put(`${API_BASE}/invoices/${id}`, invoiceData);
    return res.data;
  },

  deleteInvoice: async (id) => {
    const res = await axios.delete(`${API_BASE}/invoices/${id}`);
    return res.data;
  },

  // Crop Dosage Calculator
  getCropCalculators: async () => {
    const res = await axios.get(`${API_BASE}/crop-calculator`);
    return res.data;
  },

  createCropCalculator: async (cropData) => {
    const res = await axios.post(`${API_BASE}/crop-calculator`, cropData);
    return res.data;
  },

  updateCropCalculator: async (id, cropData) => {
    const res = await axios.put(`${API_BASE}/crop-calculator/${id}`, cropData);
    return res.data;
  },

  deleteCropCalculator: async (id) => {
    const res = await axios.delete(`${API_BASE}/crop-calculator/${id}`);
    return res.data;
  },

  // Product Categories
  getCategories: async () => {
    const res = await axios.get(`${API_BASE}/categories`);
    return res.data;
  },

  createCategory: async (categoryData) => {
    const res = await axios.post(`${API_BASE}/categories`, categoryData);
    return res.data;
  },

  updateCategory: async (id, categoryData) => {
    const res = await axios.put(`${API_BASE}/categories/${id}`, categoryData);
    return res.data;
  },

  deleteCategory: async (id) => {
    const res = await axios.delete(`${API_BASE}/categories/${id}`);
    return res.data;
  }
};
