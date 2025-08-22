import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className }) => (
  <img src="/atlogo.png" alt="AT Logo" className={className} />
);

export default Logo;