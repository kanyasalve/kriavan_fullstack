import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import Logo from './Logo';
import { Menu, X, Phone, Clock, ArrowRight, ShieldCheck, Sparkles, Sprout } from 'lucide-react';

const Navbar = () => {
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Bar */}
      <div className="top-bar">
        <div className="container flex justify-between items-center flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <ShieldCheck size={14} style={{ color: '#4ade80' }} />
              Krivan Industries Pvt. Ltd. (ISO 9001:2015 & FCO Certified)
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:+919876543210" className="flex items-center gap-1">
              <Phone size={14} style={{ color: '#4ade80' }} />
              +91 98765 43210
            </a>
            <Link to="/admin" style={{ color: '#fef08a', fontWeight: '800', fontSize: '0.82rem', background: 'rgba(245, 158, 11, 0.2)', padding: '2px 10px', borderRadius: '12px', border: '1px solid rgba(245, 158, 11, 0.4)' }}>
              Admin Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="navbar">
        <div className="container flex justify-between items-center">
          {/* Brand Logo with New Emblem */}
          <Link to="/">
            <Logo size="normal" variant="dark" />
          </Link>

          {/* Desktop Nav Links */}
          <div className="desktop-nav items-center gap-1">
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              {t('home')}
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              {t('about')}
            </NavLink>
            <NavLink to="/products" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              {t('products')}
            </NavLink>
            <NavLink to="/gallery" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              {t('gallery')}
            </NavLink>
            <NavLink to="/blog" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              {t('blog')}
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              {t('contact')}
            </NavLink>
          </div>

          {/* Action Button & Language Switcher */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            
            <Link to="/contact" className="btn btn-primary" style={{ padding: '0.55rem 1.25rem', fontSize: '0.85rem' }}>
              <span>{t('enquireNow')}</span>
              <ArrowRight size={14} />
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-nav-toggle"
              style={{
                background: '#f1f5f9',
                border: 'none',
                padding: '8px',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div style={{
            background: 'white',
            borderTop: '1px solid #e2e8f0',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            boxShadow: '0 12px 30px rgba(0,0,0,0.1)'
          }}>
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="nav-link">{t('home')}</Link>
            <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="nav-link">{t('about')}</Link>
            <Link to="/products" onClick={() => setMobileMenuOpen(false)} className="nav-link">{t('products')}</Link>
            <Link to="/gallery" onClick={() => setMobileMenuOpen(false)} className="nav-link">{t('gallery')}</Link>
            <Link to="/blog" onClick={() => setMobileMenuOpen(false)} className="nav-link">{t('blog')}</Link>
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="nav-link">{t('contact')}</Link>
            <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="nav-link" style={{ color: '#ca8a04', fontWeight: 'bold' }}>{t('admin')}</Link>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
