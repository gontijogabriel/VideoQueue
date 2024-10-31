// VideoList.tsx
'use client';

import { FC, useEffect, useState } from 'react';
import { fetchVideos } from '@/api/routes';
import { Video } from '@/types/video';
import Loading from './Loading';

const VideoList: FC<{ refresh: boolean }> = ({ refresh }) => {
    const [videos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState(false);
    const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);

    useEffect(() => {
        const loadVideos = async () => {
            setLoading(true);
            try {
                const videoList = await fetchVideos();
                setVideos(videoList);
            } catch (error) {
                console.error('Erro ao carregar vídeos:', error);
            } finally {
                setLoading(false);
            }
        };
        loadVideos();
    }, [refresh]); // Recarregar quando 'refresh' mudar

    if (loading) return <Loading />;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {videos.map(video => (
                <div
                    key={video.id}
                    className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer group"
                    onMouseEnter={() => setHoveredVideo(video.id)}
                    onMouseLeave={() => setHoveredVideo(null)}
                >
                    {hoveredVideo === video.id ? (
                        <video
                            src={video.video_file}
                            autoPlay
                            loop
                            muted
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    )}
                    <h4 className="absolute bottom-2 left-2 text-white text-sm font-semibold bg-black bg-opacity-60 rounded px-2 py-1">
                        {video.title}
                    </h4>
                </div>
            ))}
        </div>
    );
};

export default VideoList;
