import React from 'react';

interface PatternProps {
  className?: string;
  color?: string;
  size?: number | string;
}

/**
 * 1. LOTUS LINE ART (Pure Blooming Sacred Blossom)
 * The exact blossom from thumbnail 1 "Lotus Line Art" in the reference sheet.
 * Symmetrical 7-petal sacred blooming padma with delicate midribs and base sepals.
 */
export const LotusLineArt: React.FC<PatternProps> = ({
  className = '',
  color = '#705B4C',
  size = 280,
}) => (
  <svg
    viewBox="0 0 360 240"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={typeof size === 'number' ? size * (240 / 360) : size}
    className={`pointer-events-none select-none ${className}`}
    aria-hidden="true"
  >
    <g stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Central Majestic Petal (Tall Almond) */}
      <path d="M 180 25 C 154 75, 152 160, 180 205 C 208 160, 206 75, 180 25 Z" />
      <path d="M 180 35 L 180 198" strokeWidth="1.0" opacity="0.75" />

      {/* Tier 1 Flanking Petals (Left & Right) */}
      <path d="M 180 205 C 138 190, 110 125, 128 55 C 142 90, 160 150, 180 205" />
      <path d="M 128 55 C 142 100, 158 155, 176 200" strokeWidth="0.9" opacity="0.65" />

      <path d="M 180 205 C 222 190, 250 125, 232 55 C 218 90, 200 150, 180 205" />
      <path d="M 232 55 C 218 100, 202 155, 184 200" strokeWidth="0.9" opacity="0.65" />

      {/* Tier 2 Mid Spreading Petals (Left & Right) */}
      <path d="M 180 205 C 112 205, 62 165, 78 102 C 102 130, 138 172, 180 205" />
      <path d="M 78 102 C 104 138, 134 174, 172 202" strokeWidth="0.9" opacity="0.65" />

      <path d="M 180 205 C 248 205, 298 165, 282 102 C 258 130, 222 172, 180 205" />
      <path d="M 282 102 C 256 138, 226 174, 188 202" strokeWidth="0.9" opacity="0.65" />

      {/* Tier 3 Outer Horizontal Wing Petals (Wide Bloom) */}
      <path d="M 180 205 C 110 216, 42 195, 36 155 C 62 144, 118 168, 180 205" />
      <path d="M 36 155 C 72 166, 120 188, 168 202" strokeWidth="0.9" opacity="0.65" />

      <path d="M 180 205 C 250 216, 318 195, 324 155 C 298 144, 242 168, 180 205" />
      <path d="M 324 155 C 288 166, 240 188, 192 202" strokeWidth="0.9" opacity="0.65" />

      {/* Lower Base Calyx Petals (Cupping bottom) */}
      <path d="M 180 205 C 145 220, 106 215, 88 200 C 115 196, 150 198, 180 205" />
      <path d="M 180 205 C 215 220, 254 215, 272 200 C 245 196, 210 198, 180 205" />

      {/* Base Node & Pedicel Accent */}
      <path d="M 172 205 C 172 214, 188 214, 188 205" />
      <circle cx="180" cy="207" r="2.5" fill={color} fillOpacity="0.5" stroke="none" />
    </g>
  </svg>
);

export const LotusFlowerMotif = LotusLineArt;

/**
 * 2. MANDALA GEOMETRY / SACRED GEOMETRY
 * Eight-fold symmetric concentric Vedic lotus mandala with fine radiant lines.
 */
