import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { QrCode, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

const ProductCard = ({ product }) => {
  const { lang, t } = useLanguage();

  const title = lang === 'mr' && product.brand_name_mr ? product.brand_name_mr : product.brand_name;
  const subtitle = lang === 'mr' && product.subtitle_mr ? product.subtitle_mr : product.subtitle;
  const desc = lang === 'mr' && product.shortDesc_mr ? product.shortDesc_mr : product.shortDesc;
  const categoryName = lang === 'mr' && product.category_display_mr ? product.category_display_mr : product.category_display;

  return (
    <div className="card product-card" style={{
      border: '1px solid #e7e5e4',
      borderRadius: '20px',
      overflow: 'hidden',
      background: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
    }}>
      {/* Product Image Stage with Spotlight Glow */}
      <div className="product-img-wrap" style={{
        position: 'relative',
        background: 'radial-gradient(circle at 50% 40%, rgba(236, 252, 203, 0.45) 0%, rgba(250, 248, 245, 0.95) 75%)',
        padding: '2rem 1.5rem',
        textAlign: 'center',
        minHeight: '230px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottom: '1px solid #f5f2eb'
      }}>
        {product.isFlagship && (
          <div style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 2 }}>
            <span className="badge badge-gold" style={{ fontSize: '0.72rem', padding: '0.25rem 0.75rem', boxShadow: '0 4px 12px rgba(217, 119, 6, 0.2)' }}>
              <Sparkles size={12} /> Flagship
            </span>
          </div>
        )}
        <span className="badge badge-green" style={{ position: 'absolute', top: '12px', right: '12px', zIndex: 2, fontSize: '0.72rem', padding: '0.25rem 0.75rem' }}>
          {categoryName || product.category}
        </span>

        <img
          src={product.main_picture}
          alt={product.brand_name}
          className="product-img"
          style={{
            maxHeight: '185px',
            maxWidth: '100%',
            objectFit: 'contain',
            filter: 'drop-shadow(0 15px 20px rgba(0, 0, 0, 0.12))',
            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1592417817098-8f3d6eb22510?w=500';
          }}
        />
      </div>

      <div className="product-body" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <h3 className="product-title" style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1c1917', marginBottom: '0.3rem' }}>
          {title}
        </h3>
        
        {subtitle && (
          <div style={{ fontSize: '0.84rem', color: '#3f6212', fontWeight: '700', marginBottom: '0.65rem', lineHeight: '1.4' }}>
            {subtitle}
          </div>
        )}
        
        <p className="product-desc" style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: '1.25rem', flexGrow: 1, lineHeight: '1.6' }}>
          {desc}
        </p>

        {product.packing && (
          <div style={{
            fontSize: '0.8rem',
            background: '#faf8f5',
            padding: '7px 12px',
            borderRadius: '10px',
            marginBottom: '1.25rem',
            border: '1px solid #e7e5e4',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ color: '#78716c', fontWeight: '600' }}>Packaging:</span>
            <strong style={{ color: '#273e0b', fontWeight: '800' }}>{product.packing}</strong>
          </div>
        )}

        <div style={{ marginTop: 'auto' }}>
          <Link
            to={`/product/${product.slug}`}
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.65rem 1rem', fontSize: '0.88rem', borderRadius: '12px' }}
          >
            <span>Verify QR & Doses</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
