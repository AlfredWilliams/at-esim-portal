import React from 'react';
import { BlogPost } from '../types';
import Card from './Card';
import { useTranslation } from '../contexts/LanguageContext';

interface BlogCardProps {
    post: BlogPost;
    onCardClick: (post: BlogPost) => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, onCardClick }) => {
    const { t } = useTranslation();
    return (
        <div onClick={() => onCardClick(post)} className="h-full cursor-pointer">
            <Card className="flex flex-col group h-full">
                <div className="relative overflow-hidden rounded-t-xl">
                    <img 
                        src={post.imageUrl} 
                        alt={`Image for ${post.title}`}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out" 
                    />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                    <p className="text-sm font-semibold text-red-600 uppercase mb-2 tracking-wider">{post.category}</p>
                    <h3 className="text-xl font-bold mb-3 flex-grow text-slate-800 dark:text-white group-hover:text-red-600 transition-colors duration-300">{post.title}</h3>
                    <p className="text-slate-500 dark:text-slate-400 mb-4 text-base">{post.excerpt}</p>
                    <div className="font-semibold text-red-600 group-hover:text-red-700 mt-auto inline-block">
                        {t('readMore')} &rarr;
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default BlogCard;