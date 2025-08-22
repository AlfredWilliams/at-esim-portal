

import React, { useState } from 'react';
import { Page, Bundle } from '../types';
import Button from '../components/Button';
import InputField from '../components/InputField';
import Card from '../components/Card';
import { useTranslation } from '../contexts/LanguageContext';

interface PaymentPageProps {
    setPage: (page: Page) => void;
    selectedBundle: Bundle | null;
}

type PaymentMethod = 'mobile-money' | 'card';

const PaymentPage: React.FC<PaymentPageProps> = ({ setPage, selectedBundle }) => {
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('mobile-money');
    const [isLoading, setIsLoading] = useState(false);
    const { t } = useTranslation();

    const handleCheckout = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call for payment processing
        setTimeout(() => {
            setIsLoading(false);
            setPage('activation');
        }, 3000);
    };

    if (!selectedBundle) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
                <h2 className="text-2xl font-bold mb-4">{t('noBundleSelected')}</h2>
                <p className="mb-8">{t('noBundleSelectedSubtitle')}</p>
                <Button onClick={() => setPage('bundles')}>{t('chooseBundle')}</Button>
            </div>
        );
    }
    
    const renderPaymentForm = () => {
        if (paymentMethod === 'mobile-money') {
            return (
                <div className="space-y-4">
                    <InputField label={t('momoNumber')} id="momo-number" type="tel" placeholder="024 123 4567" required />
                    <div>
                        <label htmlFor="network" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('network')}</label>
                        <select id="network" className="w-full p-2 border rounded-md dark:bg-slate-700 border-slate-300 dark:border-slate-600">
                            <option>MTN Mobile Money</option>
                            <option>Vodafone Cash</option>
                            <option>AT Money</option>
                        </select>
                    </div>
                </div>
            );
        }
        
        if (paymentMethod === 'card') {
            return (
                <div className="space-y-4">
                    <InputField label={t('cardNumber')} id="card-number" placeholder="**** **** **** ****" required/>
                    <InputField label={t('cardholderName')} id="card-name" placeholder="John Doe" required/>
                    <div className="flex gap-4">
                        <InputField label={t('expiryDate')} id="expiry" placeholder="MM/YY" required/>
                        <InputField label="CVC" id="cvc" placeholder="123" required/>
                    </div>
                </div>
            )
        }
        return null;
    }

    return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-900 flex items-center justify-center p-4 pt-28 md:pt-24">
            <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Payment Form Side */}
                <Card className="p-8">
                    <h1 className="text-3xl font-bold mb-6">{t('secureCheckout')}</h1>
                    <div className="flex border border-slate-300 dark:border-slate-600 rounded-lg p-1 mb-6">
                        <button onClick={() => setPaymentMethod('mobile-money')} className={`w-1/2 p-2 rounded-md transition-colors ${paymentMethod === 'mobile-money' ? 'bg-red-600 text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-700'}`}>{t('mobileMoney')}</button>
                        <button onClick={() => setPaymentMethod('card')} className={`w-1/2 p-2 rounded-md transition-colors ${paymentMethod === 'card' ? 'bg-red-600 text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-700'}`}>Visa/Mastercard</button>
                    </div>
                    
                    <form onSubmit={handleCheckout}>
                        {renderPaymentForm()}
                        <Button type="submit" isLoading={isLoading} className="w-full mt-8" size="lg">
                            {isLoading ? t('processingPayment') : t('payAmount', { amount: selectedBundle.price.toString() })}
                        </Button>
                    </form>
                </Card>

                {/* Order Summary Side */}
                <Card className="p-8">
                    <h2 className="text-2xl font-bold border-b border-slate-200 dark:border-slate-700 pb-4 mb-4">{t('orderSummary')}</h2>
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <span className="text-slate-500 dark:text-slate-400">{t('bundle')}:</span>
                            <span className="font-semibold">{t(selectedBundle.nameKey)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500 dark:text-slate-400">{t('data')}:</span>
                            <span className="font-semibold">{selectedBundle.data}</span>
                        </div>
                        <div className="flex justify-between border-t border-slate-200 dark:border-slate-700 pt-4 mt-4 text-xl">
                            <span className="font-bold">{t('total')}:</span>
                            <span className="font-bold text-red-600">₵{selectedBundle.price.toFixed(2)}</span>
                        </div>
                    </div>
                    <div className="mt-8 p-4 bg-slate-100 dark:bg-slate-700 rounded-lg text-sm text-slate-600 dark:text-slate-300">
                        <p>{t('paymentDisclaimer')}</p>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default PaymentPage;