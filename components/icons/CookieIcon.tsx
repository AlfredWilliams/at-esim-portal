import React from 'react';

const CookieIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12.865 3.033A9 9 0 0121 12a9 9 0 01-8.135 8.967m-6.83-1.353A9 9 0 013 12a9 9 0 018.135-8.967M12.865 3.033a9.002 9.002 0 00-6.83 1.353" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008c0-.414.336-.75.75-.75h.008zM15.75 10.5a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008c0-.414.336-.75.75-.75h.008zM12 14.25a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008c0-.414.336-.75.75-.75h.008z" />
    </svg>
);

export default CookieIcon;
