import React, { useState } from 'react';
import { 
  MessageCircle, 
  Phone, 
  X, 
  Send, 
  Headphones, 
  Sparkles,
  HelpCircle
} from 'lucide-react';

const FloatingWhatsApp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [msg, setMsg] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    const text = encodeURIComponent(msg || 'Namaskar Krivan Agro Team, I need advice regarding crop nutrition & dosage.');
    window.open(`https://wa.me/919876543210?text=${text}`, '_blank');
    setMsg('');
    setIsOpen(false);
  };

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 1500 }}>
      {/* Floating Chat Modal Popup */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          bottom: '70px',
          right: '0',
          width: '320px',
          background: '#ffffff',
          borderRadius: '20px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.22)',
          border: '1px solid #e7e5e4',
          overflow: 'hidden',
          animation: 'fadeIn 0.3s ease'
        }}>
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #3f6212 0%, #273e0b 100%)',
            color: '#ffffff',
            padding: '1.25rem 1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div className="flex items-center gap-2">
              <div style={{ width: '36px', height: '36px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Headphones size={20} style={{ color: '#a3e635' }} />
              </div>
              <div>
                <strong style={{ fontSize: '0.95rem', display: 'block' }}>Krivan Agronomist Help</strong>
                <span style={{ fontSize: '0.75rem', color: '#d9f99d' }}>Online • 9:00 AM - 6:00 PM</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer', padding: '4px' }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div style={{ padding: '1rem', background: '#faf8f5' }}>
            <div style={{
              background: '#ffffff',
              padding: '10px 12px',
              borderRadius: '12px',
              fontSize: '0.85rem',
              color: '#44403c',
              border: '1px solid #e7e5e4',
              marginBottom: '1rem'
            }}>
              🌿 <strong>नमस्कार!</strong> पिकाची योग्य खते, फवारणी डोस किंवा जवळचा डीलर शोधण्यासाठी व्हॉट्सॲपवर मेसेज करा.
            </div>

            <form onSubmit={handleSend}>
              <textarea
                rows={2}
                className="form-textarea"
                style={{ fontSize: '0.85rem', marginBottom: '8px', borderRadius: '10px' }}
                placeholder="उदा. द्राक्ष बागेसाठी कायझेन-के डोस किती घ्यावा?"
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
              />
              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', padding: '0.65rem', fontSize: '0.88rem', background: '#16a34a' }}
              >
                <i className="bi bi-whatsapp"></i>
                <span>Chat on WhatsApp</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Main Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
          color: '#ffffff',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(22, 163, 74, 0.45)',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        className="animate-float"
        title="WhatsApp Consultation"
      >
        <MessageCircle size={30} />
      </button>
    </div>
  );
};

export default FloatingWhatsApp;