export const MandalaGeometry: React.FC<PatternProps> = ({
  className = '',
  color = '#705B4C',
  size = 320,
}) => (
  <svg
    viewBox="0 0 300 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    className={`pointer-events-none select-none ${className}`}
    aria-hidden="true"
  >
    <g stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      {/* Central Concentric Rings */}
      <circle cx="150" cy="150" r="14" />
      <circle cx="150" cy="150" r="28" strokeDasharray="3 3" opacity="0.8" />
      <circle cx="150" cy="150" r="44" />
      <circle cx="150" cy="150" r="76" strokeDasharray="2 3" opacity="0.75" />
      <circle cx="150" cy="150" r="92" />
      <circle cx="150" cy="150" r="132" strokeWidth="1.5" />
      <circle cx="150" cy="150" r="138" strokeDasharray="2 4" opacity="0.65" />

      {/* 8 Radiating Axes */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <line
          key={`axis-${angle}`}
          x1="150"
          y1="150"
          x2={150 + 132 * Math.cos((angle * Math.PI) / 180)}
          y2={150 + 132 * Math.sin((angle * Math.PI) / 180)}
          strokeWidth="0.9"
          opacity="0.55"
        />
      ))}

      {/* Inner 8 Lotus Petals */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <g key={`inner-petal-${angle}`} transform={`rotate(${angle} 150 150)`}>
          <path d="M 150 106 C 142 120, 142 136, 150 150 C 158 136, 158 120, 150 106 Z" />
          <path d="M 150 106 L 150 150" strokeWidth="0.8" opacity="0.65" />
        </g>
      ))}

      {/* Mid 8 Pointed Diamond Petals */}
      {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle) => (
        <g key={`mid-petal-${angle}`} transform={`rotate(${angle} 150 150)`}>
          <path d="M 150 58 C 132 82, 136 112, 150 126 C 164 112, 168 82, 150 58 Z" />
          <line x1="150" y1="58" x2="150" y2="126" strokeWidth="0.8" opacity="0.65" />
          <circle cx="150" cy="74" r="2.8" fill={color} fillOpacity="0.5" stroke="none" />
        </g>
      ))}

      {/* Outer 16 Scalloped Flourish Petals */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = i * 22.5;
        return (
          <g key={`outer-flourish-${angle}`} transform={`rotate(${angle} 150 150)`}>
            <path d="M 150 18 C 142 30, 138 42, 150 58 C 162 42, 158 30, 150 18 Z" opacity="0.9" />
            <circle cx="150" cy="24" r="2.2" fill={color} fillOpacity="0.6" stroke="none" />
          </g>
        );
      })}
    </g>
  </svg>
);

/**
 * 3. TEMPLE ARCHITECTURE LINE DRAWING
 * Classical Indian Shikhara / Mandir silhouette line drawing,
 * matching "Temple Architecture Line Drawing" from the reference image.
 */
