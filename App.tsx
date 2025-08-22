
import React, { useState } from 'react';
import { Page, Bundle } from './types';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import RegistrationPage from './pages/RegistrationPage';
import BundleSelectionPage from './pages/BundleSelectionPage';
import PaymentPage from './pages/PaymentPage';
import ActivationPage from './pages/ActivationPage';
import Modal from './components/Modal';
import Button from './components/Button';
import ContactFAB from './components/ContactFAB';
import { LanguageProvider, useTranslation } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import WhatsappIcon from './components/icons/WhatsappIcon';
import PhoneIcon from './components/icons/PhoneIcon';
import VideoSection from './components/VideoSection';

const AppContent: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<Page>('home');
    const [selectedBundle, setSelectedBundle] = useState<Bundle | null>(null);
    const [isCompatModalOpen, setIsCompatModalOpen] = useState(false);
    const [isTestDeviceModalOpen, setIsTestDeviceModalOpen] = useState(false);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    const { t } = useTranslation();

    const handleProceedToRegistration = () => {
        setIsCompatModalOpen(false);
        setCurrentPage('registration');
    };
    
    const handleOpenTestModal = () => {
        setIsCompatModalOpen(false);
        setIsTestDeviceModalOpen(true);
    };

    const openCompatModal = () => setIsCompatModalOpen(true);
    const openContactModal = () => setIsContactModalOpen(true);
    const openVideoModal = () => setIsVideoModalOpen(true);

    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <HomePage setPage={setCurrentPage} setSelectedBundle={setSelectedBundle} openCompatModal={openCompatModal} openContactModal={openContactModal} />;
            case 'registration':
                return <RegistrationPage setPage={setCurrentPage} selectedBundle={selectedBundle} setSelectedBundle={setSelectedBundle} />;
            case 'bundles':
                return <BundleSelectionPage setPage={setCurrentPage} setSelectedBundle={setSelectedBundle} />;
            case 'payment':
                return <PaymentPage setPage={setCurrentPage} selectedBundle={selectedBundle} />;
            case 'activation':
                return <ActivationPage setPage={setCurrentPage} />;
            default:
                return <HomePage setPage={setCurrentPage} setSelectedBundle={setSelectedBundle} openCompatModal={openCompatModal} openContactModal={openContactModal} />;
        }
    };

    return (
        <main className="min-h-screen font-sans pb-16 md:pb-0">
            <Header
                setPage={setCurrentPage}
                currentPage={currentPage}
                onGetStartedClick={openCompatModal}
                onOpenVideoModal={openVideoModal}
            />
            {renderPage()}

            <ContactFAB onContactClick={openContactModal} onVideoClick={openVideoModal} />

            <Modal isOpen={isCompatModalOpen} onClose={() => setIsCompatModalOpen(false)} title={t('compatModalTitle')}>
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                    {t('compatModalBody')}
                </p>
                <div className="flex flex-col sm:flex-row sm:justify-end sm:space-x-4 space-y-2 sm:space-y-0">
                    <Button variant="secondary" onClick={handleOpenTestModal}>
                        {t('testDeviceCompatibility')}
                    </Button>
                    <Button onClick={handleProceedToRegistration}>
                        {t('compatModalConfirm')}
                    </Button>
                </div>
            </Modal>
            
            <Modal isOpen={isTestDeviceModalOpen} onClose={() => setIsTestDeviceModalOpen(false)} title={t('testDeviceModalTitle')}>
                <div className="text-center">
                    <p className="text-slate-600 dark:text-slate-300 mb-4">
                        {t('testDeviceModalBody')}
                    </p>
                    <div className="bg-white p-4 rounded-lg shadow-md inline-block my-4">
                        <img
                            src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=LPA:1$rsp.truphone.com$"
                            alt="Device Compatibility Test QR Code"
                            width="200"
                            height="200"
                        />
                    </div>
                    <p className="font-semibold text-slate-700 dark:text-slate-200 mb-6">{t('testDeviceModalScanText')}</p>
                    <Button onClick={() => setIsTestDeviceModalOpen(false)}>{t('close')}</Button>
                </div>
            </Modal>

            <Modal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} title={t('contactUs')}>
                <div className="flex flex-col sm:flex-row items-center justify-around gap-6 py-4">
                    <a 
                        href="https://wa.me/233265393275"
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex flex-col items-center justify-center gap-3 p-6 w-40 h-40 bg-slate-100 dark:bg-slate-700 rounded-2xl hover:bg-green-100 dark:hover:bg-green-900/50 transition-all duration-300 transform hover:scale-105 group"
                        aria-label={t('chatOnWhatsApp')}
                    >
                        <WhatsappIcon className="h-16 w-16 text-green-500 transition-transform duration-300 group-hover:scale-110" />
                        <span className="font-semibold text-slate-700 dark:text-slate-200">{t('chatOnWhatsApp')}</span>
                    </a>
                    <a 
                        href="tel:+233265393275"
                        className="flex flex-col items-center justify-center gap-3 p-6 w-40 h-40 bg-slate-100 dark:bg-slate-700 rounded-2xl hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all duration-300 transform hover:scale-105 group"
                        aria-label={t('callUs')}
                    >
                        <PhoneIcon className="h-16 w-16 text-blue-500 transition-transform duration-300 group-hover:scale-110" />
                        <span className="font-semibold text-slate-700 dark:text-slate-200">{t('callUs')}</span>
                    </a>
                </div>
            </Modal>

            <Modal isOpen={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)} title={t('videosTitle')} size="lg">
                <div className="py-4">
                    <VideoSection />
                </div>
            </Modal>
        </main>
    );
};


const App: React.FC = () => {
    return (
        <ThemeProvider>
            <LanguageProvider>
                <AppContent />
            </LanguageProvider>
        </ThemeProvider>
    );
};

export default App;
