import Link from 'next/link'
import { FC } from 'react'

const links = [
	{
		name: 'Главная',
		path: 'https://lectonic.ru',
	},
	{
		name: 'Лекции',
		path: '/lectures/[id]',
	},
	{
		name: 'Лекторы',
		path: '/lecturers/[id]',
	},
	{
		name: 'FAQ’s',
		path: '/faq',
	},
	{
		name: 'Контакты',
		path: '/contacts',
	},
]

const Nav: FC = () => {
	return (
		<nav className='flex gap-16 max-xl:gap-4 max-2xl:gap-8 font-montserrat'>
			{links.map((link, index) => {
				return (
					<Link
						href={{
							pathname: link.path,
							query: { id: process.env.NEXT_PUBLIC_ORGANIZATION_ID },
						}}
						key={index}
						className={
							'font-medium text-[16px] leading-[19.2px] text-primaryText hover:text-primary'
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
