import '../../assets/globals.css'
import Footer from '../ui/footer/Footer'
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
			<Footer />
		</div>
	)
}
