
import React, { useState } from 'react';
import { FaqItem } from '../types';

interface FaqAccordionProps {
    items: FaqItem[];
}

const FaqAccordionItem: React.FC<{ item: FaqItem }> = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-slate-200 dark:border-slate-700">
            <h2>
                <button
                    type="button"
                    className="flex items-center justify-between w-full py-5 font-medium text-left text-slate-700 dark:text-slate-300"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-expanded={isOpen}
                >
                    <span>{item.question}</span>
                    <svg className={`w-6 h-6 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>
            </h2>
            <div className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                    <div className="pb-5 text-slate-500 dark:text-slate-400">
                        <p>{item.answer}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const FaqAccordion: React.FC<FaqAccordionProps> = ({ items }) => {
    return (
        <div className="w-full max-w-3xl mx-auto">
            {items.map((item, index) => (
                <FaqAccordionItem key={index} item={item} />
            ))}
        </div>
    );
};

export default FaqAccordion;
