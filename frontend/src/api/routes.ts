import axios from 'axios';
import { Video } from '@/types/video';


const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api'
});

export const fetchVideos = async (): Promise<Video[]> => {
    const response = await api.get('/videos/');
    return response.data;
};

export const downloadVideo = async (id: string): Promise<void> => {
    await api.post(`/videos/${id}/download/`);
};

export const uploadVideo = async (data: FormData): Promise<Video> => {
    const response = await api.post('/videos/upload/', data);
    return response.data;
};