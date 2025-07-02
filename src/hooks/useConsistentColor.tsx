
import { useMemo } from 'react';

const colors = [
  "#d79a8c", "#367588", "#49796B", "#8F9779", "#5a7a85",
  "#B8860B", "#8B4513", "#556B2F", "#800080", "#008080",
  "#CD853F", "#4682B4", "#2E8B57", "#9932CC", "#20B2AA"
];

export const useConsistentColor = (key: string): string => {
  return useMemo(() => {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = key.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  }, [key]);
};
