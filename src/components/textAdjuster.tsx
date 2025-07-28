import React, { useState, useEffect, useRef } from 'react';
import { useTextSettings } from '@/context/TextSettingsContext';

const TextAdjuster = () => {
    const [open, setOpen] = useState(false);
    const { fontScale, setFontScale } = useTextSettings();
    const buttonRef = useRef<HTMLButtonElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        document.documentElement.style.fontSize = `${fontScale * 16}px`;
        const basePadding = 20;
        const panelOffset = 48 * fontScale;


        const nav = document.getElementById('bottom-nav');
        const navHeight = nav?.offsetHeight || 48;

        console.log('bottom nav: ', navHeight);

        if (buttonRef.current) {
            buttonRef.current.style.bottom = `${basePadding + navHeight}px`;
            buttonRef.current.style.transition = 'bottom 0.3s ease';
        }
        if (panelRef.current) {
            panelRef.current.style.bottom = `${basePadding + panelOffset + navHeight}px`;
            panelRef.current.style.transition = 'bottom 0.3s ease';
        }

    }, [fontScale, open]);




    return (
        <div>
            <button ref={buttonRef}
                className='fixed left-4 z-50 w-10 h-10 bg-black text-white flex items-center justify-center p-2 rounded-full shadow-xl'
                onClick={() => setOpen(!open)}
                title='Text Settings'
            >
                A

            </button>


            <div ref={panelRef}
                className={`fixed left-7 bg-white shadow-lg rounded-lg p-4 max-w-md  overflow-hidden z-50 border border-gray-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
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
                    <option value='1.75'>175%</option>
                </select>
            </div>
        </div>
    );
};


export default TextAdjuster;