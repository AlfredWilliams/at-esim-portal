import React from 'react';
import NewsletterSubscribe from './NewsletterSubscribe';
import Logo from './icons/Logo';
import FacebookIcon from './icons/FacebookIcon';
import TwitterIcon from './icons/TwitterIcon';
import InstagramIcon from './icons/InstagramIcon';
import LinkedInIcon from './icons/LinkedInIcon';
import { useTranslation } from '../contexts/LanguageContext';

interface FooterProps {
    onContactClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onContactClick }) => {
    const { t } = useTranslation();

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
                {/* Newsletter Section */}
                <div className="mb-16">
                    <NewsletterSubscribe />
                </div>

                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* About Section */}
                    <div className="md:col-span-1">
                        <Logo className="h-10 w-auto mb-4" />
                        <p className="text-slate-500 dark:text-slate-400 text-sm">
                            {t('footerAbout')}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-lg mb-4 text-slate-800 dark:text-white">{t('quickLinks')}</h4>
                        <ul className="space-y-3">
                            {quickLinks.map(link => (
                                <li key={link.key}>
                                    <a href={link.href} className="text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-500 transition-colors">
                                        {t(link.key)}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h4 className="font-bold text-lg mb-4 text-slate-800 dark:text-white">{t('legal')}</h4>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-500 transition-colors">{t('privacyPolicy')}</a></li>
                            <li><a href="#" className="text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-500 transition-colors">{t('termsOfService')}</a></li>
                        </ul>
                    </div>
                    
                    {/* Contact */}
                     <div>
                        <h4 className="font-bold text-lg mb-4 text-slate-800 dark:text-white">{t('contactUs')}</h4>
                        <ul className="space-y-3">
                            <li>
                                <button onClick={onContactClick} className="text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-500 transition-colors">
                                    {t('contactSupport')}
                                </button>
                            </li>
                        </ul>
                    </div>

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