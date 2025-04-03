import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'

const Nav: FC = () => {
	const router = useRouter()
	const [storedId, setStoredId] = useState<string | null>(null)

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const currentPath = router.asPath

			if (currentPath === '/lectures' || currentPath === '/lecturers') {
				localStorage.removeItem('storedId')
				setStoredId(null)
			} else if (
				currentPath.startsWith('/lectures/') ||
				currentPath.startsWith('/lecturers/')
			) {
				const segments = currentPath.split('/')
				const potentialId = segments[2]
				if (potentialId) {
					localStorage.setItem('storedId', potentialId)
					setStoredId(potentialId)
				}
			}
		}
	}, [router.asPath])

	const getLecturesPath = () => {
		if (router.pathname === '/lectures') return '/lectures'
		return storedId ? `/lectures/${storedId}` : '/lectures'
	}
	const getLecturersPath = () => {
		if (router.pathname === '/lecturers') return '/lecturers'
		return storedId ? `/lecturers/${storedId}` : '/lecturers'
	}

	const links = [
		{ name: 'Главная', path: 'https://lectonic.ru' },
		{ name: 'Лекции', path: getLecturesPath() },
		{ name: 'Лекторы', path: getLecturersPath() },
		{ name: 'FAQ’s', path: '/faq' },
		{ name: 'Контакты', path: '/contacts' },
	]

	return (
		<nav className='flex gap-16 max-xl:gap-4 max-2xl:gap-8 font-montserrat'>
			{links.map((link, index) => (
				<Link
					key={index}
					href={link.path}
					className='font-medium text-[16px] leading-[19.2px] text-primaryText hover:text-primary'
				>
					{link.name}
				</Link>
			))}
		</nav>
	)
}

export default Nav
