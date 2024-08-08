import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '@/components/Layout';
import { CharacterProvider } from '@/components/CharacterContext';
import { ThemeProvider } from '@/components/ThemeProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Layout>
        <CharacterProvider>
          <Component {...pageProps} />
        </CharacterProvider>
      </Layout>
    </ThemeProvider>
  );
}
