
import React, { useState } from 'react';
import InputField from './InputField';
import Button from './Button';
import { useTranslation } from '../contexts/LanguageContext';

const NewsletterSubscribe: React.FC = () => {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            setStatus('error');
            setMessage(t('newsletterError'));
            return;
        }

        setStatus('loading');
        setMessage('');

        // Simulate network request
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Simulate a successful response
        setStatus('success');
        setMessage(t('newsletterSuccessMsg', { email }));
        setEmail('');
    };

    if (status === 'success') {
        return (
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/50 border-green-500 border rounded-lg">
                <div className="mx-auto bg-green-100 dark:bg-green-500/10 rounded-full h-16 w-16 flex items-center justify-center mb-4">
                     <svg className="h-10 w-10 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-green-800 dark:text-green-200">{t('newsletterSuccessTitle')}</h3>
                <p className="text-slate-600 dark:text-slate-300">{message}</p>
            </div>
        );
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-end gap-4">
                <div className="w-full">
                     <InputField 
                        label=""
                        id="newsletter-email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={status === 'error' ? message : undefined}
                        aria-label="Email for newsletter"
                     />
                </div>
                <Button type="submit" isLoading={status === 'loading'} className="w-full sm:w-auto">
                    {t('subscribe')}
                </Button>
            </form>
        </div>
    );
};

export default NewsletterSubscribe;
