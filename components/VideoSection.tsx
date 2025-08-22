import React, { useState } from 'react';
import PlayIcon from './icons/PlayIcon';
import InfoIcon from './icons/InfoIcon';
import Tooltip from './Tooltip';
import { useTranslation } from '../contexts/LanguageContext';

const videoData = [
    { id: 'nS-b3Qy1D-k', title: 'Activate Your eSIM on iPhone' },
    { id: '1J9P2I7a5-Y', title: 'Activate Your eSIM on Android' },
    { id: 'O_d-eaGg0JA', title: 'What is an eSIM?' },
];

const VideoSection: React.FC = () => {
    const [activeVideo, setActiveVideo] = useState(videoData[0]);
    const { t } = useTranslation();

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
                <h2 className="text-3xl sm:text-4xl font-bold text-center">{t('videosTitle')}</h2>
                <Tooltip text={t('videosTooltip')}>
                    <InfoIcon className="h-6 w-6 text-slate-400" />
                </Tooltip>
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-300 text-center mb-12">{t('videosSubtitle')}</p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Video Player */}
                <div className="lg:col-span-2">
                    <div className="relative w-full overflow-hidden rounded-xl shadow-2xl" style={{ paddingTop: '56.25%' }}>
                        <iframe
                            key={activeVideo.id}
                            src={`https://www.youtube.com/embed/${activeVideo.id}?rel=0`}
                            title={activeVideo.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="absolute top-0 left-0 w-full h-full"
                        ></iframe>
                    </div>
                </div>

                {/* Playlist */}
                <div className="lg:col-span-1">
                    <div className="space-y-4">
                        {videoData.map((video) => (
                             <button
                                key={video.id}
                                onClick={() => setActiveVideo(video)}
                                className={`w-full text-left p-3 rounded-lg transition-all duration-300 flex items-center gap-4 ${activeVideo.id === video.id ? 'bg-red-100 dark:bg-red-900/50 ring-2 ring-red-500' : 'hover:bg-slate-100 dark:hover:bg-slate-800/50'}`}
                                aria-current={activeVideo.id === video.id}
                            >
                                <div className="flex-shrink-0">
                                     <PlayIcon className={`h-10 w-10 ${activeVideo.id === video.id ? 'text-red-600' : 'text-slate-400'}`} />
                                </div>
                                <span className={`font-semibold ${activeVideo.id === video.id ? 'text-slate-800 dark:text-white' : 'text-slate-600 dark:text-slate-300'}`}>{video.title}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoSection;