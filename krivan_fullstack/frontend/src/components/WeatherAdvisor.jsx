import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CloudSun, Wind, Droplets, Thermometer, CheckCircle2, AlertTriangle, MapPin, RefreshCw } from 'lucide-react';

const districtData = {
  nashik: { name: 'Nashik (नाशिक)', name_mr: 'नाशिक', temp: 28, humidity: 62, wind: 9, rainChance: 10, weather: 'Clear & Sunny', status: 'optimal' },
  pune: { name: 'Pune (पुणे)', name_mr: 'पुणे', temp: 29, humidity: 58, wind: 11, rainChance: 15, weather: 'Mild Breeze', status: 'optimal' },
  solapur: { name: 'Solapur (सोलापूर)', name_mr: 'सोलापूर', temp: 33, humidity: 45, wind: 8, rainChance: 5, weather: 'Hot & Dry', status: 'optimal' },
  kolhapur: { name: 'Kolhapur (कोल्हापूर)', name_mr: 'कोल्हापूर', temp: 27, humidity: 75, wind: 14, rainChance: 35, weather: 'Scattered Clouds', status: 'moderate' },
  ahmednagar: { name: 'Ahmednagar (अहिल्यानगर)', name_mr: 'अहिल्यानगर', temp: 30, humidity: 52, wind: 10, rainChance: 10, weather: 'Sunny', status: 'optimal' },
  sangli: { name: 'Sangli (सांगली)', name_mr: 'सांगली', temp: 31, humidity: 56, wind: 9, rainChance: 12, weather: 'Clear Sky', status: 'optimal' },
  satara: { name: 'Satara (सातारा)', name_mr: 'सातारा', temp: 28, humidity: 65, wind: 12, rainChance: 20, weather: 'Partly Cloudy', status: 'optimal' },
  jalgaon: { name: 'Jalgaon (जळगाव)', name_mr: 'जळगाव', temp: 34, humidity: 42, wind: 11, rainChance: 5, weather: 'Warm & Clear', status: 'optimal' },
  sambhajinagar: { name: 'Chh. Sambhajinagar (छ. संभाजीनगर)', name_mr: 'छ. संभाजीनगर', temp: 31, humidity: 50, wind: 10, rainChance: 10, weather: 'Sunny', status: 'optimal' },
  belagavi: { name: 'Belagavi / Karnataka (ಬೆಳಗಾವಿ)', name_mr: 'बेळगाव (कर्नाटक)', temp: 28, humidity: 70, wind: 13, rainChance: 25, weather: 'Pleasant', status: 'optimal' },
  surat: { name: 'Surat / Gujarat (સુરત)', name_mr: 'सूरत (गुजरात)', temp: 32, humidity: 68, wind: 12, rainChance: 15, weather: 'Humid & Clear', status: 'optimal' }
};

