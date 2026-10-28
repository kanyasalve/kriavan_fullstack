import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  MapPin, 
  Phone, 
  Search, 
  Building2, 
  CheckCircle2, 
  Store, 
  Navigation,
  ExternalLink,
  Award
} from 'lucide-react';

const Dealers = () => {
  const { lang } = useLanguage();
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const dealersList = [
    {
      id: 1,
      name: 'Shree Krushi Seva Kendra',
      owner: 'Ramesh Patil',
      district: 'Nashik',
      taluka: 'Niphad',
      address: 'Shop No. 5, Market Yard, Pimpalgaon Baswant, Nashik - 422209',
      phone: '+91 98220 11223',
      stock: 'Kaizen-K, Thalassa, Kriv Vasundhara, Silicon',
      isAuthorized: true
    },
    {
      id: 2,
      name: 'Balaji Agro Agency',
      owner: 'Vijay Deshmukh',
      district: 'Nashik',
      taluka: 'Dindori',
      address: 'Main Road, Near Bus Stand, Dindori, Nashik - 422202',
      phone: '+91 98230 44556',
      stock: 'Full Krivan Organic Input Range',
      isAuthorized: true
    },
    {
      id: 3,
      name: 'Kisan Agro Traders',
      owner: 'Dattatray Shinde',
      district: 'Pune',
      taluka: 'Baramati',
      address: 'Plot No. 14, APMC Market Yard, Baramati, Pune - 413102',
      phone: '+91 94220 77889',
      stock: 'Kaizen-K, Kriv Mruda Silicon, Natura',
      isAuthorized: true
    },
    {
      id: 4,
      name: 'Samarth Krushi Seva Kendra',
      owner: 'Sanjay More',
      district: 'Pune',
      taluka: 'Junnar',
      address: 'Narayangaon Bypass, Junnar, Pune - 410504',
      phone: '+91 98900 12345',
      stock: 'Full Product Catalog',
      isAuthorized: true
    },
    {
      id: 5,
      name: 'Mauli Fertilizers & Agro',
      owner: 'Santosh Pawar',
      district: 'Solapur',
      taluka: 'Pandharpur',
      address: 'Station Road, Near Railway Gate, Pandharpur, Solapur - 413304',
      phone: '+91 98225 66778',
      stock: 'Kaizen-K, Pomegranate Special Nutrients',
      isAuthorized: true
    },
    {
      id: 6,
      name: 'Shivray Krushi Agency',
      owner: 'Anand Kadam',
      district: 'Sangli',
      taluka: 'Tasgaon',
      address: 'Market Yard, Tasgaon, Sangli - 416312',
      phone: '+91 97630 88990',
      stock: 'Grapes Specialist Doses & Potash',
      isAuthorized: true
    },
    {
      id: 7,
      name: 'Rajlaxmi Agro Supplies',
      owner: 'Suresh Patil',
      district: 'Kolhapur',
      taluka: 'Karveer',
      address: 'Shahupuri 3rd Lane, Kolhapur - 416001',
      phone: '+91 98231 22334',
      stock: 'Sugarcane Special Silicon & Manure',
      isAuthorized: true
    },
    {
      id: 8,
      name: 'Shubham Krushi Kendra',
      owner: 'Ganesh Jagtap',
      district: 'Ahmednagar',
      taluka: 'Rahata',
      address: 'Near Sugar Factory, Shirdi-Rahata Road, Ahmednagar - 423107',
      phone: '+91 99220 55667',
      stock: 'Full Krivan Catalog',
      isAuthorized: true
    }
  ];

  const districts = ['all', 'Nashik', 'Pune', 'Solapur', 'Sangli', 'Kolhapur', 'Ahmednagar'];

  const filteredDealers = dealersList.filter((d) => {
    const matchesDistrict = selectedDistrict === 'all' || d.district === selectedDistrict;
    const q = searchQuery.toLowerCase();
    const matchesSearch = d.name.toLowerCase().includes(q) ||
      d.owner.toLowerCase().includes(q) ||
      d.taluka.toLowerCase().includes(q) ||
      d.district.toLowerCase().includes(q);
    return matchesDistrict && matchesSearch;
  });

  return (
    <div className="section" style={{ paddingTop: '3.5rem' }}>
      <div className="container">
        
        {/* Header */}
        <div className="text-center mb-5">
          <div className="badge badge-green mb-2">
            <Store size={14} /> Certified Distribution Network
          </div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>Find Authorized Dealers & Krushi Seva Kendra</h1>
          <p style={{ color: '#78716c', maxWidth: '680px', margin: '0 auto', fontSize: '1.05rem' }}>
            Locate genuine Krivan certified fertilizer stockists across Maharashtra for immediate on-farm delivery and wholesale rates.
          </p>

          {/* Search Controls */}
          <div style={{ maxWidth: '540px', margin: '2rem auto 0', position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '16px', top: '15px', color: '#94a3b8' }} />
            <input
              type="text"
              className="form-input"
              style={{ paddingLeft: '44px', height: '48px', borderRadius: '24px', boxShadow: '0 4px 12px rgba(41,37,36,0.05)' }}
              placeholder="Search by city, taluka, dealer name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* District Filter Pills */}
        <div className="flex justify-center gap-2 mb-5 flex-wrap">
          {districts.map((dist) => (
            <button
              key={dist}
              onClick={() => setSelectedDistrict(dist)}
              className={`btn ${selectedDistrict === dist ? 'btn-primary' : 'btn-light'}`}
              style={{ padding: '0.45rem 1.15rem', fontSize: '0.85rem' }}
            >
              {dist === 'all' ? 'All Maharashtra Districts' : `${dist} (${dealersList.filter(d => d.district === dist).length})`}
            </button>
          ))}
        </div>

        {/* Dealers Grid */}
        <div className="grid grid-cols-2 gap-4">
          {filteredDealers.map((d) => (
            <div key={d.id} className="card" style={{ padding: '1.75rem', background: '#ffffff', display: 'flex', flexDirection: 'column' }}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="badge badge-green mb-1" style={{ fontSize: '0.72rem' }}>
                    {d.district} • Taluka: {d.taluka}
                  </span>
                  <h3 style={{ fontSize: '1.25rem', color: '#1c1917', marginTop: '2px' }}>{d.name}</h3>
                  <div style={{ fontSize: '0.82rem', color: '#78716c' }}>Proprietor: <strong>{d.owner}</strong></div>
                </div>
                <div style={{ background: '#ecfccb', color: '#365314', padding: '6px 10px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: '800' }}>
                  FCO Authorized
                </div>
              </div>

              <div className="flex gap-2 my-3" style={{ fontSize: '0.88rem', color: '#57534e' }}>
                <MapPin size={18} style={{ color: '#3f6212', flexShrink: 0, marginTop: '2px' }} />
                <span>{d.address}</span>
              </div>

              <div style={{ background: '#faf8f5', padding: '10px 12px', borderRadius: '10px', border: '1px solid #e7e5e4', fontSize: '0.82rem', marginBottom: '1.25rem' }}>
                <span style={{ color: '#78716c' }}>Available Stock:</span> <strong style={{ color: '#1c1917' }}>{d.stock}</strong>
              </div>

              <div className="flex gap-2" style={{ marginTop: 'auto' }}>
                <a
                  href={`tel:${d.phone.replace(/[^0-9+]/g, '')}`}
                  className="btn btn-outline"
                  style={{ flex: 1, padding: '0.55rem 0.85rem', fontSize: '0.85rem' }}
                >
                  <Phone size={15} /> Call Dealer
                </a>
                <a
                  href={`https://wa.me/${d.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Namaskar ${d.name}, I need Krivan fertilizers in ${d.taluka}.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary"
                  style={{ flex: 1, padding: '0.55rem 0.85rem', fontSize: '0.85rem', background: '#16a34a' }}
                >
                  <i className="bi bi-whatsapp"></i> WhatsApp Order
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Apply for Dealership Banner */}
        <div className="card mt-5" style={{ padding: '3rem', background: 'linear-gradient(135deg, #1c1917 0%, #273e0b 100%)', color: '#ffffff', borderRadius: '24px', textAlign: 'center' }}>
          <span className="badge badge-gold mb-3" style={{ background: 'rgba(245, 158, 11, 0.2)', color: '#fef08a' }}>
            <Award size={14} /> Business Expansion
          </span>
          <h2 style={{ color: '#ffffff', fontSize: '2.2rem', marginBottom: '0.75rem' }}>
            Want to Become an Authorized Krivan Distributor?
          </h2>
          <p style={{ color: '#d6d3d1', maxWidth: '640px', margin: '0 auto 1.75rem', fontSize: '1.05rem' }}>
            Join our rapidly expanding network across Maharashtra, Gujarat, Karnataka, and Madhya Pradesh. Enjoy high retail margins, agronomy field support, and fast FCO compliant supply.
          </p>
          <a href="/contact" className="btn btn-secondary" style={{ padding: '0.85rem 2rem' }}>
            <span>Apply for Dealership / Stockist</span>
            <ExternalLink size={16} />
          </a>
        </div>

      </div>
    </div>
  );
};

export default Dealers;
