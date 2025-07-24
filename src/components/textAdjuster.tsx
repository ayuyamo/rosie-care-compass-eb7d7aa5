import React, { useState, useEffect } from 'react';
import { useTextSettings } from '@/context/TextSettingsContext';

const TextAdjuster = () => {
    const [open, setOpen] = useState(false);
    const { fontScale, setFontScale } = useTextSettings();
    useEffect(() => {
        document.documentElement.style.fontSize = `${fontScale * 16}px`;
        ['text-base', 'text-lg', 'text-xl'].forEach((className) => {
            const el = document.querySelector(`.${className}`);
            if (el) {
                console.log(`${className}:`, window.getComputedStyle(el).fontSize);
            }
        });
    }, [fontScale]);


    return (
        <>
            <button
                className='fixed bottom-20 left-4 z-50 w-10 h-10 bg-black text-white flex items-center justify-center p-2 rounded-full shadow-xl'
                onClick={() => setOpen(!open)}
                title='Text Settings'
            >
                A

            </button>

            {open && (
                <div className='fixed bottom-32 left-7 bg-white shadow-lg rounded-lg p-4 max-w-md z-50 border border-gray-300'>
                    <label className='block mb-2 text-sm font-medium'>Font Size</label>
                    <select
                        value={fontScale}
                        onChange={(e) => setFontScale(parseFloat(e.target.value))}
                        className='max-w-md border px-2 py-1 rounded mb-3'
                    >
                        <option value='1'>100%</option>
                        <option value='1.1'>110%</option>
                        <option value='1.25'>125%</option>
                        <option value='1.5'>150%</option>
                        <option value='2'>200%</option>
                    </select>
                </div>
            )}
        </>
    );
};


export default TextAdjuster;