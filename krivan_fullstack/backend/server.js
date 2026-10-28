import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import QRCode from 'qrcode';
import slugify from 'slugify';
import { db } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Auto-sync high-res generated assets
try {
  const srcHero = `C:\\Users\\kanya salve\\.gemini\\antigravity-ide\\brain\\071a75cd-1e66-47df-84c2-3cc9ef22a641\\krivan_hero_banner_1790872733237.jpg`;
  const srcProduct = `C:\\Users\\kanya salve\\.gemini\\antigravity-ide\\brain\\071a75cd-1e66-47df-84c2-3cc9ef22a641\\kaizen_k_3d_render_1790872857947.jpg`;
  const destDirBanners = path.join(__dirname, '..', 'frontend', 'public', 'assets', 'images', 'banners');
  const destDirProducts = path.join(__dirname, '..', 'frontend', 'public', 'assets', 'images', 'products');
  if (!fs.existsSync(destDirBanners)) fs.mkdirSync(destDirBanners, { recursive: true });
  if (!fs.existsSync(destDirProducts)) fs.mkdirSync(destDirProducts, { recursive: true });
  if (fs.existsSync(srcHero)) fs.copyFileSync(srcHero, path.join(destDirBanners, 'hero-field-cinematic.jpg'));
  if (fs.existsSync(srcProduct)) fs.copyFileSync(srcProduct, path.join(destDirProducts, 'kaizen-k-3d.jpg'));
} catch (e) {
  console.error('Asset auto-sync error:', e.message);
}

