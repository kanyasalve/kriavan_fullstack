import React, { useState } from 'react';
import { 
  TrendingUp, 
  BarChart3, 
  PieChart, 
  Calendar, 
  AlertTriangle, 
  CheckCircle2, 
  Share2, 
  Printer, 
  FileSpreadsheet, 
  Sparkles, 
  Warehouse, 
  Boxes, 
  DollarSign, 
  Layers,
  ArrowUpRight,
  ShieldAlert,
  ChevronDown
} from 'lucide-react';

const monthlySalesData = [
  { month: 'Jan', kaizenK: 450, prom: 380, thalassa: 220, silicon: 140, totalVal: '₹14.8 L' },
  { month: 'Feb', kaizenK: 520, prom: 410, thalassa: 260, silicon: 180, totalVal: '₹17.2 L' },
  { month: 'Mar', kaizenK: 680, prom: 490, thalassa: 340, silicon: 220, totalVal: '₹22.5 L' },
  { month: 'Apr', kaizenK: 890, prom: 620, thalassa: 450, silicon: 310, totalVal: '₹29.8 L' },
  { month: 'May', kaizenK: 940, prom: 710, thalassa: 510, silicon: 360, totalVal: '₹32.4 L' },
  { month: 'Jun', kaizenK: 1250, prom: 980, thalassa: 680, silicon: 490, totalVal: '₹43.6 L' }, // Kharif peak
  { month: 'Jul', kaizenK: 1420, prom: 1100, thalassa: 760, silicon: 540, totalVal: '₹49.2 L' },
  { month: 'Aug', kaizenK: 1180, prom: 920, thalassa: 620, silicon: 430, totalVal: '₹39.8 L' },
  { month: 'Sep', kaizenK: 980, prom: 790, thalassa: 530, silicon: 380, totalVal: '₹33.5 L' },
  { month: 'Oct', kaizenK: 1310, prom: 1040, thalassa: 720, silicon: 510, totalVal: '₹45.1 L' }, // Rabi sowing peak
  { month: 'Nov', kaizenK: 1150, prom: 890, thalassa: 640, silicon: 420, totalVal: '₹38.9 L' },
  { month: 'Dec', kaizenK: 820, prom: 640, thalassa: 410, silicon: 290, totalVal: '₹27.3 L' },
];

const cropProfitability = [
  { crop: 'Grapes (द्राक्ष)', icon: '🍇', avgProfitBoost: '₹24,500 / Acre', yieldDelta: '+32% Export Grade', topFertilizer: 'Kaizen-K + Thalassa Booster', sugarBrix: '+3.5° Brix' },
  { crop: 'Pomegranate (डाळिंब)', icon: '🍎', avgProfitBoost: '₹28,200 / Acre', yieldDelta: '+29% Shiny Red Rind', topFertilizer: 'Kaizen-K + Liquid Silicon', sugarBrix: 'Zero Cracking' },
  { crop: 'Sugarcane (ऊस)', icon: '🎋', avgProfitBoost: '₹19,400 / Acre', yieldDelta: '+18 Tons / Acre', topFertilizer: 'PROM Phosphate + Potash', sugarBrix: '+1.8 Recovery' },
  { crop: 'Onion (कांदा)', icon: '🧅', avgProfitBoost: '₹14,800 / Acre', yieldDelta: '+24% Solid Bulbs', topFertilizer: 'PROM + Soil Conditioner', sugarBrix: 'Extended Storage' },
  { crop: 'Cotton (कापूस)', icon: '🌾', avgProfitBoost: '₹11,600 / Acre', yieldDelta: '+4.5 Quintal / Acre', topFertilizer: 'Kaizen-K (Boll Developer)', sugarBrix: 'Heavy Bolls' },
  { crop: 'Vegetables (भाजीपाला)', icon: '🥦', avgProfitBoost: '₹16,200 / Acre', yieldDelta: '+27% Early Harvest', topFertilizer: 'Bio-NPK Consortium', sugarBrix: 'Lush Green Canopy' }
];

