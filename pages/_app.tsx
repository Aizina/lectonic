import Layout from '@/app/components/layout/Layout'
import { AppProps } from 'next/app'
import Head from 'next/head'

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Layout>
			<Head>
				<title>Qw3ko | Frontend Developer</title>
			</Head>
			<Component {...pageProps} />
		</Layout>
	)
}
