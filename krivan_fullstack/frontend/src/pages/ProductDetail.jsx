import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';
import ProductCard from '../components/ProductCard';
import { 
  QrCode, 
  Download, 
  CheckCircle2, 
  Sparkles, 
  FlaskConical, 
  AlertTriangle, 
  Send, 
  Phone, 
  Mail, 
  MapPin,
  ArrowLeft,
  Calendar,
  Share2
} from 'lucide-react';

const ProductDetail = () => {
  const { slug } = useParams();
  const { lang, t } = useLanguage();

  const [product, setProduct] = useState(null);
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    address: '',
    message: ''
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadProduct();
  }, [slug]);

  const loadProduct = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.getProductBySlug(slug);
      if (res.success) {
        setProduct(res.data);
        // Fetch dynamic related products
        try {
          const allRes = await api.getProducts();
          if (allRes.success) {
            const rel = allRes.data.filter(p => p.slug !== slug);
            setRelatedProducts(rel);
          }
        } catch (e) {}
      } else {
        setError('Product not found');
      }

      // Load QR Code
      const qrRes = await api.getQrCode(slug);
      if (qrRes.success) {
        setQrDataUrl(qrRes.qrCode);
      }
    } catch (err) {
      setError('Error loading product details');
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);
    try {
      const res = await api.submitEnquiry({
        ...formData,
        product_id: product?.id,
        product_name: product?.brand_name
      });
      if (res.success) {
        setFormSuccess(true);
        setFormData({
          full_name: '',
          email: '',
          phone_number: '',
          address: '',
          message: ''
        });
      }
    } catch (err) {
      alert('Error submitting enquiry. Please try again.');
    } finally {
      setFormSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="section text-center">
        <div className="badge badge-green">Loading Product Information...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="section text-center">
        <div className="container">
          <h2>404 - Product Not Found</h2>
          <p className="mb-3">The product details you are looking for may have been moved or removed.</p>
          <Link to="/products" className="btn btn-primary">
            <ArrowLeft size={16} /> Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const title = lang === 'mr' && product.brand_name_mr ? product.brand_name_mr : product.brand_name;
  const subtitle = lang === 'mr' && product.subtitle_mr ? product.subtitle_mr : product.subtitle;
  const shortDesc = lang === 'mr' && product.shortDesc_mr ? product.shortDesc_mr : product.shortDesc;
  const benefitsList = (lang === 'mr' && product.benefits_mr && product.benefits_mr.length > 0) ? product.benefits_mr : product.benefits;

  return (
    <div className="section" style={{ paddingTop: '2.5rem' }}>
      <div className="container">
        {/* Breadcrumb */}
        <div className="mb-3 flex items-center gap-2" style={{ fontSize: '0.88rem', color: '#64748b' }}>
          <Link to="/" style={{ color: '#15803d' }}>{t('home')}</Link>
          <span>/</span>
          <Link to="/products" style={{ color: '#15803d' }}>{t('products')}</Link>
          <span>/</span>
          <span style={{ color: '#0f172a', fontWeight: '600' }}>{title}</span>
        </div>

        {/* Product Hero Grid */}
        <div className="grid grid-cols-2 gap-4 items-start mb-5">
          {/* Left: Product Media Gallery & QR */}
          <div>
            <div className="card" style={{ padding: '2rem', textAlign: 'center', background: 'white', marginBottom: '1.5rem' }}>
              <img
                src={product.main_picture}
                alt={product.brand_name}
                style={{ maxHeight: '340px', width: 'auto', margin: '0 auto', objectFit: 'contain' }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1592417817098-8f3d6eb22510?w=500&auto=format&fit=crop&q=60';
                }}
              />
            </div>

            {/* Smart Product QR Card */}
            <div className="qr-card">
              <div className="flex items-center justify-center gap-2 mb-2">
                <QrCode size={20} style={{ color: '#15803d' }} />
                <strong style={{ fontSize: '1.05rem', color: '#0f172a' }}>{t('scanQrCode')}</strong>
              </div>
              <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '1rem' }}>
                Scan with any smartphone camera to verify product authenticity, FCO test reports, and tailored dosage guides.
              </p>
              {qrDataUrl && (
                <img src={qrDataUrl} alt={`QR Code for ${product.brand_name}`} className="qr-code-img" />
              )}
              <a
                href={qrDataUrl}
                download={`${product.slug}-qr-code.png`}
                className="btn btn-outline"
                style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}
              >
                <Download size={15} />
                {t('downloadQr')}
              </a>
            </div>
          </div>

          {/* Right: Details & Key Specifications */}
          <div>
            {product.isFlagship && (
              <div className="badge badge-gold mb-2">
                <Sparkles size={14} /> {t('flagshipBadge')}
              </div>
            )}
            <h1 style={{ fontSize: '2.5rem', marginBottom: '0.4rem', color: '#0f172a' }}>{title}</h1>
            {subtitle && (
              <div style={{ fontSize: '1.1rem', color: '#15803d', fontWeight: '700', marginBottom: '1rem' }}>
                {subtitle}
              </div>
            )}
            <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              {shortDesc}
            </p>

            {/* Quick Specs Cards */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div style={{ background: 'white', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.78rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>
                  {t('targetCrops')}
                </div>
                <div style={{ fontWeight: '600', color: '#0f172a', marginTop: '3px' }}>
                  {lang === 'mr' && product.target_crops_mr ? product.target_crops_mr : product.target_crops}
                </div>
              </div>
              <div style={{ background: 'white', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.78rem', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>
                  {t('packingSize')}
                </div>
                <div style={{ fontWeight: '600', color: '#0f172a', marginTop: '3px' }}>
                  {product.packing || 'Commercial & Farmer Packings'}
                </div>
              </div>
            </div>

            {/* Composition Table */}
            {product.composition && product.composition.length > 0 && (
              <div className="card mb-4" style={{ padding: '1.25rem' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FlaskConical size={18} style={{ color: '#15803d' }} />
                  {t('composition')}
                </h3>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                  <tbody>
                    {product.composition.map((item, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '8px 4px', color: '#64748b', fontWeight: '600' }}>{item.label}</td>
                        <td style={{ padding: '8px 4px', textAlign: 'right', fontWeight: '700', color: '#0f172a' }}>{item.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Key Benefits */}
            <div className="card mb-4" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem', color: '#0f172a' }}>
                {t('keyBenefits')}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {benefitsList?.map((b, idx) => (
                  <div key={idx} className="flex items-start gap-2" style={{ fontSize: '0.92rem', color: '#334155' }}>
                    <CheckCircle2 size={18} style={{ color: '#15803d', flexShrink: 0, marginTop: '2px' }} />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Dosage & Application Instructions */}
            {(product.dosage || product.application_method) && (
              <div className="card mb-4" style={{ padding: '1.5rem', background: '#f0fdf4', borderColor: '#bbf7d0' }}>
                <h3 style={{ fontSize: '1.1rem', color: '#166534', marginBottom: '0.5rem' }}>
                  {t('applicationDosage')}
                </h3>
                {product.dosage && (
                  <p style={{ fontSize: '0.9rem', color: '#14532d', marginBottom: '0.5rem' }}>
                    <strong>Recommended Dose:</strong> {product.dosage}
                  </p>
                )}
                {product.application_method && (
                  <p style={{ fontSize: '0.9rem', color: '#14532d' }}>
                    <strong>Method:</strong> {product.application_method}
                  </p>
                )}
              </div>
            )}

            {/* Precautions */}
            {product.precautions && (
              <div style={{ background: '#fffbeb', border: '1px solid #fef3c7', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
                <div className="flex items-center gap-2 mb-1" style={{ color: '#b45309', fontWeight: '700', fontSize: '0.9rem' }}>
                  <AlertTriangle size={16} /> {t('precautions')}
                </div>
                <p style={{ fontSize: '0.85rem', color: '#78350f' }}>{product.precautions}</p>
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Interactive Product Enquiry Form */}
        <section className="card" style={{ padding: '3rem', background: 'linear-gradient(135deg, #ffffff, #f8fafc)', border: '1px solid #cbd5e1', marginBottom: '4rem' }}>
          <div className="grid grid-cols-2 gap-4 items-center">
            <div>
              <div className="badge badge-green mb-2">Direct Agricultural Support</div>
              <h2 style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{t('enquiryTitle')}</h2>
              <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                Fill out this quick form for bulk pricing, local dealer contacts, or agronomy consultation regarding <strong>{product.brand_name}</strong>.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div className="flex items-center gap-2" style={{ fontSize: '0.9rem', color: '#334155' }}>
                  <Phone size={18} style={{ color: '#15803d' }} />
                  <span>Call / WhatsApp Helpline: <strong>+91 98765 43210</strong></span>
                </div>
                <div className="flex items-center gap-2" style={{ fontSize: '0.9rem', color: '#334155' }}>
                  <Mail size={18} style={{ color: '#15803d' }} />
                  <span>Email: <strong>info@krivanindustries.com</strong></span>
                </div>
              </div>
            </div>

            <div>
              {formSuccess ? (
                <div style={{ background: '#dcfce7', border: '1px solid #86efac', padding: '2rem', borderRadius: '14px', textAlign: 'center' }}>
                  <CheckCircle2 size={48} style={{ color: '#15803d', margin: '0 auto 1rem' }} />
                  <h3 style={{ color: '#14532d', marginBottom: '0.5rem' }}>Enquiry Submitted!</h3>
                  <p style={{ color: '#166534', fontSize: '0.95rem' }}>{t('enquirySuccess')}</p>
                  <button onClick={() => setFormSuccess(false)} className="btn btn-outline mt-3" style={{ fontSize: '0.85rem' }}>
                    Send Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit}>
                  <div className="form-group">
                    <label className="form-label">{t('fullName')} *</label>
                    <input
                      type="text"
                      name="full_name"
                      required
                      className="form-input"
                      placeholder="e.g. Ramesh Patil"
                      value={formData.full_name}
                      onChange={handleFormChange}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="form-group">
                      <label className="form-label">{t('phone')} *</label>
                      <input
                        type="tel"
                        name="phone_number"
                        required
                        className="form-input"
                        placeholder="e.g. 98220 00000"
                        value={formData.phone_number}
                        onChange={handleFormChange}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">{t('email')}</label>
                      <input
                        type="email"
                        name="email"
                        className="form-input"
                        placeholder="name@email.com"
                        value={formData.email}
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">{t('address')}</label>
                    <input
                      type="text"
                      name="address"
                      className="form-input"
                      placeholder="e.g. Baramati, Pune District"
                      value={formData.address}
                      onChange={handleFormChange}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">{t('message')}</label>
                    <textarea
                      name="message"
                      rows={3}
                      className="form-textarea"
                      placeholder="Specify your crop, acreage, or requirement..."
                      value={formData.message}
                      onChange={handleFormChange}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formSubmitting}
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '0.85rem' }}
                  >
                    {formSubmitting ? t('submitting') : (
                      <>
                        <Send size={16} />
                        <span>{t('submitEnquiry')}</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Related Products Carousel / Grid */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="mb-3">
              <h2 style={{ fontSize: '1.75rem' }}>{t('relatedProducts')}</h2>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {relatedProducts.slice(0, 3).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
