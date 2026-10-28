import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';
import ProductCard from '../components/ProductCard';
import AgriParticles from '../components/AgriParticles';
import WeatherAdvisor from '../components/WeatherAdvisor';
import CropPestAdvisor from '../components/CropPestAdvisor';
import { 
  Sparkles, 
  Leaf, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight, 
  QrCode, 
  FlaskConical, 
  Award,
  CheckCircle,
  Users,
  CheckCircle2,
  Star,
  Sprout,
  Droplets,
  Microscope,
  PhoneCall,
  ExternalLink,
  ChevronRight,
  Calculator,
  Layers,
  HelpCircle,
  ThumbsUp,
  BookOpen,
  Calendar,
  Clock
} from 'lucide-react';

const Home = () => {
  const { lang, t } = useLanguage();
  const [products, setProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [companyInfo, setCompanyInfo] = useState(null);
  const [cropCalculators, setCropCalculators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Interactive Dosage Calculator State
  const [selectedCrop, setSelectedCrop] = useState('grapes');
  const [acres, setAcres] = useState(2);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, blogRes, compRes, cropRes] = await Promise.all([
          api.getProducts(),
          api.getBlogs(),
          api.getCompanyInfo(),
          api.getCropCalculators()
        ]);

        if (prodRes?.success) setProducts(prodRes.data);
        if (blogRes?.success) setBlogs(blogRes.data);
        if (compRes?.success) setCompanyInfo(compRes.data);
        if (cropRes?.success && cropRes.data.length > 0) {
          setCropCalculators(cropRes.data);
          setSelectedCrop(cropRes.data[0].crop_key || cropRes.data[0].id);
        }
      } catch (err) {
        console.error('Error loading homepage data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Compute dynamic categories from live products
  const dynamicCategories = [
    {
      id: 'all',
      name: lang === 'mr' ? 'सर्व उत्पादने' : 'All Formulations',
      count: products.length
    },
    ...Array.from(new Set(products.map(p => p.category))).filter(Boolean).map(catId => {
      const matching = products.filter(p => p.category === catId);
      const sample = matching[0];
      const displayName = lang === 'mr' && sample?.category_display_mr 
        ? sample.category_display_mr 
        : (sample?.category_display || catId.replace(/_/g, ' ').toUpperCase());
      return {
        id: catId,
        name: displayName,
        count: matching.length
      };
    })
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  // Dynamic Flagship / Hero Featured Product for Banner
  const heroProduct = (companyInfo?.hero_featured_product_id && products.find(p => p.id === companyInfo.hero_featured_product_id)) ||
    products.find(p => p.isFlagship) ||
    products[0] || {
      brand_name: 'KAIZEN - K (Gold)',
      brand_name_mr: 'कायझेन - के (गोल्ड)',
      subtitle: 'Derived from Marine Rhodophytes with Auxins & Cytokinins. Boosts Brix, fruit sizing and drought tolerance.',
      subtitle_mr: 'र्होडोफाइट्सपासून मिळवलेले पोटॅश. साखरेचे प्रमाण (Brix) व फळ फुगवण वाढवते.',
      main_picture: '/assets/images/products/kaizen-k-3d.jpg',
      slug: 'kaizen-k'
    };

  const heroProductImage = companyInfo?.hero_product_image || heroProduct.main_picture || '/assets/images/products/kaizen-k-3d.jpg';

  return (
    <div>
      
      {/* ==========================================================================
          HERO SECTION - CINEMATIC PHOTOGRAPHIC BACKDROP & 3D PRODUCT SHOWCASE
          ========================================================================== */}
      <section style={{
        position: 'relative',
        background: 'linear-gradient(180deg, #1c1917 0%, #292524 100%)',
        color: '#ffffff',
        padding: '6rem 0 7rem',
        overflow: 'hidden'
      }}>
        {/* Background Panoramic Field Image */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url(/assets/images/banners/hero-field-cinematic.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.28,
          filter: 'saturate(1.2)'
        }}></div>

        {/* Ambient Glow Gradient */}
        <div style={{
          position: 'absolute',
          top: '-20%',
          right: '10%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(217, 119, 6, 0.22) 0%, rgba(0,0,0,0) 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          pointerEvents: 'none'
        }}></div>

        {/* 🌟 Interactive Bio-Active Particle & Spore Canvas Effect */}
        <AgriParticles count={45} theme="hero" />

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div className="grid grid-cols-2 gap-4 items-center">
            <div>
              <div className="badge badge-gold mb-3" style={{ background: 'rgba(245, 158, 11, 0.2)', color: '#fef08a', borderColor: 'rgba(245, 158, 11, 0.4)' }}>
                <span className="pulse-dot"></span>
                <Sparkles size={14} style={{ color: '#f59e0b' }} />
                <span>Next-Generation Bio-Available Crop Nutrition</span>
              </div>

              <h1 style={{
                fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
                fontWeight: '900',
                color: '#ffffff',
                marginBottom: '1.25rem',
                lineHeight: '1.15',
                letterSpacing: '-0.03em'
              }}>
                {lang === 'mr' ? (
                  companyInfo?.hero_headline_mr ? (
                    <span>{companyInfo.hero_headline_mr}</span>
                  ) : (
                    <>
                      मातीचे पोषण.<br />
                      <span style={{
                        background: 'linear-gradient(135deg, #a3e635 0%, #f59e0b 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}>
                        उद्याची समृद्धी.
                      </span>
                    </>
                  )
                ) : (
                  companyInfo?.hero_headline ? (
                    <span>{companyInfo.hero_headline}</span>
                  ) : (
                    <>
                      Nourishing Soil.<br />
                      <span style={{
                        background: 'linear-gradient(135deg, #a3e635 0%, #f59e0b 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}>
                        Growing Tomorrow.
                      </span>
                    </>
                  )
                )}
              </h1>

              <p style={{
                fontSize: '1.18rem',
                color: '#d6d3d1',
                marginBottom: '2.25rem',
                maxWidth: '580px',
                lineHeight: '1.7'
              }}>
                {companyInfo ? (lang === 'mr' && companyInfo.tagline_mr ? companyInfo.tagline_mr : companyInfo.description) : 'Krivan Industries delivers flagship Rhodophyte-derived potash (Kaizen-K), diatomite silicon, organic manures, and chelated micronutrients to maximize yield and fruit quality.'}
              </p>

              <div className="flex gap-3 flex-wrap items-center">
                <Link to="/products" className="btn btn-secondary" style={{ padding: '0.95rem 2.25rem', fontSize: '1.05rem' }}>
                  <span>Explore Product Catalog</span>
                  <ArrowRight size={18} />
                </Link>
                <a href="#calculator" className="btn btn-outline" style={{ padding: '0.95rem 1.85rem', fontSize: '1.05rem', background: 'rgba(255,255,255,0.1)', color: '#ffffff', borderColor: 'rgba(255,255,255,0.3)' }}>
                  <Calculator size={18} />
                  <span>Dosage Calculator</span>
                </a>
              </div>

              {/* Quick Trust Stat Pills */}
              <div className="grid grid-cols-3 gap-3 mt-5 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }}>
                <div style={{
                  background: 'rgba(255, 255, 255, 0.07)',
                  backdropFilter: 'blur(10px)',
                  padding: '14px',
                  borderRadius: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.12)'
                }}>
                  <div style={{ fontWeight: '900', fontSize: '1.85rem', color: '#a3e635', lineHeight: '1' }}>100%</div>
                  <div style={{ fontSize: '0.8rem', color: '#d6d3d1', marginTop: '4px', fontWeight: '500' }}>Bio-Available Potash</div>
                </div>
                <div style={{
                  background: 'rgba(255, 255, 255, 0.07)',
                  backdropFilter: 'blur(10px)',
                  padding: '14px',
                  borderRadius: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.12)'
                }}>
                  <div style={{ fontWeight: '900', fontSize: '1.85rem', color: '#f59e0b', lineHeight: '1' }}>25,000+</div>
                  <div style={{ fontSize: '0.8rem', color: '#d6d3d1', marginTop: '4px', fontWeight: '500' }}>Progressive Farmers</div>
                </div>
                <div style={{
                  background: 'rgba(255, 255, 255, 0.07)',
                  backdropFilter: 'blur(10px)',
                  padding: '14px',
                  borderRadius: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.12)'
                }}>
                  <div style={{ fontWeight: '900', fontSize: '1.85rem', color: '#ffffff', lineHeight: '1' }}>FCO</div>
                  <div style={{ fontSize: '0.8rem', color: '#d6d3d1', marginTop: '4px', fontWeight: '500' }}>Govt Approved Lab Tested</div>
                </div>
              </div>
            </div>

            {/* 3D Commercial Product Render Display */}
            <div style={{ textAlign: 'center', position: 'relative' }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                padding: '1.75rem',
                borderRadius: '28px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
                display: 'inline-block',
                maxWidth: '460px',
                width: '100%'
              }} className="animate-float">
                
                <img
                  src={heroProductImage}
                  alt={heroProduct?.brand_name || 'Krivan Product'}
                  style={{ width: '100%', maxHeight: '340px', objectFit: 'cover', borderRadius: '18px', filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.4))' }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/assets/images/products/kaizen-k.jpg';
                  }}
                />

                <div style={{ marginTop: '1.25rem', background: '#ffffff', padding: '1.25rem', borderRadius: '16px', textAlign: 'left', color: '#1c1917' }}>
                  <div className="flex justify-between items-center mb-1">
                    <strong style={{ fontSize: '1.2rem', color: '#1c1917' }}>
                      {lang === 'mr' && heroProduct?.brand_name_mr ? heroProduct.brand_name_mr : (heroProduct?.brand_name || 'KAIZEN - K')}
                    </strong>
                    <span className="badge badge-gold" style={{ fontSize: '0.72rem' }}>
                      {heroProduct?.isFlagship ? 'Flagship Innovation' : 'Certified Bio-Input'}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#78716c', marginBottom: '0.85rem' }}>
                    {lang === 'mr' && heroProduct?.subtitle_mr ? heroProduct.subtitle_mr : (heroProduct?.subtitle || heroProduct?.shortDesc || 'Premium Bio-Available Agricultural Nutrition')}
                  </p>
                  <div className="flex justify-between items-center pt-2" style={{ borderTop: '1px solid #e7e5e4' }}>
                    <div style={{ fontSize: '0.82rem', color: '#3f6212', fontWeight: '800' }}>
                      <QrCode size={15} style={{ display: 'inline', marginRight: '4px' }} />
                      Smart QR Traceable Pack
                    </div>
                    <Link to={`/product/${heroProduct?.slug || heroProduct?.id || 'kaizen-k'}`} className="btn btn-primary" style={{ padding: '0.45rem 1.1rem', fontSize: '0.82rem' }}>
                      <span>Verify QR & Doses</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          ACCREDITATION & TRUST STRIP
          ========================================================================== */}
      <section style={{ background: '#ffffff', borderBottom: '1px solid #e7e5e4', padding: '1.75rem 0' }}>
        <div className="container">
          <div className="flex justify-between items-center flex-wrap gap-4 text-center">
            <div className="flex items-center gap-2" style={{ color: '#1c1917', fontWeight: '700' }}>
              <ShieldCheck size={26} style={{ color: '#3f6212' }} />
              <span>ISO 9001:2015 Certified Quality</span>
            </div>
            <div className="flex items-center gap-2" style={{ color: '#1c1917', fontWeight: '700' }}>
              <Award size={26} style={{ color: '#b45309' }} />
              <span>FCO Compliant Govt Approved</span>
            </div>
            <div className="flex items-center gap-2" style={{ color: '#1c1917', fontWeight: '700' }}>
              <Leaf size={26} style={{ color: '#3f6212' }} />
              <span>100% Eco-Safe Bio-Active Nutrition</span>
            </div>
            <div className="flex items-center gap-2" style={{ color: '#1c1917', fontWeight: '700' }}>
              <Users size={26} style={{ color: '#3f6212' }} />
              <span>Trusted by 25k+ Indian Growers</span>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          🌱 WHY KRIVAN - BIO-AGRI INNOVATION PILLARS
          ========================================================================== */}
      <section className="section" style={{ background: '#faf8f5', borderBottom: '1px solid #e7e5e4' }}>
        <div className="container">
          <div className="text-center mb-5">
            <div className="badge badge-green mb-2">
              <Sparkles size={14} /> Next-Gen Agri Innovation
            </div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
              {lang === 'mr' ? 'क्रिव्हनचे कृषी तंत्रज्ञान व वैशिष्ट्ये' : 'Pioneering Bio-Available Crop Science'}
            </h2>
            <p style={{ color: '#78716c', maxWidth: '680px', margin: '0 auto', fontSize: '1.05rem' }}>
              {lang === 'mr' 
                ? 'मातीचे आरोग्य टिकवून ठेवत पिकांची गुणवत्ता आणि उत्पादन वाढवणारे प्रगत बायो-न्युट्रिशन सोल्युशन्स.' 
                : 'Engineered with marine bio-actives and nano-scale chelation for maximum nutrient uptake without chemical soil degradation.'}
            </p>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="card" style={{ padding: '2rem 1.5rem', background: '#ffffff', textAlign: 'left', borderRadius: '20px' }}>
              <div style={{
                width: '54px',
                height: '54px',
                borderRadius: '16px',
                background: '#ecfccb',
                color: '#3f6212',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}>
                <Sprout size={28} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#1c1917' }}>
                {lang === 'mr' ? 'Marine Rhodophyte तंत्रज्ञान' : 'Marine Rhodophytes'}
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: '1.6', margin: 0 }}>
                {lang === 'mr' 
                  ? 'नैसर्गिक समुद्री शैवालापासून निर्मित, जे पिकात त्वरित शोषले जाते व फळ फुगवण सुधारते.' 
                  : 'Derived from natural marine algae packed with natural Auxins & Cytokinins for superior fruit sizing.'}
              </p>
            </div>

            <div className="card" style={{ padding: '2rem 1.5rem', background: '#ffffff', textAlign: 'left', borderRadius: '20px' }}>
              <div style={{
                width: '54px',
                height: '54px',
                borderRadius: '16px',
                background: '#fef3c7',
                color: '#b45309',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}>
                <FlaskConical size={28} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#1c1917' }}>
                {lang === 'mr' ? 'FCO शासनमान्य दर्जा' : 'FCO Govt Certified'}
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: '1.6', margin: 0 }}>
                {lang === 'mr' 
                  ? '१००% मान्यताप्राप्त लॅब चाचणी, सुरक्षित रचना व हमीयुक्त पोषक तत्वांची खात्री.' 
                  : '100% compliant with Fertilizer Control Order standards, ensuring laboratory verified nutrient assays.'}
              </p>
            </div>

            <div className="card" style={{ padding: '2rem 1.5rem', background: '#ffffff', textAlign: 'left', borderRadius: '20px' }}>
              <div style={{
                width: '54px',
                height: '54px',
                borderRadius: '16px',
                background: '#ecfccb',
                color: '#3f6212',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}>
                <Leaf size={28} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#1c1917' }}>
                {lang === 'mr' ? 'क्षारमुक्त माती संवर्धन' : 'Zero Chloride Salinity'}
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: '1.6', margin: 0 }}>
                {lang === 'mr' 
                  ? 'रासायनिक क्षारांपासून मुक्त, जमिनीतील सूक्ष्मजीवांचे संरक्षण करते आणि सुपीकता टिकवते.' 
                  : 'Protects beneficial soil microorganisms, prevents root burning, and prevents long-term salinity build-up.'}
              </p>
            </div>

            <div className="card" style={{ padding: '2rem 1.5rem', background: '#ffffff', textAlign: 'left', borderRadius: '20px' }}>
              <div style={{
                width: '54px',
                height: '54px',
                borderRadius: '16px',
                background: '#f5f2eb',
                color: '#1c1917',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}>
                <QrCode size={28} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#1c1917' }}>
                {lang === 'mr' ? 'स्मार्ट QR डिजिटल खात्री' : 'Smart QR Traceability'}
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: '1.6', margin: 0 }}>
                {lang === 'mr' 
                  ? 'प्रत्येक पॅकवर QR स्कॅन करून थेट लॅब रिपोर्ट, प्रमाण व कृषी सल्ला मिळवा.' 
                  : 'Scan any pack QR with mobile camera to view instant dosage, batch assay, and agronomist support.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          🌾 SMART INTERACTIVE DOSAGE & YIELD CALCULATOR TOOL & WEATHER ADVISOR
          ========================================================================== */}
      <section id="calculator" className="section" style={{ background: '#f5f2eb' }}>
        <div className="container">
          
          {/* 🌦️ Live Weather & Spray Suitability Advisor */}
          <div className="mb-5">
            <WeatherAdvisor />
          </div>

          <div className="text-center mb-5">
            <div className="badge badge-gold mb-2">
              <Calculator size={14} /> Free Farmer Agronomy Tool
            </div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Smart Crop Dosage & Yield Calculator</h2>
            <p style={{ color: '#78716c', maxWidth: '650px', margin: '0 auto', fontSize: '1.05rem' }}>
              Select your crop and farm acreage to instantly calculate recommended Krivan products, exact dosage, and expected yield jump.
            </p>
          </div>

          <div className="card" style={{ maxWidth: '980px', margin: '0 auto', padding: '2.75rem', background: '#ffffff', borderRadius: '24px' }}>
            <div className="grid grid-cols-2 gap-4 items-start">
              
              {/* Left Selector Controls */}
              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', color: '#1c1917' }}>1. Select Your Farm Details</h3>
                
                <div className="form-group">
                  <label className="form-label">Choose Crop Type</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '360px', overflowY: 'auto', paddingRight: '4px' }}>
                    {cropCalculators.map((c) => {
                      const key = c.crop_key || c.id;
                      const isSelected = selectedCrop === key || (selectedCrop === c.id);
                      const displayName = lang === 'mr' && c.name_mr ? c.name_mr : c.name;
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setSelectedCrop(key)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '0.85rem 1.15rem',
                            borderRadius: '12px',
                            border: isSelected ? '2px solid #3f6212' : '1px solid #e7e5e4',
                            background: isSelected ? '#ecfccb' : '#faf8f5',
                            color: isSelected ? '#273e0b' : '#44403c',
                            fontWeight: isSelected ? '800' : '600',
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <span>{displayName}</span>
                          {isSelected && <CheckCircle2 size={18} style={{ color: '#3f6212' }} />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="form-group mt-4">
                  <div className="flex justify-between items-center mb-1">
                    <label className="form-label">Farm Acreage (एकरी क्षेत्र):</label>
                    <strong style={{ color: '#3f6212', fontSize: '1.1rem' }}>{acres} Acre(s)</strong>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="25"
                    step="1"
                    value={acres}
                    onChange={(e) => setAcres(parseInt(e.target.value))}
                    style={{ width: '100%', accentColor: '#3f6212', cursor: 'pointer', height: '8px' }}
                  />
                  <div className="flex justify-between" style={{ fontSize: '0.75rem', color: '#78716c', marginTop: '4px' }}>
                    <span>1 Acre</span>
                    <span>10 Acres</span>
                    <span>25 Acres</span>
                  </div>
                </div>
              </div>

              {/* Right Recommendation Card */}
              {(() => {
                const activeCrop = cropCalculators.find(c => c.crop_key === selectedCrop || c.id === selectedCrop) || cropCalculators[0];
                if (!activeCrop) return null;

                const yieldBadge = lang === 'mr' && activeCrop.yield_boost_mr ? activeCrop.yield_boost_mr : activeCrop.yield_boost;
                const stageText = lang === 'mr' && activeCrop.stage_mr ? activeCrop.stage_mr : activeCrop.stage;
                const benefitsText = lang === 'mr' && activeCrop.benefits_mr ? activeCrop.benefits_mr : activeCrop.benefits;

                let calculatedDosage = '';
                if (activeCrop.unit_factor && activeCrop.unit_label) {
                  let parts = [];
                  parts.push(`${acres * activeCrop.unit_factor} ${activeCrop.unit_label}`);
                  if (activeCrop.water_factor > 0) {
                    parts.push(`in ${acres * activeCrop.water_factor}L water`);
                  }
                  let mainText = parts.join(' ');
                  if (activeCrop.unit2_factor > 0 && activeCrop.unit2_label) {
                    mainText += ` + ${acres * activeCrop.unit2_factor} ${activeCrop.unit2_label}`;
                  }
                  calculatedDosage = mainText;
                } else {
                  calculatedDosage = `${acres} Acre(s): ${activeCrop.dosage_per_acre}`;
                }

                return (
                  <div style={{ background: '#faf8f5', padding: '2rem', borderRadius: '18px', border: '1px solid #e7e5e4' }}>
                    <div className="flex justify-between items-center mb-3">
                      <span className="badge badge-green">Recommended Nutrition</span>
                      <span style={{ fontWeight: '800', color: '#b45309', fontSize: '0.95rem' }}>{yieldBadge}</span>
                    </div>

                    <h4 style={{ fontSize: '1.4rem', color: '#1c1917', marginBottom: '0.35rem' }}>
                      {activeCrop.product}
                    </h4>
                    <div style={{ fontSize: '0.85rem', color: '#3f6212', fontWeight: '700', marginBottom: '1.25rem' }}>
                      {stageText}
                    </div>

                    <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '14px', border: '1px solid #e7e5e4', marginBottom: '1.25rem' }}>
                      <div style={{ fontSize: '0.78rem', color: '#78716c', textTransform: 'uppercase', fontWeight: '700' }}>
                        Calculated Dosage for {acres} Acre(s):
                      </div>
                      <div style={{ fontSize: '1.05rem', fontWeight: '800', color: '#1c1917', marginTop: '4px' }}>
                        {calculatedDosage}
                      </div>
                    </div>

                    <div style={{ marginBottom: '1.5rem', fontSize: '0.88rem', color: '#57534e' }}>
                      <strong>Key Expected Impact:</strong> {benefitsText}
                    </div>

                    <Link
                      to={`/contact?crop=${activeCrop.crop_key || activeCrop.name}&acres=${acres}`}
                      className="btn btn-primary"
                      style={{ width: '100%', padding: '0.85rem', fontSize: '0.95rem' }}
                    >
                      <span>Order Dose / Talk to Agronomist</span>
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                );
              })()}

            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          FEATURED PRODUCTS SHOWCASE WITH DYNAMIC CATEGORY SWITCHER
          ========================================================================== */}
      <section className="section" style={{ background: '#ffffff' }}>
        <div className="container">
          <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
            <div>
              <div className="badge badge-green mb-2">
                <FlaskConical size={14} /> Product Portfolio
              </div>
              <h2 style={{ fontSize: '2.4rem' }}>Featured Agricultural Inputs</h2>
            </div>

            {/* Dynamic Category Switcher Pills */}
            <div className="flex gap-2 flex-wrap">
              {dynamicCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`btn ${selectedCategory === cat.id ? 'btn-primary' : 'btn-light'}`}
                  style={{ padding: '0.45rem 1.15rem', fontSize: '0.85rem' }}
                >
                  <span>{cat.name}</span>
                  <span style={{
                    marginLeft: '5px',
                    fontSize: '0.75rem',
                    opacity: 0.85,
                    background: selectedCategory === cat.id ? 'rgba(255,255,255,0.25)' : '#e2e8f0',
                    padding: '1px 6px',
                    borderRadius: '10px'
                  }}>
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="badge badge-green">Loading catalog...</div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-5 card" style={{ padding: '3rem', maxWidth: '500px', margin: '0 auto' }}>
              <h3>No products found in this category</h3>
              <button onClick={() => setSelectedCategory('all')} className="btn btn-outline mt-3">
                Show All Formulations
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {filteredProducts.slice(0, 6).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center mt-5">
            <Link to="/products" className="btn btn-outline" style={{ padding: '0.85rem 2.25rem', fontSize: '1rem' }}>
              <span>View Full ({products.length}) Formulation Catalog</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          📖 DYNAMIC LATEST AGRI BLOGS & INSIGHTS (नवीन शेतीविषयक माहिती व सल्ले)
          ========================================================================== */}
      <section className="section" style={{ background: '#faf8f5', borderTop: '1px solid #e7e5e4', borderBottom: '1px solid #e7e5e4' }}>
        <div className="container">
          <div className="flex justify-between items-center mb-5 flex-wrap gap-3">
            <div>
              <div className="badge badge-green mb-2">
                <BookOpen size={14} /> Knowledge & Agronomy Research
              </div>
              <h2 style={{ fontSize: '2.4rem', margin: 0 }}>Latest Agricultural Insights & Advice</h2>
            </div>
            <Link to="/blog" className="btn btn-outline" style={{ fontSize: '0.9rem' }}>
              <span>View All Articles ({blogs.length})</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          {blogs.length === 0 ? (
            <div className="text-center py-4 card" style={{ padding: '2rem', background: '#ffffff' }}>
              <p style={{ color: '#78716c', margin: 0 }}>Articles are being updated by our Agronomy research team.</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {blogs.slice(0, 3).map((b) => (
                <div key={b.id} className="card" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#ffffff' }}>
                  <Link to={`/blog/${b.slug || b.id}`}>
                    <img
                      src={b.image}
                      alt={b.title}
                      style={{ width: '100%', height: '210px', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1592417817098-8f3d6eb22510?w=600';
                      }}
                    />
                  </Link>
                  <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <div className="flex items-center gap-2 mb-2" style={{ fontSize: '0.78rem', color: '#78716c' }}>
                      <span className="badge badge-green" style={{ fontSize: '0.72rem', padding: '2px 8px' }}>{b.category}</span>
                      <span>•</span>
                      <span>{b.date}</span>
                      <span>•</span>
                      <span>{b.readTime}</span>
                    </div>

                    <h3 style={{ fontSize: '1.18rem', marginBottom: '0.65rem', lineHeight: '1.4' }}>
                      <Link to={`/blog/${b.slug || b.id}`} style={{ color: '#1c1917' }}>
                        {lang === 'mr' && b.title_mr ? b.title_mr : b.title}
                      </Link>
                    </h3>

                    <p style={{ color: '#64748b', fontSize: '0.88rem', marginBottom: '1.25rem', flexGrow: 1, lineHeight: '1.6' }}>
                      {lang === 'mr' && b.summary_mr ? b.summary_mr : b.summary}
                    </p>

                    <Link
                      to={`/blog/${b.slug || b.id}`}
                      className="flex items-center gap-1"
                      style={{ color: '#3f6212', fontWeight: '700', fontSize: '0.85rem' }}
                    >
                      <span>Read Full Guide</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ==========================================================================
          PROVEN FIELD PERFORMANCE EVIDENCE (BEFORE & AFTER)
          ========================================================================== */}
      <section className="section" style={{ background: '#f5f2eb' }}>
        <div className="container">
          <div className="text-center mb-5">
            <div className="badge badge-green mb-2">
              <TrendingUp size={14} /> Field Evidence & Case Studies
            </div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Proven Results Across Indian Farms</h2>
            <p style={{ color: '#78716c', maxWidth: '650px', margin: '0 auto', fontSize: '1.05rem' }}>
              Validated across Nashik vineyards, Solapur pomegranate orchards, and Western Maharashtra sugarcane fields.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="card" style={{ overflow: 'hidden', background: '#ffffff' }}>
              <img
                src="/assets/images/results/grapes-yield.jpg"
                alt="Grapes Yield Results"
                style={{ width: '100%', height: '230px', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1592417817098-8f3d6eb22510?w=600';
                }}
              />
              <div style={{ padding: '1.75rem' }}>
                <div className="flex justify-between items-center mb-2">
                  <span className="badge badge-green">Grapes • Nashik</span>
                  <span style={{ fontWeight: '800', color: '#3f6212', fontSize: '0.95rem' }}>+2.5 Brix Sugar</span>
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Uniform Berry Sizing & Bunch Weight</h3>
                <p style={{ fontSize: '0.88rem', color: '#78716c', lineHeight: '1.6' }}>
                  Application of Kaizen-K during berry elongation stage prevented shot berries and enhanced export quality packaging.
                </p>
              </div>
            </div>

            <div className="card" style={{ overflow: 'hidden', background: '#ffffff' }}>
              <img
                src="/assets/images/banners/hero-field-cinematic.jpg"
                alt="Pomegranate Yield"
                style={{ width: '100%', height: '230px', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600';
                }}
              />
              <div style={{ padding: '1.75rem' }}>
                <div className="flex justify-between items-center mb-2">
                  <span className="badge badge-gold">Pomegranate • Solapur</span>
                  <span style={{ fontWeight: '800', color: '#b45309', fontSize: '0.95rem' }}>Zero Cracking</span>
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Deep Aril Color & Rind Hardness</h3>
                <p style={{ fontSize: '0.88rem', color: '#78716c', lineHeight: '1.6' }}>
                  Kriv Mruda Silicon strengthened fruit rind, cutting sun-scorch and bacterial blight damage significantly.
                </p>
              </div>
            </div>

            <div className="card" style={{ overflow: 'hidden', background: '#ffffff' }}>
              <img
                src="/assets/images/results/grapes-yield.jpg"
                alt="Sugarcane Yield"
                style={{ width: '100%', height: '230px', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1592417817098-8f3d6eb22510?w=600';
                }}
              />
              <div style={{ padding: '1.75rem' }}>
                <div className="flex justify-between items-center mb-2">
                  <span className="badge badge-blue">Sugarcane • Kolhapur</span>
                  <span style={{ fontWeight: '800', color: '#1c1917', fontSize: '0.95rem' }}>+12 Ton/Acre</span>
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Inter-Node Distance & Cane Weight</h3>
                <p style={{ fontSize: '0.88rem', color: '#78716c', lineHeight: '1.6' }}>
                  Basal dose of Kriv Vasundhara Organic Manure enriched soil microbial count and improved sucrose recovery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          SMART ON-PACK QR CODE DEMO
          ========================================================================== */}
      <section className="section" style={{ background: '#ffffff' }}>
        <div className="container">
          <div className="card" style={{ padding: '3.5rem', background: 'linear-gradient(135deg, #faf8f5 0%, #f5f2eb 100%)', border: '1px solid #e7e5e4', borderRadius: '28px' }}>
            <div className="grid grid-cols-2 gap-4 items-center">
              <div>
                <div className="badge badge-green mb-3">
                  <QrCode size={14} /> Smart Digital Traceability
                </div>
                <h2 style={{ fontSize: '2.4rem', marginBottom: '1rem', color: '#1c1917' }}>
                  Scan Pack QR Code For Instant Crop Verification
                </h2>
                <p style={{ color: '#44403c', fontSize: '1.05rem', marginBottom: '1.5rem', lineHeight: '1.7' }}>
                  Every Krivan product pack features a unique high-resolution QR code. Simply point your mobile camera to view:
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
                  <div className="flex items-center gap-2" style={{ color: '#3f6212', fontWeight: '800' }}>
                    <CheckCircle2 size={18} /> Verified FCO Lab Test Composition
                  </div>
                  <div className="flex items-center gap-2" style={{ color: '#3f6212', fontWeight: '800' }}>
                    <CheckCircle2 size={18} /> Stage-wise crop dosage (Foliar Spray & Drip)
                  </div>
                  <div className="flex items-center gap-2" style={{ color: '#3f6212', fontWeight: '800' }}>
                    <CheckCircle2 size={18} /> Direct WhatsApp support with Agronomists
                  </div>
                </div>

                <Link to="/product/kaizen-k" className="btn btn-primary" style={{ padding: '0.85rem 1.85rem' }}>
                  <QrCode size={16} />
                  <span>Try Demo QR Landing Page</span>
                </Link>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div className="qr-card" style={{ maxWidth: '340px', margin: '0 auto', background: '#ffffff' }}>
                  <QrCode size={28} style={{ color: '#3f6212', margin: '0 auto 0.5rem' }} />
                  <h3 style={{ fontSize: '1.15rem', marginBottom: '0.35rem', color: '#1c1917' }}>Scan with Phone Camera</h3>
                  <p style={{ fontSize: '0.82rem', color: '#78716c', marginBottom: '1rem' }}>Instant product verification & dosage guide</p>
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                      `${typeof window !== 'undefined' && !window.location.host.includes('localhost') ? window.location.origin : (import.meta.env.VITE_API_URL || 'https://krivan-fullstack.onrender.com')}/product/kaizen-k`
                    )}&color=63-98-18`}
                    alt="Sample QR Code"
                    className="qr-code-img"
                  />
                  <div style={{ fontSize: '0.82rem', color: '#3f6212', fontWeight: '800' }}>
                    100% Genuine Product Authentication
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          💬 FARMER REVIEWS & 5-STAR TESTIMONIALS
          ========================================================================== */}
      <section className="section" style={{ background: '#f5f2eb' }}>
        <div className="container">
          <div className="text-center mb-5">
            <div className="badge badge-gold mb-2">
              <Star size={14} style={{ fill: '#d97706', color: '#d97706' }} /> Farmer Experiences & Ratings
            </div>
            <h2 style={{ fontSize: '2.4rem', marginBottom: '0.5rem' }}>Trusted by 25,000+ Indian Growers</h2>
            <p style={{ color: '#78716c', maxWidth: '650px', margin: '0 auto', fontSize: '1.05rem' }}>
              Real feedback and verified yield experiences from grape growers, sugarcane farmers, and fruit orchardists.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="card" style={{ padding: '2rem', background: '#ffffff' }}>
              <div className="flex gap-1 mb-3" style={{ color: '#f59e0b' }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={16} style={{ fill: '#f59e0b' }} />)}
              </div>
              <p style={{ fontSize: '0.92rem', color: '#44403c', fontStyle: 'italic', marginBottom: '1.5rem', lineHeight: '1.65' }}>
                "गेल्या २ वर्षांपासून ५ एकर द्राक्ष बागेत Kaizen-K वापरत आहे. मण्यांचा आकार, एकसमान फुलोरा आणि साखरेचे प्रमाण (Brix) मध्ये जबरदस्त वाढ झाली. व्यापारी भाव चांगला मिळाला."
              </p>
              <div className="flex items-center gap-3" style={{ borderTop: '1px solid #e7e5e4', paddingTop: '1rem' }}>
                <div style={{ width: '42px', height: '42px', background: '#ecfccb', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#365314', fontWeight: 'bold' }}>
                  SP
                </div>
                <div>
                  <strong style={{ fontSize: '0.95rem', color: '#1c1917', display: 'block' }}>Suresh Patil</strong>
                  <span style={{ fontSize: '0.78rem', color: '#78716c' }}>Grape Grower • Niphad, Nashik</span>
                </div>
              </div>
            </div>

            <div className="card" style={{ padding: '2rem', background: '#ffffff' }}>
              <div className="flex gap-1 mb-3" style={{ color: '#f59e0b' }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={16} style={{ fill: '#f59e0b' }} />)}
              </div>
              <p style={{ fontSize: '0.92rem', color: '#44403c', fontStyle: 'italic', marginBottom: '1.5rem', lineHeight: '1.65' }}>
                "उसाच्या मोठ्या बांधणीवेळी Kriv Mruda सिलिकॉन ग्रॅन्युल्स वापरले. जोरदार वाऱ्यातही ऊस अजिबात लोळला नाही आणि कांड्यांची जाडी वाढून एकरी १२ टनांची वाढ मिळाली."
              </p>
              <div className="flex items-center gap-3" style={{ borderTop: '1px solid #e7e5e4', paddingTop: '1rem' }}>
                <div style={{ width: '42px', height: '42px', background: '#fef3c7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#92400e', fontWeight: 'bold' }}>
                  DS
                </div>
                <div>
                  <strong style={{ fontSize: '0.95rem', color: '#1c1917', display: 'block' }}>Dattatray Shinde</strong>
                  <span style={{ fontSize: '0.78rem', color: '#78716c' }}>Sugarcane Farmer • Baramati, Pune</span>
                </div>
              </div>
            </div>

            <div className="card" style={{ padding: '2rem', background: '#ffffff' }}>
              <div className="flex gap-1 mb-3" style={{ color: '#f59e0b' }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={16} style={{ fill: '#f59e0b' }} />)}
              </div>
              <p style={{ fontSize: '0.92rem', color: '#44403c', fontStyle: 'italic', marginBottom: '1.5rem', lineHeight: '1.65' }}>
                "डाळिंबाची उन्हाळ्यातील फुलगळ रोखण्यासाठी Thalassa चा स्प्रे केला. फुलांची गळ थांबून एकाच वेळी एकसमान फळधारणा झाली. फळाला चमकदार लाल रंग आला."
              </p>
              <div className="flex items-center gap-3" style={{ borderTop: '1px solid #e7e5e4', paddingTop: '1rem' }}>
                <div style={{ width: '42px', height: '42px', background: '#ecfccb', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#365314', fontWeight: 'bold' }}>
                  SP
                </div>
                <div>
                  <strong style={{ fontSize: '0.95rem', color: '#1c1917', display: 'block' }}>Santosh Pawar</strong>
                  <span style={{ fontSize: '0.78rem', color: '#78716c' }}>Pomegranate Orchardist • Pandharpur</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
          📸 1-CLICK CROP PHOTO & PEST DIAGNOSIS ADVISORY SECTION
          ========================================================================== */}
      <section className="section" style={{ background: '#faf8f5', borderTop: '1px solid #e7e5e4', borderBottom: '1px solid #e7e5e4' }}>
        <div className="container" style={{ maxWidth: '1080px' }}>
          <CropPestAdvisor />
        </div>
      </section>

      {/* ==========================================================================
          ❓ FREQUENTLY ASKED QUESTIONS (FAQ ACCORDION)
          ========================================================================== */}
      <section className="section" style={{ background: '#ffffff' }}>
        <div className="container" style={{ maxWidth: '840px' }}>
          <div className="text-center mb-5">
            <div className="badge badge-green mb-2">
              <HelpCircle size={14} /> Clear Answers for Farmers
            </div>
            <h2 style={{ fontSize: '2.4rem', marginBottom: '0.5rem' }}>Frequently Asked Questions</h2>
            <p style={{ color: '#78716c', fontSize: '1.05rem' }}>
              Everything you need to know about Krivan organic inputs, spray mixing, and dealer availability.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="card" style={{ padding: '1.5rem', background: '#faf8f5' }}>
              <h3 style={{ fontSize: '1.1rem', color: '#1c1917', marginBottom: '0.4rem' }}>
                १. कायझेन-के (Kaizen-K) हे रासायनिक पोटॅशपेक्षा वेगळे का आहे?
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#57534e', margin: 0 }}>
                कायझेन-के हे Marine Rhodophytes (समुद्री शैवाल) पासून तयार केलेले १००% वनस्पती-आधारित पोटॅश आहे. यामध्ये नैसर्गिक Auxins आणि Cytokinins असल्यामुळे वनस्पतींद्वारे ते जलद शोषले जाते आणि जमिनीतील क्षारता (Salinity) वाढत नाही.
              </p>
            </div>

            <div className="card" style={{ padding: '1.5rem', background: '#faf8f5' }}>
              <h3 style={{ fontSize: '1.1rem', color: '#1c1917', marginBottom: '0.4rem' }}>
                २. क्रिव्हनची खते इतर कीटकनाशके व बुरशीनाशकांसोबत मिक्स करता येतात का?
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#57534e', margin: 0 }}>
                होय, क्रिव्हनची उत्पादने सामान्य कीटकनाशके आणि बुरशीनाशकांशी सुसंगत (Compatible) आहेत. फक्त तीव्र अल्कलाईन (उदा. बोर्डो मिश्रण किंवा कॉपर) सोबत वापरणे टाळावे.
              </p>
            </div>

            <div className="card" style={{ padding: '1.5rem', background: '#faf8f5' }}>
              <h3 style={{ fontSize: '1.1rem', color: '#1c1917', marginBottom: '0.4rem' }}>
                ३. आमच्या गावात किंवा तालुक्यात ही खते कोठे मिळतील?
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#57534e', margin: 0 }}>
                महाराष्ट्रातील नाशिक, पुणे, सोलापूर, सांगली, कोल्हापूर, अहमदनगर आदी सर्व जिल्ह्यांत अधिकृत कृषी सेवा केंद्रांवर उपलब्ध आहेत. तुम्ही आमच्या <strong>"Find Dealers"</strong> पेजवर जाऊन जवळचा डीलर शोधू शकता.
              </p>
            </div>

            <div className="card" style={{ padding: '1.5rem', background: '#faf8f5' }}>
              <h3 style={{ fontSize: '1.1rem', color: '#1c1917', marginBottom: '0.4rem' }}>
                ४. फवारणी केल्यानंतर किती दिवसांत पिकावर रिझल्ट दिसतो?
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#57534e', margin: 0 }}>
                फवारणी दिल्यानंतर ५ ते ७ दिवसांत पानांची रुंदी, हिरवेगारपणा, फुलोऱ्याची मजबुती आणि फळांची फुगवण यात दृश्यमान फरक जाणवतो.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dealership Banner */}
      <section style={{
        background: 'linear-gradient(135deg, #1c1917 0%, #273e0b 100%)',
        color: '#ffffff',
        padding: '5rem 0',
        textAlign: 'center',
        position: 'relative'
      }}>
        <div className="container">
          <span className="badge badge-gold mb-3" style={{ background: 'rgba(245, 158, 11, 0.2)', color: '#fef08a', borderColor: '#fde68a' }}>
            <Award size={14} /> Authorized Distribution Network
          </span>
          <h2 style={{ color: '#fafaf9', fontSize: '2.85rem', marginBottom: '1.25rem', fontWeight: '900' }}>
            Looking for Dealership or Bulk Farm Supply?
          </h2>
          <p style={{ color: '#d6d3d1', maxWidth: '680px', margin: '0 auto 2.25rem', fontSize: '1.15rem' }}>
            Partner with Krivan Industries to bring high-yielding organic inputs, bio-potash, and micronutrients to farmers in your region.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Link to="/contact" className="btn btn-secondary" style={{ padding: '0.95rem 2.25rem', fontSize: '1.05rem' }}>
              <PhoneCall size={18} />
              <span>Contact Dealership Desk</span>
            </Link>
            <a href="tel:+919876543210" className="btn btn-light" style={{ padding: '0.95rem 1.85rem', fontSize: '1.05rem' }}>
              <span>Call Helpline: +91 98765 43210</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
