import React from 'react';

interface TooltipProps {
    text: string;
    children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
    const tooltipId = React.useId();

    return (
        <div className="relative flex items-center group">
            <button
                type="button"
                className="flex items-center p-1"
                aria-describedby={tooltipId}
                aria-label="More information"
            >
                {children}
            </button>
            <div
                id={tooltipId}
                role="tooltip"
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs
                           bg-slate-800 dark:bg-black text-white text-sm rounded-md shadow-lg p-2
                           opacity-0 group-hover:opacity-100 group-focus-within:opacity-100
                           transition-opacity duration-300 pointer-events-none z-10"
            >
                {text}
                <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0
                                border-x-4 border-x-transparent
                                border-t-4 border-t-slate-800 dark:border-t-black"></div>
            </div>
        </div>
    );
};

export default Tooltip;
