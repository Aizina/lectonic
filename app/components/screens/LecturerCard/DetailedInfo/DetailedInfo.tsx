import { FC, useState } from 'react'

const themes = [
	{
		title: 'Big Data и аналитика',
	},
	{
		title: 'Разработка ПО',
	},
	{
		title: 'Кибербезопасность',
	},
]

const DetailedInfo: FC = () => {

	return (
		<div className='container mx-auto my-8 flex gap-36 max-2xl:gap-20'>
			<div className='flex flex-col'>
				<span className='font-azoft uppercase font-bold text-[26px] 2xl:text-[32px] leading-10 pb-5'>
					О лекторе
				</span>
				<span className='font-gotham font-normal text-[14px] 2xl:text-[2opx] text-[#6B6B6B] leading-7 pb-5'>
					Иван Иванович – эксперт в цифровых технологиях с многолетним опытом
					работы в ведущих IT-компаниях. Он проводит лекции и консультации для
					компаний, помогает выстраивать стратегии цифровой трансформации, а
					также делится практическими знаниями в области программирования,
					анализа данных и кибербезопасности. Его выступления отличаются
					глубиной анализа и практическими примерами из реальной практики.
				</span>
				<div className='flex gap-3 pb-8'>
					{themes.map((theme, index) => {
						return (
							<div
								key={index}
								className='py-3 px-5 border border-primary bg-white rounded-[50px]'
							>
								<span className='font-gotham text-[##131313] text-[10px] 2xl:text-[16px] leading-7 font-medium'>
									{theme.title}
								</span>
							</div>
						)
					})}
				</div>
				<span className='font-azoft font-bold text-[32px] 2xl:text-[38px] leading-[52px] text-left border-t-2 pt-5 pb-3'>
					«Я верю, что технологии могут изменить мир, если их правильно
					применять»
				</span>
				<span className='font-gotham font-normal text-[18px] 2xl:text-[24px] text-[#6B6B6B] text-right leading-7'>
					– говорит Иван Петров
				</span>
			</div>
		</div>
	)
}

export default DetailedInfo
