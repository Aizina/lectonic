import Link from 'next/link'
import { FC } from 'react'
import Nav from '../nav/Nav'

const Header: FC = () => {
	return (
		<header className='py-8 xl:py-8 text-black text-accent border-b border-gray-400'>
			<div className='flex mx-20 justify-between items-center'>
				<Link
					href='/'
					className='text-[32px] leading-[38.4px] text-primary font-bold'
				>
					Лектоник
				</Link>
				<Nav />
				<div className='flex items-center gap-12'>
					<Link href='/auth'>
						<button className='font-gotham font-bold text-primary text-[24px]'>
							Вход
						</button>
					</Link>
					<Link href='/auth'>
						<button className='bg-primary py-[20px] px-[36px] font-gotham text-[24px] rounded-[50px] text-white'>
							Регистрация
						</button>
					</Link>
				</div>
			</div>
		</header>
	)
}

export default Header
