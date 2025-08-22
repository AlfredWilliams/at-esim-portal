import React, { useState } from 'react';
import { BlogPost } from '../types';
import BlogCard from './BlogCard';
import Modal from './Modal';
import Tooltip from './Tooltip';
import InfoIcon from './icons/InfoIcon';
import { useTranslation } from '../contexts/LanguageContext';

const blogPosts: BlogPost[] = [
    {
        id: 1,
        imageUrl: 'https://picsum.photos/seed/tech/400/300',
        category: 'Technology',
        title: 'The Ultimate Guide to eSIMs: Everything You Need to Know',
        excerpt: 'Dive deep into how eSIM technology works and why it’s the future of mobile connectivity for all your devices.',
        content: 'eSIMs, or embedded SIMs, are a revolutionary step forward in mobile technology. Unlike traditional physical SIM cards that you need to insert into your device, an eSIM is a small chip built directly into your phone, watch, or tablet. This digital-first approach eliminates the need to handle tiny plastic cards, making it easier to switch carriers or plans. The activation process is entirely digital, usually involving scanning a QR code provided by the carrier. This not only simplifies setup but also enhances security, as the SIM profile cannot be physically removed or stolen. For frequent travelers, eSIMs are a game-changer, allowing you to store multiple carrier profiles on a single device and switch between them effortlessly, avoiding costly roaming charges.',
        publishedDate: '2024-07-22T10:00:00Z',
    },
    {
        id: 2,
        imageUrl: 'https://picsum.photos/seed/travel/400/300',
        category: 'Travel',
        title: 'How to Save on Roaming Charges with an eSIM',
        excerpt: 'Traveling abroad? Learn how an eSIM can help you stay connected without the expensive roaming fees.',
        content: 'One of the biggest headaches for international travelers is managing mobile connectivity and avoiding exorbitant roaming fees. This is where eSIM technology shines. Instead of buying a local physical SIM card upon arrival or paying high prices for your home carrier\'s international plan, you can purchase a local or regional data plan for your destination before you even leave home. Companies like AT offer competitive eSIM data bundles for various countries and regions. You can activate the plan the moment you land, giving you instant access to data for maps, communication, and more. This flexibility allows you to stay connected like a local, often at a fraction of the cost of traditional roaming.',
        publishedDate: '2024-07-15T14:30:00Z',
    },
    {
        id: 3,
        imageUrl: 'https://picsum.photos/seed/news/400/300',
        category: 'Company News',
        title: 'AT Expands eSIM Support to New Devices',
        excerpt: 'We are excited to announce that our eSIM services are now available for an even wider range of smartphones.',
        content: 'At AT, we are committed to bringing the latest connectivity solutions to our customers. We are thrilled to announce a significant expansion of our eSIM compatibility list. In addition to the latest iPhones, Samsung Galaxy, and Google Pixel devices, our eSIM platform now supports a growing number of devices from manufacturers like Huawei, Motorola, and Oppo. This expansion means more users can enjoy the convenience, security, and flexibility of AT eSIMs. To check if your specific device is supported, please use our compatibility checker tool on the homepage. We are continuously working with device manufacturers to broaden our support, so stay tuned for more updates!',
        publishedDate: '2024-07-10T09:00:00Z',
    },
];

// Local icons for slider navigation
const ChevronLeftIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
);

const ChevronRightIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
);


const BlogSection: React.FC = () => {
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const { t } = useTranslation();

    const handleCardClick = (post: BlogPost) => {
        setSelectedPost(post);
    };

    const closeModal = () => {
        setSelectedPost(null);
    };

    const nextSlide = () => {
        setCurrentSlide(prev => (prev === blogPosts.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide(prev => (prev === 0 ? blogPosts.length - 1 : prev - 1));
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };


    return (
        <>
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-center gap-2 mb-4">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center">{t('blogTitle')}</h2>
                    <Tooltip text={t('blogTooltip')}>
                        <InfoIcon className="h-6 w-6 text-slate-400" />
                    </Tooltip>
                </div>
                <p className="text-lg text-slate-600 dark:text-slate-300 text-center mb-12">{t('blogSubtitle')}</p>
                
                {/* Mobile Slider View */}
                <div className="md:hidden relative px-4 pb-8">
                    <div className="overflow-hidden rounded-xl">
                        <div 
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                        >
                            {blogPosts.map(post => (
                                <div key={`${post.id}-slider`} className="w-full flex-shrink-0 px-2">
                                    <BlogCard post={post} onCardClick={handleCardClick} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation */}
                    <button
                        onClick={prevSlide}
                        className="absolute top-1/2 left-0 -translate-y-1/2 bg-white/60 dark:bg-slate-800/60 p-2 rounded-full hover:bg-white/90 dark:hover:bg-slate-800/90 transition-all duration-300 z-10 shadow-lg backdrop-blur-sm"
                        aria-label="Previous blog post"
                    >
                        <ChevronLeftIcon className="h-6 w-6 text-slate-800 dark:text-slate-200" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute top-1/2 right-0 -translate-y-1/2 bg-white/60 dark:bg-slate-800/60 p-2 rounded-full hover:bg-white/90 dark:hover:bg-slate-800/90 transition-all duration-300 z-10 shadow-lg backdrop-blur-sm"
                        aria-label="Next blog post"
                    >
                        <ChevronRightIcon className="h-6 w-6 text-slate-800 dark:text-slate-200" />
                    </button>
            
                    {/* Dots */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                        {blogPosts.map((_, index) => (
                            <button 
                                key={index} 
                                onClick={() => goToSlide(index)} 
                                className={`h-2 rounded-full transition-all duration-500 ease-in-out ${currentSlide === index ? 'w-6 bg-red-600' : 'w-2 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400'}`} 
                                aria-label={`Go to blog post ${index + 1}`}
                            ></button>
                        ))}
                    </div>
                </div>

                {/* Desktop Grid View */}
                <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map(post => (
                        <BlogCard key={post.id} post={post} onCardClick={handleCardClick} />
                    ))}
                </div>
            </div>
            {selectedPost && (
                <Modal isOpen={!!selectedPost} onClose={closeModal} title={selectedPost.title}>
                    <div className="max-h-[75vh] overflow-y-auto pr-4">
                        <img 
                            src={selectedPost.imageUrl} 
                            alt={`Image for ${selectedPost.title}`}
                            className="w-full h-56 object-cover rounded-lg mb-4" 
                        />
                        <div className="flex items-center justify-between mb-4">
                            <p className="text-sm font-semibold text-red-600 uppercase tracking-wider">{selectedPost.category}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                {new Date(selectedPost.publishedDate).toLocaleString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: '2-digit',
                                    hour12: true,
                                })}
                            </p>
                        </div>
                        <div className="space-y-4 text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                           <p>{selectedPost.content}</p>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    );
};

export default BlogSection;