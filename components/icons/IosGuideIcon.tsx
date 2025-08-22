
import React from 'react';

const IosGuideIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 250 450" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="ios-body-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d1d5db" />
                <stop offset="100%" stopColor="#9ca3af" />
            </linearGradient>
            <linearGradient id="ios-screen-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0f172a" />
                <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
            <clipPath id="ios-screen-clip-guide">
                <rect x="15" y="15" width="220" height="420" rx="35"/>
            </clipPath>
        </defs>

        {/* Phone Body */}
        <rect x="5" y="5" width="240" height="440" rx="45" fill="url(#ios-body-grad)" />
        <rect x="10" y="10" width="230" height="430" rx="40" className="fill-slate-900" />

        {/* Screen */}
        <g clipPath="url(#ios-screen-clip-guide)">
            <rect x="15" y="15" width="220" height="420" fill="url(#ios-screen-grad)" />
            
            {/* Status Bar */}
            <text x="35" y="38" fontFamily="system-ui, sans-serif" fontSize="12" fontWeight="600" className="fill-white">9:41</text>
            <path d="M205 35 l-15 0" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M185 32 l-15 0" stroke="white" strokeWidth="1.5" strokeLinecap="round" />

            {/* --- Path Illustration --- */}

            {/* Step 1: Settings -> Cellular */}
            <text x="35" y="70" fontFamily="system-ui, sans-serif" fontSize="20" fontWeight="bold" className="fill-white">Settings</text>
            <rect x="30" y="90" width="190" height="45" rx="10" className="fill-slate-700/80" />
            <circle cx="52" cy="112.5" r="12" className="fill-green-500" />
            <path d="M48 112.5 h8 m-4 -4 v8" stroke="white" strokeWidth="1.5" fill="none" strokeLinejoin="round" strokeLinecap="round" transform="rotate(45 52 112.5) scale(0.6)" />
            <text x="75" y="118" fontFamily="system-ui, sans-serif" fontSize="14" className="fill-white">Cellular</text>
            <path d="M205 107 l5 5.5 l-5 5.5" stroke="#9ca3af" fill="none" strokeWidth="1.5" strokeLinecap="round"/>
            
            {/* Arrow */}
            <path d="M125 145 v25" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 4" />
            <path d="M122 165 l3 5 l3 -5" fill="#f43f5e" />

            {/* Step 2: Cellular -> Add eSIM */}
            <text x="35" y="200" fontFamily="system-ui, sans-serif" fontSize="14" className="fill-slate-400">CELLULAR</text>
            <rect x="30" y="220" width="190" height="95" rx="10" className="fill-slate-700/80" />
            
            <text x="45" y="245" fontFamily="system-ui, sans-serif" fontSize="14" className="fill-white">AT</text>
            <line x1="45" y1="260" x2="205" y2="260" className="stroke-slate-600" />

            {/* Highlighted section */}
            <rect x="35" y="270" width="180" height="35" rx="8" className="fill-red-500/20" />
            <text x="45" y="292" fontFamily="system-ui, sans-serif" fontSize="14" className="fill-red-400">Add eSIM</text>
            
            <path d="M35 340 h180" stroke="#f43f5e" strokeWidth="2" />
            <text x="125" y="365" fontFamily="system-ui, sans-serif" fontSize="14" fontWeight="bold" textAnchor="middle" className="fill-green-400">
                Success!
            </text>
            <text x="125" y="385" fontFamily="system-ui, sans-serif" fontSize="12" textAnchor="middle" className="fill-slate-300">
                Your phone is compatible.
            </text>
        </g>
        
        {/* Notch */}
        <rect x="80" y="15" width="90" height="25" rx="12" className="fill-slate-900" />
    </svg>
);

export default IosGuideIcon;
