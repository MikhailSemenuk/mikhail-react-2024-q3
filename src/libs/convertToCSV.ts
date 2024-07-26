import { Character } from '../types';

export function convertToCSV(data: Character[]): string {
  const csvRows: string[] = [];
  const headers: (keyof Character)[] = Object.keys(data[0]) as (keyof Character)[];

  // header row
  csvRows.push(headers.join(','));

  // data rows
  data.forEach((item) => {
    const values = headers.map((header) => {
      if (header === 'episode') {
        // Join episode array into a single string
        return item[header].join(' ');
      } else if (typeof item[header] === 'object' && item[header] !== null) {
        // Convert object properties to string
        if (header === 'origin' || header === 'location') {
          return (item[header] as { name: string }).name;
        }
        return JSON.stringify(item[header]);
      }
      return String(item[header]);
    });
    csvRows.push(values.join(';'));
  });

  return csvRows.join('\n');
}
