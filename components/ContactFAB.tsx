
import React from 'react';
import ContactIcon from './icons/ContactIcon';
import VideoIcon from './icons/VideoIcon';
import { useTranslation } from '../contexts/LanguageContext';

interface ContactFABProps {
    onContactClick: () => void;
    onVideoClick: () => void;
}

const ContactFAB: React.FC<ContactFABProps> = ({ onContactClick, onVideoClick }) => {
    const { t } = useTranslation();

    return (
        <>
            {/* Mobile Bottom Navigation */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 h-16 bg-slate-900/80 backdrop-blur-lg border-t border-slate-700/50 shadow-[0_-2px_10px_rgba(0,0,0,0.2)]">
                <nav className="h-full flex justify-around items-stretch text-slate-300">
                    <button
                        onClick={onVideoClick}
                        className="flex flex-col items-center justify-center p-2 text-center w-full h-full hover:bg-slate-800 transition-colors"
                        aria-label={t('navVideos')}
                    >
                        <VideoIcon className="h-6 w-6" />
                        <span className="text-xs font-medium mt-1">{t('navVideos')}</span>
                    </button>
                    <div className="h-full w-px bg-slate-700/50 my-2"></div>
                    <button
                        onClick={onContactClick}
                        className="flex flex-col items-center justify-center p-2 text-center w-full h-full hover:bg-slate-800 transition-colors"
                        aria-label={t('contactUs')}
                    >
                        <ContactIcon className="h-6 w-6" />
                        <span className="text-xs font-medium mt-1">{t('contactUs')}</span>
                    </button>
                </nav>
            </div>

            {/* Desktop Floating Action Buttons */}
            <div className="hidden md:flex flex-col items-end gap-4 fixed bottom-8 right-8 z-40">
                 <button
                    onClick={onVideoClick}
                    className="flex items-center justify-center gap-3 px-5 py-4 bg-black text-white font-semibold rounded-full shadow-lg hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-50 dark:focus:ring-offset-slate-900 transition-all duration-300 ease-in-out"
                    aria-label={t('videosTitle')}
                >
                    <VideoIcon className="h-7 w-7" />
                    <span className="whitespace-nowrap">
                        {t('videosTitle')}
                    </span>
                </button>
                <button
                    onClick={onContactClick}
                    className="flex items-center justify-center gap-3 px-5 py-4 bg-black text-white font-semibold rounded-full shadow-lg hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-50 dark:focus:ring-offset-slate-900 transition-all duration-300 ease-in-out"
                    aria-label={t('contactUs')}
                >
                    <ContactIcon className="h-7 w-7" />
                    <span className="whitespace-nowrap">
                        {t('contactUs')}
                    </span>
                </button>
            </div>
        </>
    );
};

export default ContactFAB;