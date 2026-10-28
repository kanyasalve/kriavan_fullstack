import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Camera, Send, MessageCircle, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';

const CropPestAdvisor = () => {
  const { lang } = useLanguage();
  const [cropName, setCropName] = useState('द्राक्षे (Grapes)');
  const [problem, setProblem] = useState('फळ फुगवण व साखर वाढ (Sizing & Brix)');

  const problemOptions = [
    'फळ फुगवण व साखर वाढ (Sizing & Brix)',
    'फुलगळ / फळगळ समस्या (Flower/Fruit Drop)',
    'पानांची पिवळेपणा / पोषण कमतरता (Yellowing/Deficiency)',
    'उन्हाळा / दुष्काळ ताण (Drought/Heat Stress)',
    'उसाची जाडी व वाढ (Cane Girth & Yield)',
    'इतर कीड/रोग समस्या (Pest & Disease Issue)'
  ];

  const handleSendWhatsApp = () => {
    const message = `🌿 *क्रिव्हन कृषी सल्ला केंद्र (Krivan Agri Advisory)* 🌿\n\n🌾 *पीक:* ${cropName}\n⚠️ *समस्या/गरज:* ${problem}\n📸 *मी खाली माझ्या पिकाचा/पानाचा फोटो जोडत आहे.*\n\nकृपया यावर योग्य क्रिव्हन बायो-खतांचा आणि कायझेन-के चा फवारणी डोस सुचवावा.`;
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #faf8f5 0%, #f5f2eb 100%)',
      border: '2px dashed #84cc16',
      borderRadius: '24px',
      padding: '2.25rem',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
    }}>
      <div className="grid grid-cols-2 gap-4 items-center">
        <div>
          <div className="badge badge-green mb-2" style={{ background: '#ecfccb', color: '#3f6212', border: '1px solid #bef264' }}>
            <Camera size={14} />
            <span>{lang === 'mr' ? '१-क्लिक फोटो पीक सल्ला' : '1-Click Photo Crop Diagnosis'}</span>
          </div>

          <h3 style={{ fontSize: '1.85rem', color: '#1c1917', marginBottom: '0.65rem', fontWeight: '800' }}>
            {lang === 'mr' ? 'पिकाचा फोटो पाठवा आणि त्वरित योग्य डोस मिळवा' : 'Send Crop Photo & Get Instant Nutrition Dose'}
          </h3>

          <p style={{ color: '#57534e', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
            {lang === 'mr'
              ? 'तुमच्या बागेतील किंवा शेतातील पिकाचा फोटो थेट आमच्या कृषी तज्ञांना व्हॉट्सॲपवर पाठवा. ५ मिनिटांत अचूक खत मात्रा आणि फवारणी मार्गदर्शन मिळवा.'
              : 'Snap a photo of your crop, leaf, or fruit and send it directly via WhatsApp to receive expert stage-wise Kaizen-K dosing.'}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div className="flex items-center gap-2" style={{ fontSize: '0.88rem', color: '#3f6212', fontWeight: '700' }}>
              <CheckCircle2 size={17} /> {lang === 'mr' ? 'द्राक्षे, डाळिंब, ऊस, कांदा व भाजीपाला पिकांसाठी विशेष सपोर्ट' : 'Expert agronomists for Grapes, Sugarcane, Pomegranate & Vegetables'}
            </div>
            <div className="flex items-center gap-2" style={{ fontSize: '0.88rem', color: '#3f6212', fontWeight: '700' }}>
              <CheckCircle2 size={17} /> {lang === 'mr' ? '१००% मोफत व त्वरित कृषी मार्गदर्शन' : '100% Free & instant agronomist recommendations'}
            </div>
          </div>
        </div>

        {/* Interactive Quick Send Box */}
        <div style={{ background: '#ffffff', padding: '1.75rem', borderRadius: '18px', border: '1px solid #e7e5e4', boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}>
          <h4 style={{ fontSize: '1.15rem', color: '#1c1917', marginBottom: '1rem', fontWeight: '800' }}>
            {lang === 'mr' ? 'फोटो सल्ला फॉर्म' : 'Quick Crop Advisory Request'}
          </h4>

          <div className="form-group mb-3">
            <label className="form-label" style={{ fontSize: '0.85rem' }}>{lang === 'mr' ? 'तुमचे पीक (Crop Name):' : 'Select Crop:'}</label>
            <input
              type="text"
              className="form-input"
              value={cropName}
              onChange={(e) => setCropName(e.target.value)}
              placeholder="उदा. द्राक्षे, डाळिंब, ऊस, टोमॅटो"
            />
          </div>

          <div className="form-group mb-4">
            <label className="form-label" style={{ fontSize: '0.85rem' }}>{lang === 'mr' ? 'पिकाची समस्या किंवा गरज:' : 'Select Problem / Stage:'}</label>
            <select
              className="form-select"
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
            >
              {problemOptions.map((opt, i) => (
                <option key={i} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={handleSendWhatsApp}
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.85rem', fontSize: '0.95rem', background: '#25D366', borderColor: '#22c55e', color: '#ffffff' }}
          >
            <MessageCircle size={18} />
            <span>{lang === 'mr' ? 'WhatsApp वर फोटो पाठवून सल्ला घ्या' : 'Send Photo on WhatsApp for Advice'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CropPestAdvisor;
