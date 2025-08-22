import React from 'react';

const EidScreenIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 160 260" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="phoneBodyGradientRealistic" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#374151" />
                <stop offset="100%" stopColor="#111827" />
            </linearGradient>
            <linearGradient id="phoneScreenGradientRealistic" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1f2937" />
                <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
        </defs>
        <g>
            {/* Outermost phone body layer */}
            <rect x="5" y="5" width="150" height="250" rx="30" fill="url(#phoneBodyGradientRealistic)" />
            
            {/* Side Buttons */}
            <rect x="155" y="60" width="3" height="25" rx="1.5" fill="#4b5563" />
            <rect x="155" y="95" width="3" height="45" rx="1.5" fill="#4b5563" />

            {/* Screen */}
            <rect x="15" y="15" width="130" height="230" rx="20" fill="url(#phoneScreenGradientRealistic)" />
            
            {/* Hole-punch camera */}
            <circle cx="80" cy="28" r="4" fill="#0f172a" />
            
            {/* --- Screen UI Content --- */}

            {/* Header */}
            <path d="M 30 50 L 40 45 L 30 40 Z" className="fill-slate-400" />
            <text x="80" y="50" fontFamily="system-ui, sans-serif" fontSize="11" fontWeight="600" textAnchor="middle" className="fill-slate-200">
                Device Info
            </text>
            <line x1="25" y1="62" x2="135" y2="62" className="stroke-slate-700" strokeWidth="1"/>

            {/* IMEI Section */}
            <text x="25" y="80" fontFamily="system-ui, sans-serif" fontSize="9" className="fill-slate-500">IMEI</text>
            <text x="25" y="93" fontFamily="monospace" fontSize="10" fontWeight="500" className="fill-slate-400">350011223344556</text>
            
            {/* Highlighted EID/Compatibility Section */}
            <rect x="22" y="105" width="116" height="55" rx="10" className="fill-green-900/40" />
            <rect x="22" y="105" width="116" height="55" rx="10" className="stroke-green-500/20" strokeWidth="1" fill="none" />

            <g transform="translate(32 115)">
                <circle cx="9" cy="9" r="9" className="fill-green-500" />
                <path d="M 5.5 9 L 8 11.5 L 12.5 7" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <text x="55" y="124" fontFamily="system-ui, sans-serif" fontSize="11" fontWeight="bold" className="fill-green-400">
                eSIM Ready
            </text>
            <text x="32" y="140" fontFamily="monospace" fontSize="9" className="fill-slate-400">
                EID: 890123...12345
            </text>
            
            {/* MEID Section */}
            <text x="25" y="175" fontFamily="system-ui, sans-serif" fontSize="9" className="fill-slate-500">MEID</text>
            <text x="25" y="188" fontFamily="monospace" fontSize="10" fontWeight="500" className="fill-slate-400">350011223344557</text>
        </g>
    </svg>
);

export default EidScreenIcon;