export const TempleArchitectureLine: React.FC<PatternProps> = ({
  className = '',
  color = '#705B4C',
  size = 320,
}) => (
  <svg
    viewBox="0 0 320 280"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    className={`pointer-events-none select-none ${className}`}
    aria-hidden="true"
  >
    <g stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      {/* Central Highest Kalasha & Amalaka Finial */}
      <circle cx="160" cy="22" r="3.5" />
      <path d="M 160 12 L 160 18" strokeWidth="1.6" />
      <path d="M 154 28 C 154 24, 166 24, 166 28 L 168 34 L 152 34 Z" />
      <ellipse cx="160" cy="36" rx="14" ry="4" />

      {/* Main Central Shikhara Curvilinear Spire */}
      <path d="M 160 38 C 146 65, 136 100, 134 145 L 186 145 C 184 100, 174 65, 160 38 Z" strokeWidth="1.6" />

      {/* Tiered Bhumi Ribs of Central Shikhara */}
      <path d="M 148 60 C 156 62, 164 62, 172 60" />
      <path d="M 144 80 C 154 83, 166 83, 176 80" />
      <path d="M 140 102 C 152 106, 168 106, 180 102" />
      <path d="M 137 124 C 150 128, 170 128, 183 124" />

      {/* Gavaksha / Chaitya Arch Motifs on Shikhara */}
      <path d="M 156 70 C 156 66, 164 66, 164 70 L 164 76 L 156 76 Z" opacity="0.8" />
      <path d="M 154 92 C 154 87, 166 87, 166 92 L 166 98 L 154 98 Z" opacity="0.8" />
      <path d="M 152 114 C 152 108, 168 108, 168 114 L 168 121 L 152 121 Z" opacity="0.8" />

      {/* Left Subsidiary Spire (Urushringa) */}
      <circle cx="108" cy="62" r="2.5" />
      <path d="M 108 55 L 108 59" />
      <ellipse cx="108" cy="70" rx="9" ry="3" />
      <path d="M 108 73 C 98 95, 92 120, 90 152 L 134 152 C 132 125, 126 98, 108 73 Z" />
      <path d="M 98 98 C 104 100, 114 100, 120 98" />
      <path d="M 94 122 C 102 125, 118 125, 126 122" />

      {/* Right Subsidiary Spire (Urushringa) */}
      <circle cx="212" cy="62" r="2.5" />
      <path d="M 212 55 L 212 59" />
      <ellipse cx="212" cy="70" rx="9" ry="3" />
      <path d="M 212 73 C 222 95, 228 120, 230 152 L 186 152 C 188 125, 194 98, 212 73 Z" />
      <path d="M 200 98 C 206 100, 216 100, 222 98" />
      <path d="M 194 122 C 202 125, 218 125, 226 122" />

      {/* Far Left Flank Pavilion (Kuta) */}
      <circle cx="62" cy="115" r="2" />
      <ellipse cx="62" cy="122" rx="7" ry="2.5" />
      <path d="M 62 125 C 54 140, 50 160, 48 180 L 90 180 C 88 160, 84 140, 62 125 Z" />

      {/* Far Right Flank Pavilion (Kuta) */}
      <circle cx="258" cy="115" r="2" />
      <ellipse cx="258" cy="122" rx="7" ry="2.5" />
      <path d="M 258 125 C 266 140, 270 160, 272 180 L 230 180 C 232 160, 236 140, 258 125 Z" />

      {/* Grand Architrave / Entablature Band */}
      <rect x="36" y="180" width="248" height="12" rx="2" strokeWidth="1.5" />
      <line x1="36" y1="186" x2="284" y2="186" strokeWidth="1.0" opacity="0.75" />

      {/* Temple Pillar Columns (Mandapa Pillars) */}
      {[52, 88, 124, 160, 196, 232, 268].map((colX) => (
        <g key={`pillar-${colX}`}>
          <rect x={colX - 4} y="192" width="8" height="52" />
          <line x1={colX} y1="192" x2={colX} y2="244" strokeWidth="0.9" opacity="0.6" />
          {/* Pillar Capital & Base */}
          <path d={`M ${colX - 7} 192 L ${colX + 7} 192 L ${colX + 5} 196 L ${colX - 5} 196 Z`} />
          <path d={`M ${colX - 6} 240 L ${colX + 6} 240 L ${colX + 8} 244 L ${colX - 8} 244 Z`} />
        </g>
      ))}

      {/* Arched Sanctum Doorway (Garbhagriha Portal) */}
      <path d="M 144 244 L 144 212 C 144 200, 176 200, 176 212 L 176 244 Z" strokeWidth="1.6" />
      <path d="M 148 244 L 148 214 C 148 206, 172 206, 172 214 L 172 244" opacity="0.75" strokeWidth="0.9" />

      {/* Plinth Platform Steps (Adhisthana) */}
      <rect x="28" y="244" width="264" height="8" rx="1" />
      <rect x="20" y="252" width="280" height="9" rx="1" />
      <rect x="12" y="261" width="296" height="10" rx="1" />
    </g>
  </svg>
);

/**
 * 4. INDIAN JAALI PATTERN
 * Geometric lattice screen tile with 8-pointed star & interlocking octagons,
 * matching "Indian Jaali Pattern" from the reference image.
 */
