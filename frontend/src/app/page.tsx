'use client'

import VideoList from "@/components/VideoList";
import VideoUpload from "@/components/VideoUpload";
import { useState } from 'react';


export default function Home() {
    const [refresh, setRefresh] = useState(false);

    const handleUpload = () => {
        setRefresh(prev => !prev);
    };

    return (
        <main>
            <div>
                <VideoUpload onUpload={handleUpload} />
                <VideoList refresh={refresh} />
            </div>
        </main>
    );
}