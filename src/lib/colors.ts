export const colors = ['#1d673b', '#474646', '#283b83'];

export const getConsistentColor = (key: string): string => {
  if (!key) return '#000000'; // fallback to black
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = key.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};
