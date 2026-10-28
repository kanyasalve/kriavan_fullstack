import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';
import ProductCard from '../components/ProductCard';
import { Search, Filter, Sparkles, Sprout } from 'lucide-react';

const Products = () => {
  const { lang, t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(searchParams.get('cat') || 'all');
  const [searchTerm, setSearchTerm] = useState('');

  const [dbCategories, setDbCategories] = useState([]);

  // Fetch all products and categories
  useEffect(() => {
    const loadAll = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          api.getProducts(),
          api.getCategories()
        ]);
        if (prodRes.success) {
          setAllProducts(prodRes.data);
        }
        if (catRes.success) {
          setDbCategories(catRes.data);
        }
      } catch (err) {
        console.error('Error fetching data', err);
      }
    };
    loadAll();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [activeCategory, searchTerm]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await api.getProducts({
        category: activeCategory !== 'all' ? activeCategory : undefined,
        search: searchTerm || undefined
      });
      if (res.success) {
        setProducts(res.data);
      }
    } catch (err) {
      console.error('Error fetching products', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    if (cat === 'all') {
      searchParams.delete('cat');
    } else {
      searchParams.set('cat', cat);
    }
    setSearchParams(searchParams);
  };

  // Dynamically compute available categories from live database
  const dynamicCategories = [
    {
      id: 'all',
      name: lang === 'mr' ? 'सर्व उत्पादने' : 'All Formulations',
      count: allProducts.length,
      icon: '🌿'
    },
    ...dbCategories.map(cat => {
      const matchingCount = allProducts.filter(p => p.category === cat.slug).length;
      const displayName = lang === 'mr' && cat.name_mr ? cat.name_mr : cat.name;
      return {
        id: cat.slug,
        name: displayName,
        count: matchingCount,
        icon: cat.icon || '🏷️'
      };
    })
  ];

  return (
    <div className="section" style={{ paddingTop: '3rem' }}>
      <div className="container">
        {/* Page Header */}
        <div className="text-center mb-4">
          <div className="badge badge-green mb-2">
            <Sprout size={14} /> Certified Formulations
          </div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>Products Catalogue</h1>
          <p style={{ color: '#64748b', maxWidth: '680px', margin: '0 auto' }}>
            High-efficiency bio-potash, enriched organic manures, PROM, diatomite silicon, and crop-specific nutrition.
          </p>

          {/* Search Bar */}
          <div style={{ maxWidth: '540px', margin: '2rem auto 0', position: 'relative' }}>
            <Search size={20} style={{ position: 'absolute', left: '16px', top: '15px', color: '#94a3b8' }} />
            <input
              type="text"
              className="form-input"
              style={{ paddingLeft: '48px', height: '50px', borderRadius: '30px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
              placeholder={t('searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Dynamic Category Filters */}
        <div className="flex justify-center gap-2 mb-4 flex-wrap">
          {dynamicCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`btn ${activeCategory === cat.id ? 'btn-primary' : 'btn-light'}`}
              style={{ padding: '0.5rem 1.25rem', fontSize: '0.88rem', textTransform: 'capitalize' }}
            >
              <span>{cat.name}</span>
              <span style={{
                marginLeft: '6px',
                fontSize: '0.75rem',
                opacity: 0.85,
                background: activeCategory === cat.id ? 'rgba(255,255,255,0.25)' : '#e2e8f0',
                padding: '1px 6px',
                borderRadius: '10px'
              }}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-5">
            <div className="badge badge-green">Loading catalog...</div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-5 card" style={{ padding: '3rem', maxWidth: '500px', margin: '0 auto' }}>
            <h3>No products found</h3>
            <p style={{ color: '#64748b' }}>Try changing the search query or filter.</p>
            <button onClick={() => { setActiveCategory('all'); setSearchTerm(''); }} className="btn btn-outline mt-3">
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
