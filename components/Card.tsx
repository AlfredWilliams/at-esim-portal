import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
    return (
        <div className={`bg-white dark:bg-slate-800 dark:border dark:border-slate-700/50 shadow-lg rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${className}`}>
            {children}
        </div>
    );
};

export default Card;