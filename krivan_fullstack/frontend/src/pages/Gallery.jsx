import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Image, Eye, Sparkles } from 'lucide-react';

const Gallery = () => {
  const { t } = useLanguage();
  const [selectedImg, setSelectedImg] = useState(null);

  const galleryItems = [
    {
      id: 1,
      title: "Grapes Yield Enhancement with Kaizen-K",
      category: "Field Results",
      src: "/assets/images/results/grapes-yield.jpg",
      desc: "Uniform cluster development, berry elongation, and +2.5 Brix increase in Nashik vineyards."
    },
    {
      id: 2,
      title: "Manufacturing & Packaging Unit",
      category: "Infrastructure",
      src: "/assets/images/banners/banner-field.jpg",
      desc: "Automated blending and bag filling adhering to stringent FCO norms."
    },
    {
      id: 3,
      title: "Pomegranate Fruit Size & Color",
      category: "Field Results",
      src: "/assets/images/results/grapes-yield.jpg",
      desc: "Enhanced aril redness, reduced fruit cracking, and superior market rates in Solapur."
    },
    {
      id: 4,
      title: "Sugarcane Weight Increment",
      category: "Field Results",
      src: "/assets/images/banners/banner-field.jpg",
      desc: "Inter-nodal distance enhancement and higher recovery rate with Kriv Mruda Silicon."
    },
    {
      id: 5,
      title: "Farmer Seminar & Field Days",
      category: "Events",
      src: "/assets/images/banners/banner-field.jpg",
      desc: "Empowering growers with scientific nutrition schedules and drip management practices."
    },
    {
      id: 6,
      title: "Bio-Available Potash Formulations",
      category: "R&D",
      src: "/assets/images/products/kaizen-k.jpg",
      desc: "100% water soluble rhodophyte extracts tested in accredited soil laboratories."
    }
  ];

  return (
    <div className="section" style={{ paddingTop: '3rem' }}>
      <div className="container">
        <div className="text-center mb-5">
          <div className="badge badge-green mb-2">
            <Sparkles size={14} /> Visual Showcase
          </div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>Field Results & Gallery</h1>
          <p style={{ color: '#64748b', maxWidth: '680px', margin: '0 auto' }}>
            Real field performance pictures, crop results, farmer seminars, and our state-of-the-art facility.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="card"
              style={{ cursor: 'pointer', overflow: 'hidden' }}
              onClick={() => setSelectedImg(item)}
            >
              <div style={{ position: 'relative', height: '220px', background: '#e2e8f0', overflow: 'hidden' }}>
                <img
                  src={item.src}
                  alt={item.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1592417817098-8f3d6eb22510?w=600&auto=format&fit=crop&q=60';
                  }}
                />
                <span className="badge badge-green" style={{ position: 'absolute', top: '12px', left: '12px' }}>
                  {item.category}
                </span>
              </div>
              <div style={{ padding: '1.25rem' }}>
                <h3 style={{ fontSize: '1.05rem', marginBottom: '0.35rem' }}>{item.title}</h3>
                <p style={{ fontSize: '0.84rem', color: '#64748b' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Image Modal Lightbox */}
        {selectedImg && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.85)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2000,
              padding: '1.5rem'
            }}
            onClick={() => setSelectedImg(null)}
          >
            <div
              className="card"
              style={{ maxWidth: '650px', width: '100%', padding: '1.5rem', background: 'white' }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImg.src}
                alt={selectedImg.title}
                style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '12px', marginBottom: '1rem' }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1592417817098-8f3d6eb22510?w=600&auto=format&fit=crop&q=60';
                }}
              />
              <h3>{selectedImg.title}</h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.5rem' }}>{selectedImg.desc}</p>
              <button onClick={() => setSelectedImg(null)} className="btn btn-primary mt-3" style={{ fontSize: '0.85rem' }}>
                Close Preview
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
