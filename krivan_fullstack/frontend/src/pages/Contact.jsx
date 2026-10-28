import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    address: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await api.submitEnquiry(formData);
      if (res.success) {
        setSuccess(true);
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
      setSubmitting(false);
    }
  };

  return (
    <div className="section" style={{ paddingTop: '3rem' }}>
      <div className="container">
        <div className="text-center mb-5">
          <div className="badge badge-green mb-2">
            <MessageSquare size={14} /> Direct Assistance
          </div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{t('contact')}</h1>
          <p style={{ color: '#64748b', maxWidth: '680px', margin: '0 auto' }}>
            We're here to answer questions about product applications, bulk dealership inquiries, or crop recommendations.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 items-start">
          {/* Contact Details Card */}
          <div>
            <div className="card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1.25rem', color: '#0f172a' }}>Corporate Office</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div className="flex gap-3">
                  <div style={{ width: '40px', height: '40px', background: '#dcfce7', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#15803d', flexShrink: 0 }}>
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: '700', color: '#0f172a' }}>Office Address</div>
                    <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Plot No. 12, Agri-Tech Park, Pune - 411001, Maharashtra, India.</div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div style={{ width: '40px', height: '40px', background: '#fef9c3', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#854d0e', flexShrink: 0 }}>
                    <Phone size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: '700', color: '#0f172a' }}>Helpline & Support</div>
                    <div style={{ fontSize: '0.9rem', color: '#64748b' }}>+91 98765 43210 / +91 80000 12345</div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div style={{ width: '40px', height: '40px', background: '#e0f2fe', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0284c7', flexShrink: 0 }}>
                    <Mail size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: '700', color: '#0f172a' }}>Email Address</div>
                    <div style={{ fontSize: '0.9rem', color: '#64748b' }}>info@krivanindustries.com</div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div style={{ width: '40px', height: '40px', background: '#f1f5f9', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569', flexShrink: 0 }}>
                    <Clock size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: '700', color: '#0f172a' }}>Working Hours</div>
                    <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Monday to Saturday: 9:00 AM - 6:00 PM</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Factory Plant Info */}
            <div className="card" style={{ padding: '1.5rem', background: '#f8fafc' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#0f172a' }}>Manufacturing Plant</h3>
              <p style={{ fontSize: '0.88rem', color: '#64748b' }}>
                MIDC Industrial Area, Chakan, Pune, Maharashtra - 410501
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="card" style={{ padding: '2.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Send Us a Message</h2>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Leave your contact details and our team will get back to you within 24 hours.
            </p>

            {success ? (
              <div style={{ background: '#dcfce7', border: '1px solid #86efac', padding: '2rem', borderRadius: '14px', textAlign: 'center' }}>
                <CheckCircle2 size={48} style={{ color: '#15803d', margin: '0 auto 1rem' }} />
                <h3 style={{ color: '#14532d', marginBottom: '0.5rem' }}>Message Sent!</h3>
                <p style={{ color: '#166534', fontSize: '0.95rem' }}>{t('enquirySuccess')}</p>
                <button onClick={() => setSuccess(false)} className="btn btn-outline mt-3">
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">{t('fullName')} *</label>
                  <input
                    type="text"
                    name="full_name"
                    required
                    className="form-input"
                    placeholder="Enter your full name"
                    value={formData.full_name}
                    onChange={handleChange}
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
                      onChange={handleChange}
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
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">{t('address')}</label>
                  <input
                    type="text"
                    name="address"
                    className="form-input"
                    placeholder="Village, Taluka, District"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">{t('message')}</label>
                  <textarea
                    name="message"
                    rows={4}
                    className="form-textarea"
                    placeholder="How can we assist your farm?"
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '0.85rem' }}
                >
                  {submitting ? t('submitting') : (
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
      </div>
    </div>
  );
};

export default Contact;
