import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import Logo from '../components/Logo';
import AdminAnalytics from '../components/AdminAnalytics';
import { 
  LayoutDashboard,
  Package, 
  PackagePlus,
  PlusCircle, 
  Tag,
  QrCode, 
  Trash2, 
  Edit3, 
  MessageSquare, 
  Download, 
  CheckCircle, 
  Eye, 
  EyeOff, 
  Sparkles, 
  ExternalLink, 
  Shield, 
  Building2, 
  Plus, 
  X, 
  Phone, 
  Mail, 
  Share2, 
  Lock,
  User,
  LogOut,
  Search,
  SlidersHorizontal,
  Home,
  ChevronRight,
  Printer,
  FileSpreadsheet,
  RefreshCw,
  Clock,
  MapPin,
  BookOpen,
  FileText,
  Boxes,
  Warehouse,
  ShoppingCart,
  UserCheck,
  CheckCheck,
  AlertCircle,
  Filter,
  ArrowUpRight,
  Calculator,
  Star,
  Image as ImageIcon,
  Menu,
  MessageCircle,
  TrendingUp,
  BarChart3,
  PieChart,
  Calendar
} from 'lucide-react';

const AdminDashboard = () => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('krivan_admin_auth') === 'true';
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Mobile Sidebar Drawer State
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Active Menu Tab: 'overview', 'products', 'new_product', 'qr_hub', 'inventory', 'customers', 'blogs', 'new_blog', 'enquiries', 'company'
  const [activeTab, setActiveTab] = useState('overview');
  const selectTab = (tab) => {
    setActiveTab(tab);
    setMobileSidebarOpen(false);
  };
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [companyInfo, setCompanyInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [qrMap, setQrMap] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Category Management State & Modal
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [savingCategory, setSavingCategory] = useState(false);
  const [categorySearch, setCategorySearch] = useState('');
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    name_mr: '',
    slug: '',
    icon: '🌿',
    color: '#15803d',
    description: ''
  });

  // Enquiry Filter & Modal State
  const [enquiryFilter, setEnquiryFilter] = useState('all'); // 'all', 'pending', 'viewed', 'purchased'
  const [purchaseModalEnquiry, setPurchaseModalEnquiry] = useState(null);
  const [purchaseForm, setPurchaseForm] = useState({ purchased_item: '', purchased_qty: '1', purchased_amount: '' });

  // Customer Invoices & Billing State
  const [invoiceFilter, setInvoiceFilter] = useState('all'); // 'all', 'Paid', 'Pending'
  const [invoiceSearch, setInvoiceSearch] = useState('');
  const [selectedInvoiceForView, setSelectedInvoiceForView] = useState(null);
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [savingInvoice, setSavingInvoice] = useState(false);
  const [invoiceForm, setInvoiceForm] = useState({
    customer_name: '',
    phone_number: '',
    address: '',
    date: new Date().toISOString().split('T')[0],
    subtotal: 5000,
    tax_rate: 5,
    tax_amount: 250,
    discount: 0,
    total_price: 5250,
    payment_status: 'Paid',
    payment_mode: 'UPI / PhonePe',
    notes: '',
    items: [
      { product_name: 'Kaizen-K (Rhodophytes Potash 48gm)', hsn: '3104', quantity: 5, unit: 'Packs', rate: 650, amount: 3250 },
      { product_name: 'Thalassa (Fruit Booster 1L)', hsn: '3105', quantity: 2, unit: 'Bottles', rate: 1000, amount: 2000 }
    ]
  });

  // Crop Dosage Calculator State
  const [cropCalculators, setCropCalculators] = useState([]);
  const [editingCropCalc, setEditingCropCalc] = useState(null);
  const [savingCropCalc, setSavingCropCalc] = useState(false);
  const [cropCalcSearch, setCropCalcSearch] = useState('');
  const [cropCalcForm, setCropCalcForm] = useState({
    name: '',
    name_mr: '',
    crop_key: '',
    product: '',
    stage: '',
    stage_mr: '',
    dosage_per_acre: '',
    unit_factor: 150,
    unit_label: 'gm Kaizen-K',
    unit2_factor: 500,
    unit2_label: 'ml Thalassa',
    water_factor: 200,
    benefits: '',
    benefits_mr: '',
    yield_boost: '+28% Export Grade Yield',
    yield_boost_mr: '+२८% दर्जेदार निर्यातक्षम उत्पादन'
  });

  // Inventory Filter & Edit State
  const [inventoryFilter, setInventoryFilter] = useState('all'); // 'all', 'in_stock', 'low_stock', 'out_of_stock'
  const [inventorySearch, setInventorySearch] = useState('');
  const [editingInventory, setEditingInventory] = useState(null);
  const [inventoryForm, setInventoryForm] = useState({
    product_name: '',
    packing: '',
    current_stock: 100,
    min_threshold: 50,
    unit: 'Bags',
    warehouse: 'Pune Central Plant (MIDC Chakan)',
    batch_no: 'KRIV-2026-B01'
  });

  // Form State for Add / Edit Product
  const initialFormState = {
    brand_name: '',
    brand_name_mr: '',
    category: 'potash',
    category_display: 'Potash & Plant Boosters',
    category_display_mr: 'पोटॅश आणि वनस्पती वर्धक',
    subtitle: '',
    subtitle_mr: '',
    packing: '',
    target_crops: '',
    target_crops_mr: '',
    shortDesc: '',
    shortDesc_mr: '',
    benefits: '',
    benefits_mr: '',
    dosage: '',
    application_method: '',
    precautions: '',
    main_picture: '/assets/images/products/kaizen-k.jpg',
    youtube_link: '',
    isFlagship: false,
    composition: [
      { label: 'Water Soluble Potash (K2O)', value: '20.0%' },
      { label: 'Total Sulphur (S)', value: '1.5%' }
    ]
  };

  // Form State for Add / Edit Blog
  const initialBlogForm = {
    title: '',
    title_mr: '',
    category: 'Crop Nutrition',
    readTime: '4 min read',
    author: 'Krivan Agronomy Research Team',
    image: '/assets/images/banners/banner-field.jpg',
    summary: '',
    summary_mr: '',
    content: '',
    content_mr: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [blogFormData, setBlogFormData] = useState(initialBlogForm);
  const [savingProduct, setSavingProduct] = useState(false);
  const [savingBlog, setSavingBlog] = useState(false);
  const [savingCompany, setSavingCompany] = useState(false);
  const [savingInventory, setSavingInventory] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    if (
      (username.trim() === 'admin' && password === 'krivan@123') ||
      (username.trim() === 'admin' && password === 'admin123')
    ) {
      setIsAuthenticated(true);
      localStorage.setItem('krivan_admin_auth', 'true');
    } else {
      setLoginError('Invalid credentials. Try: admin / krivan@123');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('krivan_admin_auth');
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const prodRes = await api.getProducts();
      if (prodRes.success) {
        setProducts(prodRes.data);
        prodRes.data.forEach(async (p) => {
          try {
            const qrRes = await api.getQrCode(p.slug);
            if (qrRes.success) {
              setQrMap(prev => ({ ...prev, [p.slug]: qrRes.qrCode }));
            }
          } catch (e) {}
        });
      }

      const blogRes = await api.getBlogs();
      if (blogRes.success) {
        setBlogs(blogRes.data);
      }

      const catRes = await api.getCategories();
      if (catRes.success) {
        setCategories(catRes.data);
      }

      const enqRes = await api.getEnquiries();
      if (enqRes.success) {
        setEnquiries(enqRes.data);
      }

      const invRes = await api.getInventory();
      if (invRes.success) {
        setInventory(invRes.data);
      }

      const invoiceRes = await api.getInvoices();
      if (invoiceRes.success) {
        setInvoices(invoiceRes.data);
      }

      const cropRes = await api.getCropCalculators();
      if (cropRes.success) {
        setCropCalculators(cropRes.data);
      }

      const compRes = await api.getCompanyInfo();
      if (compRes.success) {
        setCompanyInfo(compRes.data);
      }
    } catch (err) {
      console.error('Error loading admin data', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle Enquiry Status (Only View vs Buy Product)
  const handleUpdateEnquiryStatus = async (id, status, extraData = {}) => {
    try {
      const res = await api.updateEnquiryStatus(id, { status, ...extraData });
      if (res.success) {
        setEnquiries(prev => prev.map(e => e.id === id ? { ...e, ...res.data } : e));
      }
    } catch (err) {
      alert('Error updating enquiry status');
    }
  };

  // Submit Purchase Modal Form
  const handleConfirmPurchase = async (e) => {
    e.preventDefault();
    if (!purchaseModalEnquiry) return;
    await handleUpdateEnquiryStatus(purchaseModalEnquiry.id, 'purchased', purchaseForm);
    setPurchaseModalEnquiry(null);
    setPurchaseForm({ purchased_item: '', purchased_qty: '1', purchased_amount: '' });
  };

  // Inventory Quick Adjust (+ / -)
  const handleAdjustStock = async (id, change, reason = 'Quick Adjustment') => {
    try {
      const res = await api.adjustStock(id, change, reason);
      if (res.success) {
        setInventory(prev => prev.map(item => item.id === id ? { ...item, ...res.data } : item));
      }
    } catch (err) {
      alert('Error adjusting stock');
    }
  };

  // Save Inventory Item Edit
  const handleSaveInventory = async (e) => {
    e.preventDefault();
    setSavingInventory(true);
    try {
      if (editingInventory) {
        const res = await api.updateInventory(editingInventory.id, inventoryForm);
        if (res.success) {
          setInventory(prev => prev.map(item => item.id === editingInventory.id ? { ...item, ...res.data } : item));
          alert('Inventory updated successfully!');
          setEditingInventory(null);
        }
      }
    } catch (err) {
      alert('Error updating inventory');
    } finally {
      setSavingInventory(false);
    }
  };

  // Save Customer Invoice
  const handleSaveInvoice = async (e) => {
    e.preventDefault();
    setSavingInvoice(true);
    try {
      if (editingInvoice && editingInvoice.id && !editingInvoice.id.startsWith('new-')) {
        const res = await api.updateInvoice(editingInvoice.id, invoiceForm);
        if (res.success) {
          setInvoices(prev => prev.map(inv => inv.id === editingInvoice.id ? res.data : inv));
          alert('Customer invoice updated successfully!');
          setEditingInvoice(null);
        }
      } else {
        const res = await api.createInvoice(invoiceForm);
        if (res.success) {
          setInvoices(prev => [res.data, ...prev]);
          alert('New customer tax invoice created!');
          setEditingInvoice(null);
        }
      }
    } catch (err) {
      alert('Error saving invoice');
    } finally {
      setSavingInvoice(false);
    }
  };

  // Delete Customer Invoice
  const handleDeleteInvoice = async (id) => {
    if (!window.confirm('Are you sure you want to delete this customer invoice?')) return;
    try {
      const res = await api.deleteInvoice(id);
      if (res.success) {
        setInvoices(prev => prev.filter(inv => inv.id !== id));
      }
    } catch (err) {
      alert('Error deleting invoice');
    }
  };

  // Print Invoice Action
  const handlePrintInvoice = () => {
    window.print();
  };

  // Category Management Handlers
  const handleOpenAddCategory = () => {
    setEditingCategory(null);
    setCategoryForm({
      name: '',
      name_mr: '',
      slug: '',
      icon: '🌿',
      color: '#15803d',
      description: ''
    });
    setShowCategoryModal(true);
  };

  const handleOpenEditCategory = (cat) => {
    setEditingCategory(cat);
    setCategoryForm({
      name: cat.name || '',
      name_mr: cat.name_mr || '',
      slug: cat.slug || '',
      icon: cat.icon || '🌿',
      color: cat.color || '#15803d',
      description: cat.description || ''
    });
    setShowCategoryModal(true);
  };

  const handleSaveCategory = async (e) => {
    e.preventDefault();
    setSavingCategory(true);
    try {
      if (editingCategory) {
        const res = await api.updateCategory(editingCategory.id || editingCategory.slug, categoryForm);
        if (res.success) {
          setCategories(prev => prev.map(c => (c.id === editingCategory.id || c.slug === editingCategory.slug) ? res.data : c));
          alert('Category updated successfully!');
          setShowCategoryModal(false);
          loadData();
        }
      } else {
        const res = await api.createCategory(categoryForm);
        if (res.success) {
          setCategories(prev => [...prev, res.data]);
          alert('New category created successfully!');
          setShowCategoryModal(false);
          loadData();
        }
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving category');
    } finally {
      setSavingCategory(false);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category? Products linked to it will remain.')) return;
    try {
      const res = await api.deleteCategory(id);
      if (res.success) {
        setCategories(prev => prev.filter(c => c.id !== id && c.slug !== id));
      }
    } catch (err) {
      alert('Error deleting category');
    }
  };

  // Crop Dosage Calculator Handlers
  const handleSaveCropCalc = async (e) => {
    e.preventDefault();
    setSavingCropCalc(true);
    try {
      if (editingCropCalc && editingCropCalc.id && !editingCropCalc.id.startsWith('new-')) {
        const res = await api.updateCropCalculator(editingCropCalc.id, cropCalcForm);
        if (res.success) {
          setCropCalculators(prev => prev.map(c => c.id === editingCropCalc.id ? res.data : c));
          alert('Crop dosage recommendation updated successfully!');
          setEditingCropCalc(null);
        }
      } else {
        const res = await api.createCropCalculator(cropCalcForm);
        if (res.success) {
          setCropCalculators(prev => [...prev, res.data]);
          alert('New crop dosage formula added!');
          setEditingCropCalc(null);
        }
      }
    } catch (err) {
      alert('Error saving crop recommendation');
    } finally {
      setSavingCropCalc(false);
    }
  };

  const handleDeleteCropCalc = async (id) => {
    if (!window.confirm('Are you sure you want to delete this crop recommendation from calculator?')) return;
    try {
      const res = await api.deleteCropCalculator(id);
      if (res.success) {
        setCropCalculators(prev => prev.filter(c => c.id !== id));
      }
    } catch (err) {
      alert('Error deleting crop recommendation');
    }
  };

  // Product Composition Handlers
  const handleAddComposition = () => {
    setFormData({
      ...formData,
      composition: [...formData.composition, { label: '', value: '' }]
    });
  };

  const handleRemoveComposition = (index) => {
    const updated = formData.composition.filter((_, i) => i !== index);
    setFormData({ ...formData, composition: updated });
  };

  const handleCompositionChange = (index, field, value) => {
    const updated = [...formData.composition];
    updated[index][field] = value;
    setFormData({ ...formData, composition: updated });
  };

  // Start Editing Product
  const startEditProduct = (prod) => {
    setEditingId(prod.id);
    setFormData({
      brand_name: prod.brand_name || '',
      brand_name_mr: prod.brand_name_mr || '',
      category: prod.category || 'potash',
      category_display: prod.category_display || 'Potash & Plant Boosters',
      category_display_mr: prod.category_display_mr || '',
      subtitle: prod.subtitle || '',
      subtitle_mr: prod.subtitle_mr || '',
      packing: prod.packing || '',
      target_crops: prod.target_crops || '',
      target_crops_mr: prod.target_crops_mr || '',
      shortDesc: prod.shortDesc || '',
      shortDesc_mr: prod.shortDesc_mr || '',
      benefits: Array.isArray(prod.benefits) ? prod.benefits.join('\n') : (prod.benefits || ''),
      benefits_mr: Array.isArray(prod.benefits_mr) ? prod.benefits_mr.join('\n') : (prod.benefits_mr || ''),
      dosage: prod.dosage || '',
      application_method: prod.application_method || '',
      precautions: prod.precautions || '',
      main_picture: prod.main_picture || '/assets/images/products/kaizen-k.jpg',
      youtube_link: prod.youtube_link || '',
      isFlagship: prod.isFlagship || false,
      composition: Array.isArray(prod.composition) ? prod.composition : []
    });
    setActiveTab('new_product');
  };

  // Save Product (Create or Update)
  const handleSaveProduct = async (e) => {
    e.preventDefault();
    setSavingProduct(true);
    try {
      const payload = {
        ...formData,
        benefits: typeof formData.benefits === 'string' ? formData.benefits.split('\n').filter(b => b.trim().length > 0) : formData.benefits,
        benefits_mr: typeof formData.benefits_mr === 'string' ? formData.benefits_mr.split('\n').filter(b => b.trim().length > 0) : formData.benefits_mr
      };

      if (editingId) {
        const res = await api.updateProduct(editingId, payload);
        if (res.success) {
          alert('Product updated successfully!');
        }
      } else {
        const res = await api.createProduct(payload);
        if (res.success) {
          alert('New product created with live QR Code!');
        }
      }

      setEditingId(null);
      setFormData(initialFormState);
      setActiveTab('products');
      loadData();
    } catch (err) {
      alert('Error saving product');
    } finally {
      setSavingProduct(false);
    }
  };

  // Delete Product
  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await api.deleteProduct(id);
      if (res.success) {
        setProducts(products.filter(p => p.id !== id));
      }
    } catch (err) {
      alert('Error deleting product');
    }
  };

  // ==================== BLOG HANDLERS ====================

  const startEditBlog = (b) => {
    setEditingBlogId(b.id);
    setBlogFormData({
      title: b.title || '',
      title_mr: b.title_mr || '',
      category: b.category || 'Crop Nutrition',
      readTime: b.readTime || '4 min read',
      author: b.author || 'Krivan Agronomy Research Team',
      image: b.image || '/assets/images/banners/banner-field.jpg',
      summary: b.summary || '',
      summary_mr: b.summary_mr || '',
      content: b.content || b.summary || '',
      content_mr: b.content_mr || b.summary_mr || ''
    });
    setActiveTab('new_blog');
  };

  const handleSaveBlog = async (e) => {
    e.preventDefault();
    setSavingBlog(true);
    try {
      if (editingBlogId) {
        const res = await api.updateBlog(editingBlogId, blogFormData);
        if (res.success) {
          alert('Blog article updated successfully!');
        }
      } else {
        const res = await api.createBlog(blogFormData);
        if (res.success) {
          alert('New blog article published successfully!');
        }
      }

      setEditingBlogId(null);
      setBlogFormData(initialBlogForm);
      setActiveTab('blogs');
      loadData();
    } catch (err) {
      alert('Error saving blog article');
    } finally {
      setSavingBlog(false);
    }
  };

  const handleDeleteBlog = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog article?')) return;
    try {
      const res = await api.deleteBlog(id);
      if (res.success) {
        setBlogs(blogs.filter(b => b.id !== id));
      }
    } catch (err) {
      alert('Error deleting blog');
    }
  };

  // Delete Enquiry
  const handleDeleteEnquiry = async (id) => {
    if (!window.confirm('Delete this inquiry record?')) return;
    try {
      const res = await api.deleteEnquiry(id);
      if (res.success) {
        setEnquiries(enquiries.filter(e => e.id !== id));
      }
    } catch (err) {
      alert('Error deleting enquiry');
    }
  };

  // Save Company Info
  const handleSaveCompany = async (e) => {
    e.preventDefault();
    setSavingCompany(true);
    try {
      const res = await api.updateCompanyInfo(companyInfo);
      if (res.success) {
        alert('Company information updated successfully!');
      }
    } catch (err) {
      alert('Error updating company info');
    } finally {
      setSavingCompany(false);
    }
  };

  // Quick Action: Set Product as Hero Banner Featured Product
  const handleSetHeroProduct = async (product) => {
    try {
      const updated = {
        ...companyInfo,
        hero_featured_product_id: product.id,
        hero_product_image: product.main_picture
      };
      const res = await api.updateCompanyInfo(updated);
      if (res.success) {
        setCompanyInfo(updated);
        alert(`🌟 "${product.brand_name}" is now set as the Homepage Hero Banner Product!`);
      }
    } catch (err) {
      alert('Failed to set hero banner product');
    }
  };

  // WhatsApp Automated Tax Invoice Sender
  const handleSendInvoiceWhatsApp = (inv) => {
    const rawPhone = String(inv.phone_number || '').replace(/\D/g, '');
    const cleanPhone = rawPhone.length === 10 ? `91${rawPhone}` : rawPhone;
    const itemsText = inv.items?.map(it => `• ${it.product_name} (${it.quantity} ${it.unit}) - ₹${Number(it.amount || 0).toLocaleString()}`).join('\n') || '';

    const message = `🧾 *KRIVAN INDUSTRIES PVT. LTD.* 🧾\n*OFFICIAL TAX INVOICE*\n\n` +
      `👤 *Customer Name:* ${inv.customer_name}\n` +
      `📄 *Invoice No:* ${inv.invoice_no}\n` +
      `📅 *Date:* ${inv.date}\n` +
      `📍 *Billing Address:* ${inv.address || 'Maharashtra'}\n\n` +
      `🛒 *Purchased Formulations:*\n${itemsText}\n\n` +
      `💰 *Subtotal:* ₹${Number(inv.subtotal || 0).toLocaleString()}\n` +
      `📊 *GST Tax (${inv.tax_rate || 5}%):* ₹${Number(inv.tax_amount || 0).toLocaleString()}\n` +
      `💵 *TOTAL AMOUNT:* ₹${Number(inv.total_price || 0).toLocaleString()}\n` +
      `🟢 *Payment Status:* ${inv.payment_status} (${inv.payment_mode || 'Online'})\n\n` +
      `🌐 *Scan Smart QR & Dosage:* http://localhost:5173\n` +
      `📞 *Customer Care:* +91 98765 43210\n\n` +
      `_धन्यवाद! क्रिव्हन सेंद्रिय खतांचा वापर करून भरघोस पीक मिळवा._`;

    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  // Filtered products list
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.brand_name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      (p.subtitle && p.subtitle.toLowerCase().includes(searchFilter.toLowerCase())) ||
      (p.target_crops && p.target_crops.toLowerCase().includes(searchFilter.toLowerCase()));
    const matchesCat = categoryFilter === 'all' || p.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  /* ==========================================================================
     LOGIN SCREEN
     ========================================================================== */
  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'radial-gradient(circle at 10% 20%, #064e3b 0%, #0a2616 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '24px',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.35)',
          maxWidth: '440px',
          width: '100%',
          padding: '2.75rem',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <div className="text-center mb-4">
            <div style={{
              background: 'linear-gradient(135deg, #15803d, #047857)',
              color: 'white',
              width: '64px',
              height: '64px',
              borderRadius: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '800',
              fontSize: '1.8rem',
              margin: '0 auto 1.25rem',
              boxShadow: '0 10px 25px rgba(21, 128, 61, 0.4)'
            }}>
              K
            </div>
            <h2 style={{ fontSize: '1.65rem', color: '#0f172a', fontWeight: '800' }}>Admin Dashboard</h2>
            <p style={{ fontSize: '0.88rem', color: '#64748b', marginTop: '4px' }}>
              Sign in to manage agro products, QR codes, blogs & leads
            </p>
          </div>

          {loginError && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', padding: '10px', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">Username</label>
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', left: '14px', top: '13px', color: '#94a3b8' }} />
                <input
                  type="text"
                  required
                  className="form-input"
                  style={{ paddingLeft: '42px', borderRadius: '10px' }}
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '14px', top: '13px', color: '#94a3b8' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="form-input"
                  style={{ paddingLeft: '42px', paddingRight: '40px', borderRadius: '10px' }}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '12px', top: '12px', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.85rem', fontSize: '1rem', marginTop: '0.75rem', borderRadius: '10px' }}>
              <Lock size={16} /> Sign In
            </button>
          </form>

          <div style={{ marginTop: '1.5rem', background: '#f8fafc', padding: '12px', borderRadius: '10px', fontSize: '0.82rem', border: '1px dashed #cbd5e1' }}>
            <div style={{ fontWeight: '700', color: '#0f172a', marginBottom: '2px' }}>Default Credentials:</div>
            <div>Username: <code style={{ color: '#15803d', fontWeight: 'bold' }}>admin</code></div>
            <div>Password: <code style={{ color: '#15803d', fontWeight: 'bold' }}>krivan@123</code></div>
          </div>
        </div>
      </div>
    );
  }

  /* ==========================================================================
     PROFESSIONAL SIDEBAR ADMIN LAYOUT
     ========================================================================== */
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f1f5f9' }}>
      
      {/* 🟢 FIXED LEFT SIDEBAR */}
      <aside className={`admin-sidebar ${mobileSidebarOpen ? 'open' : ''}`} style={{
        width: '280px',
        background: '#0a2616',
        color: '#e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        position: 'sticky',
        top: 0,
        height: '100vh',
        boxShadow: '4px 0 24px rgba(0,0,0,0.15)',
        zIndex: 100,
        flexShrink: 0
      }}>
        {/* Brand Header */}
        <div style={{ padding: '1.35rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Logo size="small" variant="light" />
          <button
            className="mobile-sidebar-toggle"
            onClick={() => setMobileSidebarOpen(false)}
            style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px' }}
            aria-label="Close Sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Links */}
        <div style={{ padding: '1.25rem 0.85rem', display: 'flex', flexDirection: 'column', gap: '6px', flexGrow: 1, overflowY: 'auto' }}>
          
          <button
            onClick={() => selectTab('overview')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.75rem 1rem',
              borderRadius: '10px',
              border: 'none',
              background: activeTab === 'overview' ? 'rgba(34, 197, 94, 0.18)' : 'transparent',
              color: activeTab === 'overview' ? '#4ade80' : '#cbd5e1',
              fontWeight: activeTab === 'overview' ? '700' : '500',
              fontSize: '0.92rem',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <div className="flex items-center gap-3">
              <LayoutDashboard size={18} />
              <span>Overview</span>
            </div>
          </button>

          <button
            onClick={() => selectTab('products')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.75rem 1rem',
              borderRadius: '10px',
              border: 'none',
              background: activeTab === 'products' ? 'rgba(34, 197, 94, 0.18)' : 'transparent',
              color: activeTab === 'products' ? '#4ade80' : '#cbd5e1',
              fontWeight: activeTab === 'products' ? '700' : '500',
              fontSize: '0.92rem',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <div className="flex items-center gap-3">
              <Package size={18} />
              <span>All Products</span>
            </div>
            <span style={{ background: '#166534', color: '#86efac', fontSize: '0.75rem', padding: '2px 8px', borderRadius: '12px', fontWeight: '700' }}>
              {products.length}
            </span>
          </button>

          <button
            onClick={() => { setEditingId(null); setFormData(initialFormState); selectTab('new_product'); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.75rem 1rem',
              borderRadius: '10px',
              border: 'none',
              background: activeTab === 'new_product' ? 'rgba(34, 197, 94, 0.18)' : 'transparent',
              color: activeTab === 'new_product' ? '#4ade80' : '#cbd5e1',
              fontWeight: activeTab === 'new_product' ? '700' : '500',
              fontSize: '0.92rem',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <div className="flex items-center gap-3">
              <PlusCircle size={18} />
              <span>{editingId ? 'Edit Product' : 'Add New Product'}</span>
            </div>
          </button>

          {/* 🏷️ CATEGORIES MANAGEMENT TAB */}
          <button
            onClick={() => selectTab('categories')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.75rem 1rem',
              borderRadius: '10px',
              border: 'none',
              background: activeTab === 'categories' ? 'rgba(34, 197, 94, 0.18)' : 'transparent',
              color: activeTab === 'categories' ? '#4ade80' : '#cbd5e1',
              fontWeight: activeTab === 'categories' ? '700' : '500',
              fontSize: '0.92rem',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <div className="flex items-center gap-3">
              <Tag size={18} />
              <span>Categories</span>
            </div>
            <span style={{ background: '#047857', color: '#a7f3d0', fontSize: '0.75rem', padding: '2px 8px', borderRadius: '12px', fontWeight: '700' }}>
              {categories.length}
            </span>
          </button>

          <button
            onClick={() => selectTab('qr_hub')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.75rem 1rem',
              borderRadius: '10px',
              border: 'none',
              background: activeTab === 'qr_hub' ? 'rgba(34, 197, 94, 0.18)' : 'transparent',
              color: activeTab === 'qr_hub' ? '#4ade80' : '#cbd5e1',
              fontWeight: activeTab === 'qr_hub' ? '700' : '500',
              fontSize: '0.92rem',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <div className="flex items-center gap-3">
              <QrCode size={18} />
              <span>Smart QR Hub</span>
            </div>
          </button>

          {/* 📦 INVENTORY MANAGEMENT TAB */}
          <button
            onClick={() => selectTab('inventory')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.75rem 1rem',
              borderRadius: '10px',
              border: 'none',
              background: activeTab === 'inventory' ? 'rgba(34, 197, 94, 0.18)' : 'transparent',
              color: activeTab === 'inventory' ? '#4ade80' : '#cbd5e1',
              fontWeight: activeTab === 'inventory' ? '700' : '500',
              fontSize: '0.92rem',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <div className="flex items-center gap-3">
              <Boxes size={18} />
              <span>Inventory & Stock</span>
            </div>
            {inventory.filter(i => i.status === 'low_stock' || i.status === 'out_of_stock').length > 0 ? (
              <span style={{ background: '#ef4444', color: '#ffffff', fontSize: '0.72rem', padding: '2px 7px', borderRadius: '12px', fontWeight: '800' }}>
                {inventory.filter(i => i.status === 'low_stock' || i.status === 'out_of_stock').length} Low
              </span>
            ) : (
              <span style={{ background: '#166534', color: '#86efac', fontSize: '0.75rem', padding: '2px 8px', borderRadius: '12px', fontWeight: '700' }}>
                {inventory.length}
              </span>
            )}
          </button>

          {/* 📰 DYNAMIC BLOGS TAB */}
          <button
            onClick={() => selectTab('blogs')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.75rem 1rem',
              borderRadius: '10px',
              border: 'none',
              background: activeTab === 'blogs' || activeTab === 'new_blog' ? 'rgba(34, 197, 94, 0.18)' : 'transparent',
              color: activeTab === 'blogs' || activeTab === 'new_blog' ? '#4ade80' : '#cbd5e1',
              fontWeight: activeTab === 'blogs' || activeTab === 'new_blog' ? '700' : '500',
              fontSize: '0.92rem',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <div className="flex items-center gap-3">
              <BookOpen size={18} />
              <span>Agri Blogs</span>
            </div>
            <span style={{ background: '#1e3a8a', color: '#93c5fd', fontSize: '0.75rem', padding: '2px 8px', borderRadius: '12px', fontWeight: '700' }}>
              {blogs.length}
            </span>
          </button>

          <button
            onClick={() => selectTab('enquiries')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.75rem 1rem',
              borderRadius: '10px',
              border: 'none',
              background: activeTab === 'enquiries' ? 'rgba(34, 197, 94, 0.18)' : 'transparent',
              color: activeTab === 'enquiries' ? '#4ade80' : '#cbd5e1',
              fontWeight: activeTab === 'enquiries' ? '700' : '500',
              fontSize: '0.92rem',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <div className="flex items-center gap-3">
              <MessageSquare size={18} />
              <span>Farmer Leads</span>
            </div>
            {enquiries.length > 0 && (
              <span style={{ background: '#ca8a04', color: '#fef08a', fontSize: '0.75rem', padding: '2px 8px', borderRadius: '12px', fontWeight: '700' }}>
                {enquiries.length}
              </span>
            )}
          </button>

          {/* 🧾 CUSTOMER ORDERS & INVOICES TAB */}
          <button
            onClick={() => selectTab('customers')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.75rem 1rem',
              borderRadius: '10px',
              border: 'none',
              background: activeTab === 'customers' ? 'rgba(34, 197, 94, 0.18)' : 'transparent',
              color: activeTab === 'customers' ? '#4ade80' : '#cbd5e1',
              fontWeight: activeTab === 'customers' ? '700' : '500',
              fontSize: '0.92rem',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <div className="flex items-center gap-3">
              <FileText size={18} />
              <span>Customers & Bills</span>
            </div>
            <span style={{ background: '#0284c7', color: '#e0f2fe', fontSize: '0.75rem', padding: '2px 8px', borderRadius: '12px', fontWeight: '700' }}>
              {invoices.length}
            </span>
          </button>

          {/* 📊 BUSINESS INTELLIGENCE & CHARTS TAB */}
          <button
            onClick={() => selectTab('analytics')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.75rem 1rem',
              borderRadius: '10px',
              border: 'none',
              background: activeTab === 'analytics' ? 'rgba(34, 197, 94, 0.18)' : 'transparent',
              color: activeTab === 'analytics' ? '#4ade80' : '#cbd5e1',
              fontWeight: activeTab === 'analytics' ? '700' : '500',
              fontSize: '0.92rem',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <div className="flex items-center gap-3">
              <BarChart3 size={18} />
              <span>Sales & Analytics</span>
            </div>
            <span style={{ background: '#0f766e', color: '#ccfbf1', fontSize: '0.72rem', padding: '2px 7px', borderRadius: '12px', fontWeight: '800' }}>
              PRO
            </span>
          </button>

          {/* 🌾 CROP DOSAGE CALCULATOR TAB */}
          <button
            onClick={() => selectTab('calculator')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.75rem 1rem',
              borderRadius: '10px',
              border: 'none',
              background: activeTab === 'calculator' ? 'rgba(34, 197, 94, 0.18)' : 'transparent',
              color: activeTab === 'calculator' ? '#4ade80' : '#cbd5e1',
              fontWeight: activeTab === 'calculator' ? '700' : '500',
              fontSize: '0.92rem',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <div className="flex items-center gap-3">
              <Calculator size={18} />
              <span>Crop Calculator</span>
            </div>
            <span style={{ background: '#ca8a04', color: '#fef9c3', fontSize: '0.75rem', padding: '2px 8px', borderRadius: '12px', fontWeight: '700' }}>
              {cropCalculators.length}
            </span>
          </button>

          <button
            onClick={() => selectTab('company')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.75rem 1rem',
              borderRadius: '10px',
              border: 'none',
              background: activeTab === 'company' ? 'rgba(34, 197, 94, 0.18)' : 'transparent',
              color: activeTab === 'company' ? '#4ade80' : '#cbd5e1',
              fontWeight: activeTab === 'company' ? '700' : '500',
              fontSize: '0.92rem',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <div className="flex items-center gap-3">
              <Building2 size={18} />
              <span>Company Settings</span>
            </div>
          </button>

          <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', margin: '0.75rem 0' }}></div>

          <Link
            to="/"
            target="_blank"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '0.75rem 1rem',
              color: '#94a3b8',
              fontSize: '0.88rem',
              borderRadius: '10px'
            }}
          >
            <ExternalLink size={16} />
            <span>View Live Website</span>
          </Link>
        </div>

        {/* Sidebar Footer / User Profile */}
        <div style={{ padding: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="flex items-center gap-2">
            <div style={{ width: '36px', height: '36px', background: '#166534', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#86efac', fontWeight: 'bold' }}>
              A
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'white' }}>Administrator</div>
              <div style={{ fontSize: '0.72rem', color: '#4ade80' }}>Super Admin</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '6px', borderRadius: '6px' }}
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </aside>

      {/* ⚪ MAIN CONTENT AREA */}
      <main style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        
        {/* Top Header Bar */}
        <header style={{
          background: 'white',
          padding: '0.85rem 1.5rem',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 50
        }}>
          <div className="flex items-center gap-2" style={{ fontSize: '0.88rem', color: '#64748b' }}>
            <button
              className="mobile-sidebar-toggle btn btn-light"
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              style={{ padding: '6px 8px' }}
              title="Open Navigation"
            >
              <Menu size={18} />
            </button>
            <span>Admin</span>
            <ChevronRight size={15} />
            <span style={{ color: '#0f172a', fontWeight: '700', textTransform: 'capitalize' }}>
              {activeTab.replace('_', ' ')}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadData}
              className="btn btn-light"
              style={{ fontSize: '0.8rem', padding: '0.4rem 0.75rem' }}
              title="Refresh Data"
            >
              <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
              <span>Refresh</span>
            </button>
            <Link
              to="/"
              className="btn btn-primary"
              style={{ fontSize: '0.8rem', padding: '0.4rem 0.85rem' }}
            >
              <Home size={13} />
              <span>Main Site</span>
            </Link>
          </div>
        </header>

        {/* Mobile Backdrop */}
        {mobileSidebarOpen && (
          <div
            onClick={() => setMobileSidebarOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(3px)',
              zIndex: 90
            }}
          />
        )}

        {/* Content Body Container */}
        <div className="admin-content-pad" style={{ padding: '2rem', maxWidth: '1400px', width: '100%', margin: '0 auto' }}>

          {/* ==========================================================================
              TAB: OVERVIEW DASHBOARD
              ========================================================================== */}
          {activeTab === 'overview' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h1 style={{ fontSize: '1.8rem', fontWeight: '800' }}>Agricultural Portal Overview</h1>
                  <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Real-time statistics of product portfolio, blogs, and customer inquiries.</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => { setEditingId(null); setFormData(initialFormState); setActiveTab('new_product'); }}
                    className="btn btn-primary"
                  >
                    <Plus size={16} /> Add Product
                  </button>
                  <button
                    onClick={() => { setEditingBlogId(null); setBlogFormData(initialBlogForm); setActiveTab('new_blog'); }}
                    className="btn btn-light"
                  >
                    <BookOpen size={16} /> Write Blog
                  </button>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-4 gap-3 mb-5">
                <div className="card" style={{ padding: '1.5rem', background: 'white' }}>
                  <div className="flex justify-between items-center mb-2">
                    <span style={{ color: '#64748b', fontSize: '0.82rem', fontWeight: '700' }}>TOTAL PRODUCTS</span>
                    <div style={{ background: '#dcfce7', color: '#15803d', padding: '6px', borderRadius: '8px' }}>
                      <Package size={18} />
                    </div>
                  </div>
                  <div style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a' }}>{products.length}</div>
                  <div style={{ fontSize: '0.78rem', color: '#16a34a', marginTop: '4px' }}>Active in catalogue</div>
                </div>

                <div className="card" style={{ padding: '1.5rem', background: 'white' }}>
                  <div className="flex justify-between items-center mb-2">
                    <span style={{ color: '#64748b', fontSize: '0.82rem', fontWeight: '700' }}>PUBLISHED BLOGS</span>
                    <div style={{ background: '#dbeafe', color: '#1d4ed8', padding: '6px', borderRadius: '8px' }}>
                      <BookOpen size={18} />
                    </div>
                  </div>
                  <div style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a' }}>{blogs.length}</div>
                  <div style={{ fontSize: '0.78rem', color: '#2563eb', marginTop: '4px' }}>Advisory & Articles</div>
                </div>

                <div className="card" style={{ padding: '1.5rem', background: 'white' }}>
                  <div className="flex justify-between items-center mb-2">
                    <span style={{ color: '#64748b', fontSize: '0.82rem', fontWeight: '700' }}>FARMER ENQUIRIES</span>
                    <div style={{ background: '#fef9c3', color: '#854d0e', padding: '6px', borderRadius: '8px' }}>
                      <MessageSquare size={18} />
                    </div>
                  </div>
                  <div style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a' }}>{enquiries.length}</div>
                  <div style={{ fontSize: '0.78rem', color: '#ca8a04', marginTop: '4px' }}>Leads & Dealer requests</div>
                </div>

                <div className="card" style={{ padding: '1.5rem', background: 'white' }}>
                  <div className="flex justify-between items-center mb-2">
                    <span style={{ color: '#64748b', fontSize: '0.82rem', fontWeight: '700' }}>SMART QR CODES</span>
                    <div style={{ background: '#e0f2fe', color: '#0284c7', padding: '6px', borderRadius: '8px' }}>
                      <QrCode size={18} />
                    </div>
                  </div>
                  <div style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a' }}>{Object.keys(qrMap).length}</div>
                  <div style={{ fontSize: '0.78rem', color: '#0284c7', marginTop: '4px' }}>100% Traceability Ready</div>
                </div>
              </div>

              {/* Recent Products & Blogs split view */}
              <div className="grid grid-cols-2 gap-4">
                {/* Recent Products */}
                <div className="card" style={{ padding: '1.5rem', background: 'white' }}>
                  <div className="flex justify-between items-center mb-3">
                    <h2 style={{ fontSize: '1.15rem' }}>Top Products</h2>
                    <button onClick={() => setActiveTab('products')} className="btn btn-outline" style={{ padding: '3px 10px', fontSize: '0.78rem' }}>
                      View All
                    </button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {products.slice(0, 4).map(p => (
                      <div key={p.id} className="flex justify-between items-center" style={{ padding: '8px 12px', background: '#f8fafc', borderRadius: '8px' }}>
                        <div className="flex items-center gap-3">
                          <img src={p.main_picture} alt={p.brand_name} style={{ width: '36px', height: '36px', objectFit: 'contain' }} />
                          <div>
                            <strong style={{ fontSize: '0.9rem', color: '#0f172a' }}>{p.brand_name}</strong>
                            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{p.packing || p.category}</div>
                          </div>
                        </div>
                        {qrMap[p.slug] && (
                          <a href={qrMap[p.slug]} download={`${p.slug}-qr.png`} className="btn btn-light" style={{ padding: '3px 8px', fontSize: '0.75rem' }}>
                            <Download size={13} /> QR
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Blogs */}
                <div className="card" style={{ padding: '1.5rem', background: 'white' }}>
                  <div className="flex justify-between items-center mb-3">
                    <h2 style={{ fontSize: '1.15rem' }}>Recent Advisory Blogs</h2>
                    <button onClick={() => setActiveTab('blogs')} className="btn btn-outline" style={{ padding: '3px 10px', fontSize: '0.78rem' }}>
                      Manage Blogs
                    </button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {blogs.slice(0, 4).map(b => (
                      <div key={b.id} className="flex justify-between items-center" style={{ padding: '8px 12px', background: '#f8fafc', borderRadius: '8px' }}>
                        <div className="flex items-center gap-3">
                          <img src={b.image} alt={b.title} style={{ width: '36px', height: '36px', objectFit: 'cover', borderRadius: '6px' }} />
                          <div>
                            <strong style={{ fontSize: '0.88rem', color: '#0f172a' }}>{b.title}</strong>
                            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{b.category} • {b.date}</div>
                          </div>
                        </div>
                        <a href={`/blog/${b.slug || b.id}`} target="_blank" rel="noreferrer" className="btn btn-light" style={{ padding: '3px 8px', fontSize: '0.75rem' }}>
                          <ExternalLink size={13} />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 📊 Visual Sales Analytics & Inventory Control in Overview */}
              <div style={{ marginTop: '2rem' }}>
                <AdminAnalytics inventory={inventory} />
              </div>
            </div>
          )}

          {/* ==========================================================================
              TAB: DEDICATED SALES & BUSINESS INTELLIGENCE ANALYTICS
              ========================================================================== */}
          {activeTab === 'analytics' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h1 style={{ fontSize: '1.8rem', fontWeight: '800' }}>Sales Analytics & Inventory Intelligence</h1>
                  <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Real-time fertilizer revenue charts, high-profit crop metrics, and warehouse FIFO batch alerts.</p>
                </div>
              </div>
              <AdminAnalytics inventory={inventory} />
            </div>
          )}

          {/* ==========================================================================
              TAB: ALL PRODUCTS TABLE & SEARCH
              ========================================================================== */}
          {activeTab === 'products' && (
            <div className="card" style={{ padding: '1.75rem', background: 'white' }}>
              <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
                <div>
                  <h2 style={{ fontSize: '1.4rem' }}>Products Portfolio</h2>
                  <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Manage fertilizers, dosage specifications, packaging & QR codes.</p>
                </div>
                <button
                  onClick={() => { setEditingId(null); setFormData(initialFormState); setActiveTab('new_product'); }}
                  className="btn btn-primary"
                  style={{ fontSize: '0.88rem' }}
                >
                  <Plus size={16} /> Add Product
                </button>
              </div>

              {/* Filter Controls */}
              <div className="flex justify-between items-center mb-4 gap-3 flex-wrap">
                <div style={{ position: 'relative', width: '320px' }}>
                  <Search size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: '#94a3b8' }} />
                  <input
                    type="text"
                    className="form-input"
                    style={{ paddingLeft: '36px', height: '40px', fontSize: '0.88rem' }}
                    placeholder="Search products, crops..."
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                  />
                </div>

                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => setCategoryFilter('all')}
                    className={`btn ${categoryFilter === 'all' ? 'btn-primary' : 'btn-light'}`}
                    style={{ padding: '0.4rem 0.9rem', fontSize: '0.82rem' }}
                  >
                    All ({products.length})
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.slug}
                      onClick={() => setCategoryFilter(cat.slug)}
                      className={`btn ${categoryFilter === cat.slug ? 'btn-primary' : 'btn-light'}`}
                      style={{ padding: '0.4rem 0.9rem', fontSize: '0.82rem' }}
                    >
                      {cat.icon || '🏷️'} {cat.name} ({products.filter(p => p.category === cat.slug).length})
                    </button>
                  ))}
                </div>
              </div>

              {/* Table */}
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                      <th style={{ padding: '12px 10px' }}>Product</th>
                      <th style={{ padding: '12px 10px' }}>Category</th>
                      <th style={{ padding: '12px 10px' }}>Packaging</th>
                      <th style={{ padding: '12px 10px' }}>Target Crops</th>
                      <th style={{ padding: '12px 10px', textAlign: 'center' }}>Smart QR</th>
                      <th style={{ padding: '12px 10px', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((p) => (
                      <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '12px 10px' }}>
                          <div className="flex items-center gap-3">
                            <img
                              src={p.main_picture}
                              alt={p.brand_name}
                              style={{ width: '48px', height: '48px', objectFit: 'contain', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://images.unsplash.com/photo-1592417817098-8f3d6eb22510?w=100';
                              }}
                            />
                            <div>
                              <strong style={{ color: '#0f172a', fontSize: '1rem' }}>{p.brand_name}</strong>
                              {companyInfo?.hero_featured_product_id === p.id && (
                                <span className="badge badge-primary" style={{ marginLeft: '6px', fontSize: '0.7rem', background: '#eab308', color: '#1c1917', fontWeight: '800' }}>
                                  ⭐ Hero Banner
                                </span>
                              )}
                              {p.isFlagship && companyInfo?.hero_featured_product_id !== p.id && (
                                <span className="badge badge-gold" style={{ marginLeft: '6px', fontSize: '0.7rem' }}>Flagship</span>
                              )}
                              <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{p.subtitle}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '12px 10px' }}>
                          <span className="badge badge-green">{p.category_display || p.category}</span>
                        </td>
                        <td style={{ padding: '12px 10px', color: '#475569', fontWeight: '600' }}>{p.packing || 'N/A'}</td>
                        <td style={{ padding: '12px 10px', color: '#64748b', maxWidth: '200px' }}>{p.target_crops || 'All Crops'}</td>
                        <td style={{ padding: '12px 10px', textAlign: 'center' }}>
                          {qrMap[p.slug] ? (
                            <div className="flex items-center justify-center gap-2">
                              <img src={qrMap[p.slug]} alt="QR" style={{ width: '40px', height: '40px', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
                              <a
                                href={qrMap[p.slug]}
                                download={`${p.slug}-qr.png`}
                                className="btn btn-light"
                                style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                                title="Download QR PNG"
                              >
                                <Download size={14} />
                              </a>
                            </div>
                          ) : (
                            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Generating...</span>
                          )}
                        </td>
                        <td style={{ padding: '12px 10px', textAlign: 'right' }}>
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleSetHeroProduct(p)}
                              className={`btn ${companyInfo?.hero_featured_product_id === p.id ? 'btn-primary' : 'btn-light'}`}
                              style={{
                                padding: '6px 10px',
                                fontSize: '0.78rem',
                                background: companyInfo?.hero_featured_product_id === p.id ? '#eab308' : '#fffbeb',
                                color: companyInfo?.hero_featured_product_id === p.id ? '#1c1917' : '#d97706',
                                borderColor: '#fde68a'
                              }}
                              title={companyInfo?.hero_featured_product_id === p.id ? 'Active Hero Banner Product' : 'Feature this product on Homepage Hero Banner'}
                            >
                              <Star size={14} fill={companyInfo?.hero_featured_product_id === p.id ? '#1c1917' : 'none'} />
                            </button>
                            <a
                              href={`/product/${p.slug}`}
                              target="_blank"
                              rel="noreferrer"
                              className="btn btn-outline"
                              style={{ padding: '6px 10px', fontSize: '0.78rem' }}
                              title="Preview Landing Page"
                            >
                              <Eye size={14} />
                            </a>
                            <button
                              onClick={() => startEditProduct(p)}
                              className="btn btn-light"
                              style={{ padding: '6px 10px', fontSize: '0.78rem' }}
                              title="Edit Product"
                            >
                              <Edit3 size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(p.id)}
                              className="btn btn-light"
                              style={{ padding: '6px 10px', color: '#ef4444', border: '1px solid #fee2e2' }}
                              title="Delete Product"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ==========================================================================
              TAB: PRODUCT CATEGORIES MANAGEMENT
              ========================================================================== */}
          {activeTab === 'categories' && (
            <div className="card" style={{ padding: '1.75rem', background: 'white' }}>
              <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
                <div>
                  <h2 style={{ fontSize: '1.4rem' }}>Product Categories ({categories.length})</h2>
                  <p style={{ color: '#64748b', fontSize: '0.85rem' }}>
                    Create and manage agricultural product categories, Marathi titles & catalog filters.
                  </p>
                </div>
                <button
                  onClick={handleOpenAddCategory}
                  className="btn btn-primary"
                  style={{ fontSize: '0.88rem' }}
                >
                  <Plus size={16} /> Add New Category
                </button>
              </div>

              {/* Search Box */}
              <div className="flex justify-between items-center mb-4 gap-3 flex-wrap">
                <div style={{ position: 'relative', width: '320px' }}>
                  <Search size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: '#94a3b8' }} />
                  <input
                    type="text"
                    className="form-input"
                    style={{ paddingLeft: '36px', height: '40px', fontSize: '0.88rem' }}
                    placeholder="Search categories..."
                    value={categorySearch}
                    onChange={(e) => setCategorySearch(e.target.value)}
                  />
                </div>
              </div>

              {/* Categories Table */}
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                      <th style={{ padding: '12px 10px' }}>Category Name</th>
                      <th style={{ padding: '12px 10px' }}>मराठी नाव</th>
                      <th style={{ padding: '12px 10px' }}>Slug / Key</th>
                      <th style={{ padding: '12px 10px' }}>Active Products</th>
                      <th style={{ padding: '12px 10px' }}>Description</th>
                      <th style={{ padding: '12px 10px', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories
                      .filter(c => 
                        c.name.toLowerCase().includes(categorySearch.toLowerCase()) || 
                        (c.name_mr && c.name_mr.toLowerCase().includes(categorySearch.toLowerCase())) ||
                        c.slug.toLowerCase().includes(categorySearch.toLowerCase())
                      )
                      .map((cat) => {
                        const count = products.filter(p => p.category === cat.slug).length;
                        return (
                          <tr key={cat.slug} style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <td style={{ padding: '12px 10px' }}>
                              <div className="flex items-center gap-2">
                                <span style={{ fontSize: '1.3rem' }}>{cat.icon || '🌿'}</span>
                                <div>
                                  <strong style={{ color: '#0f172a' }}>{cat.name}</strong>
                                </div>
                              </div>
                            </td>
                            <td style={{ padding: '12px 10px', color: '#15803d', fontWeight: 'bold' }}>
                              {cat.name_mr || '—'}
                            </td>
                            <td style={{ padding: '12px 10px' }}>
                              <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.8rem', color: '#0284c7' }}>
                                {cat.slug}
                              </code>
                            </td>
                            <td style={{ padding: '12px 10px' }}>
                              <span className="badge badge-green" style={{ fontSize: '0.78rem' }}>
                                {count} Products
                              </span>
                            </td>
                            <td style={{ padding: '12px 10px', color: '#64748b', fontSize: '0.82rem', maxWidth: '300px' }}>
                              {cat.description || '—'}
                            </td>
                            <td style={{ padding: '12px 10px', textAlign: 'right' }}>
                              <div className="flex justify-end gap-2">
                                <button
                                  onClick={() => handleOpenEditCategory(cat)}
                                  className="btn btn-light"
                                  style={{ padding: '6px 10px', fontSize: '0.78rem' }}
                                  title="Edit Category"
                                >
                                  <Edit3 size={14} />
                                </button>
                                <button
                                  onClick={() => handleDeleteCategory(cat.id || cat.slug)}
                                  className="btn btn-light"
                                  style={{ padding: '6px 10px', color: '#ef4444', border: '1px solid #fee2e2' }}
                                  title="Delete Category"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ==========================================================================
              TAB: BLOGS LIST & MANAGEMENT
              ========================================================================== */}
          {activeTab === 'blogs' && (
            <div className="card" style={{ padding: '1.75rem', background: 'white' }}>
              <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
                <div>
                  <h2 style={{ fontSize: '1.4rem' }}>Agri Blogs & Knowledge Articles ({blogs.length})</h2>
                  <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Create, update and manage crop advice articles for farmers.</p>
                </div>
                <button
                  onClick={() => { setEditingBlogId(null); setBlogFormData(initialBlogForm); setActiveTab('new_blog'); }}
                  className="btn btn-primary"
                  style={{ fontSize: '0.88rem' }}
                >
                  <Plus size={16} /> Write New Article
                </button>
              </div>

              {blogs.length === 0 ? (
                <p>No blog articles published yet.</p>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                    <thead>
                      <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                        <th style={{ padding: '12px 10px' }}>Article</th>
                        <th style={{ padding: '12px 10px' }}>Category</th>
                        <th style={{ padding: '12px 10px' }}>Author & Date</th>
                        <th style={{ padding: '12px 10px', textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {blogs.map(b => (
                        <tr key={b.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '12px 10px' }}>
                            <div className="flex items-center gap-3">
                              <img src={b.image} alt={b.title} style={{ width: '56px', height: '42px', objectFit: 'cover', borderRadius: '6px' }} />
                              <div>
                                <strong style={{ color: '#0f172a' }}>{b.title}</strong>
                                {b.title_mr && <div style={{ fontSize: '0.78rem', color: '#15803d' }}>{b.title_mr}</div>}
                              </div>
                            </div>
                          </td>
                          <td style={{ padding: '12px 10px' }}>
                            <span className="badge badge-green">{b.category}</span>
                          </td>
                          <td style={{ padding: '12px 10px', fontSize: '0.82rem', color: '#64748b' }}>
                            <div>{b.author || 'Research Team'}</div>
                            <div>{b.date} • {b.readTime}</div>
                          </td>
                          <td style={{ padding: '12px 10px', textAlign: 'right' }}>
                            <div className="flex justify-end gap-2">
                              <a href={`/blog/${b.slug || b.id}`} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ padding: '5px 9px', fontSize: '0.78rem' }}>
                                <Eye size={14} />
                              </a>
                              <button onClick={() => startEditBlog(b)} className="btn btn-light" style={{ padding: '5px 9px', fontSize: '0.78rem' }}>
                                <Edit3 size={14} />
                              </button>
                              <button onClick={() => handleDeleteBlog(b.id)} className="btn btn-light" style={{ padding: '5px 9px', color: '#ef4444', border: '1px solid #fee2e2' }}>
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ==========================================================================
              TAB: WRITE / EDIT BLOG FORM
              ========================================================================== */}
          {activeTab === 'new_blog' && (
            <div className="card" style={{ padding: '2.5rem', maxWidth: '900px', margin: '0 auto', background: 'white' }}>
              <div className="flex justify-between items-center mb-4 pb-3" style={{ borderBottom: '1px solid #e2e8f0' }}>
                <div>
                  <h2 style={{ fontSize: '1.6rem' }}>{editingBlogId ? 'Edit Blog Article' : 'Write New Agricultural Article'}</h2>
                  <p style={{ fontSize: '0.88rem', color: '#64748b' }}>Publish crop nutrition advice for farmers in English and Marathi.</p>
                </div>
                {editingBlogId && (
                  <button onClick={() => { setEditingBlogId(null); setBlogFormData(initialBlogForm); setActiveTab('blogs'); }} className="btn btn-light" style={{ fontSize: '0.82rem' }}>
                    <X size={15} /> Cancel
                  </button>
                )}
              </div>

              <form onSubmit={handleSaveBlog}>
                <div className="grid grid-cols-2 gap-3">
                  <div className="form-group">
                    <label className="form-label">Article Title (English) *</label>
                    <input
                      type="text"
                      required
                      className="form-input"
                      placeholder="e.g. Maximizing Grape Yields with Bio-Potash"
                      value={blogFormData.title}
                      onChange={(e) => setBlogFormData({ ...blogFormData, title: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Article Title (मराठी)</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="उदा. बायो-पोटॅशच्या सहाय्याने द्राक्षांचे उत्पादन वाढवा"
                      value={blogFormData.title_mr}
                      onChange={(e) => setBlogFormData({ ...blogFormData, title_mr: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Crop Nutrition / Soil Science"
                      value={blogFormData.category}
                      onChange={(e) => setBlogFormData({ ...blogFormData, category: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Read Time</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. 5 min read"
                      value={blogFormData.readTime}
                      onChange={(e) => setBlogFormData({ ...blogFormData, readTime: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Featured Image URL</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="/assets/images/banners/banner-field.jpg"
                      value={blogFormData.image}
                      onChange={(e) => setBlogFormData({ ...blogFormData, image: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="form-group">
                    <label className="form-label">Short Summary (English)</label>
                    <textarea
                      rows={2}
                      className="form-textarea"
                      placeholder="One paragraph summary..."
                      value={blogFormData.summary}
                      onChange={(e) => setBlogFormData({ ...blogFormData, summary: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Short Summary (मराठी)</label>
                    <textarea
                      rows={2}
                      className="form-textarea"
                      placeholder="थोडक्यात सारांश..."
                      value={blogFormData.summary_mr}
                      onChange={(e) => setBlogFormData({ ...blogFormData, summary_mr: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="form-group">
                    <label className="form-label">Full Article Body (English)</label>
                    <textarea
                      rows={7}
                      className="form-textarea"
                      placeholder="Write full article paragraphs here..."
                      value={blogFormData.content}
                      onChange={(e) => setBlogFormData({ ...blogFormData, content: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Full Article Body (मराठी)</label>
                    <textarea
                      rows={7}
                      className="form-textarea"
                      placeholder="संपूर्ण लेखाचा मजकूर येथे लिहा..."
                      value={blogFormData.content_mr}
                      onChange={(e) => setBlogFormData({ ...blogFormData, content_mr: e.target.value })}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={savingBlog}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '0.85rem' }}
                >
                  {savingBlog ? 'Publishing Article...' : (editingBlogId ? 'Update Article' : 'Publish Blog Article')}
                </button>
              </form>
            </div>
          )}

          {/* ==========================================================================
              TAB: SMART QR HUB
              ========================================================================== */}
          {activeTab === 'qr_hub' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h1 style={{ fontSize: '1.8rem', fontWeight: '800' }}>Smart Product QR Codes Hub</h1>
                  <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
                    Print-ready QR codes linking directly to dynamic FCO product landing pages.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {products.map((p) => (
                  <div key={p.id} className="card" style={{ padding: '1.75rem', background: 'white', textAlign: 'center' }}>
                    <span className="badge badge-green mb-3">{p.category_display || p.category}</span>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>{p.brand_name}</h3>
                    <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1.25rem' }}>{p.subtitle || 'Agricultural Input'}</p>

                    <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '12px', border: '2px dashed #cbd5e1', display: 'inline-block', marginBottom: '1.25rem' }}>
                      {qrMap[p.slug] ? (
                        <img src={qrMap[p.slug]} alt="QR" style={{ width: '160px', height: '160px', display: 'block' }} />
                      ) : (
                        <div style={{ width: '160px', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Generating...</div>
                      )}
                    </div>

                    <div className="flex justify-center gap-2">
                      <a
                        href={qrMap[p.slug]}
                        download={`${p.slug}-qr-print.png`}
                        className="btn btn-primary"
                        style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}
                      >
                        <Download size={15} /> Download PNG
                      </a>
                      <a
                        href={`/product/${p.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-outline"
                        style={{ padding: '0.5rem 0.85rem' }}
                      >
                        <ExternalLink size={15} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ==========================================================================
              TAB: ADD / EDIT PRODUCT FORM
              ========================================================================== */}
          {activeTab === 'new_product' && (
            <div className="card" style={{ padding: '2.5rem', maxWidth: '960px', margin: '0 auto', background: 'white' }}>
              <div className="flex justify-between items-center mb-4 pb-3" style={{ borderBottom: '1px solid #e2e8f0' }}>
                <div>
                  <h2 style={{ fontSize: '1.6rem' }}>{editingId ? 'Edit Product Details' : 'Add New Agricultural Formulation'}</h2>
                  <p style={{ fontSize: '0.88rem', color: '#64748b' }}>
                    Fields in English & Marathi. Smart QR code will be generated upon saving.
                  </p>
                </div>
                {editingId && (
                  <button
                    onClick={() => { setEditingId(null); setFormData(initialFormState); setActiveTab('products'); }}
                    className="btn btn-light"
                    style={{ fontSize: '0.82rem' }}
                  >
                    <X size={15} /> Cancel Editing
                  </button>
                )}
              </div>

              <form onSubmit={handleSaveProduct}>
                {/* English & Marathi Names */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="form-group">
                    <label className="form-label">Brand Name (English) *</label>
                    <input
                      type="text"
                      required
                      className="form-input"
                      placeholder="e.g. KAIZEN - K"
                      value={formData.brand_name}
                      onChange={(e) => setFormData({ ...formData, brand_name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Brand Name (मराठी)</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="उदा. कायझेन - के"
                      value={formData.brand_name_mr}
                      onChange={(e) => setFormData({ ...formData, brand_name_mr: e.target.value })}
                    />
                  </div>
                </div>

                {/* Category & Packaging */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="form-group">
                    <div className="flex justify-between items-center mb-1">
                      <label className="form-label" style={{ marginBottom: 0 }}>Category *</label>
                      <button
                        type="button"
                        onClick={handleOpenAddCategory}
                        style={{ background: 'none', border: 'none', color: '#15803d', fontSize: '0.78rem', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px' }}
                      >
                        <Plus size={13} /> New Category
                      </button>
                    </div>
                    <select
                      className="form-select"
                      value={formData.category}
                      onChange={(e) => {
                        const selectedSlug = e.target.value;
                        const matchedCat = categories.find(c => c.slug === selectedSlug);
                        setFormData({
                          ...formData,
                          category: selectedSlug,
                          category_display: matchedCat ? matchedCat.name : selectedSlug,
                          category_display_mr: matchedCat ? matchedCat.name_mr : ''
                        });
                      }}
                    >
                      {categories.map((cat) => (
                        <option key={cat.slug} value={cat.slug}>
                          {cat.icon || '🏷️'} {cat.name} {cat.name_mr ? `(${cat.name_mr})` : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Packaging Available</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. 48 Grams, 4 Grams / 50 kg"
                      value={formData.packing}
                      onChange={(e) => setFormData({ ...formData, packing: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Image Path / URL</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="/assets/images/products/kaizen-k.jpg"
                      value={formData.main_picture}
                      onChange={(e) => setFormData({ ...formData, main_picture: e.target.value })}
                    />
                  </div>
                </div>

                {/* Subtitle */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="form-group">
                    <label className="form-label">Subtitle / Description Line (English)</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Potash Derived From Rhodophytes"
                      value={formData.subtitle}
                      onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Subtitle (मराठी)</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="उदा. र्होडोफाइट्सपासून मिळवलेले पोटॅश"
                      value={formData.subtitle_mr}
                      onChange={(e) => setFormData({ ...formData, subtitle_mr: e.target.value })}
                    />
                  </div>
                </div>

                {/* Target Crops */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="form-group">
                    <label className="form-label">Target Crops (English)</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Grapes, Sugarcane, Cotton, Vegetables"
                      value={formData.target_crops}
                      onChange={(e) => setFormData({ ...formData, target_crops: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Target Crops (मराठी)</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="उदा. द्राक्षे, ऊस, कापूस, भाजीपाला"
                      value={formData.target_crops_mr}
                      onChange={(e) => setFormData({ ...formData, target_crops_mr: e.target.value })}
                    />
                  </div>
                </div>

                {/* Composition Rows */}
                <div className="card mb-4" style={{ padding: '1.25rem', background: '#f8fafc' }}>
                  <div className="flex justify-between items-center mb-2">
                    <label className="form-label" style={{ marginBottom: 0 }}>Chemical / Active Nutrient Composition</label>
                    <button
                      type="button"
                      onClick={handleAddComposition}
                      className="btn btn-outline"
                      style={{ padding: '3px 10px', fontSize: '0.78rem' }}
                    >
                      <Plus size={13} /> Add Row
                    </button>
                  </div>
                  {formData.composition?.map((row, idx) => (
                    <div key={idx} className="flex gap-2 items-center mb-2">
                      <input
                        type="text"
                        placeholder="Nutrient label (e.g. Water Soluble Potash)"
                        className="form-input"
                        style={{ flex: 1 }}
                        value={row.label}
                        onChange={(e) => handleCompositionChange(idx, 'label', e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Value (e.g. 20.0%)"
                        className="form-input"
                        style={{ width: '140px' }}
                        value={row.value}
                        onChange={(e) => handleCompositionChange(idx, 'value', e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveComposition(idx)}
                        className="btn btn-light"
                        style={{ color: '#ef4444', padding: '6px' }}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Benefits */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="form-group">
                    <label className="form-label">Key Benefits (English - One per line)</label>
                    <textarea
                      rows={4}
                      className="form-textarea"
                      placeholder="Boosts root growth&#10;Prevents flower drop&#10;Increases yield by 25%"
                      value={formData.benefits}
                      onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Key Benefits (मराठी - प्रत्येक ओळीत एक फायदा)</label>
                    <textarea
                      rows={4}
                      className="form-textarea"
                      placeholder="मुळांची जोमदार वाढ करते&#10;फुलगळ थांबवते&#10;उत्पादनात भरघोस वाढ"
                      value={formData.benefits_mr}
                      onChange={(e) => setFormData({ ...formData, benefits_mr: e.target.value })}
                    />
                  </div>
                </div>

                {/* Dosage & Application */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="form-group">
                    <label className="form-label">Recommended Dosage</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="1 - 1.5 gm per litre"
                      value={formData.dosage}
                      onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Application Method</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Foliar Spray & Drip"
                      value={formData.application_method}
                      onChange={(e) => setFormData({ ...formData, application_method: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Precautions</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Store in cool, dry place"
                      value={formData.precautions}
                      onChange={(e) => setFormData({ ...formData, precautions: e.target.value })}
                    />
                  </div>
                </div>

                {/* Flagship Checkbox */}
                <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem' }}>
                  <input
                    type="checkbox"
                    id="flagshipCheck"
                    checked={formData.isFlagship}
                    onChange={(e) => setFormData({ ...formData, isFlagship: e.target.checked })}
                  />
                  <label htmlFor="flagshipCheck" style={{ fontWeight: '600', cursor: 'pointer' }}>
                    Mark as Flagship Product (Featured on top of catalog)
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={savingProduct}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '0.9rem', fontSize: '1rem' }}
                >
                  {savingProduct ? 'Saving Formulation & QR...' : (editingId ? 'Save & Update Formulation' : 'Publish Product & Generate Smart QR Code')}
                </button>
              </form>
            </div>
          )}

          {/* ==========================================================================
              TAB: FARMER LEADS & INQUIRIES WITH VIEWED / PURCHASED ACTIONS
              ========================================================================== */}
          {activeTab === 'enquiries' && (
            <div className="card" style={{ padding: '1.75rem', background: 'white' }}>
              <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
                <div>
                  <h2 style={{ fontSize: '1.4rem', color: '#0f172a' }}>Farmer & Dealer Enquiries ({enquiries.length})</h2>
                  <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Track incoming leads, mark visited farmers, and record product sales.</p>
                </div>

                {/* Filter Pills */}
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => setEnquiryFilter('all')}
                    className={`btn ${enquiryFilter === 'all' ? 'btn-primary' : 'btn-light'}`}
                    style={{ padding: '0.4rem 0.9rem', fontSize: '0.82rem' }}
                  >
                    All Leads ({enquiries.length})
                  </button>
                  <button
                    onClick={() => setEnquiryFilter('pending')}
                    className={`btn ${enquiryFilter === 'pending' ? 'btn-primary' : 'btn-light'}`}
                    style={{ padding: '0.4rem 0.9rem', fontSize: '0.82rem', background: enquiryFilter === 'pending' ? '#ca8a04' : '#fef9c3', color: enquiryFilter === 'pending' ? '#ffffff' : '#854d0e', border: '1px solid #fde047' }}
                  >
                    ⏳ Pending ({enquiries.filter(e => !e.status || e.status === 'pending').length})
                  </button>
                  <button
                    onClick={() => setEnquiryFilter('viewed')}
                    className={`btn ${enquiryFilter === 'viewed' ? 'btn-primary' : 'btn-light'}`}
                    style={{ padding: '0.4rem 0.9rem', fontSize: '0.82rem', background: enquiryFilter === 'viewed' ? '#2563eb' : '#dbeafe', color: enquiryFilter === 'viewed' ? '#ffffff' : '#1e40af', border: '1px solid #bfdbfe' }}
                  >
                    👁️ Only Visited ({enquiries.filter(e => e.status === 'viewed').length})
                  </button>
                  <button
                    onClick={() => setEnquiryFilter('purchased')}
                    className={`btn ${enquiryFilter === 'purchased' ? 'btn-primary' : 'btn-light'}`}
                    style={{ padding: '0.4rem 0.9rem', fontSize: '0.82rem', background: enquiryFilter === 'purchased' ? '#16a34a' : '#dcfce7', color: enquiryFilter === 'purchased' ? '#ffffff' : '#166534', border: '1px solid #bbf7d0' }}
                  >
                    🛒 Purchased ({enquiries.filter(e => e.status === 'purchased').length})
                  </button>
                </div>
              </div>

              {/* Conversion Stats Mini Bar */}
              <div className="grid grid-cols-4 gap-3 mb-4">
                <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '700' }}>TOTAL LEADS</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0f172a' }}>{enquiries.length}</div>
                </div>
                <div style={{ background: '#fefce8', padding: '12px 16px', borderRadius: '12px', border: '1px solid #fef08a' }}>
                  <div style={{ fontSize: '0.75rem', color: '#854d0e', fontWeight: '700' }}>NEW / PENDING</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#a16207' }}>
                    {enquiries.filter(e => !e.status || e.status === 'pending').length}
                  </div>
                </div>
                <div style={{ background: '#eff6ff', padding: '12px 16px', borderRadius: '12px', border: '1px solid #bfdbfe' }}>
                  <div style={{ fontSize: '0.75rem', color: '#1e40af', fontWeight: '700' }}>ONLY VISITED / ENQUIRED</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#2563eb' }}>
                    {enquiries.filter(e => e.status === 'viewed').length}
                  </div>
                </div>
                <div style={{ background: '#f0fdf4', padding: '12px 16px', borderRadius: '12px', border: '1px solid #bbf7d0' }}>
                  <div style={{ fontSize: '0.75rem', color: '#166534', fontWeight: '700' }}>PRODUCT BOUGHT (CONVERTED)</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#16a34a' }}>
                    {enquiries.filter(e => e.status === 'purchased').length}
                  </div>
                </div>
              </div>

              {enquiries.length === 0 ? (
                <div className="text-center py-5">
                  <MessageSquare size={48} style={{ color: '#cbd5e1', margin: '0 auto 1rem' }} />
                  <h3>No incoming inquiries yet</h3>
                  <p style={{ color: '#64748b' }}>When users fill forms on the website, they will appear here instantly.</p>
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                    <thead>
                      <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                        <th style={{ padding: '12px 10px' }}>Farmer / Contact</th>
                        <th style={{ padding: '12px 10px' }}>Product & Message</th>
                        <th style={{ padding: '12px 10px' }}>Location</th>
                        <th style={{ padding: '12px 10px' }}>Lead Status</th>
                        <th style={{ padding: '12px 10px' }}>Date</th>
                        <th style={{ padding: '12px 10px', textAlign: 'center', minWidth: '220px' }}>Action & Conversion</th>
                      </tr>
                    </thead>
                    <tbody>
                      {enquiries
                        .filter(enq => {
                          if (enquiryFilter === 'all') return true;
                          if (enquiryFilter === 'pending') return !enq.status || enq.status === 'pending';
                          return enq.status === enquiryFilter;
                        })
                        .map((enq) => {
                          const status = enq.status || 'pending';
                          return (
                            <tr key={enq.id} style={{ borderBottom: '1px solid #f1f5f9', background: status === 'purchased' ? '#f0fdf4' : (status === 'viewed' ? '#f8fafc' : 'white') }}>
                              <td style={{ padding: '12px 10px', fontWeight: '700' }}>
                                <div style={{ color: '#0f172a' }}>{enq.full_name}</div>
                                <div className="flex items-center gap-2 mt-1">
                                  <a
                                    href={`https://wa.me/${enq.phone_number.replace(/[^0-9]/g, '')}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="btn btn-light"
                                    style={{ color: '#16a34a', padding: '2px 8px', fontSize: '0.75rem', fontWeight: '700' }}
                                    title="Chat on WhatsApp"
                                  >
                                    <i className="bi bi-whatsapp"></i> {enq.phone_number}
                                  </a>
                                </div>
                                {enq.email && <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 'normal', marginTop: '2px' }}>{enq.email}</div>}
                              </td>

                              <td style={{ padding: '12px 10px' }}>
                                <div className="mb-1">
                                  <span className="badge badge-green" style={{ fontSize: '0.75rem' }}>{enq.product_name || 'General Inquiry'}</span>
                                </div>
                                <div style={{ fontSize: '0.82rem', color: '#475569', maxWidth: '280px' }}>
                                  {enq.message || '—'}
                                </div>
                                {enq.purchased_qty && (
                                  <div style={{ fontSize: '0.75rem', color: '#166534', fontWeight: '800', marginTop: '4px', background: '#dcfce7', padding: '2px 6px', borderRadius: '4px', display: 'inline-block' }}>
                                    ✓ Bought: {enq.purchased_qty} {enq.purchased_amount ? `(${enq.purchased_amount})` : ''}
                                  </div>
                                )}
                              </td>

                              <td style={{ padding: '12px 10px', color: '#475569', fontSize: '0.82rem' }}>
                                {enq.address || 'Maharashtra'}
                              </td>

                              <td style={{ padding: '12px 10px' }}>
                                {status === 'pending' && (
                                  <span style={{ background: '#fef3c7', color: '#92400e', padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '800', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                    ⏳ Pending (नवीन)
                                  </span>
                                )}
                                {status === 'viewed' && (
                                  <span style={{ background: '#dbeafe', color: '#1e40af', padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '800', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                    👁️ Only Visited (फक्त भेट)
                                  </span>
                                )}
                                {status === 'purchased' && (
                                  <span style={{ background: '#dcfce7', color: '#166534', padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '800', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                    🛒 Purchased (खरेदी केली)
                                  </span>
                                )}
                              </td>

                              <td style={{ padding: '12px 10px', fontSize: '0.78rem', color: '#94a3b8' }}>
                                {new Date(enq.created_at).toLocaleDateString()}
                              </td>

                              {/* 🎯 ACTION BUTTONS: ONLY VIEW / BUY PRODUCT / DELETE */}
                              <td style={{ padding: '12px 10px', textAlign: 'center' }}>
                                <div className="flex gap-1 justify-center items-center flex-wrap">
                                  {/* 1. Only Visited Button */}
                                  <button
                                    onClick={() => handleUpdateEnquiryStatus(enq.id, 'viewed')}
                                    className="btn btn-light"
                                    style={{
                                      padding: '4px 9px',
                                      fontSize: '0.75rem',
                                      fontWeight: '700',
                                      background: status === 'viewed' ? '#2563eb' : '#eff6ff',
                                      color: status === 'viewed' ? '#ffffff' : '#1d4ed8',
                                      border: '1px solid #bfdbfe'
                                    }}
                                    title="Mark as Only Visited / Enquired"
                                  >
                                    <Eye size={13} />
                                    <span>Only View</span>
                                  </button>

                                  {/* 2. Buy Product Button */}
                                  <button
                                    onClick={() => {
                                      setPurchaseModalEnquiry(enq);
                                      setPurchaseForm({
                                        purchased_item: enq.product_name || 'Kaizen-K',
                                        purchased_qty: '2 Packs',
                                        purchased_amount: '₹1,200'
                                      });
                                    }}
                                    className="btn btn-primary"
                                    style={{
                                      padding: '4px 9px',
                                      fontSize: '0.75rem',
                                      fontWeight: '700',
                                      background: status === 'purchased' ? '#15803d' : '#16a34a'
                                    }}
                                    title="Mark as Product Purchased"
                                  >
                                    <ShoppingCart size={13} />
                                    <span>Buy Product</span>
                                  </button>

                                  {/* 3. Delete Button */}
                                  <button
                                    onClick={() => handleDeleteEnquiry(enq.id)}
                                    className="btn btn-light"
                                    style={{ color: '#ef4444', padding: '4px 6px', border: '1px solid #fee2e2' }}
                                    title="Delete Lead"
                                  >
                                    <Trash2 size={13} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ==========================================================================
              📦 TAB: INVENTORY & STOCK MANAGEMENT
              ========================================================================== */}
          {activeTab === 'inventory' && (
            <div>
              {/* Header */}
              <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
                <div>
                  <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0f172a' }}>Inventory & Stock Management</h1>
                  <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Real-time warehouse stock tracking, threshold warnings, and instant stock adjustments.</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingInventory({ id: `sku-${Date.now()}` });
                      setInventoryForm({
                        product_name: 'Kaizen-K 48gm',
                        packing: '48 Grams Box',
                        current_stock: 500,
                        min_threshold: 50,
                        unit: 'Packs',
                        warehouse: 'Pune Central Plant (MIDC Chakan)',
                        batch_no: `KRIV-2026-B0${inventory.length + 1}`
                      });
                    }}
                    className="btn btn-primary"
                  >
                    <PackagePlus size={16} /> Add Stock Item
                  </button>
                </div>
              </div>

              {/* Stats Overview */}
              <div className="grid grid-cols-4 gap-3 mb-4">
                <div className="card" style={{ padding: '1.25rem', background: 'white' }}>
                  <div className="flex justify-between items-center mb-1">
                    <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: '700' }}>TOTAL SKUs</span>
                    <Boxes size={18} style={{ color: '#15803d' }} />
                  </div>
                  <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0f172a' }}>{inventory.length}</div>
                  <div style={{ fontSize: '0.75rem', color: '#16a34a' }}>Formulations Tracked</div>
                </div>

                <div className="card" style={{ padding: '1.25rem', background: 'white' }}>
                  <div className="flex justify-between items-center mb-1">
                    <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: '700' }}>TOTAL UNITS IN WAREHOUSE</span>
                    <Warehouse size={18} style={{ color: '#2563eb' }} />
                  </div>
                  <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0f172a' }}>
                    {inventory.reduce((acc, item) => acc + Number(item.current_stock || 0), 0)}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#2563eb' }}>Bags, Packs & Bottles</div>
                </div>

                <div className="card" style={{ padding: '1.25rem', background: 'white' }}>
                  <div className="flex justify-between items-center mb-1">
                    <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: '700' }}>HEALTHY STOCK</span>
                    <CheckCircle size={18} style={{ color: '#16a34a' }} />
                  </div>
                  <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#16a34a' }}>
                    {inventory.filter(i => i.status === 'in_stock').length}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#16a34a' }}>Above minimum safety limits</div>
                </div>

                <div className="card" style={{ padding: '1.25rem', background: '#fff1f2', borderColor: '#fecdd3' }}>
                  <div className="flex justify-between items-center mb-1">
                    <span style={{ fontSize: '0.78rem', color: '#9f1239', fontWeight: '700' }}>LOW / ZERO STOCK ALERTS</span>
                    <AlertCircle size={18} style={{ color: '#e11d48' }} />
                  </div>
                  <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#e11d48' }}>
                    {inventory.filter(i => i.status === 'low_stock' || i.status === 'out_of_stock').length}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#9f1239' }}>Requires factory replenishment</div>
                </div>
              </div>

              {/* Filters & Search */}
              <div className="card mb-4" style={{ padding: '1.25rem', background: 'white' }}>
                <div className="flex justify-between items-center flex-wrap gap-3">
                  {/* Status Pills */}
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => setInventoryFilter('all')}
                      className={`btn ${inventoryFilter === 'all' ? 'btn-primary' : 'btn-light'}`}
                      style={{ padding: '0.4rem 0.9rem', fontSize: '0.82rem' }}
                    >
                      All ({inventory.length})
                    </button>
                    <button
                      onClick={() => setInventoryFilter('in_stock')}
                      className={`btn ${inventoryFilter === 'in_stock' ? 'btn-primary' : 'btn-light'}`}
                      style={{ padding: '0.4rem 0.9rem', fontSize: '0.82rem' }}
                    >
                      🟢 In Stock ({inventory.filter(i => i.status === 'in_stock').length})
                    </button>
                    <button
                      onClick={() => setInventoryFilter('low_stock')}
                      className={`btn ${inventoryFilter === 'low_stock' ? 'btn-primary' : 'btn-light'}`}
                      style={{ padding: '0.4rem 0.9rem', fontSize: '0.82rem', background: inventoryFilter === 'low_stock' ? '#ca8a04' : '#fef9c3', color: inventoryFilter === 'low_stock' ? '#ffffff' : '#854d0e', border: '1px solid #fde047' }}
                    >
                      ⚠️ Low Stock ({inventory.filter(i => i.status === 'low_stock').length})
                    </button>
                    <button
                      onClick={() => setInventoryFilter('out_of_stock')}
                      className={`btn ${inventoryFilter === 'out_of_stock' ? 'btn-primary' : 'btn-light'}`}
                      style={{ padding: '0.4rem 0.9rem', fontSize: '0.82rem', background: inventoryFilter === 'out_of_stock' ? '#e11d48' : '#ffe4e6', color: inventoryFilter === 'out_of_stock' ? '#ffffff' : '#9f1239', border: '1px solid #fecdd3' }}
                    >
                      🔴 Out of Stock ({inventory.filter(i => i.status === 'out_of_stock').length})
                    </button>
                  </div>

                  {/* Search Input */}
                  <div style={{ position: 'relative', width: '280px' }}>
                    <Search size={15} style={{ position: 'absolute', left: '12px', top: '10px', color: '#94a3b8' }} />
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Search inventory, batch..."
                      style={{ paddingLeft: '34px', height: '36px', fontSize: '0.82rem' }}
                      value={inventorySearch}
                      onChange={(e) => setInventorySearch(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Inventory Table */}
              <div className="card" style={{ padding: '1.5rem', background: 'white' }}>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                    <thead>
                      <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                        <th style={{ padding: '12px 10px' }}>Formulation & SKU</th>
                        <th style={{ padding: '12px 10px' }}>Warehouse / Batch</th>
                        <th style={{ padding: '12px 10px' }}>Current Stock Level</th>
                        <th style={{ padding: '12px 10px', textAlign: 'center' }}>Quick Stock Adjust</th>
                        <th style={{ padding: '12px 10px' }}>Threshold</th>
                        <th style={{ padding: '12px 10px' }}>Status</th>
                        <th style={{ padding: '12px 10px', textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inventory
                        .filter(item => {
                          const matchesFilter = inventoryFilter === 'all' || item.status === inventoryFilter;
                          const q = inventorySearch.toLowerCase();
                          const matchesSearch = !q || item.product_name.toLowerCase().includes(q) ||
                            (item.batch_no && item.batch_no.toLowerCase().includes(q)) ||
                            (item.warehouse && item.warehouse.toLowerCase().includes(q));
                          return matchesFilter && matchesSearch;
                        })
                        .map((item) => {
                          const stockNum = Number(item.current_stock || 0);
                          const threshold = Number(item.min_threshold || 50);
                          const percent = Math.min(100, Math.round((stockNum / (threshold * 3)) * 100));

                          return (
                            <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                              <td style={{ padding: '12px 10px' }}>
                                <strong style={{ color: '#0f172a', display: 'block', fontSize: '0.92rem' }}>{item.product_name}</strong>
                                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                                  {item.packing} • {item.unit || 'Units'}
                                </span>
                              </td>

                              <td style={{ padding: '12px 10px', fontSize: '0.82rem' }}>
                                <div style={{ color: '#334155', fontWeight: '600' }}>{item.warehouse || 'Central Plant'}</div>
                                <code style={{ fontSize: '0.72rem', color: '#15803d', background: '#dcfce7', padding: '1px 6px', borderRadius: '4px' }}>
                                  {item.batch_no || 'KRIV-2026'}
                                </code>
                              </td>

                              <td style={{ padding: '12px 10px' }}>
                                <div className="flex items-center gap-2">
                                  <strong style={{ fontSize: '1.15rem', color: item.status === 'out_of_stock' ? '#e11d48' : (item.status === 'low_stock' ? '#ca8a04' : '#15803d') }}>
                                    {stockNum}
                                  </strong>
                                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{item.unit || 'Units'}</span>
                                </div>
                                <div style={{ width: '100px', height: '6px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden', marginTop: '4px' }}>
                                  <div
                                    style={{
                                      width: `${percent}%`,
                                      height: '100%',
                                      background: item.status === 'out_of_stock' ? '#e11d48' : (item.status === 'low_stock' ? '#ca8a04' : '#16a34a')
                                    }}
                                  ></div>
                                </div>
                              </td>

                              {/* Quick Adjust Buttons */}
                              <td style={{ padding: '12px 10px', textAlign: 'center' }}>
                                <div className="flex gap-1 justify-center items-center">
                                  <button
                                    onClick={() => handleAdjustStock(item.id, -10, 'Stock Dispatched')}
                                    className="btn btn-light"
                                    style={{ padding: '3px 7px', fontSize: '0.75rem', color: '#ef4444', border: '1px solid #fee2e2' }}
                                    title="Deduct 10 units"
                                  >
                                    -10
                                  </button>
                                  <button
                                    onClick={() => handleAdjustStock(item.id, 10, 'Stock Added')}
                                    className="btn btn-light"
                                    style={{ padding: '3px 7px', fontSize: '0.75rem', color: '#16a34a', border: '1px solid #bbf7d0' }}
                                    title="Add 10 units"
                                  >
                                    +10
                                  </button>
                                  <button
                                    onClick={() => handleAdjustStock(item.id, 50, 'Batch Restocked')}
                                    className="btn btn-light"
                                    style={{ padding: '3px 7px', fontSize: '0.75rem', color: '#15803d', fontWeight: 'bold', border: '1px solid #bbf7d0' }}
                                    title="Add 50 units (Batch)"
                                  >
                                    +50
                                  </button>
                                </div>
                              </td>

                              <td style={{ padding: '12px 10px', fontSize: '0.82rem', color: '#64748b' }}>
                                Min: <strong>{threshold}</strong> {item.unit}
                              </td>

                              <td style={{ padding: '12px 10px' }}>
                                {item.status === 'in_stock' && (
                                  <span style={{ background: '#dcfce7', color: '#166534', padding: '3px 8px', borderRadius: '12px', fontSize: '0.72rem', fontWeight: '800' }}>
                                    In Stock
                                  </span>
                                )}
                                {item.status === 'low_stock' && (
                                  <span style={{ background: '#fef3c7', color: '#92400e', padding: '3px 8px', borderRadius: '12px', fontSize: '0.72rem', fontWeight: '800' }}>
                                    Low Stock
                                  </span>
                                )}
                                {item.status === 'out_of_stock' && (
                                  <span style={{ background: '#ffe4e6', color: '#9f1239', padding: '3px 8px', borderRadius: '12px', fontSize: '0.72rem', fontWeight: '800' }}>
                                    Out of Stock
                                  </span>
                                )}
                              </td>

                              <td style={{ padding: '12px 10px', textAlign: 'right' }}>
                                <button
                                  onClick={() => {
                                    setEditingInventory(item);
                                    setInventoryForm({
                                      product_name: item.product_name,
                                      packing: item.packing || '',
                                      current_stock: item.current_stock || 0,
                                      min_threshold: item.min_threshold || 50,
                                      unit: item.unit || 'Units',
                                      warehouse: item.warehouse || 'Pune Central Plant (MIDC Chakan)',
                                      batch_no: item.batch_no || 'KRIV-2026'
                                    });
                                  }}
                                  className="btn btn-outline"
                                  style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                                  title="Edit Stock Details"
                                >
                                  <Edit3 size={13} />
                                  <span>Edit</span>
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ==========================================================================
              🛒 PURCHASE CONVERSION MODAL
              ========================================================================== */}
          {purchaseModalEnquiry && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 999,
              padding: '1rem'
            }}>
              <div style={{ background: 'white', borderRadius: '20px', maxWidth: '480px', width: '100%', padding: '2rem', boxShadow: '0 25px 50px rgba(0,0,0,0.3)' }}>
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <ShoppingCart size={20} style={{ color: '#16a34a' }} />
                    <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Record Product Purchase</h3>
                  </div>
                  <button onClick={() => setPurchaseModalEnquiry(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
                    <X size={20} />
                  </button>
                </div>

                <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '12px', borderRadius: '10px', marginBottom: '1.25rem', fontSize: '0.85rem', color: '#166534' }}>
                  Converting lead: <strong>{purchaseModalEnquiry.full_name}</strong> ({purchaseModalEnquiry.phone_number})
                </div>

                <form onSubmit={handleConfirmPurchase}>
                  <div className="form-group">
                    <label className="form-label">Product Purchased</label>
                    <input
                      type="text"
                      className="form-input"
                      value={purchaseForm.purchased_item}
                      onChange={(e) => setPurchaseForm({ ...purchaseForm, purchased_item: e.target.value })}
                      placeholder="e.g. Kaizen-K, Thalassa"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="form-group">
                      <label className="form-label">Quantity Sold</label>
                      <input
                        type="text"
                        className="form-input"
                        value={purchaseForm.purchased_qty}
                        onChange={(e) => setPurchaseForm({ ...purchaseForm, purchased_qty: e.target.value })}
                        placeholder="e.g. 5 Packs / 2 Bags"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Total Amount (₹)</label>
                      <input
                        type="text"
                        className="form-input"
                        value={purchaseForm.purchased_amount}
                        onChange={(e) => setPurchaseForm({ ...purchaseForm, purchased_amount: e.target.value })}
                        placeholder="e.g. ₹3,500"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button
                      type="button"
                      onClick={() => setPurchaseModalEnquiry(null)}
                      className="btn btn-light"
                      style={{ flex: 1 }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ flex: 1, background: '#16a34a' }}
                    >
                      <CheckCircle size={16} />
                      <span>Confirm Purchase</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* ==========================================================================
              📦 INVENTORY EDIT MODAL
              ========================================================================== */}
          {editingInventory && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 999,
              padding: '1rem'
            }}>
              <div style={{ background: 'white', borderRadius: '20px', maxWidth: '520px', width: '100%', padding: '2rem', boxShadow: '0 25px 50px rgba(0,0,0,0.3)' }}>
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <Boxes size={20} style={{ color: '#15803d' }} />
                    <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Update Stock & Inventory</h3>
                  </div>
                  <button onClick={() => setEditingInventory(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleSaveInventory}>
                  <div className="form-group">
                    <label className="form-label">Product Formulation Name</label>
                    <input
                      type="text"
                      className="form-input"
                      value={inventoryForm.product_name}
                      onChange={(e) => setInventoryForm({ ...inventoryForm, product_name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="form-group">
                      <label className="form-label">Current Stock Count</label>
                      <input
                        type="number"
                        className="form-input"
                        value={inventoryForm.current_stock}
                        onChange={(e) => setInventoryForm({ ...inventoryForm, current_stock: Number(e.target.value) })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Min Threshold (Safety)</label>
                      <input
                        type="number"
                        className="form-input"
                        value={inventoryForm.min_threshold}
                        onChange={(e) => setInventoryForm({ ...inventoryForm, min_threshold: Number(e.target.value) })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="form-group">
                      <label className="form-label">Unit</label>
                      <select
                        className="form-select"
                        value={inventoryForm.unit}
                        onChange={(e) => setInventoryForm({ ...inventoryForm, unit: e.target.value })}
                      >
                        <option value="Bags">Bags (खतांच्या गोण्या)</option>
                        <option value="Packs">Packs / Boxes (पाकिटे)</option>
                        <option value="Bottles">Bottles / Litres (बाटल्या)</option>
                        <option value="MT">Metric Tons (टन)</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Batch Number</label>
                      <input
                        type="text"
                        className="form-input"
                        value={inventoryForm.batch_no}
                        onChange={(e) => setInventoryForm({ ...inventoryForm, batch_no: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Warehouse Depot Location</label>
                    <input
                      type="text"
                      className="form-input"
                      value={inventoryForm.warehouse}
                      onChange={(e) => setInventoryForm({ ...inventoryForm, warehouse: e.target.value })}
                    />
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button
                      type="button"
                      onClick={() => setEditingInventory(null)}
                      className="btn btn-light"
                      style={{ flex: 1 }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={savingInventory}
                      className="btn btn-primary"
                      style={{ flex: 1 }}
                    >
                      {savingInventory ? 'Updating...' : 'Save Stock Details'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* ==========================================================================
              🧾 TAB: CUSTOMER ORDERS & TAX INVOICES (ग्राहक व बिल व्यवस्थापन)
              ========================================================================== */}
          {activeTab === 'customers' && (
            <div>
              {/* Header */}
              <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
                <div>
                  <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0f172a' }}>Customer Orders & Tax Invoices</h1>
                  <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Manage customer orders, billing details, GST tax calculations, and print official bills.</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingInvoice({ id: `new-${Date.now()}` });
                      setInvoiceForm({
                        customer_name: '',
                        phone_number: '',
                        address: '',
                        date: new Date().toISOString().split('T')[0],
                        subtotal: 3500,
                        tax_rate: 5,
                        tax_amount: 175,
                        discount: 0,
                        total_price: 3675,
                        payment_status: 'Paid',
                        payment_mode: 'UPI / PhonePe',
                        notes: '',
                        items: [
                          { product_name: 'Kaizen-K (Bio-Potash 48gm)', hsn: '3104', quantity: 5, unit: 'Packs', rate: 700, amount: 3500 }
                        ]
                      });
                    }}
                    className="btn btn-primary"
                  >
                    <Plus size={16} /> Create New Customer Invoice
                  </button>
                </div>
              </div>

              {/* Invoices Summary Metric Cards */}
              <div className="grid grid-cols-4 gap-3 mb-4">
                <div className="card" style={{ padding: '1.25rem', background: 'white' }}>
                  <div className="flex justify-between items-center mb-1">
                    <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: '700' }}>TOTAL CUSTOMER INVOICES</span>
                    <FileText size={18} style={{ color: '#0284c7' }} />
                  </div>
                  <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0f172a' }}>{invoices.length}</div>
                  <div style={{ fontSize: '0.75rem', color: '#0284c7' }}>Generated bills</div>
                </div>

                <div className="card" style={{ padding: '1.25rem', background: 'white' }}>
                  <div className="flex justify-between items-center mb-1">
                    <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: '700' }}>TOTAL BILLING VALUE</span>
                    <span style={{ color: '#16a34a', fontWeight: 'bold' }}>₹</span>
                  </div>
                  <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#16a34a' }}>
                    ₹{invoices.reduce((acc, inv) => acc + Number(inv.total_price || 0), 0).toLocaleString()}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#16a34a' }}>Gross sales volume</div>
                </div>

                <div className="card" style={{ padding: '1.25rem', background: 'white' }}>
                  <div className="flex justify-between items-center mb-1">
                    <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: '700' }}>TOTAL GST TAX COLLECTED</span>
                    <span style={{ color: '#b45309', fontWeight: 'bold' }}>5% GST</span>
                  </div>
                  <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#b45309' }}>
                    ₹{invoices.reduce((acc, inv) => acc + Number(inv.tax_amount || 0), 0).toLocaleString()}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#b45309' }}>CGST + SGST</div>
                </div>

                <div className="card" style={{ padding: '1.25rem', background: '#f0fdf4', borderColor: '#bbf7d0' }}>
                  <div className="flex justify-between items-center mb-1">
                    <span style={{ fontSize: '0.78rem', color: '#166534', fontWeight: '700' }}>PAID BILLS</span>
                    <CheckCircle size={18} style={{ color: '#16a34a' }} />
                  </div>
                  <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#166534' }}>
                    {invoices.filter(i => i.payment_status === 'Paid').length}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#166534' }}>Settled payments</div>
                </div>
              </div>

              {/* Filters & Search */}
              <div className="card mb-4" style={{ padding: '1.25rem', background: 'white' }}>
                <div className="flex justify-between items-center flex-wrap gap-3">
                  {/* Status Pills */}
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => setInvoiceFilter('all')}
                      className={`btn ${invoiceFilter === 'all' ? 'btn-primary' : 'btn-light'}`}
                      style={{ padding: '0.4rem 0.9rem', fontSize: '0.82rem' }}
                    >
                      All Invoices ({invoices.length})
                    </button>
                    <button
                      onClick={() => setInvoiceFilter('Paid')}
                      className={`btn ${invoiceFilter === 'Paid' ? 'btn-primary' : 'btn-light'}`}
                      style={{ padding: '0.4rem 0.9rem', fontSize: '0.82rem', background: invoiceFilter === 'Paid' ? '#16a34a' : '#dcfce7', color: invoiceFilter === 'Paid' ? '#ffffff' : '#166534', border: '1px solid #bbf7d0' }}
                    >
                      🟢 Paid ({invoices.filter(i => i.payment_status === 'Paid').length})
                    </button>
                    <button
                      onClick={() => setInvoiceFilter('Pending')}
                      className={`btn ${invoiceFilter === 'Pending' ? 'btn-primary' : 'btn-light'}`}
                      style={{ padding: '0.4rem 0.9rem', fontSize: '0.82rem', background: invoiceFilter === 'Pending' ? '#ca8a04' : '#fef9c3', color: invoiceFilter === 'Pending' ? '#ffffff' : '#854d0e', border: '1px solid #fde047' }}
                    >
                      ⏳ Pending ({invoices.filter(i => i.payment_status === 'Pending').length})
                    </button>
                  </div>

                  {/* Search Input */}
                  <div style={{ position: 'relative', width: '320px' }}>
                    <Search size={15} style={{ position: 'absolute', left: '12px', top: '10px', color: '#94a3b8' }} />
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Search customer, phone, invoice #..."
                      style={{ paddingLeft: '34px', height: '36px', fontSize: '0.82rem' }}
                      value={invoiceSearch}
                      onChange={(e) => setInvoiceSearch(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Customer Invoices Table */}
              <div className="card" style={{ padding: '1.5rem', background: 'white' }}>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                    <thead>
                      <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                        <th style={{ padding: '12px 10px' }}>Invoice No & Date</th>
                        <th style={{ padding: '12px 10px' }}>Customer Name</th>
                        <th style={{ padding: '12px 10px' }}>Address</th>
                        <th style={{ padding: '12px 10px' }}>Mobile Number</th>
                        <th style={{ padding: '12px 10px' }}>Purchased Formulations</th>
                        <th style={{ padding: '12px 10px' }}>Tax (GST)</th>
                        <th style={{ padding: '12px 10px' }}>Total Price</th>
                        <th style={{ padding: '12px 10px' }}>Status</th>
                        <th style={{ padding: '12px 10px', textAlign: 'center', minWidth: '180px' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoices
                        .filter(inv => {
                          const matchesFilter = invoiceFilter === 'all' || inv.payment_status === invoiceFilter;
                          const q = invoiceSearch.toLowerCase();
                          const matchesSearch = !q ||
                            inv.customer_name?.toLowerCase().includes(q) ||
                            inv.phone_number?.toLowerCase().includes(q) ||
                            inv.address?.toLowerCase().includes(q) ||
                            inv.invoice_no?.toLowerCase().includes(q);
                          return matchesFilter && matchesSearch;
                        })
                        .map((inv) => (
                          <tr key={inv.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <td style={{ padding: '12px 10px' }}>
                              <strong style={{ color: '#0f172a', display: 'block', fontSize: '0.9rem' }}>{inv.invoice_no}</strong>
                              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{inv.date}</span>
                            </td>

                            <td style={{ padding: '12px 10px', fontWeight: '700', color: '#0f172a' }}>
                              {inv.customer_name}
                            </td>

                            <td style={{ padding: '12px 10px', color: '#475569', fontSize: '0.82rem', maxWidth: '180px' }}>
                              {inv.address || 'Maharashtra'}
                            </td>

                            <td style={{ padding: '12px 10px' }}>
                              <a
                                href={'https://wa.me/' + (inv.phone_number ? String(inv.phone_number).replace(/\\D/g, '') : '')}
                                target="_blank"
                                rel="noreferrer"
                                className="btn btn-light"
                                style={{ color: '#16a34a', padding: '2px 8px', fontSize: '0.78rem', fontWeight: '700' }}
                                title="Chat on WhatsApp"
                              >
                                {inv.phone_number}
                              </a>
                            </td>

                            <td style={{ padding: '12px 10px', fontSize: '0.82rem' }}>
                              {inv.items?.map((it, idx) => (
                                <div key={idx} style={{ color: '#334155' }}>
                                  • {it.product_name} <strong>({it.quantity} {it.unit})</strong>
                                </div>
                              ))}
                            </td>

                            <td style={{ padding: '12px 10px', fontSize: '0.85rem', color: '#b45309', fontWeight: '600' }}>
                              ₹{Number(inv.tax_amount || 0).toLocaleString()} <span style={{ fontSize: '0.72rem', color: '#78716c' }}>({inv.tax_rate || 5}%)</span>
                            </td>

                            <td style={{ padding: '12px 10px' }}>
                              <strong style={{ fontSize: '1.05rem', color: '#15803d' }}>
                                ₹{Number(inv.total_price || 0).toLocaleString()}
                              </strong>
                            </td>

                            <td style={{ padding: '12px 10px' }}>
                              {inv.payment_status === 'Paid' ? (
                                <span style={{ background: '#dcfce7', color: '#166534', padding: '3px 9px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '800' }}>
                                  ✓ Paid
                                </span>
                              ) : (
                                <span style={{ background: '#fef3c7', color: '#92400e', padding: '3px 9px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '800' }}>
                                  ⏳ Pending
                                </span>
                              )}
                            </td>

                            {/* Actions: View (PDF & Print), WhatsApp, Edit, Delete */}
                            <td style={{ padding: '12px 10px', textAlign: 'center' }}>
                              <div className="flex gap-1 justify-center items-center">
                                <button
                                  onClick={() => setSelectedInvoiceForView(inv)}
                                  className="btn btn-primary"
                                  style={{ padding: '4px 9px', fontSize: '0.75rem', background: '#0284c7' }}
                                  title="View Tax Invoice & Print PDF"
                                >
                                  <Eye size={13} />
                                  <span>View & PDF</span>
                                </button>
                                <button
                                  onClick={() => handleSendInvoiceWhatsApp(inv)}
                                  className="btn btn-primary"
                                  style={{ padding: '4px 9px', fontSize: '0.75rem', background: '#22c55e', borderColor: '#16a34a' }}
                                  title="Send Official Tax Invoice to Customer via WhatsApp"
                                >
                                  <MessageCircle size={13} />
                                  <span>WhatsApp</span>
                                </button>
                                <button
                                  onClick={() => {
                                    setEditingInvoice(inv);
                                    setInvoiceForm({
                                      customer_name: inv.customer_name || '',
                                      phone_number: inv.phone_number || '',
                                      address: inv.address || '',
                                      date: inv.date || new Date().toISOString().split('T')[0],
                                      subtotal: inv.subtotal || 0,
                                      tax_rate: inv.tax_rate || 5,
                                      tax_amount: inv.tax_amount || 0,
                                      discount: inv.discount || 0,
                                      total_price: inv.total_price || 0,
                                      payment_status: inv.payment_status || 'Paid',
                                      payment_mode: inv.payment_mode || 'Cash',
                                      notes: inv.notes || '',
                                      items: inv.items || []
                                    });
                                  }}
                                  className="btn btn-outline"
                                  style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                                  title="Edit Invoice Details"
                                >
                                  <Edit3 size={13} />
                                  <span>Edit</span>
                                </button>
                                <button
                                  onClick={() => handleDeleteInvoice(inv.id)}
                                  className="btn btn-light"
                                  style={{ color: '#ef4444', padding: '4px 6px', border: '1px solid #fee2e2' }}
                                  title="Delete Invoice"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ==========================================================================
              🖨️ OFFICIAL PRINTABLE & DOWNLOADABLE TAX INVOICE MODAL
              ========================================================================== */}
          {selectedInvoiceForView && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999,
              padding: '1.5rem',
              overflowY: 'auto'
            }}>
              <div style={{
                background: 'white',
                borderRadius: '16px',
                maxWidth: '850px',
                width: '100%',
                maxHeight: '92vh',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 25px 50px rgba(0,0,0,0.35)',
                overflow: 'hidden'
              }}>
                {/* Modal Top Action Controls (Non-Printable) */}
                <div className="no-print" style={{
                  background: '#0a2616',
                  color: 'white',
                  padding: '1rem 1.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid rgba(255,255,255,0.1)'
                }}>
                  <div className="flex items-center gap-2">
                    <FileText size={18} style={{ color: '#4ade80' }} />
                    <strong style={{ fontSize: '1.05rem' }}>Official Tax Invoice: {selectedInvoiceForView.invoice_no}</strong>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrintInvoice}
                      className="btn btn-primary"
                      style={{ padding: '0.45rem 1rem', fontSize: '0.82rem', background: '#16a34a' }}
                    >
                      <Printer size={15} />
                      <span>Print Bill (प्रिंट काढा)</span>
                    </button>
                    <button
                      onClick={handlePrintInvoice}
                      className="btn btn-light"
                      style={{ padding: '0.45rem 1rem', fontSize: '0.82rem' }}
                    >
                      <Download size={15} />
                      <span>Download PDF</span>
                    </button>
                    <button
                      onClick={() => setSelectedInvoiceForView(null)}
                      style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', padding: '4px' }}
                    >
                      <X size={22} />
                    </button>
                  </div>
                </div>

                {/* 📄 PRINTABLE TAX INVOICE BODY */}
                <div id="printable-invoice" style={{
                  padding: '2.5rem',
                  background: '#ffffff',
                  color: '#1c1917',
                  overflowY: 'auto',
                  fontSize: '0.9rem',
                  fontFamily: 'system-ui, -apple-system, sans-serif'
                }}>
                  {/* Invoice Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #3f6212', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
                    <div>
                      <Logo size="normal" variant="dark" />
                      <div style={{ fontSize: '0.82rem', color: '#44403c', marginTop: '6px', lineHeight: '1.5' }}>
                        <strong>Plot No. 12, Agri-Tech Park, Pune - 411001, Maharashtra, India.</strong><br />
                        Phone: +91 98765 43210 | Email: info@krivanindustries.com<br />
                        <strong>GSTIN:</strong> 27AAECK9928P1Z8 | <strong>FCO Lic:</strong> FCO/MH/PUN/2026/089
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1.6rem', fontWeight: '900', color: '#3f6212', letterSpacing: '0.05em' }}>
                        TAX INVOICE
                      </div>
                      <div style={{ fontSize: '0.88rem', color: '#78716c', fontWeight: 'bold' }}>
                        (खत विक्री बिल व पावती)
                      </div>
                      <div style={{ marginTop: '6px', fontSize: '0.88rem' }}>
                        <strong>Invoice No:</strong> <code style={{ color: '#b45309', fontWeight: 'bold' }}>{selectedInvoiceForView.invoice_no}</code><br />
                        <strong>Date:</strong> {selectedInvoiceForView.date}<br />
                        <strong>Payment Status:</strong> <span style={{ color: '#15803d', fontWeight: 'bold' }}>{selectedInvoiceForView.payment_status}</span>
                      </div>
                    </div>
                  </div>

                  {/* Customer Billing Info Box */}
                  <div style={{ background: '#faf8f5', padding: '1.25rem', borderRadius: '10px', border: '1px solid #e7e5e4', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                      <div style={{ fontSize: '0.78rem', color: '#78716c', textTransform: 'uppercase', fontWeight: '800' }}>
                        BILLED TO (शेतकरी / ग्राहक माहिती):
                      </div>
                      <div style={{ fontSize: '1.15rem', fontWeight: '800', color: '#1c1917', marginTop: '2px' }}>
                        {selectedInvoiceForView.customer_name}
                      </div>
                      <div style={{ fontSize: '0.88rem', color: '#44403c', marginTop: '2px' }}>
                        <strong>Address:</strong> {selectedInvoiceForView.address || 'Maharashtra, India'}
                      </div>
                      <div style={{ fontSize: '0.88rem', color: '#44403c' }}>
                        <strong>Mobile:</strong> {selectedInvoiceForView.phone_number}
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.78rem', color: '#78716c', textTransform: 'uppercase', fontWeight: '800' }}>
                        PAYMENT MODE:
                      </div>
                      <div style={{ fontSize: '0.95rem', fontWeight: '700', color: '#1c1917', marginTop: '2px' }}>
                        {selectedInvoiceForView.payment_mode || 'UPI / Cash'}
                      </div>
                      <div style={{ fontSize: '0.82rem', color: '#15803d', fontWeight: '600', marginTop: '4px' }}>
                        ✓ FCO Approved Genuine Supply
                      </div>
                    </div>
                  </div>

                  {/* Items Table */}
                  <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.5rem', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ background: '#3f6212', color: '#ffffff' }}>
                        <th style={{ padding: '10px', width: '50px' }}>Sr.</th>
                        <th style={{ padding: '10px' }}>Formulation / Product Description</th>
                        <th style={{ padding: '10px' }}>HSN</th>
                        <th style={{ padding: '10px', textAlign: 'center' }}>Qty</th>
                        <th style={{ padding: '10px', textAlign: 'right' }}>Rate (₹)</th>
                        <th style={{ padding: '10px', textAlign: 'right' }}>Amount (₹)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedInvoiceForView.items?.map((it, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid #e7e5e4' }}>
                          <td style={{ padding: '10px' }}>{idx + 1}</td>
                          <td style={{ padding: '10px', fontWeight: '600', color: '#1c1917' }}>
                            {it.product_name}
                          </td>
                          <td style={{ padding: '10px', color: '#78716c' }}>{it.hsn || '3104'}</td>
                          <td style={{ padding: '10px', textAlign: 'center' }}>{it.quantity} {it.unit || 'Units'}</td>
                          <td style={{ padding: '10px', textAlign: 'right' }}>₹{Number(it.rate).toLocaleString()}</td>
                          <td style={{ padding: '10px', textAlign: 'right', fontWeight: '700' }}>
                            ₹{Number(it.amount || it.quantity * it.rate).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Tax Calculation & Totals Summary */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
                    <div style={{ width: '340px', background: '#faf8f5', padding: '1rem 1.25rem', borderRadius: '10px', border: '1px solid #e7e5e4' }}>
                      <div className="flex justify-between mb-1" style={{ fontSize: '0.88rem' }}>
                        <span style={{ color: '#78716c' }}>Subtotal (Taxable Value):</span>
                        <strong>₹{Number(selectedInvoiceForView.subtotal).toLocaleString()}</strong>
                      </div>
                      <div className="flex justify-between mb-1" style={{ fontSize: '0.88rem' }}>
                        <span style={{ color: '#78716c' }}>CGST ({Number(selectedInvoiceForView.tax_rate || 5) / 2}%):</span>
                        <span>₹{Number(selectedInvoiceForView.cgst || (selectedInvoiceForView.tax_amount / 2)).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between mb-1" style={{ fontSize: '0.88rem' }}>
                        <span style={{ color: '#78716c' }}>SGST ({Number(selectedInvoiceForView.tax_rate || 5) / 2}%):</span>
                        <span>₹{Number(selectedInvoiceForView.sgst || (selectedInvoiceForView.tax_amount / 2)).toFixed(2)}</span>
                      </div>
                      {Number(selectedInvoiceForView.discount || 0) > 0 && (
                        <div className="flex justify-between mb-1" style={{ fontSize: '0.88rem', color: '#16a34a' }}>
                          <span>Discount Applied:</span>
                          <span>-₹{Number(selectedInvoiceForView.discount).toLocaleString()}</span>
                        </div>
                      )}
                      <div className="flex justify-between pt-2 mt-2" style={{ borderTop: '2px solid #3f6212', fontSize: '1.2rem', color: '#1c1917' }}>
                        <strong>Grand Total (एकूण):</strong>
                        <strong style={{ color: '#3f6212' }}>₹{Number(selectedInvoiceForView.total_price).toLocaleString()}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Terms & Official Seal */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: '1.5rem', borderTop: '1px solid #e7e5e4', fontSize: '0.82rem', color: '#78716c' }}>
                    <div style={{ maxWidth: '440px' }}>
                      <strong>Terms & Declaration:</strong><br />
                      1. Certified 100% genuine agricultural input under FCO regulations.<br />
                      2. For agronomy advisory and dosage spray guidance, contact our customer helpline: +91 98765 43210.
                    </div>

                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: '800', color: '#1c1917', marginBottom: '40px' }}>
                        For KRIVAN INDUSTRIES PVT. LTD.
                      </div>
                      <div style={{ borderTop: '1px dashed #78716c', paddingTop: '4px', fontSize: '0.78rem' }}>
                        Authorized Signatory & Stamp
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==========================================================================
              ✏️ CREATE / EDIT CUSTOMER INVOICE MODAL
              ========================================================================== */}
          {editingInvoice && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.65)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 999,
              padding: '1rem',
              overflowY: 'auto'
            }}>
              <div style={{ background: 'white', borderRadius: '20px', maxWidth: '640px', width: '100%', padding: '2rem', maxHeight: '90vh', overflowY: 'auto' }}>
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <FileText size={20} style={{ color: '#15803d' }} />
                    <h3 style={{ fontSize: '1.25rem', margin: 0 }}>
                      {editingInvoice.id && !editingInvoice.id.startsWith('new-') ? 'Edit Customer Invoice' : 'Create New Customer Invoice'}
                    </h3>
                  </div>
                  <button onClick={() => setEditingInvoice(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleSaveInvoice}>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="form-group">
                      <label className="form-label">Customer / Farmer Name *</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. Ramesh Patil"
                        value={invoiceForm.customer_name}
                        onChange={(e) => setInvoiceForm({ ...invoiceForm, customer_name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Mobile / WhatsApp Number *</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. +91 98220 11223"
                        value={invoiceForm.phone_number}
                        onChange={(e) => setInvoiceForm({ ...invoiceForm, phone_number: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Customer Address / Village / District</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Pimpalgaon Baswant, Niphad, Nashik"
                      value={invoiceForm.address}
                      onChange={(e) => setInvoiceForm({ ...invoiceForm, address: e.target.value })}
                    />
                  </div>

                  {/* Product Line Item */}
                  <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', marginBottom: '1rem' }}>
                    <label className="form-label" style={{ marginBottom: '6px' }}>Primary Formulation / Product Details</label>
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Product Name (Kaizen-K)"
                        value={invoiceForm.items?.[0]?.product_name || ''}
                        onChange={(e) => {
                          const updated = [...(invoiceForm.items || [{ quantity: 1, rate: 1000 }])];
                          updated[0].product_name = e.target.value;
                          setInvoiceForm({ ...invoiceForm, items: updated });
                        }}
                      />
                      <input
                        type="number"
                        className="form-input"
                        placeholder="Qty"
                        value={invoiceForm.items?.[0]?.quantity || 1}
                        onChange={(e) => {
                          const qty = Number(e.target.value);
                          const updated = [...(invoiceForm.items || [{}])];
                          updated[0].quantity = qty;
                          const subtotal = qty * Number(updated[0].rate || 1000);
                          const tax = subtotal * (Number(invoiceForm.tax_rate || 5) / 100);
                          setInvoiceForm({ ...invoiceForm, items: updated, subtotal, tax_amount: tax, total_price: subtotal + tax });
                        }}
                      />
                      <input
                        type="number"
                        className="form-input"
                        placeholder="Rate (₹)"
                        value={invoiceForm.items?.[0]?.rate || 1000}
                        onChange={(e) => {
                          const rate = Number(e.target.value);
                          const updated = [...(invoiceForm.items || [{}])];
                          updated[0].rate = rate;
                          const subtotal = Number(updated[0].quantity || 1) * rate;
                          const tax = subtotal * (Number(invoiceForm.tax_rate || 5) / 100);
                          setInvoiceForm({ ...invoiceForm, items: updated, subtotal, tax_amount: tax, total_price: subtotal + tax });
                        }}
                      />
                    </div>
                  </div>

                  {/* Financial Totals */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="form-group">
                      <label className="form-label">Subtotal (₹)</label>
                      <input
                        type="number"
                        className="form-input"
                        value={invoiceForm.subtotal}
                        onChange={(e) => {
                          const sub = Number(e.target.value);
                          const tax = sub * (Number(invoiceForm.tax_rate || 5) / 100);
                          setInvoiceForm({ ...invoiceForm, subtotal: sub, tax_amount: tax, total_price: sub + tax });
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">GST Tax Rate (%)</label>
                      <select
                        className="form-select"
                        value={invoiceForm.tax_rate}
                        onChange={(e) => {
                          const rate = Number(e.target.value);
                          const tax = Number(invoiceForm.subtotal) * (rate / 100);
                          setInvoiceForm({ ...invoiceForm, tax_rate: rate, tax_amount: tax, total_price: Number(invoiceForm.subtotal) + tax });
                        }}
                      >
                        <option value={5}>5% (Agricultural Standard)</option>
                        <option value={12}>12%</option>
                        <option value={18}>18%</option>
                        <option value={0}>0% (Tax Exempt)</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Total Price (₹)</label>
                      <input
                        type="number"
                        className="form-input"
                        value={invoiceForm.total_price}
                        onChange={(e) => setInvoiceForm({ ...invoiceForm, total_price: Number(e.target.value) })}
                        style={{ fontWeight: 'bold', color: '#15803d' }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="form-group">
                      <label className="form-label">Payment Status</label>
                      <select
                        className="form-select"
                        value={invoiceForm.payment_status}
                        onChange={(e) => setInvoiceForm({ ...invoiceForm, payment_status: e.target.value })}
                      >
                        <option value="Paid">Paid (रक्कम प्राप्त)</option>
                        <option value="Pending">Pending (बाकी)</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Payment Mode</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="UPI / PhonePe / Cash / Bank Transfer"
                        value={invoiceForm.payment_mode}
                        onChange={(e) => setInvoiceForm({ ...invoiceForm, payment_mode: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button
                      type="button"
                      onClick={() => setEditingInvoice(null)}
                      className="btn btn-light"
                      style={{ flex: 1 }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={savingInvoice}
                      className="btn btn-primary"
                      style={{ flex: 1 }}
                    >
                      {savingInvoice ? 'Saving Invoice...' : 'Save & Generate Bill'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* ==========================================================================
              🌾 TAB: SMART CROP DOSAGE & YIELD CALCULATOR MANAGER
              ========================================================================== */}
          {activeTab === 'calculator' && (
            <div>
              {/* Header */}
              <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
                <div>
                  <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0f172a' }}>Crop Dosage & Yield Calculator Manager</h1>
                  <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Manage crops, recommended nutrition combinations, stage of application, per-acre dosage formulas, and yield jump badges for the homepage interactive calculator.</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingCropCalc({ id: `new-${Date.now()}` });
                      setCropCalcForm({
                        name: '',
                        name_mr: '',
                        crop_key: '',
                        product: 'KAIZEN - K (Potash) + THALASSA',
                        stage: 'Flowering & Fruit Setting',
                        stage_mr: 'फुलधारणा व फळ फुगवण अवस्था',
                        dosage_per_acre: '150 gm Kaizen-K in 200L water + 500 ml Thalassa',
                        unit_factor: 150,
                        unit_label: 'gm Kaizen-K',
                        unit2_factor: 500,
                        unit2_label: 'ml Thalassa',
                        water_factor: 200,
                        benefits: '+2.5 Brix sugar increase, uniform size, higher export grade produce',
                        benefits_mr: '+२.५ ब्रिक्स साखर वाढ, एकसमान फुगवण, उत्तम वजन',
                        yield_boost: '+28% Export Grade Yield',
                        yield_boost_mr: '+२८% दर्जेदार उत्पादन वाढ'
                      });
                    }}
                    className="btn btn-primary"
                  >
                    <Plus size={16} /> Add New Crop Recommendation
                  </button>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="card" style={{ padding: '1.25rem', background: 'white' }}>
                  <div className="flex justify-between items-center mb-1">
                    <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: '700' }}>TOTAL CONFIGURED CROPS</span>
                    <Calculator size={18} style={{ color: '#15803d' }} />
                  </div>
                  <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0f172a' }}>{cropCalculators.length}</div>
                  <div style={{ fontSize: '0.75rem', color: '#15803d' }}>Active in Homepage Calculator</div>
                </div>

                <div className="card" style={{ padding: '1.25rem', background: 'white' }}>
                  <div className="flex justify-between items-center mb-1">
                    <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: '700' }}>AVERAGE YIELD JUMP</span>
                    <span style={{ color: '#b45309', fontWeight: 'bold' }}>+25% - 35%</span>
                  </div>
                  <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#b45309' }}>High Impact</div>
                  <div style={{ fontSize: '0.75rem', color: '#b45309' }}>Field proven boost</div>
                </div>

                <div className="card" style={{ padding: '1.25rem', background: '#f0fdf4', borderColor: '#bbf7d0' }}>
                  <div className="flex justify-between items-center mb-1">
                    <span style={{ fontSize: '0.78rem', color: '#166534', fontWeight: '700' }}>INTERACTIVE SIMULATOR</span>
                    <CheckCircle size={18} style={{ color: '#16a34a' }} />
                  </div>
                  <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#166534' }}>1 to 25 Acres</div>
                  <div style={{ fontSize: '0.75rem', color: '#166534' }}>Real-time multiplier ready</div>
                </div>
              </div>

              {/* Search Bar */}
              <div className="card mb-4" style={{ padding: '1.25rem', background: 'white' }}>
                <div style={{ position: 'relative', maxWidth: '420px' }}>
                  <Search size={15} style={{ position: 'absolute', left: '12px', top: '10px', color: '#94a3b8' }} />
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Search crop by name, Marathi name, or formulation..."
                    style={{ paddingLeft: '34px', height: '36px', fontSize: '0.82rem' }}
                    value={cropCalcSearch}
                    onChange={(e) => setCropCalcSearch(e.target.value)}
                  />
                </div>
              </div>

              {/* Crops Table */}
              <div className="card" style={{ padding: '1.5rem', background: 'white' }}>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                    <thead>
                      <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                        <th style={{ padding: '12px 10px' }}>Crop Name (English & Marathi)</th>
                        <th style={{ padding: '12px 10px' }}>Recommended Formulation</th>
                        <th style={{ padding: '12px 10px' }}>Target Application Stage</th>
                        <th style={{ padding: '12px 10px' }}>Per Acre Dosage Formula</th>
                        <th style={{ padding: '12px 10px' }}>Yield Jump Badge</th>
                        <th style={{ padding: '12px 10px', textAlign: 'center', minWidth: '130px' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cropCalculators
                        .filter(c => {
                          const q = cropCalcSearch.toLowerCase();
                          return !q ||
                            c.name?.toLowerCase().includes(q) ||
                            c.name_mr?.toLowerCase().includes(q) ||
                            c.product?.toLowerCase().includes(q) ||
                            c.stage?.toLowerCase().includes(q);
                        })
                        .map((c) => (
                          <tr key={c.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <td style={{ padding: '12px 10px' }}>
                              <strong style={{ color: '#0f172a', display: 'block', fontSize: '0.95rem' }}>{c.name}</strong>
                              <span style={{ fontSize: '0.82rem', color: '#15803d', fontWeight: '600' }}>{c.name_mr}</span>
                            </td>

                            <td style={{ padding: '12px 10px', fontWeight: '700', color: '#0f172a' }}>
                              {c.product}
                            </td>

                            <td style={{ padding: '12px 10px', color: '#475569', fontSize: '0.85rem' }}>
                              <div>{c.stage}</div>
                              <span style={{ fontSize: '0.78rem', color: '#78716c' }}>{c.stage_mr}</span>
                            </td>

                            <td style={{ padding: '12px 10px', fontSize: '0.85rem', color: '#1e293b' }}>
                              {c.unit_factor && c.unit_label ? (
                                <div>
                                  <strong>{c.unit_factor} {c.unit_label}</strong>
                                  {c.water_factor > 0 && <span> in {c.water_factor}L water</span>}
                                  {c.unit2_factor > 0 && <span> + {c.unit2_factor} {c.unit2_label}</span>}
                                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>per acre multiplier</div>
                                </div>
                              ) : (
                                <span>{c.dosage_per_acre}</span>
                              )}
                            </td>

                            <td style={{ padding: '12px 10px' }}>
                              <span style={{ background: '#fef3c7', color: '#92400e', padding: '3px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '800' }}>
                                {c.yield_boost}
                              </span>
                            </td>

                            <td style={{ padding: '12px 10px', textAlign: 'center' }}>
                              <div className="flex gap-1 justify-center items-center">
                                <button
                                  onClick={() => {
                                    setEditingCropCalc(c);
                                    setCropCalcForm({
                                      name: c.name || '',
                                      name_mr: c.name_mr || '',
                                      crop_key: c.crop_key || '',
                                      product: c.product || '',
                                      stage: c.stage || '',
                                      stage_mr: c.stage_mr || '',
                                      dosage_per_acre: c.dosage_per_acre || '',
                                      unit_factor: c.unit_factor || 150,
                                      unit_label: c.unit_label || 'gm Kaizen-K',
                                      unit2_factor: c.unit2_factor || 0,
                                      unit2_label: c.unit2_label || '',
                                      water_factor: c.water_factor || 200,
                                      benefits: c.benefits || '',
                                      benefits_mr: c.benefits_mr || '',
                                      yield_boost: c.yield_boost || '+28% Export Grade Yield',
                                      yield_boost_mr: c.yield_boost_mr || '+२८% दर्जेदार उत्पादन'
                                    });
                                  }}
                                  className="btn btn-outline"
                                  style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                                  title="Edit Crop Recommendation"
                                >
                                  <Edit3 size={13} />
                                  <span>Edit</span>
                                </button>
                                <button
                                  onClick={() => handleDeleteCropCalc(c.id)}
                                  className="btn btn-light"
                                  style={{ color: '#ef4444', padding: '4px 6px', border: '1px solid #fee2e2' }}
                                  title="Delete Crop"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ==========================================================================
              ✏️ CREATE / EDIT CROP CALCULATOR MODAL
              ========================================================================== */}
          {editingCropCalc && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.65)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 999,
              padding: '1rem',
              overflowY: 'auto'
            }}>
              <div style={{ background: 'white', borderRadius: '20px', maxWidth: '640px', width: '100%', padding: '2rem', maxHeight: '90vh', overflowY: 'auto' }}>
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <Calculator size={20} style={{ color: '#15803d' }} />
                    <h3 style={{ fontSize: '1.25rem', margin: 0 }}>
                      {editingCropCalc.id && !editingCropCalc.id.startsWith('new-') ? 'Edit Crop Dosage Recommendation' : 'Add New Crop to Calculator'}
                    </h3>
                  </div>
                  <button onClick={() => setEditingCropCalc(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleSaveCropCalc}>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="form-group">
                      <label className="form-label">Crop Name (English) *</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. Grapes (द्राक्षे) or Banana"
                        value={cropCalcForm.name}
                        onChange={(e) => setCropCalcForm({ ...cropCalcForm, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Crop Name (मराठी) *</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. द्राक्षे किंवा केळी"
                        value={cropCalcForm.name_mr}
                        onChange={(e) => setCropCalcForm({ ...cropCalcForm, name_mr: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Recommended Product / Combination *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. KAIZEN - K (Potash) + THALASSA"
                      value={cropCalcForm.product}
                      onChange={(e) => setCropCalcForm({ ...cropCalcForm, product: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="form-group">
                      <label className="form-label">Application Stage (English)</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. Berry Elongation & Sizing Stage"
                        value={cropCalcForm.stage}
                        onChange={(e) => setCropCalcForm({ ...cropCalcForm, stage: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Application Stage (मराठी)</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. मणी वाढ व फुगवण अवस्था"
                        value={cropCalcForm.stage_mr}
                        onChange={(e) => setCropCalcForm({ ...cropCalcForm, stage_mr: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Acre Multiplier Dosage Setup */}
                  <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '1rem' }}>
                    <label className="form-label" style={{ marginBottom: '8px', color: '#15803d' }}>
                      🌾 1-Acre Multiplier Formula (Calculator calculates automatically for 1 to 25 Acres)
                    </label>
                    <div className="grid grid-cols-3 gap-2 mb-2">
                      <div>
                        <label style={{ fontSize: '0.75rem', color: '#64748b' }}>Primary Item Qty (1 Acre)</label>
                        <input
                          type="number"
                          className="form-input"
                          placeholder="e.g. 150"
                          value={cropCalcForm.unit_factor}
                          onChange={(e) => setCropCalcForm({ ...cropCalcForm, unit_factor: Number(e.target.value) })}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.75rem', color: '#64748b' }}>Primary Item Label</label>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="e.g. gm Kaizen-K or kg Silicon"
                          value={cropCalcForm.unit_label}
                          onChange={(e) => setCropCalcForm({ ...cropCalcForm, unit_label: e.target.value })}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.75rem', color: '#64748b' }}>Water per Acre (Litres)</label>
                        <input
                          type="number"
                          className="form-input"
                          placeholder="e.g. 200 (0 for soil)"
                          value={cropCalcForm.water_factor}
                          onChange={(e) => setCropCalcForm({ ...cropCalcForm, water_factor: Number(e.target.value) })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label style={{ fontSize: '0.75rem', color: '#64748b' }}>Secondary Item Qty (Optional)</label>
                        <input
                          type="number"
                          className="form-input"
                          placeholder="e.g. 500"
                          value={cropCalcForm.unit2_factor}
                          onChange={(e) => setCropCalcForm({ ...cropCalcForm, unit2_factor: Number(e.target.value) })}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.75rem', color: '#64748b' }}>Secondary Item Label</label>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="e.g. ml Thalassa or kg Manure"
                          value={cropCalcForm.unit2_label}
                          onChange={(e) => setCropCalcForm({ ...cropCalcForm, unit2_label: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="form-group">
                      <label className="form-label">Yield Jump Badge (English)</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. +28% Export Grade Yield"
                        value={cropCalcForm.yield_boost}
                        onChange={(e) => setCropCalcForm({ ...cropCalcForm, yield_boost: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Yield Jump Badge (मराठी)</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. +२८% दर्जेदार निर्यातक्षम उत्पादन"
                        value={cropCalcForm.yield_boost_mr}
                        onChange={(e) => setCropCalcForm({ ...cropCalcForm, yield_boost_mr: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="form-group">
                      <label className="form-label">Key Benefits (English)</label>
                      <textarea
                        rows={2}
                        className="form-textarea"
                        placeholder="e.g. +2.5 Brix sugar increase, zero shot berries, uniform cluster weight"
                        value={cropCalcForm.benefits}
                        onChange={(e) => setCropCalcForm({ ...cropCalcForm, benefits: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Key Benefits (मराठी)</label>
                      <textarea
                        rows={2}
                        className="form-textarea"
                        placeholder="e.g. +२.५ ब्रिक्स साखर वाढ, एकसमान मणी फुगवण, उत्तम वजन"
                        value={cropCalcForm.benefits_mr}
                        onChange={(e) => setCropCalcForm({ ...cropCalcForm, benefits_mr: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button
                      type="button"
                      onClick={() => setEditingCropCalc(null)}
                      className="btn btn-light"
                      style={{ flex: 1 }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={savingCropCalc}
                      className="btn btn-primary"
                      style={{ flex: 1 }}
                    >
                      {savingCropCalc ? 'Saving Crop Formula...' : 'Save Recommendation'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* ==========================================================================
              TAB: COMPANY & HERO BANNER SETTINGS
              ========================================================================== */}
          {activeTab === 'company' && companyInfo && (
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h1 style={{ fontSize: '1.8rem', fontWeight: '800' }}>Company & Homepage Hero Settings</h1>
                  <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Configure the homepage Hero Banner 3D product showcase, headlines, and company credentials.</p>
                </div>
              </div>

              <form onSubmit={handleSaveCompany}>
                {/* HERO BANNER 3D SHOWCASE CONFIGURATION */}
                <div className="card" style={{ padding: '2rem', background: '#ffffff', marginBottom: '2rem', border: '2px solid #e2e8f0' }}>
                  <div className="flex items-center gap-2 mb-3" style={{ color: '#15803d' }}>
                    <Sparkles size={22} />
                    <h2 style={{ fontSize: '1.3rem', fontWeight: '800', margin: 0, color: '#0f172a' }}>
                      🌟 Homepage Hero Banner 3D Product Showcase
                    </h2>
                  </div>
                  <p style={{ color: '#64748b', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
                    येथे तुम्ही होमपेजच्या मुख्य बॅनरवर दिसणारे उत्पादन, त्याचा 3D फोटो आणि मुख्य हेडलाइन्स थेट बदलू शकता.
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="form-group">
                        <label className="form-label font-bold">Featured Hero Product (मुख्य बॅनर उत्पादन)</label>
                        <select
                          className="form-select"
                          value={companyInfo.hero_featured_product_id || ''}
                          onChange={(e) => {
                            const selectedId = e.target.value;
                            const prod = products.find(p => p.id === selectedId);
                            setCompanyInfo({
                              ...companyInfo,
                              hero_featured_product_id: selectedId,
                              hero_product_image: prod ? prod.main_picture : companyInfo.hero_product_image
                            });
                          }}
                        >
                          <option value="">-- Select Product for Hero Banner --</option>
                          {products.map(p => (
                            <option key={p.id} value={p.id}>
                              {p.brand_name} {p.isFlagship ? '★ (Flagship)' : ''} - [{p.category_display || p.category}]
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label font-bold">Hero Banner Product Photo / 3D Render Image URL</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            className="form-input"
                            placeholder="https://... or /assets/images/products/kaizen-k-3d.jpg"
                            value={companyInfo.hero_product_image || ''}
                            onChange={(e) => setCompanyInfo({ ...companyInfo, hero_product_image: e.target.value })}
                          />
                          {companyInfo.hero_featured_product_id && (
                            <button
                              type="button"
                              className="btn btn-light"
                              style={{ whiteSpace: 'nowrap', fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
                              onClick={() => {
                                const prod = products.find(p => p.id === companyInfo.hero_featured_product_id);
                                if (prod?.main_picture) {
                                  setCompanyInfo({ ...companyInfo, hero_product_image: prod.main_picture });
                                }
                              }}
                              title="Reset to selected product's default picture"
                            >
                              Default Img
                            </button>
                          )}
                        </div>
                        <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                          Supports web URLs or local paths (e.g. <code>/assets/images/products/kaizen-k-3d.jpg</code>)
                        </span>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Hero Banner Headline (English)</label>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="e.g. Nourishing Soil. Growing Tomorrow."
                          value={companyInfo.hero_headline || ''}
                          onChange={(e) => setCompanyInfo({ ...companyInfo, hero_headline: e.target.value })}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Hero Banner Headline (मराठी)</label>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="उदा. मातीचे पोषण. उद्याची समृद्धी."
                          value={companyInfo.hero_headline_mr || ''}
                          onChange={(e) => setCompanyInfo({ ...companyInfo, hero_headline_mr: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* LIVE PREVIEW BOX */}
                    <div>
                      <label className="form-label font-bold">Live Banner Card Preview (थेट पूर्वावलोकन)</label>
                      <div style={{
                        background: '#1c1917',
                        padding: '1.5rem',
                        borderRadius: '20px',
                        border: '1px solid #44403c',
                        textAlign: 'center'
                      }}>
                        <div style={{
                          background: 'rgba(255, 255, 255, 0.08)',
                          padding: '1.25rem',
                          borderRadius: '16px',
                          border: '1px solid rgba(255, 255, 255, 0.2)'
                        }}>
                          <img
                            src={companyInfo.hero_product_image || (products.find(p => p.id === companyInfo.hero_featured_product_id)?.main_picture) || '/assets/images/products/kaizen-k-3d.jpg'}
                            alt="Hero Preview"
                            style={{ width: '100%', maxHeight: '200px', objectFit: 'contain', borderRadius: '12px' }}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = '/assets/images/products/kaizen-k.jpg';
                            }}
                          />
                          <div style={{ marginTop: '0.85rem', background: '#ffffff', padding: '0.85rem', borderRadius: '12px', textAlign: 'left' }}>
                            <div className="flex justify-between items-center mb-1">
                              <strong style={{ fontSize: '0.95rem', color: '#1c1917' }}>
                                {products.find(p => p.id === companyInfo.hero_featured_product_id)?.brand_name || 'KAIZEN - K'}
                              </strong>
                              <span className="badge badge-gold" style={{ fontSize: '0.65rem' }}>Flagship Innovation</span>
                            </div>
                            <p style={{ fontSize: '0.78rem', color: '#78716c', margin: 0 }}>
                              {products.find(p => p.id === companyInfo.hero_featured_product_id)?.subtitle || 'Bio-Available Potash'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* GENERAL COMPANY INFORMATION */}
                <div className="card" style={{ padding: '2rem', background: '#ffffff', marginBottom: '2rem' }}>
                  <h2 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '1.5rem', color: '#0f172a' }}>
                    🏢 Company Legal Information & Contact
                  </h2>

                  <div className="form-group">
                    <label className="form-label font-bold">Company Legal Name</label>
                    <input
                      type="text"
                      className="form-input"
                      value={companyInfo.name || ''}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, name: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="form-group">
                      <label className="form-label font-bold">Default Tagline (English)</label>
                      <input
                        type="text"
                        className="form-input"
                        value={companyInfo.tagline || ''}
                        onChange={(e) => setCompanyInfo({ ...companyInfo, tagline: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label font-bold">Default Tagline (मराठी)</label>
                      <input
                        type="text"
                        className="form-input"
                        value={companyInfo.tagline_mr || ''}
                        onChange={(e) => setCompanyInfo({ ...companyInfo, tagline_mr: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label font-bold">Company Overview / Description</label>
                    <textarea
                      rows={3}
                      className="form-textarea"
                      value={companyInfo.description || ''}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, description: e.target.value })}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={savingCompany}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '1rem', fontSize: '1.05rem', fontWeight: '800' }}
                >
                  {savingCompany ? 'Saving Settings...' : '💾 Save All Banner & Company Changes'}
                </button>
              </form>
            </div>
          )}

        </div>
      </main>

      {/* ==========================================================================
          CATEGORY ADD / EDIT POPUP MODAL
          ========================================================================== */}
      {showCategoryModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.65)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '20px',
            maxWidth: '540px',
            width: '100%',
            padding: '2rem',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.3)',
            animation: 'fadeIn 0.2s ease-out'
          }}>
            <div className="flex justify-between items-center mb-4 pb-3" style={{ borderBottom: '1px solid #e2e8f0' }}>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#0f172a' }}>
                  {editingCategory ? 'Edit Product Category' : 'Add New Product Category'}
                </h3>
                <p style={{ fontSize: '0.82rem', color: '#64748b' }}>
                  Category will instantly appear across the website & product editor.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowCategoryModal(false)}
                style={{ background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSaveCategory}>
              <div className="form-group mb-3">
                <label className="form-label font-bold">Category Title (English) *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder="e.g. Bio-Fertilizers & Inoculants"
                  value={categoryForm.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    const autoSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
                    setCategoryForm({
                      ...categoryForm,
                      name,
                      slug: editingCategory ? categoryForm.slug : autoSlug
                    });
                  }}
                />
              </div>

              <div className="form-group mb-3">
                <label className="form-label font-bold">Category Title (मराठी)</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="उदा. बायो-खते आणि जिवाणू संवर्धक"
                  value={categoryForm.name_mr}
                  onChange={(e) => setCategoryForm({ ...categoryForm, name_mr: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="form-group">
                  <label className="form-label font-bold">Category Slug / Key *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g. bio_fertilizers"
                    value={categoryForm.slug}
                    onChange={(e) => setCategoryForm({ ...categoryForm, slug: e.target.value.toLowerCase().replace(/\s+/g, '_') })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label font-bold">Icon / Emoji</label>
                  <select
                    className="form-select"
                    value={categoryForm.icon}
                    onChange={(e) => setCategoryForm({ ...categoryForm, icon: e.target.value })}
                  >
                    <option value="🌿">🌿 Foliar & Potash</option>
                    <option value="🌾">🌾 Organic / PROM</option>
                    <option value="💎">💎 Silicon / Mineral</option>
                    <option value="⚡">⚡ Micronutrients</option>
                    <option value="🌱">🌱 Bio-Fertilizer</option>
                    <option value="🧪">🧪 Crop Care</option>
                    <option value="💧">💧 Liquid Boosters</option>
                    <option value="🪴">🪴 Soil Health</option>
                    <option value="🍇">🍇 Horticulture</option>
                  </select>
                </div>
              </div>

              <div className="form-group mb-4">
                <label className="form-label font-bold">Category Short Description</label>
                <textarea
                  rows={2}
                  className="form-textarea"
                  placeholder="Brief description of formulations in this category..."
                  value={categoryForm.description}
                  onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                />
              </div>

              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setShowCategoryModal(false)}
                  className="btn btn-light"
                  style={{ padding: '0.65rem 1.25rem' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingCategory}
                  className="btn btn-primary"
                  style={{ padding: '0.65rem 1.5rem', fontWeight: 'bold' }}
                >
                  {savingCategory ? 'Saving...' : (editingCategory ? 'Update Category' : 'Create Category')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