const batchExpiryData = [
  { batchNo: 'KRIV-2025-K08', product: 'Kaizen-K 48gm', mfgDate: '2025-02-15', expDate: '2026-11-15', daysLeft: 45, stock: 64, warehouse: 'MIDC Chakan, Pune', status: 'critical' },
  { batchNo: 'KRIV-2025-P12', product: 'PROM Bio-Phosphate 50kg', mfgDate: '2025-04-10', expDate: '2026-12-30', daysLeft: 90, stock: 120, warehouse: 'Nashik Agro Hub', status: 'warning' },
  { batchNo: 'KRIV-2026-T02', product: 'Thalassa Fruit Booster 1L', mfgDate: '2026-01-20', expDate: '2027-07-20', daysLeft: 290, stock: 450, warehouse: 'MIDC Chakan, Pune', status: 'good' },
  { batchNo: 'KRIV-2026-S05', product: 'Liquid Active Silicon 500ml', mfgDate: '2026-02-10', expDate: '2027-08-10', daysLeft: 310, stock: 380, warehouse: 'Kolhapur Warehouse', status: 'good' },
];

const districtSalesShare = [
  { district: 'Nashik (नाशिक)', share: '34%', amount: '₹1.34 Cr', highlight: 'Highest Grape & Onion demand' },
  { district: 'Pune (पुणे)', share: '22%', amount: '₹86.5 Lakh', highlight: 'Sugarcane & Floriculture' },
  { district: 'Solapur (सोलापूर)', share: '18%', amount: '₹71.2 Lakh', highlight: 'Pomegranate & Grapes' },
  { district: 'Kolhapur & Sangli', share: '14%', amount: '₹55.1 Lakh', highlight: 'Heavy Sugarcane Basal Dose' },
  { district: 'Surat & Belagavi', share: '12%', amount: '₹47.3 Lakh', highlight: 'Emerging Inter-State Hubs' }
];

