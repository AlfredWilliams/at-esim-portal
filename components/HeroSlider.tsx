import React, { useState, useEffect, useCallback, useRef } from 'react';
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

const PauseIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 9v6m4-6v6" />
    </svg>
);

const PlayIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
    </svg>
);


const HeroSlider: React.FC<HeroSliderProps> = ({ setPage, openCompatModal }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const { t } = useTranslation();
    const slides = slideData.map(slide => ({
        ...slide,
        title: t(slide.titleKey),
        subtitle: t(slide.subtitleKey),
        buttonText: t(slide.buttonKey),
    }));

    // State and refs for dragging/swiping
    const [isDragging, setIsDragging] = useState(false);
    const [startPos, setStartPos] = useState(0);
    const [currentTranslate, setCurrentTranslate] = useState(0);
    const sliderRef = useRef<HTMLDivElement>(null);
    const wasPlayingRef = useRef(true);
    const draggedRef = useRef(false);

    const nextSlide = useCallback(() => {
        setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
    }, [slides.length]);

    useEffect(() => {
        if (isPlaying) {
            const slideInterval = setInterval(nextSlide, 5000);
            return () => clearInterval(slideInterval);
        }
    }, [nextSlide, isPlaying]);
    
    const prevSlide = () => {
        setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    const togglePlayPause = () => {
        setIsPlaying(prev => !prev);
    };

    const handleButtonClick = (buttonKey: string) => {
        if (draggedRef.current) return; // Prevent click after drag
        if (buttonKey === 'hero1Button') {
            openCompatModal();
        } else if (buttonKey === 'hero2Button') {
            document.getElementById('compatibility')?.scrollIntoView({ behavior: 'smooth' });
        } else {
            document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
        }
    };
    
    // Swipe/Drag handlers
    const getPositionX = (event: TouchEvent | MouseEvent) => {
        return event.type.includes('mouse')
            ? (event as MouseEvent).clientX
            : (event as TouchEvent).touches[0].clientX;
    };

    const handleDragStart = (e: React.TouchEvent | React.MouseEvent) => {
        draggedRef.current = false;
        wasPlayingRef.current = isPlaying;
        if (isPlaying) setIsPlaying(false);

        setIsDragging(true);
        setStartPos(getPositionX(e.nativeEvent));
    };

    const handleDragMove = (e: React.TouchEvent | React.MouseEvent) => {
        if (!isDragging) return;
        const currentPosition = getPositionX(e.nativeEvent);
        const move = currentPosition - startPos;

        if (Math.abs(move) > 5) { // Threshold to consider it a drag
            draggedRef.current = true;
        }

        setCurrentTranslate(move);
    };

    const handleDragEnd = () => {
        if (!isDragging) return;

        const sliderWidth = sliderRef.current?.offsetWidth || 0;
        const threshold = sliderWidth / 4;

        if (currentTranslate < -threshold) {
            nextSlide();
        } else if (currentTranslate > threshold) {
            prevSlide();
        }
        
        setCurrentTranslate(0);
        setIsDragging(false);

        if (wasPlayingRef.current) {
            // Use a short timeout to let other state updates finish
            setTimeout(() => {
                setIsPlaying(true);
            });
        }
    };

    const sliderStyle = {
        transform: `translateX(calc(-${currentSlide * 100}% + ${currentTranslate}px))`,
        transition: isDragging ? 'none' : 'transform 0.7s ease-in-out',
        cursor: isDragging ? 'grabbing' : 'grab',
    };

    return (
        <section 
            className="relative w-full h-[70vh] max-h-[750px] overflow-hidden text-white rounded-3xl touch-pan-y"
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
        >
            <div 
                ref={sliderRef}
                className="w-full h-full flex" 
                style={sliderStyle}
            >
                {slides.map((slide, index) => (
                    <div key={index} className={`w-full h-full flex-shrink-0 ${slide.color} flex items-center justify-center p-4 select-none`}>
                        { index === 0 ? (
                             <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center w-full max-w-6xl px-4 sm:px-6 lg:px-8">
                                <div className="text-center md:text-left animate-fade-in-up">
                                    <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 drop-shadow-lg">{slide.title}</h1>
                                    <p className="text-lg sm:text-xl mb-8 drop-shadow-md">{slide.subtitle}</p>
                                    <Button 
                                        size="lg" 
                                        variant="secondary" 
                                        onClick={() => handleButtonClick(slide.buttonKey)}
                                        onMouseDown={(e) => e.stopPropagation()}
                                        onTouchStart={(e) => e.stopPropagation()}
                                    >
                                        {slide.buttonText}
                                    </Button>
                                </div>
                                <div className="hidden md:flex justify-center items-center animate-fade-in-up">
                                    <EsimIllustration className="w-full max-w-sm h-auto pointer-events-none" />
                                </div>
                            </div>
                        ) : (
                            <div className="max-w-3xl mx-auto animate-fade-in-up text-center">
                                <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 drop-shadow-lg">{slide.title}</h1>
                                <p className="text-lg sm:text-xl mb-8 drop-shadow-md">{slide.subtitle}</p>
                                <Button 
                                    size="lg" 
                                    variant="secondary" 
                                    onClick={() => handleButtonClick(slide.buttonKey)}
                                    onMouseDown={(e) => e.stopPropagation()}
                                    onTouchStart={(e) => e.stopPropagation()}
                                >
                                    {slide.buttonText}
                                </Button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <button 
                onClick={prevSlide} 
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-30 p-2 rounded-full hover:bg-opacity-50 transition-all duration-300 z-10 opacity-0 md:opacity-100" 
                aria-label="Previous slide"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button 
                onClick={nextSlide} 
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-30 p-2 rounded-full hover:bg-opacity-50 transition-all duration-300 z-10 opacity-0 md:opacity-100" 
                aria-label="Next slide"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
            
            <div 
                className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-10"
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
            >
                {slides.map((_, index) => (
                    <button 
                        key={index} 
                        onClick={() => goToSlide(index)} 
                        className={`h-1.5 rounded-full transition-all duration-500 ease-in-out ${currentSlide === index ? 'w-8 bg-white' : 'w-4 bg-white/50 hover:bg-white/75'}`} 
                        aria-label={`Go to slide ${index + 1}`}
                    ></button>
                ))}
            </div>

            <button
                onClick={togglePlayPause}
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                className="absolute bottom-4 left-4 bg-black bg-opacity-30 p-2 rounded-full hover:bg-opacity-50 transition-all duration-300 z-10"
                aria-label={isPlaying ? 'Pause slider' : 'Play slider'}
            >
                {isPlaying ? <PauseIcon className="h-6 w-6" /> : <PlayIcon className="h-6 w-6" />}
            </button>
        </section>
    );
};

export default HeroSlider;