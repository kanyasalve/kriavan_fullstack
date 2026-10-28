import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';
import { BookOpen, Calendar, Clock, ArrowRight, Sparkles, Search, User } from 'lucide-react';

const Blog = () => {
  const { lang, t } = useLanguage();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCat, setActiveCat] = useState('all');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await api.getBlogs();
      if (res.success) {
        setBlogs(res.data);
      }
    } catch (err) {
      console.error('Error fetching blogs', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredBlogs = blogs.filter(b => {
    const title = (lang === 'mr' && b.title_mr ? b.title_mr : b.title).toLowerCase();
    const summary = (lang === 'mr' && b.summary_mr ? b.summary_mr : b.summary).toLowerCase();
    const q = searchTerm.toLowerCase();
    const matchesSearch = title.includes(q) || summary.includes(q) || b.category.toLowerCase().includes(q);
    const matchesCat = activeCat === 'all' || b.category === activeCat;
    return matchesSearch && matchesCat;
  });

  const categories = ['all', ...Array.from(new Set(blogs.map(b => b.category)))];

  return (
    <div className="section" style={{ paddingTop: '3rem' }}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5">
          <div className="badge badge-green mb-2">
            <BookOpen size={14} /> Knowledge Center
          </div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>Agricultural Insights & Advice</h1>
          <p style={{ color: '#64748b', maxWidth: '680px', margin: '0 auto' }}>
            Latest crop advisory articles, fertilizer management practices, and organic farming techniques from Krivan agronomists.
          </p>

          {/* Search Bar */}
          <div style={{ maxWidth: '500px', margin: '1.5rem auto 0', position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '16px', top: '15px', color: '#94a3b8' }} />
            <input
              type="text"
              className="form-input"
              style={{ paddingLeft: '44px', height: '48px', borderRadius: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}
              placeholder="Search articles by crop, disease, or nutrients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        {categories.length > 1 && (
          <div className="flex justify-center gap-2 mb-5 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`btn ${activeCat === cat ? 'btn-primary' : 'btn-light'}`}
                style={{ padding: '0.4rem 1rem', fontSize: '0.82rem', textTransform: 'capitalize' }}
              >
                {cat === 'all' ? 'All Topics' : cat}
              </button>
            ))}
          </div>
        )}

        {/* Blog Cards Grid */}
        {loading ? (
          <div className="text-center py-5">
            <div className="badge badge-green">Loading Articles...</div>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center py-5 card" style={{ padding: '3rem', maxWidth: '480px', margin: '0 auto' }}>
            <h3>No articles found</h3>
            <p style={{ color: '#64748b' }}>Try changing the search query or category filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {filteredBlogs.map((b) => (
              <div key={b.id} className="card" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <Link to={`/blog/${b.slug || b.id}`}>
                  <img
                    src={b.image}
                    alt={b.title}
                    style={{ width: '100%', height: '240px', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1592417817098-8f3d6eb22510?w=600&auto=format&fit=crop&q=60';
                    }}
                  />
                </Link>
                <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <div className="flex items-center gap-3 mb-3" style={{ fontSize: '0.82rem', color: '#64748b', flexWrap: 'wrap' }}>
                    <span className="badge badge-green">{b.category}</span>
                    <span className="flex items-center gap-1"><Calendar size={13} /> {b.date}</span>
                    <span className="flex items-center gap-1"><Clock size={13} /> {b.readTime}</span>
                  </div>

                  <h2 style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>
                    <Link to={`/blog/${b.slug || b.id}`} style={{ color: '#0f172a' }}>
                      {lang === 'mr' && b.title_mr ? b.title_mr : b.title}
                    </Link>
                  </h2>
                  <p style={{ color: '#64748b', fontSize: '0.92rem', marginBottom: '1.5rem', flexGrow: 1, lineHeight: '1.6' }}>
                    {lang === 'mr' && b.summary_mr ? b.summary_mr : b.summary}
                  </p>

                  <Link
                    to={`/blog/${b.slug || b.id}`}
                    className="btn btn-outline"
                    style={{ alignSelf: 'flex-start', fontSize: '0.85rem', padding: '0.5rem 1.15rem' }}
                  >
                    <span>Read Full Article</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
