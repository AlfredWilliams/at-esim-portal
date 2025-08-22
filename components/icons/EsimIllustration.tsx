import React from 'react';

const EsimIllustration: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 0 400 400" className={className} xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="phoneScreenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="checkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4ade80" />
                <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
            <filter id="subtleGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.5 0" result="glow" />
                <feMerge>
                    <feMergeNode in="glow" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>

        {/* Background elements */}
        <circle cx="200" cy="200" r="180" fill="rgba(255,255,255,0.05)" />
        <circle cx="200" cy="200" r="140" fill="rgba(255,255,255,0.07)" />

        {/* Phone Body */}
        <g transform="rotate(10 200 200)">
            <rect x="85" y="45" width="230" height="310" rx="35" fill="#334155" />
            <rect x="100" y="60" width="200" height="280" rx="20" fill="url(#phoneScreenGradient)" />

            {/* Notch */}
            <rect x="175" y="60" width="50" height="10" rx="5" fill="#334155" />

            {/* Screen Content - Activation Success */}
            <g transform="translate(0, 10)">
                {/* Checkmark Circle */}
                <circle cx="200" cy="140" r="45" fill="url(#checkGradient)" filter="url(#subtleGlow)" />
                <path d="M180 140 l15 15 l30 -30" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                
                {/* eSIM Chip Icon */}
                <g transform="translate(178, 205)">
                     <rect x="0" y="0" width="44" height="30" rx="4" fill="#f87171" />
                     <rect x="4" y="4" width="36" height="22" rx="2" fill="#ef4444" />
                     <rect x="8" y="8" width="14" height="14" fill="#f87171" />
                     <line x1="26" y1="11" x2="36" y2="11" stroke="#f87171" strokeWidth="2" />
                     <line x1="26" y1="15" x2="36" y2="15" stroke="#f87171" strokeWidth="2" />
                     <line x1="26" y1="19" x2="36" y2="19" stroke="#f87171" strokeWidth="2" />
                </g>

                {/* Text */}
                <text x="200" y="275" fontFamily="sans-serif" fontSize="22" fontWeight="bold" fill="white" textAnchor="middle">
                    eSIM Activated
                </text>
            </g>
        </g>
    </svg>
);

export default EsimIllustration;