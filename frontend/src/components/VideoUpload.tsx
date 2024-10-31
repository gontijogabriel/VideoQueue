// VideoUpload.tsx
'use client';

import { useState } from 'react';
import { fetchVideos, uploadVideo } from '@/api/routes';
import Loading from './Loading';

interface VideoUploadProps {
    onUpload: () => void; // Função para notificar que o upload foi feito
}

export default function VideoUpload({ onUpload }: VideoUploadProps) {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) {
            setError('Por favor, selecione um arquivo para upload.');
            return;
        }

        setError(null);
        setLoading(true);

        const formData = new FormData();
        formData.append('video_file', file);
        formData.append('title', file.name);

        try {
            await uploadVideo(formData);
            onUpload(); // Chama a função para notificar que o upload foi feito
            setFile(null);
        } catch (uploadError) {
            setError('Erro ao realizar o upload. Tente novamente.');
            console.error(uploadError);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Upload de Vídeo</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                        className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                    />
                </div>
                {file && (
                    <div className="mb-4">
                        <p className="text-gray-700">Arquivo selecionado: <strong>{file.name}</strong></p>
                    </div>
                )}
                {error && (
                    <div className="mb-4 text-red-600">
                        {error}
                    </div>
                )}
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 px-4 text-white font-semibold rounded-lg ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                    {loading ? 'Carregando...' : 'Upload'}
                </button>
            </form>
        </div>
    );
}
