

import React, { useState, useEffect } from 'react';
import { Page } from '../types';
import Button from './Button';
import Logo from './icons/Logo';
import MenuIcon from './icons/MenuIcon';
import CloseIcon from './icons/CloseIcon';
import { useTranslation } from '../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

interface HeaderProps {
    setPage: (page: Page) => void;
    currentPage: Page;
    onGetStartedClick: () => void;
    onOpenVideoModal: () => void;
}

const navLinkKeys = [
    { id: 'how-it-works', key: 'navHowItWorks' },
    { id: 'offers', key: 'navOffers' },
    { id: 'compatibility', key: 'navCompatibility' },
    { id: 'faq', key: 'navFAQ' },
    { id: 'blog', key: 'navBlog' },
];

const Header: React.FC<HeaderProps> = ({ setPage, currentPage, onGetStartedClick, onOpenVideoModal }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const { t } = useTranslation();

    const navLinks = navLinkKeys.map(link => ({...link, text: t(link.key)}));

    useEffect(() => {
        if (currentPage !== 'home') {
            setActiveSection('');
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                const intersectingEntries = entries.filter(e => e.isIntersecting);

                if (intersectingEntries.length > 0) {
                    intersectingEntries.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                    setActiveSection(intersectingEntries[0].target.id);
                }
            },
            {
                rootMargin: '-40% 0px -55% 0px',
                threshold: 0,
            }
        );

        const sections = navLinks
            .filter(link => link.id !== 'videos')
            .map(link => document.getElementById(link.id));
        
        sections.forEach(section => {
            if (section) observer.observe(section);
        });

        return () => {
            sections.forEach(section => {
                if (section) observer.unobserve(section);
            });
        };
    }, [currentPage, navLinks]);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (currentPage !== 'home') {
            setPage('home');
            setTimeout(() => {
                const headerHeight = 64; // h-16
                const elementPosition = element?.getBoundingClientRect().top ?? 0;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }, 100);
        } else {
             const headerHeight = 64; // h-16
             const elementPosition = element?.getBoundingClientRect().top ?? 0;
             const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
             window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
        setIsMenuOpen(false);
    };
    
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-[env(safe-area-inset-top)]">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <button onClick={() => { setPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); setIsMenuOpen(false); }} className="flex items-center" aria-label="Go to homepage">
                        <Logo className="h-8 w-auto" />
                    </button>
                    
                    {/* Desktop Nav (Centered) */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map(link => (
                            <a
                                key={link.id}
                                href={`#${link.id}`}
                                onClick={(e) => handleNavClick(e, link.id)}
                                className={`relative group text-sm font-semibold px-3 py-2 rounded-md transition-colors duration-300 ${
                                    activeSection === link.id 
                                        ? 'text-red-600 dark:text-red-500' 
                                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                                }`}
                                aria-current={activeSection === link.id ? 'page' : undefined}
                            >
                                {link.text}
                                <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-red-500 rounded-full transition-transform duration-300 origin-center ${
                                    activeSection === link.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                                }`}></span>
                            </a>
                        ))}
                    </nav>

                    {/* Mobile Actions (Centered) */}
                    <div className="md:hidden flex items-center gap-2">
                        <LanguageSwitcher />
                        <Button onClick={onGetStartedClick} variant="primary" size="sm">{t('getStarted')}</Button>
                    </div>

                    {/* Desktop Action Buttons (Right) */}
                    <div className="hidden md:flex items-center gap-2">
                         <LanguageSwitcher />
                         <Button onClick={onGetStartedClick} variant="primary" size="sm">{t('getStarted')}</Button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-controls="mobile-menu" aria-expanded={isMenuOpen} className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500">
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                 {/* Mobile Menu Content */}
                {isMenuOpen && (
                    <div id="mobile-menu" className="md:hidden pb-4">
                        <nav className="flex flex-col items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                            {navLinks.map(link => (
                                <a
                                    key={link.id}
                                    href={`#${link.id}`}
                                    onClick={(e) => handleNavClick(e, link.id)}
                                    className={`block w-full text-left px-3 py-3 rounded-md text-base font-medium transition-colors duration-200 ${
                                        activeSection === link.id
                                            ? 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400'
                                            : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                                    }`}
                                    aria-current={activeSection === link.id ? 'page' : undefined}
                                >
                                    {link.text}
                                </a>
                            ))}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;