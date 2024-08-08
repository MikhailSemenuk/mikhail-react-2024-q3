import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '@/components/Layout';
import { CharacterProvider } from '@/components/CharacterContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <CharacterProvider>
        <Component {...pageProps} />
      </CharacterProvider>
    </Layout>
  );
}
