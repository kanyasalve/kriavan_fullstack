import React from 'react';

const Logo = ({ size = 'normal', variant = 'dark', showText = true }) => {
  const isLarge = size === 'large';
  const isSmall = size === 'small';
  const iconSize = isLarge ? 52 : (isSmall ? 34 : 44);
  const titleSize = isLarge ? '1.75rem' : (isSmall ? '1.15rem' : '1.45rem');
  const subSize = isLarge ? '0.85rem' : (isSmall ? '0.65rem' : '0.74rem');

  const isLight = variant === 'light';

  return (
    <div className="flex items-center gap-3" style={{ textDecoration: 'none', userSelect: 'none' }}>
      {/* 🌿 Warm Earthy Organic Emblem: Golden Ochre Sun + Olive Leaf */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0, filter: 'drop-shadow(0 4px 10px rgba(63,98,18,0.22))' }}
      >
        {/* Golden Sun Rays */}
        <path d="M50 8L50 18" stroke="#d97706" strokeWidth="4" strokeLinecap="round" />
        <path d="M26 18L33 25" stroke="#d97706" strokeWidth="4" strokeLinecap="round" />
        <path d="M12 40L22 42" stroke="#d97706" strokeWidth="4" strokeLinecap="round" />
        <path d="M74 18L67 25" stroke="#d97706" strokeWidth="4" strokeLinecap="round" />
        <path d="M88 40L78 42" stroke="#d97706" strokeWidth="4" strokeLinecap="round" />

        {/* Golden Ochre Seed Base */}
        <circle cx="50" cy="50" r="32" fill="url(#earthGoldGradient)" />

        {/* Inner Soil/Amber Shadow */}
        <ellipse cx="50" cy="56" rx="20" ry="24" fill="#92400e" opacity="0.35" />

        {/* Organic Olive Leaf Overlay */}
        <path
          d="M24 70C24 40 46 22 76 22C76 52 54 84 24 70Z"
          fill="url(#oliveLeafGradient)"
        />

        {/* Leaf Vein */}
        <path
          d="M24 70C38 60 55 45 76 22"
          stroke="rgba(255,255,255,0.75)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Sprout Accent Leaf */}
        <path
          d="M32 78C32 55 48 42 70 42C70 65 52 88 32 78Z"
          fill="#65a30d"
          opacity="0.9"
        />

        {/* Gradients */}
        <defs>
          <linearGradient id="earthGoldGradient" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f59e0b" />
            <stop offset="1" stopColor="#b45309" />
          </linearGradient>
          <linearGradient id="oliveLeafGradient" x1="24" y1="22" x2="76" y2="70" gradientUnits="userSpaceOnUse">
            <stop stopColor="#65a30d" />
            <stop offset="1" stopColor="#365314" />
          </linearGradient>
        </defs>
      </svg>

      {/* Typography */}
      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{
            fontWeight: '900',
            fontSize: titleSize,
            color: isLight ? '#fafaf9' : '#1c1917',
            lineHeight: 1.05,
            letterSpacing: '0.04em',
            fontFamily: "'Plus Jakarta Sans', sans-serif"
          }}>
            KRIVAN
          </div>
          <div style={{
            fontSize: subSize,
            fontWeight: '800',
            color: isLight ? '#a3e635' : '#3f6212',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}>
            <span>Industries</span>
            <span style={{
              display: 'inline-block',
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              background: '#b45309'
            }}></span>
            <span style={{ color: isLight ? '#fef08a' : '#b45309' }}>Pvt. Ltd.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Logo;
