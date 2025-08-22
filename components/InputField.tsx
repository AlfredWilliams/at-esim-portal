import React from 'react';

interface InputFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
    label: string;
    error?: string;
    prefix?: React.ReactNode;
}

const InputField: React.FC<InputFieldProps> = ({ label, id, error, prefix, ...props }) => {
    return (
        <div className="w-full">
            {label && <label htmlFor={id} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{label}</label>}
            <div className="relative">
                {prefix && (
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-slate-500 dark:text-slate-400 sm:text-sm">{prefix}</span>
                    </div>
                )}
                <input
                    id={id}
                    className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 sm:text-sm transition-colors duration-200 ${
                        prefix ? 'pl-7' : ''
                    } ${
                        error 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-slate-300 dark:border-slate-600 focus:ring-red-500 focus:border-red-500 dark:bg-slate-700'
                    }`}
                    {...props}
                />
            </div>
            {error && <p className="mt-1 text-xs text-red-600 dark:text-red-500">{error}</p>}
        </div>
    );
};

export default InputField;