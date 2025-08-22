
import React from 'react';

const ShieldIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.417l5.31-2.072a12.025 12.025 0 006.38 0l5.31 2.072A12.02 12.02 0 0021 8.984a11.955 11.955 0 01-2.382-3.04z" />
    </svg>
);

export default ShieldIcon;
