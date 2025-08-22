import React from 'react';

// Official WhatsApp icon (vector file)
// Source: Wikimedia copy of WhatsApp's brand asset
const WhatsappIcon: React.FC<{
  className?: string;
  size?: number;
  title?: string;
}> = ({ className, size = 24, title = "WhatsApp" }) => (
  <img
    className={className}
    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
    alt={title}
    width={size}
    height={size}
    loading="lazy"
    decoding="async"
  />
);

export default WhatsappIcon;


