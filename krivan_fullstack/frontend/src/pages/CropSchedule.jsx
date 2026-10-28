import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Calendar, 
  Sprout, 
  Droplets, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  Download, 
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

const CropSchedule = () => {
  const { lang } = useLanguage();
  const [activeCrop, setActiveCrop] = useState('grapes');

  const schedules = {
    grapes: {
      name: 'Grapes (द्राक्ष बागेचे शास्त्रीय वेळापत्रक)',
      stages: [
        {
          stage: '1. Sprouting to Pre-Bloom (१५ ते २० दिवस)',
          timing: 'After October Pruning',
          sprays: 'Foliar Spray: Kriv Natura 2 ml/L for uniform shoot emergence & bud vigor.',
          drip: 'Drip: Kriv Vasundhara Organic Manure 50 kg/acre as basal dose.'
        },
        {
          stage: '2. Berry Setting & 4-6 mm Stage (३५ ते ४५ दिवस)',
          timing: 'Post Flowering Setting',
          sprays: 'Foliar Spray: THALASSA 1.5 ml/L to prevent berry drop and ensure uniform cluster.',
          drip: 'Drip: Kriv Mruda Diatomite Silicon 25 kg/acre for berry pedicel strength.'
        },
        {
          stage: '3. Berry Elongation & Sizing Stage (६० ते ७५ दिवस)',
          timing: 'Berry Growth Peak',
          sprays: 'Foliar Spray: KAIZEN - K 1 to 1.5 gm/L (2 sprays at 8-day interval).',
          drip: 'Drip: Water soluble bio-potash for berry enlargement.'
        },
        {
          stage: '4. Sugar Development & Color (८५ ते ११० दिवस)',
          timing: 'Pre-Harvesting Stage',
          sprays: 'Foliar Spray: KAIZEN - K 1.5 gm/L for Brix increase (+2.5) and rich skin shine.',
          drip: 'Reduce nitrogen, maintain potash levels for extended shelf-life.'
        }
      ]
    },
    sugarcane: {
      name: 'Sugarcane (ऊस पिकाचे भरघोस उत्पादन वेळापत्रक)',
      stages: [
        {
          stage: '1. Planting & Basal Dose (लागवड वेळ)',
          timing: 'Day 0 to 15',
          sprays: 'Set treatment with bio-organic solution.',
          drip: 'Soil Application: KRIV VASUNDHARA 100 kg/acre + KRIV MRUDA Silicon 25 kg/acre.'
        },
        {
          stage: '2. Tillering Stage (४५ ते ६० दिवस - फुटवे फुटणे)',
          timing: 'Active Tillering',
          sprays: 'Foliar Spray: THALASSA 2 ml/L for profuse, sturdy tiller development.',
          drip: 'Soil moisture maintenance & secondary nutrient application.'
        },
        {
          stage: '3. Earthing Up (१०० ते १२० दिवस - मोठी बांधणी)',
          timing: 'Cane Formation',
          sprays: 'Foliar Spray: KAIZEN - K 1.5 gm/L for cell elongation.',
          drip: 'Soil Application: KRIV MRUDA 25 kg/acre to prevent cane lodging during monsoon winds.'
        },
        {
          stage: '4. Grand Growth & Maturity (६ ते ९ महिने)',
          timing: 'Sucrose Accumulation',
          sprays: 'Foliar Spray: KAIZEN - K for higher sugar recovery percentage.',
          drip: 'Irrigation management for dense cane weight.'
        }
      ]
    },
    pomegranate: {
      name: 'Pomegranate (डाळिंब बहार व्यवस्थापन)',
      stages: [
        {
          stage: '1. Bahar Treatment & Leaf Fall (बहार धरणे)',
          timing: 'Pre-Bloom Rest',
          sprays: 'Ethrel spray followed by nutrient restoration.',
          drip: 'Basal Dose: KRIV VASUNDHARA 50 kg/acre to replenish root microflora.'
        },
        {
          stage: '2. Flowering & Fruit Setting (फुलोरा व सेटिंग)',
          timing: 'Day 30 to 50',
          sprays: 'Foliar Spray: THALASSA 1.5 ml/L to stop flower drop under temperature swings.',
          drip: 'Drip: Root zone conditioning.'
        },
        {
          stage: '3. Fruit Sizing & Rind Hardening (फळ विकास)',
          timing: 'Day 65 to 110',
          sprays: 'Foliar Spray: KAIZEN - K 1.5 gm/L + Kriv Mruda Silicon.',
          drip: 'Maintains fruit rind thickness, completely eliminating fruit cracking.'
        },
        {
          stage: '4. Aril Color & Shine (रंग व वजन विकास)',
          timing: 'Day 120 to 150',
          sprays: 'Foliar Spray: KAIZEN - K for deep ruby red arils and sweet juice.',
          drip: 'Potash and micronutrient balance.'
        }
      ]
    }
  };

  return (
    <div className="section" style={{ paddingTop: '3.5rem' }}>
      <div className="container">
        
        {/* Header */}
        <div className="text-center mb-5">
          <div className="badge badge-green mb-2">
            <Calendar size={14} /> Scientific Agronomy Guidelines
          </div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>Crop Spray & Fertigation Schedules</h1>
          <p style={{ color: '#78716c', maxWidth: '680px', margin: '0 auto', fontSize: '1.05rem' }}>
            Comprehensive stage-by-stage spray schedules formulated by Krivan agronomists to maximize crop yields, sugar content, and export standards.
          </p>
        </div>

        {/* Crop Selector Tabs */}
        <div className="flex justify-center gap-2 mb-5 flex-wrap">
          {Object.keys(schedules).map((key) => (
            <button
              key={key}
              onClick={() => setActiveCrop(key)}
              className={`btn ${activeCrop === key ? 'btn-primary' : 'btn-light'}`}
              style={{ padding: '0.6rem 1.4rem', fontSize: '0.92rem' }}
            >
              {schedules[key].name}
            </button>
          ))}
        </div>

        {/* Schedule Stage Cards */}
        <div className="card" style={{ padding: '2.5rem', background: '#ffffff', borderRadius: '24px' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#1c1917' }}>
            {schedules[activeCrop].name}
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {schedules[activeCrop].stages.map((st, idx) => (
              <div
                key={idx}
                style={{
                  background: '#faf8f5',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  border: '1px solid #e7e5e4'
                }}
              >
                <div className="flex justify-between items-center mb-3 flex-wrap gap-2">
                  <strong style={{ fontSize: '1.15rem', color: '#1c1917' }}>{st.stage}</strong>
                  <span className="badge badge-gold" style={{ fontSize: '0.75rem' }}>
                    <Clock size={12} /> {st.timing}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '12px', border: '1px solid #e7e5e4' }}>
                    <div style={{ fontSize: '0.8rem', color: '#3f6212', fontWeight: '800', textTransform: 'uppercase', marginBottom: '4px' }}>
                      🌿 फवारणी शिफारस (Foliar Spray):
                    </div>
                    <div style={{ fontSize: '0.92rem', color: '#292524', fontWeight: '600' }}>
                      {st.sprays}
                    </div>
                  </div>

                  <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '12px', border: '1px solid #e7e5e4' }}>
                    <div style={{ fontSize: '0.8rem', color: '#b45309', fontWeight: '800', textTransform: 'uppercase', marginBottom: '4px' }}>
                      💧 ठिबक / जमीन वापर (Drip / Soil Application):
                    </div>
                    <div style={{ fontSize: '0.92rem', color: '#292524', fontWeight: '600' }}>
                      {st.drip}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-5 pt-4 flex-wrap gap-3" style={{ borderTop: '1px solid #e7e5e4' }}>
            <div style={{ fontSize: '0.88rem', color: '#78716c' }}>
              ⚠️ <ShieldAlert size={14} style={{ display: 'inline' }} /> <strong>महत्त्वाची सूचना:</strong> फवारणी सकाळी १० पूर्वी किंवा संध्याकाळी ४ नंतर करावी.
            </div>
            <a href="/contact" className="btn btn-primary" style={{ padding: '0.65rem 1.4rem' }}>
              <span>Request Custom Crop Schedule</span>
              <ArrowRight size={15} />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CropSchedule;
