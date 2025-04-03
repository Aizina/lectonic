import { FC } from 'react'
import { MetaNoIndex } from './MetaNoIndex'

interface Seo {
	title: string
	children: React.ReactNode
}

export const Meta: FC<Seo> = ({ title, children }) => {
	return (
		<>
			<MetaNoIndex title={title} />
			{children}
		</>
	)
}
