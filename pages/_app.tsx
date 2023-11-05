import { SessionProvider } from 'next-auth/react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import '@radix-ui/themes/styles.css';
import Provider from '../components/Provider';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (
		<Provider session={session}>
			<Component {...pageProps} />
		</Provider>
	);
}

export default MyApp;
