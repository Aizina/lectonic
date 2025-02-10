import Link from 'next/link'
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
	return (
		<nav className='flex gap-2 [@media(max-width:1520px)]:gap-8 xl:gap-16 font-gotham'>
			{links.map((link, index) => {
				return (
					<Link
						href={link.path}
						key={index}
						className={
							'capitalize font-medium text-primaryText hover:text-primary'
						}
					>
						{link.name}
					</Link>
				)
			})}
		</nav>
	)
}

export default Nav
