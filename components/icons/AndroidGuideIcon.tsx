
import React from 'react';

const AndroidGuideIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 440 300" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="gen-android-body-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4A5568" />
                <stop offset="100%" stopColor="#2D3748" />
            </linearGradient>
            <linearGradient id="gen-android-screen-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <clipPath id="gen-android-clip-1">
                <rect x="10" y="10" width="100" height="210" rx="18"/>
            </clipPath>
            <clipPath id="gen-android-clip-2">
                <rect x="10" y="10" width="130" height="270" rx="24"/>
            </clipPath>
        </defs>

        {/* --- Phone Screen 1: Settings --- */}
        <g transform="translate(0, 30)">
            <rect x="5" y="5" width="110" height="220" rx="20" fill="url(#gen-android-body-grad)" />
            <g clipPath="url(#gen-android-clip-1)">
                <rect x="10" y="10" width="100" height="210" fill="url(#gen-android-screen-grad)" />
                {/* Header */}
                <text x="20" y="35" fontFamily="Roboto, sans-serif" fontSize="12" fontWeight="500" className="fill-white">Settings</text>
                {/* Highlighted Item */}
                <rect x="15" y="45" width="90" height="30" rx="15" className="fill-blue-800/50" />
                <circle cx="32" cy="60" r="10" className="fill-blue-500"/>
                <path d="M32 55 v10 M27 60 h10" stroke="white" strokeWidth="1.5" />
                <text x="50" y="64" fontFamily="Roboto, sans-serif" fontSize="9" className="fill-white">Network & internet</text>
            </g>
        </g>
        
        {/* --- Arrow 1 --- */}
        <path d="M120 145 l15 0" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 3" />
        <path d="M130 142 l5 3 l-5 3" fill="#94a3b8" />

        {/* --- Phone Screen 2: Network --- */}
        <g transform="translate(145, 30)">
             <rect x="5" y="5" width="110" height="220" rx="20" fill="url(#gen-android-body-grad)" />
             <g clipPath="url(#gen-android-clip-1)">
                <rect x="10" y="10" width="100" height="210" fill="url(#gen-android-screen-grad)" />
                {/* Header */}
                <text x="20" y="35" fontFamily="Roboto, sans-serif" fontSize="12" fontWeight="500" className="fill-white">Network & internet</text>
                {/* Highlighted Item */}
                <rect x="15" y="45" width="90" height="30" rx="15" className="fill-blue-800/50" />
                {/* SIM icon */}
                <rect x="23" y="53" width="14" height="14" rx="2" className="fill-blue-500"/>
                <line x1="26" y1="63" x2="34" y2="63" stroke="white" strokeWidth="1.5"/>
                <text x="45" y="64" fontFamily="Roboto, sans-serif" fontSize="9" className="fill-white">SIMs</text>
            </g>
        </g>
        
        {/* --- Arrow 2 --- */}
        <path d="M265 145 l15 0" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 3" />
        <path d="M275 142 l5 3 l-5 3" fill="#94a3b8" />
        
        {/* --- Phone Screen 3: Add eSIM --- */}
        <g transform="translate(290, 0)">
             <rect x="5" y="5" width="140" height="280" rx="28" fill="url(#gen-android-body-grad)" />
             <g clipPath="url(#gen-android-clip-2)">
                <rect x="10" y="10" width="130" height="270" fill="url(#gen-android-screen-grad)" />
                {/* Header */}
                <text x="25" y="40" fontFamily="Roboto, sans-serif" fontSize="14" fontWeight="500" className="fill-white">SIMs</text>
                
                {/* SIM 1 */}
                <text x="25" y="70" fontFamily="Roboto, sans-serif" fontSize="11" className="fill-slate-400">AT (Physical)</text>
                <text x="25" y="85" fontFamily="Roboto, sans-serif" fontSize="9" className="fill-slate-500">Using for calls and texts</text>
                <line x1="25" y1="100" x2="135" y2="100" className="stroke-slate-700" />
                
                {/* Highlighted Add eSIM */}
                <g>
                    <rect x="20" y="110" width="110" height="40" rx="20" className="fill-green-500/20" />
                    <circle cx="42" cy="130" r="12" className="fill-green-500"/>
                    <path d="M42 126 v8 M38 130 h8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                    <text x="62" y="134" fontFamily="Roboto, sans-serif" fontSize="12" fontWeight="500" className="fill-green-300">+ Add eSIM</text>
                </g>
            </g>
        </g>
    </svg>
);

export default AndroidGuideIcon;