export default function AdminAnalytics({ inventory = [] }) {
  const [selectedProductView, setSelectedProductView] = useState('all');
  const [activeTabSub, setActiveTabSub] = useState('sales_trends'); // 'sales_trends', 'crop_profit', 'batch_expiry', 'district_heat'

  // Low Stock Items (< 100 units)
  const lowStockItems = inventory.filter(i => Number(i.current_stock) <= Number(i.min_threshold || 100));

  const handleSendStockAlert = (item) => {
    const text = `🚨 *KRIVAN AGRO INVENTORY ALERT* 🚨\n\n` +
      `📦 *Product:* ${item.product_name || item.product}\n` +
      `🏷️ *Batch No:* ${item.batch_no || item.batchNo || 'N/A'}\n` +
      `⚠️ *Current Stock:* ${item.current_stock || item.stock} units\n` +
      `🔴 *Safety Threshold:* ${item.min_threshold || 100} units\n` +
      `🏭 *Warehouse:* ${item.warehouse || 'Central Facility'}\n\n` +
      `⚡ *Action Required:* Stock is running critically low. Please initiate production dispatch immediately.`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleSendExpiryAlert = (batch) => {
    const text = `⚠️ *KRIVAN BATCH EXPIRY WARNING* ⚠️\n\n` +
      `📦 *Product:* ${batch.product}\n` +
      `🏷️ *Batch Code:* ${batch.batchNo}\n` +
      `⏳ *Days Left:* ${batch.daysLeft} Days (Exp: ${batch.expDate})\n` +
      `📦 *Remaining Units:* ${batch.stock} units\n` +
      `📍 *Location:* ${batch.warehouse}\n\n` +
      `⚡ *Action Required:* Prioritize dealer FIFO dispatch or apply promotional bundle before batch maturity.`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* 🚀 TOP BANNER: CRITICAL INVENTORY & EXPIRY ALERTS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
        
        {/* Low Stock Warning Card */}
        <div style={{
          background: 'linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%)',
          border: '1px solid #fecdd3',
          borderRadius: '16px',
          padding: '1.25rem 1.5rem',
          boxShadow: '0 4px 15px rgba(225, 29, 72, 0.08)'
        }}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-rose-700 font-bold">
              <ShieldAlert size={20} />
              <span>Low Stock Warning ({lowStockItems.length > 0 ? lowStockItems.length : 2} Items)</span>
            </div>
            <span style={{ background: '#e11d48', color: 'white', fontSize: '0.72rem', padding: '2px 8px', borderRadius: '12px', fontWeight: '800' }}>
              REORDER NEEDED
            </span>
          </div>
          <p style={{ fontSize: '0.82rem', color: '#881337', marginBottom: '0.75rem' }}>
            The following formulations are below minimum buffer threshold. Trigger factory re-stock order.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.8)', padding: '6px 10px', borderRadius: '8px', fontSize: '0.82rem' }}>
              <div>
                <strong>Kaizen-K 48gm</strong>
                <span style={{ color: '#be123c', marginLeft: '6px', fontWeight: 'bold' }}>• 64 packs left (Min 100)</span>
              </div>
              <button 
                onClick={() => handleSendStockAlert({ product_name: 'Kaizen-K 48gm', batch_no: 'KRIV-2025-K08', current_stock: 64, min_threshold: 100, warehouse: 'MIDC Chakan Plant' })}
                style={{ background: '#25d366', color: 'white', border: 'none', borderRadius: '6px', padding: '3px 8px', fontSize: '0.72rem', fontWeight: 'bold', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
              >
                📲 Alert
              </button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.8)', padding: '6px 10px', borderRadius: '8px', fontSize: '0.82rem' }}>
              <div>
                <strong>PROM Bio-Phosphate 50kg</strong>
                <span style={{ color: '#be123c', marginLeft: '6px', fontWeight: 'bold' }}>• 35 bags left (Min 50)</span>
              </div>
              <button 
                onClick={() => handleSendStockAlert({ product_name: 'PROM Bio-Phosphate 50kg', batch_no: 'KRIV-2025-P12', current_stock: 35, min_threshold: 50, warehouse: 'Nashik Agro Hub' })}
                style={{ background: '#25d366', color: 'white', border: 'none', borderRadius: '6px', padding: '3px 8px', fontSize: '0.72rem', fontWeight: 'bold', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
              >
                📲 Alert
              </button>
            </div>
          </div>
        </div>

        {/* Batch Expiry Alert Card */}
        <div style={{
          background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
          border: '1px solid #fde68a',
          borderRadius: '16px',
          padding: '1.25rem 1.5rem',
          boxShadow: '0 4px 15px rgba(217, 119, 6, 0.08)'
        }}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-amber-800 font-bold">
              <AlertTriangle size={20} />
              <span>Batch Expiry Tracker (90-Day Horizon)</span>
            </div>
            <span style={{ background: '#d97706', color: 'white', fontSize: '0.72rem', padding: '2px 8px', borderRadius: '12px', fontWeight: '800' }}>
              FIFO DISPATCH
            </span>
          </div>
          <p style={{ fontSize: '0.82rem', color: '#78350f', marginBottom: '0.75rem' }}>
            2 batches are approaching maturity within next quarter. Apply dealer incentives to clear.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {batchExpiryData.slice(0, 2).map((batch) => (
              <div key={batch.batchNo} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.85)', padding: '6px 10px', borderRadius: '8px', fontSize: '0.82rem' }}>
                <div>
                  <strong>{batch.batchNo}</strong> ({batch.product})
                  <span style={{ color: '#b45309', marginLeft: '6px', fontWeight: 'bold' }}>• {batch.daysLeft} Days left</span>
                </div>
                <button 
                  onClick={() => handleSendExpiryAlert(batch)}
                  style={{ background: '#25d366', color: 'white', border: 'none', borderRadius: '6px', padding: '3px 8px', fontSize: '0.72rem', fontWeight: 'bold', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                >
                  📲 FIFO Alert
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 📊 ANALYTICS SUB-NAVIGATION TABS */}
      <div style={{ background: 'white', padding: '0.75rem 1rem', borderRadius: '14px', display: 'flex', gap: '8px', flexWrap: 'wrap', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
        <button
          onClick={() => setActiveTabSub('sales_trends')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '0.55rem 1.1rem',
            borderRadius: '10px',
            border: 'none',
            fontSize: '0.85rem',
            fontWeight: '700',
            cursor: 'pointer',
            background: activeTabSub === 'sales_trends' ? '#0f766e' : '#f8fafc',
            color: activeTabSub === 'sales_trends' ? 'white' : '#475569',
            transition: 'all 0.2s ease'
          }}
        >
          <BarChart3 size={16} />
          <span>Monthly Fertilizer Trends</span>
        </button>

        <button
          onClick={() => setActiveTabSub('crop_profit')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '0.55rem 1.1rem',
            borderRadius: '10px',
            border: 'none',
            fontSize: '0.85rem',
            fontWeight: '700',
            cursor: 'pointer',
            background: activeTabSub === 'crop_profit' ? '#0f766e' : '#f8fafc',
            color: activeTabSub === 'crop_profit' ? 'white' : '#475569',
            transition: 'all 0.2s ease'
          }}
        >
          <TrendingUp size={16} />
          <span>High-Profit Crop Matrix</span>
        </button>

        <button
          onClick={() => setActiveTabSub('district_heat')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '0.55rem 1.1rem',
            borderRadius: '10px',
            border: 'none',
            fontSize: '0.85rem',
            fontWeight: '700',
            cursor: 'pointer',
            background: activeTabSub === 'district_heat' ? '#0f766e' : '#f8fafc',
            color: activeTabSub === 'district_heat' ? 'white' : '#475569',
            transition: 'all 0.2s ease'
          }}
        >
          <Layers size={16} />
          <span>Regional Market Heatmap</span>
        </button>

        <button
          onClick={() => setActiveTabSub('batch_expiry')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '0.55rem 1.1rem',
            borderRadius: '10px',
            border: 'none',
            fontSize: '0.85rem',
            fontWeight: '700',
            cursor: 'pointer',
            background: activeTabSub === 'batch_expiry' ? '#0f766e' : '#f8fafc',
            color: activeTabSub === 'batch_expiry' ? 'white' : '#475569',
            transition: 'all 0.2s ease'
          }}
        >
          <Calendar size={16} />
          <span>Batch Expiry & Warehouse</span>
        </button>
      </div>

      {/* 📈 TAB 1: MONTHLY FERTILIZER SALES CHART */}
      {activeTabSub === 'sales_trends' && (
        <div style={{ background: 'white', borderRadius: '18px', padding: '1.75rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
          <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
            <div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#0f172a' }}>
                Fertilizer Sales Performance (Jan – Dec 2026)
              </h2>
              <p style={{ color: '#64748b', fontSize: '0.85rem' }}>
                Interactive volume breakdown showing seasonal surges during Kharif (Jun-Jul) and Rabi (Oct-Nov) sowing cycles.
              </p>
            </div>

            {/* Filter by Fertilizer */}
            <div className="flex gap-2">
              {['all', 'kaizenK', 'prom', 'thalassa', 'silicon'].map((key) => {
                const labels = { all: 'All Formulations', kaizenK: 'Kaizen-K Potash', prom: 'PROM Phosphate', thalassa: 'Thalassa Booster', silicon: 'Silicon' };
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedProductView(key)}
                    style={{
                      padding: '5px 12px',
                      borderRadius: '8px',
                      fontSize: '0.78rem',
                      fontWeight: '700',
                      border: '1px solid #cbd5e1',
                      background: selectedProductView === key ? '#15803d' : '#f8fafc',
                      color: selectedProductView === key ? 'white' : '#475569',
                      cursor: 'pointer'
                    }}
                  >
                    {labels[key]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Graphical Bar Chart Visualization */}
          <div style={{ padding: '1.5rem 0.5rem 0.5rem', background: '#f8fafc', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '10px', alignItems: 'flex-end', height: '260px', padding: '0 10px 10px' }}>
              {monthlySalesData.map((d) => {
                let val = d.kaizenK + d.prom + d.thalassa + d.silicon;
                if (selectedProductView === 'kaizenK') val = d.kaizenK * 2.2;
                if (selectedProductView === 'prom') val = d.prom * 2.6;
                if (selectedProductView === 'thalassa') val = d.thalassa * 3.8;
                if (selectedProductView === 'silicon') val = d.silicon * 5;

                const heightPercent = Math.min(100, Math.max(15, (val / 3800) * 100));

                return (
                  <div key={d.month} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                    <div style={{ fontSize: '0.68rem', fontWeight: '800', color: '#15803d', marginBottom: '4px' }}>
                      {d.totalVal}
                    </div>
                    <div 
                      title={`${d.month}: ${d.totalVal} gross turnover`}
                      style={{
                        width: '100%',
                        maxWidth: '44px',
                        height: `${heightPercent}%`,
                        background: selectedProductView === 'kaizenK' 
                          ? 'linear-gradient(180deg, #10b981 0%, #047857 100%)'
                          : selectedProductView === 'prom'
                          ? 'linear-gradient(180deg, #3b82f6 0%, #1d4ed8 100%)'
                          : selectedProductView === 'thalassa'
                          ? 'linear-gradient(180deg, #f59e0b 0%, #d97706 100%)'
                          : 'linear-gradient(180deg, #15803d 0%, #064e3b 100%)',
                        borderRadius: '8px 8px 3px 3px',
                        boxShadow: '0 4px 10px rgba(16, 185, 129, 0.25)',
                        transition: 'height 0.4s ease',
                        cursor: 'pointer'
                      }}
                    />
                    <div style={{ fontSize: '0.78rem', fontWeight: '700', color: '#475569', marginTop: '8px' }}>
                      {d.month}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Revenue Breakdown Legend */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '12px' }}>
              <div style={{ fontSize: '0.75rem', color: '#166534', fontWeight: 'bold' }}>🌿 KAIZEN-K (BIO-POTASH)</div>
              <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#15803d' }}>42% Share</div>
              <div style={{ fontSize: '0.72rem', color: '#16a34a' }}>Top grossing across grape & pomegranate belts</div>
            </div>

            <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '12px' }}>
              <div style={{ fontSize: '0.75rem', color: '#1e40af', fontWeight: 'bold' }}>🌾 PROM (BIO-PHOSPHATE)</div>
              <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#1d4ed8' }}>28% Share</div>
              <div style={{ fontSize: '0.72rem', color: '#2563eb' }}>High basal soil application volume</div>
            </div>

            <div style={{ background: '#fefce8', border: '1px solid #fef08a', borderRadius: '12px', padding: '12px' }}>
              <div style={{ fontSize: '0.75rem', color: '#854d0e', fontWeight: 'bold' }}>🍇 THALASSA (FRUIT BOOSTER)</div>
              <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#ca8a04' }}>18% Share</div>
              <div style={{ fontSize: '0.72rem', color: '#a16207' }}>Peak berry sizing & veraison stage demand</div>
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '12px' }}>
              <div style={{ fontSize: '0.75rem', color: '#475569', fontWeight: 'bold' }}>💧 LIQUID SILICON & NPK</div>
              <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#334155' }}>12% Share</div>
              <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Foliar spray & biotic stress defence</div>
            </div>
          </div>
        </div>
      )}

      {/* 🌾 TAB 2: CROP PROFITABILITY & FARMER ROI */}
      {activeTabSub === 'crop_profit' && (
        <div style={{ background: 'white', borderRadius: '18px', padding: '1.75rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
          <div className="mb-5">
            <h2 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#0f172a' }}>
              Crop Economics & Farmer Profit Acceleration (नफा देणारे प्रमुख पीक)
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.85rem' }}>
              Real-world trial analytics showcasing farmer net revenue gain per acre upon adopting Krivan bio-organic schedules.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
            {cropProfitability.map((crop) => (
              <div 
                key={crop.crop}
                style={{
                  border: '1px solid #e2e8f0',
                  borderRadius: '14px',
                  padding: '1.25rem',
                  background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span style={{ fontSize: '1.6rem' }}>{crop.icon}</span>
                    <strong style={{ fontSize: '1.05rem', color: '#0f172a' }}>{crop.crop}</strong>
                  </div>
                  <span style={{ background: '#dcfce7', color: '#15803d', fontWeight: '800', fontSize: '0.85rem', padding: '4px 10px', borderRadius: '8px' }}>
                    {crop.avgProfitBoost}
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.84rem' }}>
                  <div className="flex justify-between" style={{ borderBottom: '1px dashed #e2e8f0', paddingBottom: '4px' }}>
                    <span style={{ color: '#64748b' }}>Yield Boost Factor:</span>
                    <strong style={{ color: '#16a34a' }}>{crop.yieldDelta}</strong>
                  </div>
                  <div className="flex justify-between" style={{ borderBottom: '1px dashed #e2e8f0', paddingBottom: '4px' }}>
                    <span style={{ color: '#64748b' }}>Quality Metric:</span>
                    <strong style={{ color: '#0f172a' }}>{crop.sugarBrix}</strong>
                  </div>
                  <div className="flex justify-between" style={{ paddingTop: '2px' }}>
                    <span style={{ color: '#64748b' }}>Recommended Dose:</span>
                    <strong style={{ color: '#0284c7' }}>{crop.topFertilizer}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 🗺️ TAB 3: REGIONAL MARKET HEATMAP */}
      {activeTabSub === 'district_heat' && (
        <div style={{ background: 'white', borderRadius: '18px', padding: '1.75rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
          <div className="mb-5">
            <h2 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#0f172a' }}>
              Regional Market Penetration (महाराष्ट्र, गुजरात व कर्नाटक)
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.85rem' }}>
              Distribution hub metrics, dealer networks, and primary crop demands by geographical cluster.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {districtSalesShare.map((d) => (
              <div 
                key={d.district}
                style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '1rem 1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}
              >
                <div style={{ minWidth: '200px' }}>
                  <strong style={{ fontSize: '0.98rem', color: '#0f172a' }}>{d.district}</strong>
                  <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '2px' }}>{d.highlight}</div>
                </div>

                <div style={{ flexGrow: 1, maxWidth: '300px', margin: '0 1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '4px', fontWeight: 'bold' }}>
                    <span>Market Share</span>
                    <span style={{ color: '#15803d' }}>{d.share}</span>
                  </div>
                  <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: d.share, height: '100%', background: 'linear-gradient(90deg, #22c55e, #15803d)', borderRadius: '4px' }}></div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a' }}>{d.amount}</div>
                  <div style={{ fontSize: '0.72rem', color: '#16a34a', fontWeight: 'bold' }}>FY 2026 Volume</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 📦 TAB 4: BATCH EXPIRY & WAREHOUSE INVENTORY */}
      {activeTabSub === 'batch_expiry' && (
        <div style={{ background: 'white', borderRadius: '18px', padding: '1.75rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
          <div className="flex justify-between items-center mb-5 flex-wrap gap-3">
            <div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#0f172a' }}>
                Batch Expiry & Warehouse FIFO Control (स्टॉक व बॅच एक्सपायरी)
              </h2>
              <p style={{ color: '#64748b', fontSize: '0.85rem' }}>
                Monitor shelf-life across all plants to ensure 100% active bio-viability and zero expired stock loss.
              </p>
            </div>

            <button
              onClick={() => window.print()}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                background: '#f1f5f9',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                fontSize: '0.82rem',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              <Printer size={15} />
              <span>Print FIFO Sheet</span>
            </button>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.86rem' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                  <th style={{ padding: '12px 10px' }}>Batch Code & Product</th>
                  <th style={{ padding: '12px 10px' }}>Warehouse Location</th>
                  <th style={{ padding: '12px 10px' }}>Mfg / Expiry Date</th>
                  <th style={{ padding: '12px 10px' }}>Days Left</th>
                  <th style={{ padding: '12px 10px' }}>Units in Stock</th>
                  <th style={{ padding: '12px 10px', textAlign: 'right' }}>WhatsApp Action</th>
                </tr>
              </thead>
              <tbody>
                {batchExpiryData.map((batch) => (
                  <tr key={batch.batchNo} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px 10px' }}>
                      <strong style={{ color: '#0f172a' }}>{batch.batchNo}</strong>
                      <div style={{ fontSize: '0.76rem', color: '#64748b' }}>{batch.product}</div>
                    </td>
                    <td style={{ padding: '12px 10px', color: '#475569' }}>
                      {batch.warehouse}
                    </td>
                    <td style={{ padding: '12px 10px', fontSize: '0.8rem' }}>
                      <div>Mfg: {batch.mfgDate}</div>
                      <div style={{ color: '#be123c', fontWeight: 'bold' }}>Exp: {batch.expDate}</div>
                    </td>
                    <td style={{ padding: '12px 10px' }}>
                      {batch.daysLeft <= 60 ? (
                        <span style={{ background: '#fee2e2', color: '#b91c1c', padding: '3px 8px', borderRadius: '6px', fontWeight: '800', fontSize: '0.75rem' }}>
                          🔴 {batch.daysLeft} Days (Urgent)
                        </span>
                      ) : batch.daysLeft <= 120 ? (
                        <span style={{ background: '#fef3c7', color: '#b45309', padding: '3px 8px', borderRadius: '6px', fontWeight: '800', fontSize: '0.75rem' }}>
                          🟡 {batch.daysLeft} Days (Warning)
                        </span>
                      ) : (
                        <span style={{ background: '#dcfce7', color: '#15803d', padding: '3px 8px', borderRadius: '6px', fontWeight: '800', fontSize: '0.75rem' }}>
                          🟢 {batch.daysLeft} Days (Fresh)
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '12px 10px', fontWeight: 'bold' }}>
                      {batch.stock} units
                    </td>
                    <td style={{ padding: '12px 10px', textAlign: 'right' }}>
                      <button
                        onClick={() => handleSendExpiryAlert(batch)}
                        style={{
                          background: '#25d366',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '5px 12px',
                          fontSize: '0.78rem',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        📲 Dispatch Alert
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
