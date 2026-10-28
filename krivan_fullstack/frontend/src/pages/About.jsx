import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Award, ShieldCheck, Sprout, Target, Users, Factory, Microscope } from 'lucide-react';

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="section" style={{ paddingTop: '3rem' }}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5">
          <div className="badge badge-green mb-2">
            <Award size={14} /> Established Excellence
          </div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{t('aboutTitle')}</h1>
          <p style={{ color: '#64748b', maxWidth: '680px', margin: '0 auto' }}>
            {t('aboutSubtitle')}
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-2 gap-4 items-center mb-5">
          <div>
            <h2 style={{ fontSize: '2rem', marginBottom: '1.25rem', color: '#0f172a' }}>
              Pioneering Sustainable Soil Health & Scientific Fertilizers
            </h2>
            <p style={{ color: '#475569', marginBottom: '1rem', lineHeight: '1.7' }}>
              {t('aboutStory1')}
            </p>
            <p style={{ color: '#475569', marginBottom: '1.5rem', lineHeight: '1.7' }}>
              {t('aboutStory2')}
            </p>

            <div className="grid grid-cols-2 gap-3">
              <div style={{ background: 'white', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ color: '#15803d', fontWeight: '800', fontSize: '1.75rem' }}>100%</div>
                <div style={{ fontWeight: '600', color: '#0f172a' }}>FCO Certified</div>
                <div style={{ fontSize: '0.82rem', color: '#64748b' }}>Strict lab testing</div>
              </div>
              <div style={{ background: 'white', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ color: '#15803d', fontWeight: '800', fontSize: '1.75rem' }}>Zero</div>
                <div style={{ fontWeight: '600', color: '#0f172a' }}>Chemical Residue</div>
                <div style={{ fontSize: '0.82rem', color: '#64748b' }}>Eco-safe biology</div>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <img
              src="/assets/images/banners/banner-field.jpg"
              alt="Krivan Agriculture"
              style={{ width: '100%', borderRadius: '20px', boxShadow: '0 16px 36px rgba(0,0,0,0.1)' }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&auto=format&fit=crop&q=60';
              }}
            />
          </div>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-3 gap-4 mt-5">
          <div className="card" style={{ padding: '2rem' }}>
            <div style={{ width: '48px', height: '48px', background: '#dcfce7', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#15803d', marginBottom: '1rem' }}>
              <Microscope size={24} />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>R&D Biotechnology</h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
              Continuous research into microbial strains, natural auxin extractions, and plant-absorbable minerals.
            </p>
          </div>

          <div className="card" style={{ padding: '2rem' }}>
            <div style={{ width: '48px', height: '48px', background: '#fef9c3', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#854d0e', marginBottom: '1rem' }}>
              <Factory size={24} />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>State-of-the-Art Plant</h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
              Modern manufacturing facility located in Maharashtra equipped with computerized quality checkpoints.
            </p>
          </div>

          <div className="card" style={{ padding: '2rem' }}>
            <div style={{ width: '48px', height: '48px', background: '#e0f2fe', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0284c7', marginBottom: '1rem' }}>
              <Users size={24} />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Farmer First Mentality</h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
              Dedicated agronomy field assistants visiting farms to give accurate crop dosage and disease consultation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
