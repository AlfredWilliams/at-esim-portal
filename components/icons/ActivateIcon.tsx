
import React from 'react';

const ActivateIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.636 6.364l.707-.707M19 12a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

export default ActivateIcon;
