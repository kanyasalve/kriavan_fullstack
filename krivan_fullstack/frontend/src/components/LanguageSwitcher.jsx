import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe, ChevronDown } from 'lucide-react';

const languages = [
  { code: 'mr', label: 'मराठी', short: 'MR' },
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'hi', label: 'हिन्दी', short: 'HI' },
  { code: 'gu', label: 'ગુજરાતી', short: 'GU' },
  { code: 'kn', label: 'ಕನ್ನಡ', short: 'KN' }
];

const LanguageSwitcher = () => {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const activeLang = languages.find(l => l.code === lang) || languages[0];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: '#ffffff',
          border: '1px solid #d6d3d1',
          padding: '6px 12px',
          borderRadius: '20px',
          fontSize: '0.82rem',
          fontWeight: '700',
          color: '#1c1917',
          cursor: 'pointer',
          boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
          transition: 'all 0.2s ease'
        }}
        aria-label="Select Language"
      >
        <Globe size={15} style={{ color: '#3f6212' }} />
        <span>{activeLang.label}</span>
        <ChevronDown size={13} style={{ color: '#78716c', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
      </button>

      {open && (
        <div style={{
          position: 'absolute',
          top: '115%',
          right: 0,
          background: '#ffffff',
          borderRadius: '14px',
          border: '1px solid #e7e5e4',
          boxShadow: '0 12px 30px rgba(0,0,0,0.15)',
          padding: '6px',
          minWidth: '135px',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          gap: '2px'
        }}>
          {languages.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => {
                setLang(l.code);
                setOpen(false);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 12px',
                borderRadius: '8px',
                border: 'none',
                background: lang === l.code ? '#ecfccb' : 'transparent',
                color: lang === l.code ? '#273e0b' : '#44403c',
                fontWeight: lang === l.code ? '800' : '600',
                fontSize: '0.84rem',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease'
              }}
            >
              <span>{l.label}</span>
              <span style={{ fontSize: '0.72rem', opacity: 0.65 }}>{l.short}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