export const IndianJaaliPattern: React.FC<PatternProps> = ({
  className = '',
  color = '#705B4C',
  size = 320,
}) => (
  <svg
    viewBox="0 0 240 240"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    className={`pointer-events-none select-none ${className}`}
    aria-hidden="true"
  >
    <g stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      {/* Outer Border Frame */}
      <rect x="8" y="8" width="224" height="224" rx="4" strokeWidth="1.6" />
      <rect x="14" y="14" width="212" height="212" strokeWidth="0.9" opacity="0.65" />

      {/* Center 8-Pointed Star Lattice */}
      <g transform="translate(120, 120)">
        {/* Two Intersecting Rotated Squares */}
        <rect x="-35" y="-35" width="70" height="70" />
        <rect x="-35" y="-35" width="70" height="70" transform="rotate(45)" />

        {/* Inner Diamond Star Core */}
        <rect x="-18" y="-18" width="36" height="36" strokeDasharray="3 2" opacity="0.8" />
        <circle cx="0" cy="0" r="10" />
        <circle cx="0" cy="0" r="4" fill={color} fillOpacity="0.5" stroke="none" />

        {/* Radiating Ray Intersections */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((ang) => (
          <line
            key={`ray-${ang}`}
            x1="35"
            y1="0"
            x2="85"
            y2="0"
            transform={`rotate(${ang})`}
            strokeWidth="1.0"
          />
        ))}
      </g>

      {/* 4 Corner Subsidiary Star Modules */}
      {[
        { cx: 30, cy: 30 },
        { cx: 210, cy: 30 },
        { cx: 30, cy: 210 },
        { cx: 210, cy: 210 },
      ].map((pos, idx) => (
        <g key={`corner-${idx}`} transform={`translate(${pos.cx}, ${pos.cy})`}>
          <rect x="-18" y="-18" width="36" height="36" opacity="0.85" />
          <rect x="-18" y="-18" width="36" height="36" transform="rotate(45)" opacity="0.85" />
          <circle cx="0" cy="0" r="6" />
        </g>
      ))}

      {/* 4 Edge Midpoint Diamond Modules */}
      {[
        { cx: 120, cy: 20 },
        { cx: 120, cy: 220 },
        { cx: 20, cy: 120 },
        { cx: 220, cy: 120 },
      ].map((pos, idx) => (
        <g key={`mid-${idx}`} transform={`translate(${pos.cx}, ${pos.cy})`}>
          <polygon points="0,-16 16,0 0,16 -16,0" opacity="0.9" />
          <polygon points="0,-9 9,0 0,9 -9,0" strokeWidth="0.8" opacity="0.7" />
        </g>
      ))}
    </g>
  </svg>
);

/**
 * 5. BOTANICAL LEAVES (Kept for backwards compatibility, not rendered anywhere per user instruction)
 */
export const BotanicalLeaves: React.FC<PatternProps> = ({
  className = '',
  color = '#705B4C',
  size = 320,
}) => (
  <svg
    viewBox="0 0 260 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    className={`pointer-events-none select-none ${className}`}
    aria-hidden="true"
  >
    <g stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M 130 290 C 130 220, 134 150, 130 20" strokeWidth="1.6" />
      <path d="M 130 20 C 118 45, 116 75, 130 95 C 144 75, 142 45, 130 20 Z" />
    </g>
  </svg>
);

/**
 * 6. DIVIDER / ORNAMENTAL (For sections)
 * Exact vertical ornamental spine from reference image with graduated descending dots, 
 * central 4-pointed diamond sparkle star, and bottom blooming sacred lotus.
 */
