import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import Logo from './Logo';
import { MapPin, Phone, Mail, ArrowRight, Award, ShieldCheck } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="container">
        <div className="grid grid-cols-4 gap-4">
          {/* Company Brand Column */}
          <div>
            <div className="mb-3">
              <Logo size="normal" variant="light" />
            </div>
            <p style={{ fontSize: '0.9rem', color: '#cbd5e1', marginBottom: '1.35rem', lineHeight: '1.6' }}>
              Pioneering sustainable soil health, bio-available rhodophyte potash, and crop yield enhancement for Indian agriculture.
            </p>
            <div className="flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" style={{ color: '#4ade80', fontSize: '1.25rem' }}>
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ color: '#4ade80', fontSize: '1.25rem' }}>
                <i className="bi bi-instagram"></i>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" style={{ color: '#4ade80', fontSize: '1.25rem' }}>
                <i className="bi bi-youtube"></i>
              </a>
              <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" style={{ color: '#4ade80', fontSize: '1.25rem' }}>
                <i className="bi bi-whatsapp"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4>{t('quickLinks')}</h4>
            <Link to="/" className="footer-link">{t('home')}</Link>
            <Link to="/about" className="footer-link">{t('about')}</Link>
            <Link to="/products" className="footer-link">{t('products')}</Link>
            <Link to="/gallery" className="footer-link">{t('gallery')}</Link>
            <Link to="/blog" className="footer-link">{t('blog')}</Link>
            <Link to="/contact" className="footer-link">{t('contact')}</Link>
            <Link to="/admin" className="footer-link" style={{ color: '#fef08a' }}>{t('admin')}</Link>
          </div>

          {/* Farmer Tools & Network */}
          <div>
            <h4>Farmer Services</h4>
            <Link to="/crop-schedule" className="footer-link" style={{ color: '#86efac', fontWeight: '600' }}>
              🌿 {t('cropSchedule')}
            </Link>
            <Link to="/dealers" className="footer-link" style={{ color: '#86efac', fontWeight: '600' }}>
              🏪 {t('dealers')}
            </Link>
            <a href="/#calculator" className="footer-link">
              🧮 {t('calculator')}
            </a>
            <Link to="/products?cat=potash" className="footer-link">Kaizen-K (Bio-Potash)</Link>
            <Link to="/products?cat=organic" className="footer-link">Kriv Vasundhara (Organic)</Link>
            <Link to="/products?cat=potash" className="footer-link">Kriv Mruda (Silicon)</Link>
          </div>

          {/* Contact Details */}
          <div>
            <h4>{t('contactInfo')}</h4>
            <div className="flex gap-2 mb-3" style={{ fontSize: '0.88rem', color: '#cbd5e1' }}>
              <MapPin size={18} style={{ color: '#4ade80', flexShrink: 0, marginTop: '3px' }} />
              <span>Plot No. 12, Agri-Tech Park, Pune - 411001, Maharashtra, India.</span>
            </div>
            <div className="flex gap-2 mb-3" style={{ fontSize: '0.88rem', color: '#cbd5e1' }}>
              <Phone size={18} style={{ color: '#4ade80', flexShrink: 0 }} />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex gap-2 mb-3" style={{ fontSize: '0.88rem', color: '#cbd5e1' }}>
              <Mail size={18} style={{ color: '#4ade80', flexShrink: 0 }} />
              <span>info@krivanindustries.com</span>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom flex justify-between items-center flex-wrap gap-2">
          <div>{t('copyright')}</div>
          <div className="flex gap-3 items-center">
            <span style={{ color: '#86efac' }}>ISO 9001:2015 Certified</span>
            <span>•</span>
            <span style={{ color: '#fef08a' }}>FCO Govt Approved</span>
            <span>•</span>
            <span>100% Organic Input</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
