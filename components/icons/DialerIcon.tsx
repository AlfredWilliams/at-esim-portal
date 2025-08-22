
import React from 'react';

const DialerIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 150 250" xmlns="http://www.w3.org/2000/svg">
        <g className={className}>
            <rect x="5" y="5" width="140" height="240" rx="20" className="fill-slate-200 dark:fill-slate-700" stroke="currentColor" strokeWidth="2" />
            <rect x="15" y="15" width="120" height="60" rx="10" className="fill-white dark:fill-slate-800" />
            <text x="75" y="50" fontFamily="monospace" fontSize="20" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200">*#06#</text>
            
            <circle cx="40" cy="110" r="12" className="fill-slate-300 dark:fill-slate-600"/>
            <text x="40" y="115" fontFamily="sans-serif" fontSize="12" textAnchor="middle" className="fill-slate-600 dark:fill-slate-300">1</text>
            <circle cx="75" cy="110" r="12" className="fill-slate-300 dark:fill-slate-600"/>
            <text x="75" y="115" fontFamily="sans-serif" fontSize="12" textAnchor="middle" className="fill-slate-600 dark:fill-slate-300">2</text>
            <circle cx="110" cy="110" r="12" className="fill-slate-300 dark:fill-slate-600"/>
            <text x="110" y="115" fontFamily="sans-serif" fontSize="12" textAnchor="middle" className="fill-slate-600 dark:fill-slate-300">3</text>

            <circle cx="40" cy="145" r="12" className="fill-slate-300 dark:fill-slate-600"/>
            <text x="40" y="150" fontFamily="sans-serif" fontSize="12" textAnchor="middle" className="fill-slate-600 dark:fill-slate-300">4</text>
            <circle cx="75" cy="145" r="12" className="fill-slate-300 dark:fill-slate-600"/>
            <text x="75" y="150" fontFamily="sans-serif" fontSize="12" textAnchor="middle" className="fill-slate-600 dark:fill-slate-300">5</text>
            <circle cx="110" cy="145" r="12" className="fill-slate-300 dark:fill-slate-600"/>
            <text x="110" y="150" fontFamily="sans-serif" fontSize="12" textAnchor="middle" className="fill-slate-600 dark:fill-slate-300">6</text>

            <circle cx="40" cy="180" r="12" className="fill-slate-300 dark:fill-slate-600"/>
            <text x="40" y="185" fontFamily="sans-serif" fontSize="12" textAnchor="middle" className="fill-slate-600 dark:fill-slate-300">7</text>
            <circle cx="75" cy="180" r="12" className="fill-slate-300 dark:fill-slate-600"/>
            <text x="75" y="185" fontFamily="sans-serif" fontSize="12" textAnchor="middle" className="fill-slate-600 dark:fill-slate-300">8</text>
            <circle cx="110" cy="180" r="12" className="fill-slate-300 dark:fill-slate-600"/>
            <text x="110" y="185" fontFamily="sans-serif" fontSize="12" textAnchor="middle" className="fill-slate-600 dark:fill-slate-300">9</text>

            <circle cx="75" cy="215" r="12" className="fill-slate-300 dark:fill-slate-600"/>
            <text x="75" y="220" fontFamily="sans-serif" fontSize="12" textAnchor="middle" className="fill-slate-600 dark:fill-slate-300">0</text>
        </g>
    </svg>
);

export default DialerIcon;