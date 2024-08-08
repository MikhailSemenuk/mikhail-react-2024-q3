import { Character } from '../types';
import { convertToCSV } from './convertToCSV';

export function downloadAsCSV(favoritesData: Character[]) {
  const csv = convertToCSV(favoritesData);
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);

  // I am not manipulate with DOM, because I am not attach link in DOM.
  const link = document.createElement('a');
  link.href = url;
  link.download = `characters_${favoritesData.length}.csv`;
  link.click();
}
