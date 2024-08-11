import type { Metadata } from 'next';
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import { CharacterProvider } from '@/components/CharacterContext';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ThemeSwitchHeder } from '@/components/ThemeSwitchHeder';

export const metadata: Metadata = {
  title: 'Rickypedia',
  description: 'Characters from Rick and Morty',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <CharacterProvider>
          <ThemeProvider>
            <ThemeSwitchHeder />
            {children}
          </ThemeProvider>
        </CharacterProvider>
      </body>
    </html>
  );
}