// Middlewares & CORS Configuration (Placed before all route definitions)
const allowedOrigins = [
  'https://kriavan-fullstack.vercel.app',
  'https://krivan-fullstack.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin) || (typeof origin === 'string' && origin.endsWith('.vercel.app'))) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Fallback headers for all responses including 404 / errors
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app'))) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  }
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static assets
app.use('/assets', express.static(path.join(__dirname, '..', 'frontend', 'public', 'assets')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure initial database exists
db.read();

/* ==========================================================================
   PRODUCTS API ROUTES
   ========================================================================== */

// 1. Get all products (with search & category filter)
app.get('/api/products', (req, res) => {
  try {
    const data = db.read();
    let { category, search } = req.query;
    let products = data.products || [];

    if (category && category !== 'all') {
      products = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase();
      products = products.filter(p => 
        p.brand_name.toLowerCase().includes(q) ||
        (p.subtitle && p.subtitle.toLowerCase().includes(q)) ||
        (p.target_crops && p.target_crops.toLowerCase().includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q))
      );
    }

    res.json({ success: true, count: products.length, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 2. Get single product by slug
app.get('/api/products/:slug', (req, res) => {
  try {
    const data = db.read();
    const product = data.products.find(p => p.slug === req.params.slug || p.id === req.params.slug);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Also get related / other products
    const otherProducts = data.products
      .filter(p => p.id !== product.id)
      .slice(0, 4);

    res.json({
      success: true,
      data: {
        ...product,
        company: data.company,
        other_products: otherProducts
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 3. Create new product
app.post('/api/products', async (req, res) => {
  try {
    const data = db.read();
    const {
      brand_name,
      category,
      category_display,
      manufacturer,
      subtitle,
      packing,
      target_crops,
      shortDesc,
      benefits,
      composition,
      dosage,
      application_method,
      precautions,
      main_picture,
      youtube_link
    } = req.body;

    if (!brand_name) {
      return res.status(400).json({ success: false, message: 'Brand name is required' });
    }

    const slug = slugify(brand_name, { lower: true, strict: true }) + '-' + Date.now().toString().slice(-4);
    
    const newProduct = {
      id: slug,
      slug,
      brand_name,
      category: category || 'potash',
      category_display: category_display || 'Potash & Plant Boosters',
      category_display_mr: req.body.category_display_mr || '',
      manufacturer: manufacturer || 'Krivan Industries Pvt. Ltd.',
      subtitle: subtitle || '',
      subtitle_mr: req.body.subtitle_mr || '',
      isFlagship: req.body.isFlagship || false,
      packing: packing || '',
      target_crops: target_crops || 'All Crops',
      target_crops_mr: req.body.target_crops_mr || '',
      shortDesc: shortDesc || '',
      shortDesc_mr: req.body.shortDesc_mr || '',
      main_picture: main_picture || '/assets/images/products/kaizen-k.jpg',
      youtube_link: youtube_link || '',
      composition: Array.isArray(composition) ? composition : [],
      benefits: Array.isArray(benefits) ? benefits : (typeof benefits === 'string' ? benefits.split('\n') : []),
      benefits_mr: req.body.benefits_mr || [],
      specification: req.body.specification || '',
      usage: req.body.usage || '',
      dosage: dosage || '',
      application_method: application_method || '',
      precautions: precautions || '',
      created_at: new Date().toISOString()
    };

    data.products.unshift(newProduct);
    db.write(data);

    res.status(201).json({ success: true, message: 'Product created successfully', data: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 4. Update Product
app.put('/api/products/:id', (req, res) => {
  try {
    const data = db.read();
    const index = data.products.findIndex(p => p.id === req.params.id || p.slug === req.params.id);

    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    data.products[index] = {
      ...data.products[index],
      ...req.body,
      updated_at: new Date().toISOString()
    };

    db.write(data);
    res.json({ success: true, message: 'Product updated successfully', data: data.products[index] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 5. Delete Product
app.delete('/api/products/:id', (req, res) => {
  try {
    const data = db.read();
    const index = data.products.findIndex(p => p.id === req.params.id || p.slug === req.params.id);

    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const deleted = data.products.splice(index, 1);
    db.write(data);

    res.json({ success: true, message: 'Product deleted successfully', data: deleted[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/* ==========================================================================
   PRODUCT CATEGORIES API ROUTES
   ========================================================================== */

// 1. Get all categories
app.get('/api/categories', (req, res) => {
  try {
    const data = db.read();
    if (!data.categories || data.categories.length === 0) {
      data.categories = [
        {
          id: 'potash',
          slug: 'potash',
          name: 'Potash & Plant Boosters',
          name_mr: 'पोटॅश आणि वनस्पती वर्धक',
          icon: '🌿',
          color: '#15803d',
          description: 'Rhodophytes bio-potash and berry sizing plant boosters.'
        },
        {
          id: 'organic_manure',
          slug: 'organic_manure',
          name: 'Organic Manures & PROM',
          name_mr: 'सेंद्रिय खते आणि पीआरओएम',
          icon: '🌾',
          color: '#2563eb',
          description: 'Phosphate Rich Organic Manure and soil rejuvenation compost.'
        },
        {
          id: 'silicon',
          slug: 'silicon',
          name: 'Silicon Soil Conditioners',
          name_mr: 'सिलिकॉन सॉईल कंडिशनर',
          icon: '💎',
          color: '#0891b2',
          description: 'Diatomite amorphous silicon for root strength and biotic stress defense.'
        },
        {
          id: 'micronutrients',
          slug: 'micronutrients',
          name: 'Chelated Micronutrients',
          name_mr: 'मायक्रोन्युट्रिएंट्स आणि सप्लीमेंट्स',
          icon: '⚡',
          color: '#d97706',
          description: 'Essential secondary and trace nutrients for chlorophyll and flowering.'
        },
        {
          id: 'bio_fertilizers',
          slug: 'bio_fertilizers',
          name: 'Bio-Fertilizers & NPK Consortium',
          name_mr: 'बायो-खते आणि जीवाणू संवर्धक',
          icon: '🌱',
          color: '#7c3aed',
          description: 'Nitrogen fixers, PSB, and mycorrhiza bio-cultures.'
        }
      ];
      db.write(data);
    }

    // Attach real-time product count for each category
    const products = data.products || [];
    const categoriesWithCount = data.categories.map(cat => ({
      ...cat,
      product_count: products.filter(p => p.category && p.category.toLowerCase() === cat.slug.toLowerCase()).length
    }));

    res.json({ success: true, count: categoriesWithCount.length, data: categoriesWithCount });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 2. Create Category
app.post('/api/categories', (req, res) => {
  try {
    const data = db.read();
    if (!data.categories) data.categories = [];

    const { name, name_mr, slug, icon, color, description } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: 'Category name is required' });
    }

    const catSlug = slug || slugify(name, { lower: true, strict: true });
    
    // Check if duplicate slug
    if (data.categories.some(c => c.slug === catSlug)) {
      return res.status(400).json({ success: false, message: 'Category with this slug already exists' });
    }

    const newCategory = {
      id: catSlug,
      slug: catSlug,
      name,
      name_mr: name_mr || '',
      icon: icon || '🌿',
      color: color || '#15803d',
      description: description || '',
      created_at: new Date().toISOString()
    };

    data.categories.push(newCategory);
    db.write(data);

    res.status(201).json({ success: true, message: 'Category created successfully', data: newCategory });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 3. Update Category
app.put('/api/categories/:id', (req, res) => {
  try {
    const data = db.read();
    if (!data.categories) data.categories = [];

    const index = data.categories.findIndex(c => c.id === req.params.id || c.slug === req.params.id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    const prevSlug = data.categories[index].slug;
    const newSlug = req.body.slug || prevSlug;

    data.categories[index] = {
      ...data.categories[index],
      ...req.body,
      id: newSlug,
      slug: newSlug,
      updated_at: new Date().toISOString()
    };

    // If slug changed, update linked products
    if (prevSlug !== newSlug && data.products) {
      data.products.forEach(p => {
        if (p.category === prevSlug) {
          p.category = newSlug;
          p.category_display = req.body.name || p.category_display;
          p.category_display_mr = req.body.name_mr || p.category_display_mr;
        }
      });
    }

    db.write(data);
    res.json({ success: true, message: 'Category updated successfully', data: data.categories[index] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 4. Delete Category
app.delete('/api/categories/:id', (req, res) => {
  try {
    const data = db.read();
    if (!data.categories) data.categories = [];

    const index = data.categories.findIndex(c => c.id === req.params.id || c.slug === req.params.id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    const deleted = data.categories.splice(index, 1);
    db.write(data);

    res.json({ success: true, message: 'Category deleted successfully', data: deleted[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/* ==========================================================================
   QR CODE GENERATION API
   ========================================================================== */

// Generates dynamic QR Code data URL or PNG image for any product
app.get('/api/qr/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const clientOrigin = req.headers.origin || req.headers.referer || `http://localhost:5173`;
    const targetUrl = `${clientOrigin}/product/${slug}`;

    // Return as JSON with base64 data URL
    const qrDataUrl = await QRCode.toDataURL(targetUrl, {
      errorCorrectionLevel: 'H',
      margin: 2,
      width: 400,
      color: {
        dark: '#1b5e20', // Krivan Lush Green Brand Color
        light: '#ffffff'
      }
    });

    if (req.query.format === 'image') {
      const imgBuffer = await QRCode.toBuffer(targetUrl, {
        errorCorrectionLevel: 'H',
        margin: 2,
        width: 400,
        color: {
          dark: '#1b5e20',
          light: '#ffffff'
        }
      });
      res.setHeader('Content-Type', 'image/png');
      return res.send(imgBuffer);
    }

    res.json({ success: true, slug, targetUrl, qrCode: qrDataUrl });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/* ==========================================================================
   COMPANY INFORMATION & STATS
   ========================================================================== */

app.get('/api/company', (req, res) => {
  try {
    const data = db.read();
    res.json({ success: true, data: data.company });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/* ==========================================================================
   BLOGS API ROUTES
   ========================================================================== */

// 1. Get all blogs
app.get('/api/blogs', (req, res) => {
  try {
    const data = db.read();
    res.json({ success: true, count: (data.blogs || []).length, data: data.blogs || [] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 2. Get single blog by slug
app.get('/api/blogs/:slug', (req, res) => {
  try {
    const data = db.read();
    const blog = (data.blogs || []).find(b => b.slug === req.params.slug || b.id === req.params.slug);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }
    const relatedBlogs = (data.blogs || []).filter(b => b.id !== blog.id).slice(0, 2);
    res.json({ success: true, data: { ...blog, related: relatedBlogs } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 3. Create new blog post
app.post('/api/blogs', (req, res) => {
  try {
    const data = db.read();
    const { title, title_mr, category, image, readTime, summary, summary_mr, content, content_mr, author } = req.body;
    if (!title) {
      return res.status(400).json({ success: false, message: 'Blog title is required' });
    }

    const slug = slugify(title, { lower: true, strict: true }) + '-' + Date.now().toString().slice(-4);
    const newBlog = {
      id: slug,
      slug,
      title,
      title_mr: title_mr || '',
      category: category || 'Crop Nutrition',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      readTime: readTime || '4 min read',
      author: author || 'Krivan Agronomy Research Team',
      image: image || '/assets/images/banners/banner-field.jpg',
      summary: summary || '',
      summary_mr: summary_mr || '',
      content: content || summary || '',
      content_mr: content_mr || summary_mr || '',
      created_at: new Date().toISOString()
    };

    if (!data.blogs) data.blogs = [];
    data.blogs.unshift(newBlog);
    db.write(data);

    res.status(201).json({ success: true, message: 'Blog published successfully', data: newBlog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 4. Update blog post
app.put('/api/blogs/:id', (req, res) => {
  try {
    const data = db.read();
    if (!data.blogs) data.blogs = [];
    const index = data.blogs.findIndex(b => b.id === req.params.id || b.slug === req.params.id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }

    data.blogs[index] = {
      ...data.blogs[index],
      ...req.body,
      updated_at: new Date().toISOString()
    };

    db.write(data);
    res.json({ success: true, message: 'Blog updated successfully', data: data.blogs[index] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 5. Delete blog post
app.delete('/api/blogs/:id', (req, res) => {
  try {
    const data = db.read();
    if (!data.blogs) data.blogs = [];
    const index = data.blogs.findIndex(b => b.id === req.params.id || b.slug === req.params.id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    const deleted = data.blogs.splice(index, 1);
    db.write(data);
    res.json({ success: true, message: 'Blog deleted successfully', data: deleted[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/* ==========================================================================
   CONTACT US / ENQUIRIES API (Django ContactUs model equivalent)
   ========================================================================== */

// 1. Submit new enquiry
app.post('/api/contact', (req, res) => {
  try {
    const { full_name, email, phone_number, product_id, product_name, message, address } = req.body;

    if (!full_name || !phone_number) {
      return res.status(400).json({ success: false, message: 'Full name and Phone number are required.' });
    }

    const data = db.read();
    const newEnquiry = {
      id: Date.now().toString(),
      full_name,
      email: email || '',
      phone_number,
      product_id: product_id || null,
      product_name: product_name || 'General Enquiry',
      address: address || '',
      message: message || '',
      created_at: new Date().toISOString()
    };

    if (!data.contacts) data.contacts = [];
    data.contacts.unshift(newEnquiry);
    db.write(data);

    res.status(201).json({
      success: true,
      message: 'Your enquiry has been submitted successfully. Our team will contact you soon.',
      data: newEnquiry
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 2. Get all enquiries (for Admin)
app.get('/api/contact', (req, res) => {
  try {
    const data = db.read();
    res.json({ success: true, count: (data.contacts || []).length, data: data.contacts || [] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 3. Update enquiry status (Viewed / Only Visited vs Bought / Purchased)
app.put('/api/contact/:id', (req, res) => {
  try {
    const data = db.read();
    if (!data.contacts) data.contacts = [];
    const index = data.contacts.findIndex(c => String(c.id) === String(req.params.id));

    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }

    const { status, notes, purchased_qty, purchased_amount, purchased_item } = req.body;

    data.contacts[index] = {
      ...data.contacts[index],
      status: status || data.contacts[index].status || 'pending',
      notes: notes !== undefined ? notes : (data.contacts[index].notes || ''),
      purchased_qty: purchased_qty !== undefined ? purchased_qty : (data.contacts[index].purchased_qty || ''),
      purchased_amount: purchased_amount !== undefined ? purchased_amount : (data.contacts[index].purchased_amount || ''),
      purchased_item: purchased_item !== undefined ? purchased_item : (data.contacts[index].purchased_item || ''),
      action_date: new Date().toISOString()
    };

    db.write(data);
    res.json({ success: true, message: 'Enquiry status updated successfully', data: data.contacts[index] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 4. Delete enquiry
app.delete('/api/contact/:id', (req, res) => {
  try {
    const data = db.read();
    if (!data.contacts) data.contacts = [];
    data.contacts = data.contacts.filter(c => String(c.id) !== String(req.params.id));
    db.write(data);
    res.json({ success: true, message: 'Enquiry deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/* ==========================================================================
   INVENTORY MANAGEMENT API
   ========================================================================== */

// 1. Get Inventory
app.get('/api/inventory', (req, res) => {
  try {
    const data = db.read();
    if (!data.inventory) {
      // Auto initialize default inventory from existing products
      data.inventory = (data.products || []).map((p, idx) => ({
        id: p.id || p.slug,
        product_slug: p.slug,
        product_name: p.brand_name,
        category: p.category_display || p.category,
        packing: p.packing || 'Standard Pack',
        current_stock: idx === 0 ? 840 : (idx === 1 ? 320 : (idx === 2 ? 150 : 280)),
        min_threshold: 50,
        unit: p.packing?.toLowerCase().includes('litre') || p.packing?.toLowerCase().includes('ml') ? 'Bottles' : (p.packing?.toLowerCase().includes('gm') ? 'Packs' : 'Bags'),
        warehouse: idx % 2 === 0 ? 'Pune Central Plant (MIDC Chakan)' : 'Nashik Regional Depot',
        batch_no: `KRIV-2026-B0${idx + 1}`,
        status: 'in_stock',
        last_restocked: new Date(Date.now() - idx * 86400000 * 3).toISOString()
      }));
      db.write(data);
    }

    // Refresh stock status
    const updatedInventory = data.inventory.map(item => {
      let status = 'in_stock';
      if (Number(item.current_stock) <= 0) status = 'out_of_stock';
      else if (Number(item.current_stock) <= Number(item.min_threshold || 50)) status = 'low_stock';
      return { ...item, status };
    });

    res.json({ success: true, count: updatedInventory.length, data: updatedInventory });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 2. Update stock / inventory item
app.put('/api/inventory/:id', (req, res) => {
  try {
    const data = db.read();
    if (!data.inventory) data.inventory = [];
    const index = data.inventory.findIndex(i => i.id === req.params.id);

    if (index === -1) {
      // Create new inventory entry
      const newItem = {
        id: req.params.id,
        ...req.body,
        last_restocked: new Date().toISOString()
      };
      data.inventory.push(newItem);
      db.write(data);
      return res.status(201).json({ success: true, message: 'Inventory item added', data: newItem });
    }

    data.inventory[index] = {
      ...data.inventory[index],
      ...req.body,
      last_restocked: req.body.current_stock !== data.inventory[index].current_stock ? new Date().toISOString() : data.inventory[index].last_restocked
    };

    db.write(data);
    res.json({ success: true, message: 'Inventory updated successfully', data: data.inventory[index] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 3. Quick stock adjustment (+ / - quantity)
app.post('/api/inventory/:id/adjust', (req, res) => {
  try {
    const data = db.read();
    if (!data.inventory) data.inventory = [];
    const index = data.inventory.findIndex(i => i.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Inventory item not found' });
    }

    const { change, reason } = req.body; // e.g. +50 or -10
    const newStock = Math.max(0, Number(data.inventory[index].current_stock || 0) + Number(change || 0));
    data.inventory[index].current_stock = newStock;
    data.inventory[index].last_restocked = new Date().toISOString();
    if (reason) data.inventory[index].last_reason = reason;

    db.write(data);
    res.json({ success: true, message: `Stock adjusted by ${change > 0 ? '+' : ''}${change}`, data: data.inventory[index] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/* ==========================================================================
   CUSTOMER ORDERS & TAX INVOICES API
   ========================================================================== */

// 1. Get all customer invoices
app.get('/api/invoices', (req, res) => {
  try {
    const data = db.read();
    if (!data.invoices || data.invoices.length === 0) {
      // Seed default customer invoices
      data.invoices = [
        {
          id: 'INV-2026-001',
          invoice_no: 'KRIV/2026/001',
          date: '2026-10-01',
          customer_name: 'Suresh Ramchandra Patil',
          phone_number: '+91 98220 11223',
          address: 'At Post Pimpalgaon Baswant, Taluka Niphad, Nashik - 422209',
          items: [
            {
              product_name: 'KAIZEN - K (Rhodophytes Potash 48gm)',
              hsn: '3104',
              quantity: 10,
              unit: 'Packs',
              rate: 650,
              amount: 6500
            },
            {
              product_name: 'THALASSA (Flower & Fruit Booster 1L)',
              hsn: '3105',
              quantity: 2,
              unit: 'Bottles',
              rate: 1100,
              amount: 2200
            }
          ],
          subtotal: 8700,
          tax_rate: 5,
          cgst: 217.5,
          sgst: 217.5,
          tax_amount: 435,
          discount: 0,
          total_price: 9135,
          payment_status: 'Paid',
          payment_mode: 'UPI / PhonePe',
          notes: 'Grape vineyard spray dose for October pruning.',
          created_at: new Date().toISOString()
        },
        {
          id: 'INV-2026-002',
          invoice_no: 'KRIV/2026/002',
          date: '2026-09-28',
          customer_name: 'Dattatray Shinde',
          phone_number: '+91 94220 77889',
          address: 'Plot No. 14, APMC Road, Baramati, Pune - 413102',
          items: [
            {
              product_name: 'KRIV - MRUDA (Diatomite Silicon 25kg)',
              hsn: '3105',
              quantity: 4,
              unit: 'Bags',
              rate: 1400,
              amount: 5600
            },
            {
              product_name: 'KRIV - VASUNDHARA (Organic Manure 40kg)',
              hsn: '3101',
              quantity: 10,
              unit: 'Bags',
              rate: 850,
              amount: 8500
            }
          ],
          subtotal: 14100,
          tax_rate: 5,
          cgst: 352.5,
          sgst: 352.5,
          tax_amount: 705,
          discount: 305,
          total_price: 14500,
          payment_status: 'Paid',
          payment_mode: 'Bank Transfer / RTGS',
          notes: 'Sugarcane basal dose requirement.',
          created_at: new Date(Date.now() - 86400000 * 3).toISOString()
        }
      ];
      db.write(data);
    }

    res.json({ success: true, count: data.invoices.length, data: data.invoices });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 2. Create customer invoice
app.post('/api/invoices', (req, res) => {
  try {
    const data = db.read();
    if (!data.invoices) data.invoices = [];

    const {
      customer_name,
      phone_number,
      address,
      items,
      subtotal,
      tax_rate,
      tax_amount,
      discount,
      total_price,
      payment_status,
      payment_mode,
      notes
    } = req.body;

    if (!customer_name || !phone_number) {
      return res.status(400).json({ success: false, message: 'Customer name and phone number are required' });
    }

    const count = data.invoices.length + 1;
    const invoiceNo = `KRIV/2026/${String(count).padStart(3, '0')}`;
    const id = `INV-2026-${String(count).padStart(3, '0')}`;

    const newInvoice = {
      id,
      invoice_no: invoiceNo,
      date: req.body.date || new Date().toISOString().split('T')[0],
      customer_name,
      phone_number,
      address: address || '',
      items: Array.isArray(items) && items.length > 0 ? items : [
        { product_name: 'Kaizen-K (Bio-Potash)', hsn: '3104', quantity: 1, unit: 'Pack', rate: subtotal || 1000, amount: subtotal || 1000 }
      ],
      subtotal: Number(subtotal) || 0,
      tax_rate: Number(tax_rate) || 5,
      cgst: (Number(tax_amount) || 0) / 2,
      sgst: (Number(tax_amount) || 0) / 2,
      tax_amount: Number(tax_amount) || 0,
      discount: Number(discount) || 0,
      total_price: Number(total_price) || 0,
      payment_status: payment_status || 'Paid',
      payment_mode: payment_mode || 'Cash',
      notes: notes || '',
      created_at: new Date().toISOString()
    };

    data.invoices.unshift(newInvoice);
    db.write(data);

    res.status(201).json({ success: true, message: 'Invoice created successfully', data: newInvoice });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 3. Update customer invoice
app.put('/api/invoices/:id', (req, res) => {
  try {
    const data = db.read();
    if (!data.invoices) data.invoices = [];
    const index = data.invoices.findIndex(i => String(i.id) === String(req.params.id) || String(i.invoice_no) === String(req.params.id));

    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Invoice not found' });
    }

    data.invoices[index] = {
      ...data.invoices[index],
      ...req.body,
      updated_at: new Date().toISOString()
    };

    db.write(data);
    res.json({ success: true, message: 'Invoice updated successfully', data: data.invoices[index] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 4. Delete customer invoice
app.delete('/api/invoices/:id', (req, res) => {
  try {
    const data = db.read();
    if (!data.invoices) data.invoices = [];
    data.invoices = data.invoices.filter(i => String(i.id) !== String(req.params.id) && String(i.invoice_no) !== String(req.params.id));
    db.write(data);
    res.json({ success: true, message: 'Invoice deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update Company Info
app.put('/api/company', (req, res) => {
  try {
    const data = db.read();
    data.company = { ...data.company, ...req.body };
    db.write(data);
    res.json({ success: true, message: 'Company information updated successfully', data: data.company });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/* ==========================================================================
   🌾 SMART CROP DOSAGE & YIELD CALCULATOR API
   ========================================================================== */

// 1. Get all crop calculator configurations
app.get('/api/crop-calculator', (req, res) => {
  try {
    const data = db.read();
    if (!data.crop_calculators || data.crop_calculators.length === 0) {
      data.crop_calculators = [
        {
          id: "crop-grapes",
          crop_key: "grapes",
          name: "Grapes (द्राक्षे)",
          name_mr: "द्राक्षे (Grapes)",
          product: "KAIZEN - K (Potash) + THALASSA",
          stage: "Berry Elongation & Sizing Stage",
          stage_mr: "मणी वाढ व फुगवण अवस्था",
          dosage_per_acre: "150 gm Kaizen-K in 200L water + 500 ml Thalassa",
          unit_factor: 150,
          unit_label: "gm Kaizen-K",
          unit2_factor: 500,
          unit2_label: "ml Thalassa",
          water_factor: 200,
          benefits: "+2.5 Brix sugar increase, zero shot berries, uniform cluster weight",
          benefits_mr: "+२.५ ब्रिक्स साखर वाढ, एकसमान मणी फुगवण, उत्तम वजन",
          yield_boost: "+28% Export Grade Yield",
          yield_boost_mr: "+२८% दर्जेदार निर्यातक्षम उत्पादन"
        },
        {
          id: "crop-sugarcane",
          crop_key: "sugarcane",
          name: "Sugarcane (ऊस)",
          name_mr: "ऊस (Sugarcane)",
          product: "KRIV - MRUDA (Silicon) + VASUNDHARA",
          stage: "Basal Dose & Earthing Up",
          stage_mr: "मोठी बांधणी व बेसल डोस",
          dosage_per_acre: "25 kg Kriv Mruda + 100 kg Kriv Vasundhara",
          unit_factor: 25,
          unit_label: "kg Kriv Mruda",
          unit2_factor: 100,
          unit2_label: "kg Kriv Vasundhara",
          water_factor: 0,
          benefits: "Thick inter-nodal distance, lodging prevention in heavy winds, higher sugar recovery",
          benefits_mr: "कांड्यांची जाडी, वादळात ऊस लोळण्यापासून संरक्षण, साखर उतारा वाढ",
          yield_boost: "+12 to 15 Ton / Acre Jump",
          yield_boost_mr: "+१२ ते १५ टन एकरी वाढ"
        },
        {
          id: "crop-pomegranate",
          crop_key: "pomegranate",
          name: "Pomegranate (डाळिंब)",
          name_mr: "डाळिंब (Pomegranate)",
          product: "KAIZEN - K + KRIV MRUDA",
          stage: "Pre-Flowering & Fruit Growth",
          stage_mr: "कळी निघणे व फळ विकास अवस्था",
          dosage_per_acre: "200 gm Kaizen-K foliar + 25 kg Silicon broadcast",
          unit_factor: 200,
          unit_label: "gm Kaizen-K",
          unit2_factor: 25,
          unit2_label: "kg Kriv Mruda",
          water_factor: 200,
          benefits: "Thick fruit rind, deep ruby red arils, zero bacterial blight cracking",
          benefits_mr: "फळाची जाड साल, गडद लाल दाणे, तेलकट व फळ तडकणे रोखते",
          yield_boost: "+32% Premium Market Grade",
          yield_boost_mr: "+३२% सुपर मार्केट ग्रेड फळे"
        },
        {
          id: "crop-cotton",
          crop_key: "cotton",
          name: "Cotton (कापूस)",
          name_mr: "कापूस (Cotton)",
          product: "KRIV - NATURA + THALASSA",
          stage: "Square Formation & Boll Development",
          stage_mr: "पाती लागणे व बोंड विकास अवस्था",
          dosage_per_acre: "50 kg Kriv Natura + 250 ml Thalassa spray",
          unit_factor: 50,
          unit_label: "kg Kriv Natura",
          unit2_factor: 250,
          unit2_label: "ml Thalassa",
          water_factor: 150,
          benefits: "Stops square & boll dropping under thermal stress, increases staple length",
          benefits_mr: "उष्णतेमुळे होणारी पातेगळ थांबवून बोंडांचे वजन व धाग्याची लांबी वाढवते",
          yield_boost: "+4 to 6 Quintals / Acre",
          yield_boost_mr: "+४ ते ६ क्विंटल एकरी वाढ"
        },
        {
          id: "crop-vegetables",
          crop_key: "vegetables",
          name: "Tomato & Vegetables (टोमॅटो व भाजीपाला)",
          name_mr: "टोमॅटो व भाजीपाला (Tomato & Veggies)",
          product: "THALASSA + KAIZEN - K",
          stage: "Flowering & Continuous Harvesting",
          stage_mr: "फुलधारणा व सतत तोडणी अवस्था",
          dosage_per_acre: "400 ml Thalassa + 200 gm Kaizen-K in 200L water",
          unit_factor: 200,
          unit_label: "gm Kaizen-K",
          unit2_factor: 400,
          unit2_label: "ml Thalassa",
          water_factor: 200,
          benefits: "Profuse flowering, shiny skin, longer shelf-life during transport",
          benefits_mr: "भरघोस फुलधारणा, फळांना आकर्षक चकाकी, टिकवण क्षमता वाढ",
          yield_boost: "+35% Marketable Yield",
          yield_boost_mr: "+३५% उत्पादन वाढ"
        },
        {
          id: "crop-banana",
          crop_key: "banana",
          name: "Banana (केळी)",
          name_mr: "केळी (Banana)",
          product: "KAIZEN - K + KRIV - MRUDA",
          stage: "Bunch Emergence & Finger Filling",
          stage_mr: "कमळ निघणे व घड भरणे अवस्था",
          dosage_per_acre: "500 gm Kaizen-K Drip + 50 kg Kriv Mruda",
          unit_factor: 500,
          unit_label: "gm Kaizen-K (Drip)",
          unit2_factor: 50,
          unit2_label: "kg Kriv Mruda",
          water_factor: 0,
          benefits: "Uniform fingers, prevents finger dropping, increases heavy bunch weight",
          benefits_mr: "घडाचे एकसमान वजन, केळीची जाडी व लांबी वाढ, उत्तम बाजारभाव",
          yield_boost: "+4 to 5 kg Bunch Weight Jump",
          yield_boost_mr: "+४ ते ५ किलो घडाचे सरासरी वजन वाढ"
        },
        {
          id: "crop-onion",
          crop_key: "onion",
          name: "Onion & Garlic (कांदा व लसूण)",
          name_mr: "कांदा व लसूण (Onion & Garlic)",
          product: "KAIZEN - K + KRIV VASUNDHARA",
          stage: "Bulb Development & Maturity",
          stage_mr: "कांदा पोसणे व पक्वता अवस्था",
          dosage_per_acre: "200 gm Kaizen-K spray + 100 kg Vasundhara",
          unit_factor: 200,
          unit_label: "gm Kaizen-K",
          unit2_factor: 100,
          unit2_label: "kg Kriv Vasundhara",
          water_factor: 200,
          benefits: "Thick onion scales, uniform bulb size, zero rot in storage",
          benefits_mr: "कांद्याचा चमकदार लाल रंग, आकर्षक पत्ती, चाळीत जास्त दिवस टिकवण क्षमता",
          yield_boost: "+25% Export Grade Bulbs",
          yield_boost_mr: "+२५% निर्यातक्षम मोठे कांदे"
        }
      ];
      db.write(data);
    }
    res.json({ success: true, count: data.crop_calculators.length, data: data.crop_calculators });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 2. Add new crop calculator recommendation
app.post('/api/crop-calculator', (req, res) => {
  try {
    const data = db.read();
    if (!data.crop_calculators) data.crop_calculators = [];

    const {
      name,
      name_mr,
      product,
      stage,
      stage_mr,
      dosage_per_acre,
      unit_factor,
      unit_label,
      unit2_factor,
      unit2_label,
      water_factor,
      benefits,
      benefits_mr,
      yield_boost,
      yield_boost_mr
    } = req.body;

    if (!name || !product) {
      return res.status(400).json({ success: false, message: 'Crop name and recommended product are required' });
    }

    const cropKey = req.body.crop_key || slugify(name, { lower: true, strict: true });
    const id = req.body.id || `crop-${cropKey}-${Date.now()}`;

    const newCrop = {
      id,
      crop_key: cropKey,
      name,
      name_mr: name_mr || name,
      product,
      stage: stage || 'General Vegetative & Fruiting',
      stage_mr: stage_mr || 'वाढ व विकास अवस्था',
      dosage_per_acre: dosage_per_acre || 'As per agronomist recommendation',
      unit_factor: Number(unit_factor) || 100,
      unit_label: unit_label || 'gm',
      unit2_factor: Number(unit2_factor) || 0,
      unit2_label: unit2_label || '',
      water_factor: Number(water_factor) || 200,
      benefits: benefits || 'Enhances crop yield and vigor',
      benefits_mr: benefits_mr || 'पिकाची निरोगी वाढ व उत्पादन वाढ',
      yield_boost: yield_boost || '+20% Higher Yield',
      yield_boost_mr: yield_boost_mr || '+२०% उत्पादन वाढ',
      created_at: new Date().toISOString()
    };

    data.crop_calculators.push(newCrop);
    db.write(data);

    res.status(201).json({ success: true, message: 'Crop recommendation created', data: newCrop });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 3. Update existing crop recommendation
app.put('/api/crop-calculator/:id', (req, res) => {
  try {
    const data = db.read();
    if (!data.crop_calculators) data.crop_calculators = [];
    const index = data.crop_calculators.findIndex(c => c.id === req.params.id || c.crop_key === req.params.id);

    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Crop recommendation not found' });
    }

    data.crop_calculators[index] = {
      ...data.crop_calculators[index],
      ...req.body,
      updated_at: new Date().toISOString()
    };

    db.write(data);
    res.json({ success: true, message: 'Crop recommendation updated', data: data.crop_calculators[index] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 4. Delete crop recommendation
app.delete('/api/crop-calculator/:id', (req, res) => {
  try {
    const data = db.read();
    if (!data.crop_calculators) data.crop_calculators = [];
    data.crop_calculators = data.crop_calculators.filter(c => c.id !== req.params.id && c.crop_key !== req.params.id);
    db.write(data);
    res.json({ success: true, message: 'Crop recommendation deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Fallback health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🌿 Krivan Node.js Backend Server running on http://localhost:${PORT}`);
});

