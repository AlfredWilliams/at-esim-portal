
import React, { useState } from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import Card from './Card';
import DialerIcon from './icons/DialerIcon';
import IosGuideIcon from './icons/IosGuideIcon';
import AndroidGuideIcon from './icons/AndroidGuideIcon';
import InfoIcon from './icons/InfoIcon';
import Tooltip from './Tooltip';
import EidScreenIcon from './icons/EidScreenIcon';

// Local icons for slider navigation
const ChevronLeftIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
);

const ChevronRightIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
);


const CompatibilityGuide: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'ios' | 'android'>('ios');
    const [dialerSlide, setDialerSlide] = useState(0);
    const { t } = useTranslation();

    const renderContent = () => {
        const guideIcon = activeTab === 'ios' 
            ? <IosGuideIcon className="h-auto max-h-[400px] w-full max-w-xs mx-auto text-slate-600 dark:text-slate-400" /> 
            : <AndroidGuideIcon className="h-auto w-full max-w-md mx-auto text-slate-600 dark:text-slate-400" />;
        const stepsKey = activeTab === 'ios' ? 'compatIosSteps' : 'compatAndroidSteps';
        const steps = t(stepsKey).split('|');
        const noteKey = activeTab === 'ios' ? null : 'androidCompatNote';
        
        return (
            <div className={`mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-fade-in-up`} key={activeTab}>
                <div className="text-center md:text-left">
                    <h3 className="text-xl font-bold mb-4">{t('compatMethod2Title')}</h3>
                    <ol className="list-decimal list-inside space-y-3 text-slate-600 dark:text-slate-300">
                        {steps.map((step, index) => (
                            <li key={index} dangerouslySetInnerHTML={{ __html: step }}></li>
                        ))}
                    </ol>
                    {noteKey && (
                         <div className="mt-4 p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-700">
                            <p className="text-sm text-slate-600 dark:text-slate-300" dangerouslySetInnerHTML={{ __html: t(noteKey) }}></p>
                        </div>
                    )}
                </div>
                <div className="flex justify-center items-center p-4">
                    {guideIcon}
                </div>
            </div>
        );
    };

    return (
        <div className="max-w-4xl mx-auto">
             <div className="flex items-center justify-center gap-2 mb-4">
                <h2 className="text-3xl sm:text-4xl font-bold text-center">{t('compatGuideTitle')}</h2>
                 <Tooltip text={t('compatTooltip')}>
                    <InfoIcon className="h-6 w-6 text-slate-400" />
                </Tooltip>
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-300 text-center mb-12">{t('compatGuideSubtitle')}</p>

            <Card className="p-6 md:p-8">
                <h3 className="text-xl font-bold mb-4 text-center md:text-left">{t('compatMethod1Title')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <ol className="list-decimal list-inside space-y-3 text-slate-600 dark:text-slate-300">
                        <li dangerouslySetInnerHTML={{ __html: t('compatMethod1Step1') }} />
                        <li dangerouslySetInnerHTML={{ __html: t('compatMethod1Step2') }} />
                    </ol>
                    <div className="flex justify-center items-center py-4">
                        <div className="relative w-48 h-80">
                            <div className="relative h-full w-full overflow-hidden">
                                <div 
                                    className="flex h-full transition-transform duration-500 ease-in-out" 
                                    style={{ transform: `translateX(-${dialerSlide * 100}%)` }}
                                >
                                    {/* Slide 1: Dialer */}
                                    <div className="w-full flex-shrink-0 flex justify-center items-center p-2">
                                        <DialerIcon className="h-full w-auto text-slate-500 dark:text-slate-400" />
                                    </div>
                                    {/* Slide 2: EID Screen */}
                                    <div className="w-full flex-shrink-0 flex justify-center items-center p-2">
                                        <EidScreenIcon className="h-full w-auto text-slate-500 dark:text-slate-400" />
                                    </div>
                                </div>
                            </div>

                            {/* Navigation Arrows */}
                            <button
                                onClick={() => setDialerSlide(dialerSlide - 1)}
                                disabled={dialerSlide === 0}
                                className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-100/80 dark:bg-slate-700/80 p-1.5 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 disabled:opacity-0 disabled:cursor-not-allowed transition-all shadow-md z-10"
                                aria-label="Previous slide"
                            >
                                <ChevronLeftIcon className="h-5 w-5" />
                            </button>
                            <button
                                onClick={() => setDialerSlide(dialerSlide + 1)}
                                disabled={dialerSlide === 1}
                                className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-100/80 dark:bg-slate-700/80 p-1.5 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 disabled:opacity-0 disabled:cursor-not-allowed transition-all shadow-md z-10"
                                aria-label="Next slide"
                            >
                                <ChevronRightIcon className="h-5 w-5" />
                            </button>

                            {/* Dots */}
                            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                <button onClick={() => setDialerSlide(0)} className={`w-2 h-2 rounded-full transition-all ${dialerSlide === 0 ? 'bg-red-600 scale-125' : 'bg-slate-300 dark:bg-slate-600 hover:bg-slate-400'}`} aria-label="Go to slide 1" />
                                <button onClick={() => setDialerSlide(1)} className={`w-2 h-2 rounded-full transition-all ${dialerSlide === 1 ? 'bg-red-600 scale-125' : 'bg-slate-300 dark:bg-slate-600 hover:bg-slate-400'}`} aria-label="Go to slide 2" />
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            <div className="mt-12">
                 <div className="flex justify-center border-b border-slate-200 dark:border-slate-700 mb-8">
                    <button onClick={() => setActiveTab('ios')} className={`px-6 py-3 text-lg font-semibold transition-all duration-300 border-b-2 ${activeTab === 'ios' ? 'border-red-600 text-red-600 dark:text-red-500' : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`} aria-label={t('ios')}>
                        {t('ios')}
                    </button>
                    <button onClick={() => setActiveTab('android')} className={`px-6 py-3 text-lg font-semibold transition-all duration-300 border-b-2 ${activeTab === 'android' ? 'border-red-600 text-red-600 dark:text-red-500' : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`} aria-label={t('android')}>
                        {t('android')}
                    </button>
                </div>
                {renderContent()}
            </div>
        </div>
    );
};

export default CompatibilityGuide;
