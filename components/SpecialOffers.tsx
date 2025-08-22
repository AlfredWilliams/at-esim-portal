
import React from 'react';
import { Page, Bundle } from '../types';
import Button from './Button';
import Card from './Card';
import Tooltip from './Tooltip';
import InfoIcon from './icons/InfoIcon';
import { useTranslation } from '../contexts/LanguageContext';

interface SpecialOffersProps {
    setPage: (page: Page) => void;
    setSelectedBundle: (bundle: Bundle) => void;
    openCompatModal: () => void;
}

const bundleData: (Omit<Bundle, 'name' | 'description'> & { minutesKey: string })[] = [
    { id: 'vibe-mini-offer', nameKey: 'bundleMiniName', data: '3 GB', price: 10, descriptionKey: 'bundleMiniDesc', minutesKey: 'bundleMinutes20' },
    { id: 'vibe-regular-offer', nameKey: 'bundleRegularName', data: '7 GB', price: 20, descriptionKey: 'bundleRegularDesc', minutesKey: 'bundleMinutes60' },
    { id: 'vibe-jumbo-offer', nameKey: 'bundleJumboName', data: '20 GB', price: 50, descriptionKey: 'bundleJumboDesc', minutesKey: 'bundleMinutes150' },
];

const SpecialOffers: React.FC<SpecialOffersProps> = ({ setPage, setSelectedBundle, openCompatModal }) => {
    const { t } = useTranslation();

    const handleSelectBundle = (bundle: Bundle) => {
        setSelectedBundle(bundle);
        openCompatModal();
    };
    
    const bundles: Bundle[] = bundleData.map(b => ({
        ...b,
        name: t(b.nameKey),
        description: t(b.descriptionKey),
    }));

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
                <h2 className="text-3xl sm:text-4xl font-bold text-center">
                    {t('offersTitlePart1')}
                    <span className="text-red-600">{t('offersTitlePart2Highlight')}</span>
                    {t('offersTitlePart3')}
                </h2>
                <Tooltip text={t('offersTooltip')}>
                    <InfoIcon className="h-6 w-6 text-slate-400" />
                </Tooltip>
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-300 text-center mb-12">{t('offersSubtitle')}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {bundleData.map((bundle) => {
                    const isPopular = bundle.nameKey === 'bundleJumboName';

                    return (
                        <Card 
                            key={bundle.id} 
                            className={`relative text-center p-8 flex flex-col ${isPopular ? 'border-2 border-red-500 shadow-red-500/20 hover:shadow-red-500/30' : ''}`}
                        >
                            {isPopular && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                                    {t('mostPopular')}
                                </div>
                            )}
                            <h2 className="text-2xl font-bold text-red-600 mb-2">{t(bundle.nameKey)}</h2>
                            <p className="text-5xl font-extrabold text-slate-800 dark:text-white mb-1">{bundle.data}</p>
                            <p className="text-lg font-semibold text-slate-600 dark:text-slate-400 mb-4">{t(bundle.minutesKey)}</p>
                            <p className="text-slate-500 dark:text-slate-400 mb-6 flex-grow">{t(bundle.descriptionKey)}</p>
                            <p className="text-2xl font-bold text-slate-800 dark:text-white mb-6">₵{bundle.price}</p>
                            <div className="mt-auto">
                                <Button onClick={() => handleSelectBundle(bundle as Bundle)} className="w-full">
                                    {t('selectPlanOffer')}
                                </Button>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};

export default SpecialOffers;
