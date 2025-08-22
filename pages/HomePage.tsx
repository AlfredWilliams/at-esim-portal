

import React, { useState, useEffect } from 'react';
import { Page, FaqItem, Bundle } from '../types';
import { generateFaqs } from '../services/geminiService';
import FaqAccordion from '../components/FaqAccordion';
import HeroSlider from '../components/HeroSlider';
import DeviceIcon from '../components/icons/DeviceIcon';
import RequestIcon from '../components/icons/RequestIcon';
import ActivateIcon from '../components/icons/ActivateIcon';
import Toast from '../components/Toast';
import BlogSection from '../components/BlogSection';
import SpecialOffers from '../components/SpecialOffers';
import Footer from '../components/Footer';
import InfoIcon from '../components/icons/InfoIcon';
import Tooltip from '../components/Tooltip';
import { useTranslation } from '../contexts/LanguageContext';
import CompatibilityGuide from '../components/CompatibilityGuide';
import UserIcon from '../components/icons/UserIcon';
import ShieldIcon from '../components/icons/ShieldIcon';
import QuestionIcon from '../components/icons/QuestionIcon';

interface HomePageProps {
    setPage: (page: Page) => void;
    setSelectedBundle: (bundle: Bundle) => void;
    openCompatModal: () => void;
    openContactModal: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ setPage, setSelectedBundle, openCompatModal, openContactModal }) => {
    const [faqs, setFaqs] = useState<FaqItem[]>([]);
    const [isLoadingFaqs, setIsLoadingFaqs] = useState(true);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchFaqs = async () => {
            setIsLoadingFaqs(true);
            const generatedFaqs = await generateFaqs();
            setFaqs(generatedFaqs);
            setIsLoadingFaqs(false);
        };
        fetchFaqs();
    }, []);

    const stepData = [
        { icon: DeviceIcon, titleKey: 'stepCompatTitle', descriptionKey: 'stepCompatDesc' },
        { icon: RequestIcon, titleKey: 'stepRequestEsimTitle', descriptionKey: 'stepRequestEsimDesc' },
        { icon: UserIcon, titleKey: 'stepFillPersonalTitle', descriptionKey: 'stepFillPersonalDesc' },
        { icon: ShieldIcon, titleKey: 'stepVerifyIdentityTitle', descriptionKey: 'stepVerifyIdentityDesc' },
        { icon: QuestionIcon, titleKey: 'stepAnswerSecurityTitle', descriptionKey: 'stepAnswerSecurityDesc' },
        { icon: ActivateIcon, titleKey: 'stepProcessedTitle', descriptionKey: 'stepProcessedDesc' },
    ];
    const steps = stepData.map(step => ({ ...step, title: t(step.titleKey), description: t(step.descriptionKey) }));

    return (
        <div className="flex flex-col items-center w-full overflow-x-hidden">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
            
            <HeroSlider setPage={setPage} openCompatModal={openCompatModal} />

            {/* Notification Bar */}
            <div className="w-full bg-black text-white py-3 px-4 text-center text-sm font-medium">
                <p>{t('existingSubscriberNotice')}</p>
            </div>

            {/* How It Works Section */}
            <section id="how-it-works" className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-center gap-2 mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold">{t('howItWorksTitle')}</h2>
                        <Tooltip text={t('howItWorksTooltip')}>
                            <InfoIcon className="h-6 w-6 text-slate-400" />
                        </Tooltip>
                    </div>
                    <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-2 w-full">
                        {steps.flatMap((step, index) => {
                            const stepCard = (
                                <div 
                                    key={step.title} 
                                    className="relative z-10 flex flex-row lg:flex-col items-center w-full lg:flex-1 group cursor-pointer p-4 lg:p-6 rounded-xl transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2"
                                >
                                    <div className="bg-slate-50 dark:bg-slate-900 p-1 rounded-full transition-colors duration-300">
                                        <div className="bg-red-100 dark:bg-red-500/10 rounded-full p-4 transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:bg-red-200 dark:group-hover:bg-red-500/20">
                                            <step.icon className="h-10 w-10 text-red-600 dark:text-red-400" />
                                        </div>
                                    </div>
                                    <div className="ml-6 lg:ml-0 lg:mt-4 text-left lg:text-center flex-1">
                                        <h3 className="text-xl font-semibold mb-2 transition-colors duration-300 group-hover:text-red-600 dark:group-hover:text-red-400">{step.title}</h3>
                                        <p className="text-slate-500 dark:text-slate-400">{step.description}</p>
                                    </div>
                                </div>
                            );

                            if (index < steps.length - 1) {
                                const arrow = (
                                    <div key={`arrow-${index}`} className="flex-shrink-0 text-slate-300 dark:text-slate-600 transform rotate-90 lg:rotate-0">
                                        <svg className="w-10 h-10 lg:w-16 lg:h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                );
                                return [stepCard, arrow];
                            }
                            return [stepCard];
                        })}
                    </div>
                </div>
            </section>

            {/* eSIM Bundle Offers Section */}
            <section id="offers" className="w-full bg-slate-100 dark:bg-slate-800 py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
                <SpecialOffers setPage={setPage} setSelectedBundle={setSelectedBundle} openCompatModal={openCompatModal} />
            </section>

            {/* Device Compatibility Checker */}
            <section id="compatibility" className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
                <CompatibilityGuide />
            </section>
            
            {/* FAQ Section */}
            <section id="faq" className="w-full bg-slate-100 dark:bg-slate-800 py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">{t('faqTitle')}</h2>
                    {isLoadingFaqs ? (
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
                            <p className="mt-4 text-slate-500">{t('loadingFaqs')}</p>
                        </div>
                    ) : (
                        <FaqAccordion items={faqs} />
                    )}
                </div>
            </section>

            {/* Blog Section */}
            <section id="blog" className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
                <BlogSection />
            </section>

            <Footer onContactClick={openContactModal} />
        </div>
    );
};

export default HomePage;
