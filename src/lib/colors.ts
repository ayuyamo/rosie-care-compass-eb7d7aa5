// export const colors = ['#1d673b', '#474646', '#283b83', 'ffd024'];
export const colors = [
  '#1d673b',
  '#474646',
  '#283b83',
  '#4169E1',
  '#7B68EE',
  '#1E90FF',
  '#005A9C',
  '#585858',
  '#A9A9A9',
  '#708090',
  '#71797E',
  '#8A9A5B',
  '#3CB371',
  '#2E8B57',
  '#008000',
  '#6B8E23',
  '#808000',
  '#006241',
];

export const getConsistentColor = (key: string): string => {
  if (!key) return '#000000'; // fallback to black
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = key.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};
