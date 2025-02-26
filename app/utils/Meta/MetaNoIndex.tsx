import Head from 'next/head'
import { FC } from 'react'

export const MetaNoIndex: FC<{ title?: string }> = ({ title = 'Error' }) => {
	const titleMerge = (title: string) => `${title} | Лектоник`
	return (
		<Head>
			<title>{titleMerge(title)}</title>
			<meta name='robots' content='noindex, nofollow' />
		</Head>
	)
}