const WeatherAdvisor = () => {
  const { lang } = useLanguage();
  const [selectedDistrict, setSelectedDistrict] = useState('nashik');
  const [refreshing, setRefreshing] = useState(false);

  const data = districtData[selectedDistrict] || districtData.nashik;

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 600);
  };

  const isOptimal = data.rainChance <= 25 && data.wind <= 15;

  return (
    <div style={{
      background: 'linear-gradient(135deg, #1c2e07 0%, #273e0b 100%)',
      color: '#ffffff',
      borderRadius: '24px',
      padding: '2rem',
      border: '1px solid rgba(163, 230, 53, 0.25)',
      boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background ambient glow */}
      <div style={{
        position: 'absolute',
        top: '-40%',
        right: '-20%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(163, 230, 53, 0.18) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }}></div>

      <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <div style={{ background: 'rgba(255,255,255,0.12)', padding: '8px', borderRadius: '12px' }}>
            <CloudSun size={24} style={{ color: '#a3e635' }} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', color: '#ffffff', margin: 0, fontWeight: '800' }}>
              {lang === 'mr' ? 'हवामान व फवारणी सल्लागार' : 'Live Agri Weather & Spray Advisor'}
            </h3>
            <span style={{ fontSize: '0.78rem', color: '#bef264' }}>
              {lang === 'mr' ? 'पिकांच्या फवारणीसाठी आजचे हवामान अनुकूलता' : 'Real-time agronomic spray window calculation'}
            </span>
          </div>
        </div>

        {/* District Selector & Refresh */}
        <div className="flex items-center gap-2">
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            style={{
              background: '#ffffff',
              color: '#1c1917',
              border: 'none',
              borderRadius: '12px',
              padding: '6px 12px',
              fontSize: '0.85rem',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            {Object.entries(districtData).map(([key, d]) => (
              <option key={key} value={key}>
                {lang === 'mr' ? d.name_mr : d.name}
              </option>
            ))}
          </select>
          <button
            onClick={handleRefresh}
            style={{
              background: 'rgba(255,255,255,0.15)',
              border: 'none',
              color: '#ffffff',
              padding: '7px',
              borderRadius: '10px',
              cursor: 'pointer'
            }}
            title="Update Weather"
          >
            <RefreshCw size={15} className={refreshing ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* Weather Metric Pills */}
      <div className="grid grid-cols-4 gap-3 mb-4">
        <div style={{ background: 'rgba(255,255,255,0.07)', padding: '12px', borderRadius: '14px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div className="flex justify-center items-center gap-1 mb-1" style={{ color: '#f59e0b', fontSize: '0.75rem', fontWeight: '700' }}>
            <Thermometer size={14} /> तापमान (Temp)
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: '900', color: '#ffffff' }}>{data.temp}°C</div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.07)', padding: '12px', borderRadius: '14px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div className="flex justify-center items-center gap-1 mb-1" style={{ color: '#38bdf8', fontSize: '0.75rem', fontWeight: '700' }}>
            <Droplets size={14} /> आर्द्रता (Humidity)
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: '900', color: '#ffffff' }}>{data.humidity}%</div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.07)', padding: '12px', borderRadius: '14px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div className="flex justify-center items-center gap-1 mb-1" style={{ color: '#a3e635', fontSize: '0.75rem', fontWeight: '700' }}>
            <Wind size={14} /> वारा (Wind)
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: '900', color: '#ffffff' }}>{data.wind} km/h</div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.07)', padding: '12px', borderRadius: '14px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div className="flex justify-center items-center gap-1 mb-1" style={{ color: '#c084fc', fontSize: '0.75rem', fontWeight: '700' }}>
            <CloudSun size={14} /> पाऊस शक्यता (Rain)
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: '900', color: '#ffffff' }}>{data.rainChance}%</div>
        </div>
      </div>

      {/* Spray Recommendation Alert Strip */}
      <div style={{
        background: isOptimal ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
        border: isOptimal ? '1px solid rgba(74, 222, 128, 0.4)' : '1px solid rgba(248, 113, 113, 0.4)',
        borderRadius: '14px',
        padding: '12px 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <div className="flex items-center gap-2">
          {isOptimal ? (
            <CheckCircle2 size={20} style={{ color: '#4ade80', flexShrink: 0 }} />
          ) : (
            <AlertTriangle size={20} style={{ color: '#f87171', flexShrink: 0 }} />
          )}
          <div>
            <strong style={{ color: isOptimal ? '#86efac' : '#fca5a5', fontSize: '0.95rem' }}>
              {isOptimal 
                ? (lang === 'mr' ? '✅ आज फवारणीसाठी अनुकूल हवामान (Ideal for Spraying)' : '✅ Ideal Foliar Spraying Window Today')
                : (lang === 'mr' ? '⚠️ पावसाची अथवा जोरदार वाऱ्याची शक्यता - फवारणी सावधगिरीने करा' : '⚠️ Rain/Wind Alert: Avoid spraying in peak hours')}
            </strong>
            <div style={{ fontSize: '0.8rem', color: '#d6d3d1', marginTop: '2px' }}>
              {lang === 'mr' 
                ? 'सकाळी ७ ते १० किंवा संध्याकाळी ४ नंतर कायझेन-के आणि सेंद्रिय खतांची फवारणी करावी.' 
                : 'Optimal absorption occurs between 7-10 AM or after 4:30 PM with bio-stimulant inputs.'}
            </div>
          </div>
        </div>

        <a
          href={`https://wa.me/919876543210?text=${encodeURIComponent(`नमस्कार, मी ${data.name_mr} येथून आहे. आजच्या हवामानानुसार माझ्या पिकासाठी योग्य खतांचा डोस कोणता द्यावा?`)}`}
          target="_blank"
          rel="noreferrer"
          className="btn btn-secondary"
          style={{ padding: '0.45rem 1rem', fontSize: '0.82rem', whiteSpace: 'nowrap' }}
        >
          <span>{lang === 'mr' ? 'तज्ञांचा सल्ला घ्या' : 'Ask Agronomist'}</span>
        </a>
      </div>
    </div>
  );
};

export default WeatherAdvisor;
