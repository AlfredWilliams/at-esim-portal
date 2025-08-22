import React from 'react';
import BundleIcon from './icons/BundleIcon';

interface FloatingActionButtonProps {
    text: string;
    onClick: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ text, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="fixed bottom-6 left-6 z-30 flex items-center gap-3 px-5 py-3 bg-red-600 text-white font-semibold rounded-full shadow-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-50 dark:focus:ring-offset-slate-900 transform hover:scale-105 transition-all duration-300 ease-in-out animate-fade-in-up"
            aria-label={text}
        >
            <BundleIcon className="h-6 w-6" />
            <span className="hidden sm:inline">{text}</span>
        </button>
    );
};

export default FloatingActionButton;