import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import SharedLayout from '@/lib/features/app/SharedLayout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SharedLayout>
      <Component {...pageProps} />
    </SharedLayout>
  );
}
