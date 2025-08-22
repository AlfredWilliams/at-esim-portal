import React from 'react';

interface StepProgressBarProps {
    steps: string[];
    currentStep: number;
}

const StepProgressBar: React.FC<StepProgressBarProps> = ({ steps, currentStep }) => {
    return (
        <div className="w-full px-4 sm:px-0">
            <ol className="flex items-center w-full">
                {steps.map((step, index) => {
                    const stepIndex = index + 1;
                    const isCompleted = stepIndex < currentStep;
                    const isActive = stepIndex === currentStep;

                    return (
                        <li key={step} className={`relative flex w-full items-center ${index < steps.length - 1 ? "after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block" : ""} ${isCompleted ? 'after:border-red-600' : 'after:border-slate-200 dark:after:border-slate-700'}`}>
                            <div className="flex items-center justify-center w-10 h-10 rounded-full shrink-0 transition-colors duration-300
                                ${isCompleted ? 'bg-red-600 text-white' : ''}
                                ${isActive ? 'bg-red-200 dark:bg-red-800 border-2 border-red-600' : ''}
                                ${!isCompleted && !isActive ? 'bg-slate-200 dark:bg-slate-700' : ''}
                            ">
                                {isCompleted ? (
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <span className={`${isActive ? 'text-red-600 dark:text-red-300 font-bold' : 'text-slate-600 dark:text-slate-400'}`}>{stepIndex}</span>
                                )}
                            </div>
                            <span className={`absolute top-12 sm:top-full sm:left-1/2 sm:-translate-x-1/2 sm:mt-2 text-xs sm:text-sm font-medium text-center ${isActive ? 'text-red-600 dark:text-red-300' : 'text-slate-500 dark:text-slate-400'}`}>{step}</span>
                        </li>
                    );
                })}
            </ol>
        </div>
    );
};

export default StepProgressBar;