export const DividerOrnamental: React.FC<PatternProps> = ({
  className = '',
  color = '#705B4C',
  size = 480,
}) => (
  <svg
    viewBox="0 0 140 460"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={typeof size === 'number' ? size * (140 / 460) : 'auto'}
    height={size}
    className={`pointer-events-none select-none ${className}`}
    aria-hidden="true"
  >
    <g stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      {/* 1. TOP VERTICAL SPINE AXIS WITH DESCENDING GRADUATED DOTS */}
      <line x1="70" y1="24" x2="70" y2="40" strokeWidth="1.2" opacity="0.75" />
      <circle cx="70" cy="52" r="1.4" fill={color} stroke="none" />
      
      <line x1="70" y1="62" x2="70" y2="76" strokeWidth="1.2" opacity="0.75" />
      <circle cx="70" cy="90" r="2.2" fill={color} stroke="none" />
      
      <line x1="70" y1="102" x2="70" y2="120" strokeWidth="1.2" opacity="0.8" />
      <circle cx="70" cy="136" r="3.0" fill={color} stroke="none" />
      
      <line x1="70" y1="150" x2="70" y2="174" strokeWidth="1.3" opacity="0.85" />
      <circle cx="70" cy="188" r="3.8" fill={color} stroke="none" />
      
      <line x1="70" y1="198" x2="70" y2="212" strokeWidth="1.4" />

      {/* 2. MIDDLE 4-POINTED CONCAVE DIAMOND SPARKLE STAR */}
      <g transform="translate(70, 240)">
        {/* Outer Concave 4-Pointed Star */}
        <path
          d="M 0 -28 Q 0 0 28 0 Q 0 0 0 28 Q 0 0 -28 0 Q 0 0 0 -28 Z"
          strokeWidth="1.5"
        />
        {/* Inner Concentric Diamond Ring */}
        <path
          d="M 0 -13 Q 0 0 13 0 Q 0 0 0 13 Q 0 0 -13 0 Q 0 0 0 -13 Z"
          strokeWidth="1.0"
          opacity="0.8"
        />
        {/* Center Radiant Core Dot */}
        <circle cx="0" cy="0" r="2.5" fill={color} stroke="none" />
      </g>

      {/* 3. CONNECTING SPINE DOWN TO LOTUS */}
      <line x1="70" y1="268" x2="70" y2="310" strokeWidth="1.3" opacity="0.85" />
      <circle cx="70" cy="300" r="1.8" fill={color} stroke="none" />

      {/* 4. BOTTOM SACRED BLOOMING LOTUS */}
      <g transform="translate(70, 375)">
        {/* Central Tall Petal */}
        <path d="M 0 -62 C -18 -32, -16 12, 0 35 C 16 12, 18 -32, 0 -62 Z" strokeWidth="1.5" />
        <line x1="0" y1="-56" x2="0" y2="30" strokeWidth="0.8" opacity="0.6" />

        {/* Flanking Petals 1 (Left & Right) */}
        <path d="M 0 35 C -28 24, -45 -14, -30 -50 C -20 -24, -10 10, 0 35" strokeWidth="1.4" />
        <path d="M 0 35 C 28 24, 45 -14, 30 -50 C 20 -24, 10 10, 0 35" strokeWidth="1.4" />

        {/* Flanking Petals 2 (Outer Wide Petals) */}
        <path d="M 0 35 C -46 36, -65 10, -56 -24 C -40 -2, -22 20, 0 35" strokeWidth="1.3" />
        <path d="M 0 35 C 46 36, 65 10, 56 -24 C 40 -2, 22 20, 0 35" strokeWidth="1.3" />

        {/* Base Outer Wing Petals (Horizontal Spreading) */}
        <path d="M 0 35 C -48 44, -72 32, -66 10 C -52 14, -26 24, 0 35" strokeWidth="1.2" />
        <path d="M 0 35 C 48 44, 72 32, 66 10 C 52 14, 26 24, 0 35" strokeWidth="1.2" />

        {/* Base Calyx Node */}
        <path d="M -10 35 C -10 42, 10 42, 10 35" strokeWidth="1.3" />
        <circle cx="0" cy="37" r="2.2" fill={color} fillOpacity="0.6" stroke="none" />
      </g>
    </g>
  </svg>
);

export const SacredOrnamentalDivider = DividerOrnamental;

