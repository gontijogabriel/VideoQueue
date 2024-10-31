
export interface Video {
    id: string;
    title: string;
    video_file: string;
    thumbnail: string;
    status: 'pending' | 'completed';
    created_at: string;
}