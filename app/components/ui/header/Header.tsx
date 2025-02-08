import Link from 'next/link'
import { FC } from 'react'
import Nav from '../nav/Nav'

const Header: FC = () => {
	return (
		<header className='py-8 xl:py-8 text-black text-accent border-b border-black'>
			<div className='flex mx-20 justify-between items-center'>
				<Link href='/'>
					<h1 className='text-4xl font-semibold'>Лектоник</h1>
				</Link>
				<div className='flex items-center gap-8'>
					<Nav />
				</div>
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
