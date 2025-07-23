import React, { createContext, useContext, useState, ReactNode } from 'react';


type TextSettingsContextType = {
    fontScale: number;
    setFontScale: (value: number) => void;
};

type TextSettingsProviderProps = {
    children: ReactNode;
};

const TextSettingsContext = createContext<TextSettingsContextType | undefined>(undefined);
export const TextSettingsProvider = ({ children }: TextSettingsProviderProps) => {
    const [fontScale, setFontScale] = useState(1);
    return (
        <TextSettingsContext.Provider value={{ fontScale, setFontScale }}>
            {children}
        </TextSettingsContext.Provider>
    );
};

export const useTextSettings = (): TextSettingsContextType => {
    const context = useContext(TextSettingsContext);
    if (!context) {
        throw new Error('useTextSettings must be used within a TextSettingsProvider');
    }
    return context;
};
