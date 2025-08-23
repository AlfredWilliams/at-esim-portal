
import React, { useState } from 'react';
import Logo from './icons/Logo';
import FacebookIcon from './icons/FacebookIcon';
import TwitterIcon from './icons/TwitterIcon';
import InstagramIcon from './icons/InstagramIcon';
import LinkedInIcon from './icons/LinkedInIcon';
import { useTranslation } from '../contexts/LanguageContext';

interface FooterProps {
    onContactClick: () => void;
}

const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
);

interface FooterAccordionItemProps {
    title: string;
    isOpen: boolean;
    onToggle: () => void;
    children: React.ReactNode;
}

const FooterAccordionItem: React.FC<FooterAccordionItemProps> = ({ title, isOpen, onToggle, children }) => {
    return (
        <div className="border-b border-slate-300/70 dark:border-slate-700/70 md:border-none">
            <button
                type="button"
                className="flex items-center justify-between w-full py-4 md:py-0 md:pointer-events-none"
                onClick={onToggle}
                aria-expanded={isOpen}
            >
                <h4 className="font-bold text-lg text-slate-800 dark:text-white">{title}</h4>
                <ChevronDownIcon className={`w-5 h-5 text-slate-500 dark:text-slate-400 transition-transform duration-300 md:hidden ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`grid overflow-hidden transition-all duration-500 ease-in-out md:grid-rows-[1fr] md:pt-4 md:opacity-100 ${isOpen ? 'grid-rows-[1fr] opacity-100 pb-4' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                    {children}
                </div>
            </div>
        </div>
    );
};


const Footer: React.FC<FooterProps> = ({ onContactClick }) => {
    const { t } = useTranslation();
    const [openAccordion, setOpenAccordion] = useState<string | null>(null);

    const toggleAccordion = (key: string) => {
        setOpenAccordion(openAccordion === key ? null : key);
    };

    const quickLinks = [
        { key: 'navHowItWorks', href: '#how-it-works' },
        { key: 'navOffers', href: '#offers' },
        { key: 'navCompatibility', href: '#compatibility' },
        { key: 'navFAQ', href: '#faq' },
    ];

    const socialLinks = [
        { href: '#', icon: FacebookIcon, label: 'Facebook' },
        { href: '#', icon: TwitterIcon, label: 'Twitter' },
        { href: '#', icon: InstagramIcon, label: 'Instagram' },
        { href: '#', icon: LinkedInIcon, label: 'LinkedIn' },
    ];

    return (
        <footer className="w-full bg-slate-200 dark:bg-slate-950/50 pt-16 sm:pt-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 mb-8">
                    {/* About Section */}
                    <div className="md:col-span-1 mb-8 md:mb-0">
                        <Logo className="h-10 w-auto mb-4" />
                        <p className="text-slate-500 dark:text-slate-400 text-sm">
                            {t('footerAbout')}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <FooterAccordionItem
                        title={t('quickLinks')}
                        isOpen={openAccordion === 'quickLinks'}
                        onToggle={() => toggleAccordion('quickLinks')}
                    >
                        <ul className="space-y-3">
                            {quickLinks.map(link => (
                                <li key={link.key}>
                                    <a href={link.href} className="text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-500 transition-colors">
                                        {t(link.key)}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </FooterAccordionItem>

                    {/* Legal Links */}
                    <FooterAccordionItem
                        title={t('legal')}
                        isOpen={openAccordion === 'legal'}
                        onToggle={() => toggleAccordion('legal')}
                    >
                        <ul className="space-y-3">
                            <li><a href="#" className="text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-500 transition-colors">{t('privacyPolicy')}</a></li>
                            <li><a href="#" className="text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-500 transition-colors">{t('termsOfService')}</a></li>
                        </ul>
                    </FooterAccordionItem>
                    
                    {/* Contact */}
                     <FooterAccordionItem
                        title={t('contactUs')}
                        isOpen={openAccordion === 'contact'}
                        onToggle={() => toggleAccordion('contact')}
                    >
                        <ul className="space-y-3">
                            <li>
                                <button onClick={onContactClick} className="text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-500 transition-colors">
                                    {t('contactSupport')}
                                </button>
                            </li>
                        </ul>
                    </FooterAccordionItem>

                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-300 dark:border-slate-700 py-6 flex flex-col sm:flex-row justify-between items-center">
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 sm:mb-0">
                        &copy; {new Date().getFullYear()} {t('footerRights')}
                    </p>
                    <div className="flex space-x-5">
                        {socialLinks.map(link => (
                            <a key={link.label} href={link.href} className="text-slate-400 hover:text-red-600 dark:hover:text-red-500 transition-colors">
                                <span className="sr-only">{link.label}</span>
                                <link.icon className="h-6 w-6" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
