import Layout from '@/components/layout/Layout'
import { AppProps } from 'next/app'
import Head from 'next/head'

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Layout>
			<Head>
				<title>Лектоник | Карточка лекции</title>
			</Head>
			<Component {...pageProps} />
		</Layout>
	)
}
