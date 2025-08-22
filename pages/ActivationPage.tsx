import React from 'react';
import { Page } from '../types';
import Button from '../components/Button';
import Card from '../components/Card';
import { useTranslation } from '../contexts/LanguageContext';
import CheckCircleIcon from '../components/icons/CheckCircleIcon';

interface ActivationPageProps {
    setPage: (page: Page) => void;
}

const ActivationPage: React.FC<ActivationPageProps> = ({ setPage }) => {
    const { t } = useTranslation();
    
    const setupInstructionKeys = [
        'activationInstruction1',
        'activationInstruction2',
        'activationInstruction3',
        'activationInstruction4',
        'activationInstruction5',
    ];
    const setupInstructions = setupInstructionKeys.map(key => t(key));
    
    return (
        <div className="min-h-screen bg-green-50 dark:bg-slate-900 flex items-center justify-center p-4 pt-28 md:pt-24">
            <Card className="w-full max-w-2xl text-center p-8 md:p-12">
                <div className="mx-auto bg-green-100 dark:bg-green-500/10 rounded-full h-20 w-20 flex items-center justify-center mb-6">
                    <CheckCircleIcon className="h-12 w-12 text-green-600 dark:text-green-400" />
                </div>
                <h1 className="text-3xl font-bold text-green-800 dark:text-green-300 mb-3">{t('activationTitle')}</h1>
                <p className="text-slate-600 dark:text-slate-300 mb-8">{t('activationSubtitle')}</p>

                <div className="space-y-8">
                    <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                        <p className="font-semibold text-slate-700 dark:text-slate-200">{t('activationEmailNotice')}</p>
                    </div>

                    {/* Instructions Section */}
                    <div className="text-left bg-white dark:bg-slate-800/50 p-6 rounded-lg">
                        <h2 className="text-xl font-semibold mb-3">{t('setupInstructions')}</h2>
                        <ul className="space-y-2 text-slate-500 dark:text-slate-400">
                            {setupInstructions.map((step, index) => (
                                <li key={index} className="flex items-start">
                                    <span className="bg-red-600 text-white rounded-full h-6 w-6 flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">{index + 1}</span>
                                    <span>{step}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-12 border-t border-slate-200 dark:border-slate-700 pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                     <p className="text-slate-500 dark:text-slate-400">{t('havingTrouble')}</p>
                     <Button variant="secondary" onClick={() => window.open('https://wa.me/1234567890', '_blank')}>{t('contactSupport')}</Button>
                     <Button variant="ghost" onClick={() => setPage('home')}>{t('backToHome')}</Button>
                </div>
            </Card>
        </div>
    );
};

export default ActivationPage;