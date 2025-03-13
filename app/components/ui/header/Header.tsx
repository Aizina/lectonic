import Link from 'next/link'
import { FC } from 'react'
import Nav from '../nav/Nav'

const Header: FC = () => {
	return (
		<header className='py-8 xl:py-8 text-[#1F1F20] text-accent border-b border-[#8E8E8E]'>
			<div className='container mx-auto flex justify-between items-center'>
				<Link
					href='/'
					className='text-[32px] leading-[38.4px] text-primary font-bold'
				>
					Лектоник
				</Link>
				<Nav />
				<div className='flex items-center gap-12'>
					<Link href='/auth'>
						<button className='font-montserrat font-medium text-primary text-[24px] leading-[136%]'>
							Вход
						</button>
					</Link>
					<Link href='/auth'>
						<button className='bg-primary py-[16px] px-[36px] font-montserrat font-medium text-[24px] leading-[136%] rounded-[50px] text-white'>
							Регистрация
						</button>
					</Link>
				</div>
			</div>
		</header>
	)
}

export default Header