/**
 * 6. ABSTRACT LOTUS PETALS (Exact Replica)
 * Exact faithful replica of reference motif "6. ABSTRACT LOTUS PETALS":
 * Radiates from a single bottom-right vertex (250, 275) with 4 organic petals:
 * 1. Low horizontal wing petal (warm cream/sand wash)
 * 2. Large left-upright sage olive leaf with delicate botanical skeleton veins
 * 3. Tall center upright petal (translucent warm sand/amber wash)
 * 4. Right-tilted petal (translucent warm sand/amber wash)
 * Overlapping translucent watercolor effect with mix-blend-mode multiply.
 */
export interface AbstractLotusPetalsProps {
  className?: string;
  size?: number | string;
  color?: string; // Contour stroke color
}

export const AbstractLotusPetals: React.FC<AbstractLotusPetalsProps> = ({
  className = '',
  size = 360,
}) => {
  return (
    <svg
      viewBox="0 0 340 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={typeof size === 'number' ? size * (300 / 340) : size}
      className={`select-none ${className}`}
      style={{ overflow: 'visible' }}
      aria-hidden="true"
    >
      <g style={{ mixBlendMode: 'multiply' }}>
        {/* ======================================================== */}
        {/* PETAL 1: LOW HORIZONTAL LEFT PETAL (WARM SAND WASH)      */}
        {/* ======================================================== */}
        <g opacity="0.9">
          <path
            d="M 250 275 C 180 278, 85 278, 35 272 C 85 220, 165 216, 250 275 Z"
            fill="#EFE2CD"
            fillOpacity="0.65"
            stroke="#A88767"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <path
            d="M 250 275 C 160 254, 90 262, 35 272"
            stroke="#A88767"
            strokeWidth="0.6"
            strokeLinecap="round"
            opacity="0.35"
          />
        </g>

        {/* ======================================================== */}
        {/* PETAL 3: TALL CENTER UPRIGHT PETAL (WARM SAND / AMBER)   */}
        {/* Rendered under the green leaf so green leaf overlays it  */}
        {/* ======================================================== */}
        <g opacity="0.92">
          <path
            d="M 250 275 C 175 185, 170 102, 200 52 C 240 98, 260 185, 250 275 Z"
            fill="#E7D5BC"
            fillOpacity="0.6"
            stroke="#B28F6E"
            strokeWidth="1.25"
            strokeLinejoin="round"
          />
          <path
            d="M 250 275 C 235 195, 218 120, 200 52"
            stroke="#9E7A5A"
            strokeWidth="0.75"
            strokeLinecap="round"
            opacity="0.45"
          />
        </g>

        {/* ======================================================== */}
        {/* PETAL 4: RIGHT-TILTED PETAL (WARM SAND / AMBER)          */}
        {/* ======================================================== */}
        <g opacity="0.92">
          <path
            d="M 250 275 C 255 195, 275 145, 305 112 C 312 175, 290 235, 250 275 Z"
            fill="#E5D3BA"
            fillOpacity="0.6"
            stroke="#B28F6E"
            strokeWidth="1.25"
            strokeLinejoin="round"
          />
          <path
            d="M 250 275 C 275 215, 292 160, 305 112"
            stroke="#9E7A5A"
            strokeWidth="0.75"
            strokeLinecap="round"
            opacity="0.45"
          />
        </g>

        {/* ======================================================== */}
        {/* PETAL 2: MAIN SAGE GREEN LOTUS PETAL (CURVY LOTUS PETAL SILHOUETTE) */}
        {/* Translucent overlay creating deep tone where it overlaps */}
        {/* ======================================================== */}
        <g opacity="0.95">
          {/* Main Petal Body with organic curves on both sides */}
          <path
            d="M 250 275 C 160 235, 82 165, 105 78 C 165 98, 238 182, 250 275 Z"
            fill="#7B8C70"
            fillOpacity="0.52"
            stroke="#56674B"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
        </g>
      </g>
    </svg>
  );
};

