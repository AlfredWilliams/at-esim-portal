import React from 'react';
import Button from './Button';
import CookieIcon from './icons/CookieIcon';
import { useTranslation } from '../contexts/LanguageContext';

interface CookieConsentBannerProps {
    onAccept: () => void;
    onDecline: () => void;
}

const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({ onAccept, onDecline }) => {
    const { t } = useTranslation();

    return (
        <div className="fixed bottom-0 inset-x-0 z-50 p-4 animate-fade-in-up" role="dialog" aria-modal="true" aria-labelledby="cookie-title">
            <div className="max-w-6xl mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 p-5">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="flex-shrink-0">
                        <CookieIcon className="h-12 w-12 text-red-500" />
                    </div>
                    <div className="flex-grow text-center sm:text-left">
                        <h2 id="cookie-title" className="text-lg font-bold text-slate-800 dark:text-white">{t('cookieBannerTitle')}</h2>
                        <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                            {t('cookieBannerBody')}
                        </p>
                    </div>
                    <div className="flex flex-shrink-0 gap-3 w-full sm:w-auto">
                        <Button variant="secondary" onClick={onDecline} className="flex-1 sm:flex-none">
                            {t('cookieDecline')}
                        </Button>
                        <Button onClick={onAccept} className="flex-1 sm:flex-none">
                            {t('cookieAccept')}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CookieConsentBanner;
