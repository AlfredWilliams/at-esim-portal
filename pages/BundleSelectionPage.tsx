

import React, { useState } from 'react';
import { Page, Bundle } from '../types';
import Button from '../components/Button';
import Card from '../components/Card';
import Modal from '../components/Modal';
import { useTranslation } from '../contexts/LanguageContext';

interface BundleSelectionPageProps {
    setPage: (page: Page) => void;
    setSelectedBundle: (bundle: Bundle) => void;
}

const bundleData: Bundle[] = [
    { id: 'vibe-mini', nameKey: 'bundleMiniName', data: '3 GB', price: 10, descriptionKey: 'bundleMiniDesc' },
    { id: 'vibe-regular', nameKey: 'bundleRegularName', data: '7 GB', price: 20, descriptionKey: 'bundleRegularDesc' },
    { id: 'vibe-jumbo', nameKey: 'bundleJumboName', data: '20 GB', price: 50, descriptionKey: 'bundleJumboDesc' },
];

const BundleSelectionPage: React.FC<BundleSelectionPageProps> = ({ setPage, setSelectedBundle }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bundleToConfirm, setBundleToConfirm] = useState<Bundle | null>(null);
    const { t } = useTranslation();

    const handleSelectClick = (bundle: Bundle) => {
        setBundleToConfirm(bundle);
        setIsModalOpen(true);
    };

    const handleConfirm = () => {
        if (bundleToConfirm) {
            setSelectedBundle(bundleToConfirm);
            setPage('payment');
        }
        setIsModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-900 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 pt-28 md:pt-24">
            <div className="w-full max-w-5xl mx-auto text-center">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-white mb-4">{t('chooseYourPlan')}</h1>
                <p className="text-lg text-slate-600 dark:text-slate-300 mb-12">{t('chooseYourPlanSubtitle')}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {bundleData.map((bundle) => (
                        <Card key={bundle.id} className="text-center p-8 flex flex-col">
                            <h2 className="text-2xl font-bold text-red-600 mb-2">{t(bundle.nameKey)}</h2>
                            <p className="text-5xl font-extrabold text-slate-800 dark:text-white mb-2">{bundle.data}</p>
                            <p className="text-slate-500 dark:text-slate-400 mb-6">{t(bundle.descriptionKey)}</p>
                            <p className="text-2xl font-bold text-slate-800 dark:text-white mb-6">₵{bundle.price}</p>
                            <div className="mt-auto">
                                <Button onClick={() => handleSelectClick(bundle)} className="w-full">{t('selectPlan')}</Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={t('confirmSelection')}>
                {bundleToConfirm && (
                    <>
                        <p className="text-slate-600 dark:text-slate-300 mb-4" dangerouslySetInnerHTML={{ __html: t('confirmSelectionBody', { planName: `<span class="font-bold text-red-600">${t(bundleToConfirm.nameKey)}</span>`, data: `<span class="font-bold">${bundleToConfirm.data}</span>`, price: `<span class="font-bold">₵${bundleToConfirm.price}</span>` }) }} />
                        <p className="text-slate-600 dark:text-slate-300">{t('confirmSelectionPrompt')}</p>
                        <div className="mt-6 flex justify-end space-x-4">
                            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>{t('cancel')}</Button>
                            <Button onClick={handleConfirm}>{t('confirmAndPay')}</Button>
                        </div>
                    </>
                )}
            </Modal>
        </div>
    );
};

export default BundleSelectionPage;