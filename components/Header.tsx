
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
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const { t } = useTranslation();

    const navLinks = navLinkKeys.map(link => ({...link, text: t(link.key)}));

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
                rootMargin: '-48% 0px -48% 0px',
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
            setTimeout(() => element?.scrollIntoView({ behavior: 'smooth' }), 100);
        } else {
            element?.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMenuOpen(false);
    };
    
    const headerClasses = `
        fixed top-4 left-4 right-4 z-50 
        transition-all duration-300 ease-in-out
    `;
    
    const containerClasses = `
        w-full max-w-6xl mx-auto
        flex items-center justify-between
        transition-all duration-300 ease-in-out
        border border-white/20
        ${isMenuOpen 
            ? 'bg-slate-900/90 backdrop-blur-xl rounded-2xl flex-col items-stretch p-4 gap-4' 
            : `bg-slate-900/50 backdrop-blur-lg rounded-full p-2 pl-4 pr-2 ${isScrolled ? 'shadow-lg' : ''}`
        }
    `;

    return (
        <header className={headerClasses}>
            <div className={containerClasses}>
                <div className="flex items-center justify-between w-full relative">
                    {/* Logo */}
                    <button onClick={() => { setPage('home'); setIsMenuOpen(false); }} className="flex items-center" aria-label="Go to homepage">
                        <Logo className="h-8 w-auto" />
                    </button>

                    {/* Centered actions for Mobile */}
                    <div className="md:hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2">
                         <LanguageSwitcher />
                         <Button onClick={onGetStartedClick} variant="primary" size="sm" className="whitespace-nowrap">{t('getStarted')}</Button>
                    </div>
                    
                    {/* Desktop Nav (Centered) */}
                    <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-1">
                        {navLinks.map(link => (
                            <a
                                key={link.id}
                                href={`#${link.id}`}
                                onClick={(e) => {
                                    if (link.id === 'videos') {
                                        e.preventDefault();
                                        onOpenVideoModal();
                                    } else {
                                        handleNavClick(e, link.id);
                                    }
                                }}
                                className={`relative group text-sm font-medium px-3 py-2 rounded-md transition-colors duration-300 ${
                                    activeSection === link.id ? 'text-white' : 'text-slate-300 hover:text-white'
                                }`}
                                aria-current={activeSection === link.id ? 'page' : undefined}
                            >
                                {link.text}
                                <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-red-500 rounded-full transition-transform duration-300 origin-center ${
                                    activeSection === link.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                                }`}></span>
                            </a>
                        ))}
                    </nav>

                    {/* Desktop Action Buttons (Right) */}
                    <div className="hidden md:flex items-center gap-2">
                         <LanguageSwitcher />
                         <Button onClick={onGetStartedClick} variant="primary" size="sm">{t('getStarted')}</Button>
                    </div>


                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-controls="mobile-menu" aria-expanded={isMenuOpen} className="inline-flex items-center justify-center p-2 rounded-full text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Content */}
                {isMenuOpen && (
                    <nav id="mobile-menu" className="md:hidden flex flex-col items-center gap-2 pt-2 border-t border-white/20">
                        {navLinks.map(link => (
                             <a
                                key={link.id}
                                href={`#${link.id}`}
                                onClick={(e) => {
                                    if (link.id === 'videos') {
                                        e.preventDefault();
                                        onOpenVideoModal();
                                        setIsMenuOpen(false);
                                    } else {
                                        handleNavClick(e, link.id);
                                    }
                                }}
                                className={`block w-full text-center px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                                    activeSection === link.id
                                        ? 'bg-white/20 text-white'
                                        : 'text-slate-300 hover:text-white hover:bg-white/10'
                                }`}
                                aria-current={activeSection === link.id ? 'page' : undefined}
                            >
                                {link.text}
                            </a>
                        ))}
                    </nav>
                )}
            </div>
        </header>
    );
};

export default Header;
