import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC } from 'react'

const links = [
	{
		name: 'Главная',
		path: '/',
	},
	{
		name: 'Категории',
		path: '/categories',
	},
	{
		name: 'Наши лекторы',
		path: '/lectors',
	},
	{
		name: 'FAQ’s',
		path: '/faq',
	},
	{
		name: 'Контакты',
		path: '/contact',
	},
]

const Nav: FC = () => {
	const pathname = usePathname()
	return (
		<nav className='flex gap-2 [@media(max-width:1520px)]:gap-8 xl:gap-16 font-gotham'>
			{links.map((link, index) => {
				return (
					<Link
						href={link.path}
						key={index}
						className={`${
							link.path === pathname && 'text-primary'
						} capitalize font-medium hover:text-accent transition-all`}
					>
						{link.name}
					</Link>
				)
			})}
		</nav>
	)
}

export default Nav
