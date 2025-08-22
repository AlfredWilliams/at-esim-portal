import React, { useState, useEffect, useCallback } from 'react';
import { Page } from '../types';
import Button from './Button';
import EsimIllustration from './icons/EsimIllustration';
import { useTranslation } from '../contexts/LanguageContext';

interface HeroSliderProps {
    setPage: (page: Page) => void;
    openCompatModal: () => void;
}

const slideData = [
    {
        color: 'bg-gradient-to-r from-red-600 to-red-800',
        titleKey: 'hero1Title',
        subtitleKey: 'hero1Subtitle',
        buttonKey: 'hero1Button',
    },
    {
        color: 'bg-gradient-to-r from-slate-800 to-slate-900',
        titleKey: 'hero2Title',
        subtitleKey: 'hero2Subtitle',
        buttonKey: 'hero2Button',
    },
    {
        color: 'bg-gradient-to-r from-red-800 to-rose-900',
        titleKey: 'hero3Title',
        subtitleKey: 'hero3Subtitle',
        buttonKey: 'hero3Button',
    }
];


const HeroSlider: React.FC<HeroSliderProps> = ({ setPage, openCompatModal }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const { t } = useTranslation();
    const slides = slideData.map(slide => ({
        ...slide,
        title: t(slide.titleKey),
        subtitle: t(slide.subtitleKey),
        buttonText: t(slide.buttonKey),
    }));

    const nextSlide = useCallback(() => {
        setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
    }, [slides.length]);

    useEffect(() => {
        const slideInterval = setInterval(nextSlide, 5000);
        return () => clearInterval(slideInterval);
    }, [nextSlide]);
    
    const prevSlide = () => {
        setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    const handleButtonClick = (buttonKey: string) => {
        if (buttonKey === 'hero1Button') {
            openCompatModal();
        } else if (buttonKey === 'hero2Button') {
            document.getElementById('compatibility')?.scrollIntoView({ behavior: 'smooth' });
        } else {
            document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
        }
    };
    

    return (
        <section className="relative w-full h-[70vh] max-h-[750px] overflow-hidden text-white rounded-3xl">
            <div className="w-full h-full flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {slides.map((slide, index) => (
                    <div key={index} className={`w-full h-full flex-shrink-0 ${slide.color} flex items-center justify-center p-4`}>
                        { index === 0 ? (
                             <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center w-full max-w-6xl px-4 sm:px-6 lg:px-8">
                                <div className="text-center md:text-left animate-fade-in-up">
                                    <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 drop-shadow-lg">{slide.title}</h1>
                                    <p className="text-lg sm:text-xl mb-8 drop-shadow-md">{slide.subtitle}</p>
                                    <Button size="lg" variant="secondary" onClick={() => handleButtonClick(slide.buttonKey)}>
                                        {slide.buttonText}
                                    </Button>
                                </div>
                                <div className="hidden md:flex justify-center items-center animate-fade-in-up">
                                    <EsimIllustration className="w-full max-w-sm h-auto" />
                                </div>
                            </div>
                        ) : (
                            <div className="max-w-3xl mx-auto animate-fade-in-up text-center">
                                <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 drop-shadow-lg">{slide.title}</h1>
                                <p className="text-lg sm:text-xl mb-8 drop-shadow-md">{slide.subtitle}</p>
                                <Button size="lg" variant="secondary" onClick={() => handleButtonClick(slide.buttonKey)}>
                                    {slide.buttonText}
                                </Button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <button onClick={prevSlide} className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-30 p-2 rounded-full hover:bg-opacity-50 transition-colors z-10" aria-label="Previous slide">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button onClick={nextSlide} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-30 p-2 rounded-full hover:bg-opacity-50 transition-colors z-10" aria-label="Next slide">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
            
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                {slides.map((_, index) => (
                    <button 
                        key={index} 
                        onClick={() => goToSlide(index)} 
                        className={`h-1.5 rounded-full transition-all duration-500 ease-in-out ${currentSlide === index ? 'w-8 bg-white' : 'w-4 bg-white/50 hover:bg-white/75'}`} 
                        aria-label={`Go to slide ${index + 1}`}
                    ></button>
                ))}
            </div>
        </section>
    );
};

export default HeroSlider;