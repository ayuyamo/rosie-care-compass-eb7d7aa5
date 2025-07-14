import React, { useEffect, useState } from 'react';
import ReactMarkDown from 'react-markdown';

const MarkDownViewer = ({ fileUrl }: { fileUrl: string }) => {
    const [markdown, setMarkdown] = useState<string>(``);

    useEffect(() => {
        fetch(fileUrl)
            .then((res) => res.text())
            .then(setMarkdown)
            .catch((err) => console.error("Error loading markdown: ", err));
    }, [fileUrl]);

    if (!markdown) return <p>Loading...</p>
    return (
        <div className='prose max-w-3xl mx-auto px-4 py-2'>
            <ReactMarkDown>{markdown}</ReactMarkDown>
        </div>
    );
};

export default MarkDownViewer;