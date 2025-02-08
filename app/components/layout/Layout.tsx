import '../../assets/globals.css'
import Header from '../ui/header/Header'

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div>
			<Header />
			{children}
		</div>
	)
}
