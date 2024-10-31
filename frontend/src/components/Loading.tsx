import React from 'react';

const Loading: React.FC = () => {
    return (
        <div className="flex justify-center items-center h-16">
            <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin" />
        </div>
    );
};

export default Loading;
