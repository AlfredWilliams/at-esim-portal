
import React, { useState } from 'react';
import Modal from './Modal';
import NewsletterSubscribe from './NewsletterSubscribe';
import ContactIcon from './icons/ContactIcon';
import VideoIcon from './icons/VideoIcon';
import NewsletterIcon from './icons/NewsletterIcon';
import { useTranslation } from '../contexts/LanguageContext';

interface FloatingActionButtonsProps {
    onContactClick: () => void;
    onVideoClick: () => void;
}

const FloatingActionButtons: React.FC<FloatingActionButtonsProps> = ({ onContactClick, onVideoClick }) => {
    const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false);
    const { t } = useTranslation();

    const fabBaseClasses = "group flex items-center justify-center bg-red-600 text-white font-semibold rounded-l-full shadow-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-50 dark:focus:ring-offset-slate-900 transition-all duration-300 ease-in-out h-14 w-14 hover:w-auto hover:px-5";
    const iconClasses = "h-7 w-7 transition-transform group-hover:scale-110 flex-shrink-0";
    const textClasses = "hidden group-hover:inline-block ml-2 whitespace-nowrap text-sm";

    return (
        <>
            <div className="flex flex-col items-end gap-4 fixed bottom-8 right-0 z-40">
                <button
                    onClick={onContactClick}
                    className={fabBaseClasses}
                    aria-label={t('contactUs')}
                >
                    <ContactIcon className={iconClasses} />
                    <span className={textClasses}>
                        {t('contactUs')}
                    </span>
                </button>
                <button
                    onClick={onVideoClick}
                    className={fabBaseClasses}
                    aria-label={t('videosTitle')}
                >
                    <VideoIcon className={iconClasses} />
                    <span className={textClasses}>
                        {t('videosTitle')}
                    </span>
                </button>
                <button
                    onClick={() => setIsNewsletterModalOpen(true)}
                    className={fabBaseClasses}
                    aria-label={t('newsletterTitle')}
                >
                    <NewsletterIcon className={iconClasses} />
                    <span className={textClasses}>
                        {t('subscribe')}
                    </span>
                </button>
            </div>

            <Modal isOpen={isNewsletterModalOpen} onClose={() => setIsNewsletterModalOpen(false)} title={t('newsletterTitle')}>
                 <div className="py-2">
                    <NewsletterSubscribe />
                </div>
            </Modal>
        </>
    );
};

export default FloatingActionButtons;