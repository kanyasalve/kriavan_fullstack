import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowLeft, 
  ArrowRight, 
  Share2, 
  BookOpen, 
  Sparkles,
  Phone,
  MessageCircle
} from 'lucide-react';

const BlogDetail = () => {
  const { slug } = useParams();
  const { lang, t } = useLanguage();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadBlog();
  }, [slug]);

  const loadBlog = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.getBlogBySlug(slug);
      if (res.success) {
        setBlog(res.data);
      } else {
        setError('Blog post not found');
      }
    } catch (err) {
      setError('Error loading blog article');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="section text-center">
        <div className="badge badge-green">Loading Article...</div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="section text-center">
        <div className="container">
          <h2>Blog Post Not Found</h2>
          <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>The article you are looking for might have been moved or updated.</p>
          <Link to="/blog" className="btn btn-primary">
            <ArrowLeft size={16} /> Back to Blog List
          </Link>
        </div>
      </div>
    );
  }

  const title = lang === 'mr' && blog.title_mr ? blog.title_mr : blog.title;
  const summary = lang === 'mr' && blog.summary_mr ? blog.summary_mr : blog.summary;
  const content = lang === 'mr' && blog.content_mr ? blog.content_mr : (blog.content || blog.summary);

  return (
    <div className="section" style={{ paddingTop: '2.5rem' }}>
      <div className="container" style={{ maxWidth: '880px' }}>
        
        {/* Back Link */}
        <div className="mb-4">
          <Link to="/blog" className="flex items-center gap-1" style={{ color: '#15803d', fontWeight: '600', fontSize: '0.9rem' }}>
            <ArrowLeft size={16} /> All Articles
          </Link>
        </div>

        {/* Article Header */}
        <div className="mb-4">
          <span className="badge badge-green mb-2">{blog.category}</span>
          <h1 style={{ fontSize: '2.4rem', lineHeight: '1.25', color: '#0f172a', marginBottom: '1rem' }}>
            {title}
          </h1>

          <div className="flex items-center gap-4 flex-wrap" style={{ color: '#64748b', fontSize: '0.88rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1.25rem' }}>
            <span className="flex items-center gap-1">
              <User size={15} style={{ color: '#15803d' }} /> {blog.author || 'Krivan Agronomy Research Team'}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={15} /> {blog.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={15} /> {blog.readTime}
            </span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="mb-5" style={{ borderRadius: '18px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
          <img
            src={blog.image}
            alt={title}
            style={{ width: '100%', maxHeight: '420px', objectFit: 'cover' }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1592417817098-8f3d6eb22510?w=1000&auto=format&fit=crop&q=80';
            }}
          />
        </div>

        {/* Summary Block */}
        {summary && (
          <div style={{
            background: '#f0fdf4',
            borderLeft: '4px solid #15803d',
            padding: '1.25rem 1.5rem',
            borderRadius: '0 12px 12px 0',
            fontSize: '1.1rem',
            color: '#14532d',
            fontWeight: '500',
            marginBottom: '2rem',
            lineHeight: '1.6'
          }}>
            {summary}
          </div>
        )}

        {/* Article Body Content */}
        <div style={{
          fontSize: '1.05rem',
          color: '#334155',
          lineHeight: '1.8',
          marginBottom: '3rem',
          whiteSpace: 'pre-line'
        }}>
          {content}
        </div>

        {/* Agronomy Help Banner */}
        <div className="card" style={{ padding: '2rem', background: 'linear-gradient(135deg, #064e3b, #047857)', color: 'white', borderRadius: '16px', marginBottom: '4rem' }}>
          <div className="flex justify-between items-center flex-wrap gap-3">
            <div>
              <h3 style={{ color: 'white', fontSize: '1.35rem', marginBottom: '0.35rem' }}>Have Questions About Crop Nutrition?</h3>
              <p style={{ color: '#a7f3d0', fontSize: '0.9rem' }}>Connect directly with our agronomists for customized crop spray schedules.</p>
            </div>
            <Link to="/contact" className="btn btn-secondary">
              <Phone size={15} /> Talk to Expert
            </Link>
          </div>
        </div>

        {/* Related Articles */}
        {blog.related && blog.related.length > 0 && (
          <div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1.25rem' }}>Related Articles</h3>
            <div className="grid grid-cols-2 gap-3">
              {blog.related.map(r => (
                <div key={r.id} className="card" style={{ padding: '1.25rem' }}>
                  <span className="badge badge-green mb-2" style={{ fontSize: '0.75rem' }}>{r.category}</span>
                  <h4 style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>
                    <Link to={`/blog/${r.slug}`} style={{ color: '#0f172a' }}>
                      {lang === 'mr' && r.title_mr ? r.title_mr : r.title}
                    </Link>
                  </h4>
                  <Link to={`/blog/${r.slug}`} className="flex items-center gap-1" style={{ color: '#15803d', fontSize: '0.85rem', fontWeight: '600', marginTop: '0.5rem' }}>
                    Read Article <ArrowRight size={14} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default BlogDetail;
