import Image from 'next/image'
import { FC } from 'react'
import lector from '../../../../assets/img/lector_avatar_example.png'
import themeBg from '../../../../assets/img/theme_bg.png'
import arrowRight from '../../../../assets/svg/arrow-right.svg'

const themes = [
	{
		title: 'ЦифроваяТрансформация',
		active: true,
	},
	{
		title: 'БизнесТехнологии',
		active: false,
	},
	{
		title: 'DigitalЛекция',
		active: false,
	},
]

const LectureInfo: FC = () => {
	return (
		<div className='px-44 py-12 flex justify-between'>
			<div className='flex flex-col justify-between max-w-[50%]'>
				<div className='flex flex-col'>
					<div className='pb-9 font-azoft text-[48px] text-primaryText leading-[64px] uppercase'>
						Цифровая трансформация: Реальные кейсы
					</div>
					<div className='flex justify-between items-center w-[440px] py-3 px-8 rounded-[52px] bg-primary hover:bg-primary-hover hover:cursor-pointer'>
						<span className='font-gotham text-white text-[24px]'>
							Заказать лекцию
						</span>
						<span className='flex items-center justify-center w-[49px] h-[49px] rounded-[24px] bg-white'>
							<Image src={arrowRight} alt='Arrow right' />
						</span>
					</div>
					<span className='px-8 py-3 text-secondaryText text-[14px] leading-[20px]'>
						Стоимость лекции по запросу*
					</span>
				</div>
				<div className='flex'>
					<div>
						<Image src={lector} alt='Лектор' />
					</div>
					<div className='p-5 flex flex-col'>
						<span className='font-azoft text-black uppercase text-[24px] leading-[32px]'>
							Иван Иванович Петров
						</span>
						<span className='font-gotham text-secondaryText text-[16px]'>
							Специалист по цифровым технологиям и инновациям
						</span>
					</div>
				</div>
			</div>
			<div className='max-w-[656px]'>
				<div>
					<Image src={themeBg} alt='Картинка темы' />
				</div>
				<div className='pt-12 flex gap-5 font-gotham font-medium text-[16px] leading-[28px] items-center'>
					{themes.map(theme => (
						<div
							key={theme.title}
							className={
								theme.active
									? 'py-3 px-5 bg-primary text-white rounded-[50px]'
									: 'py-3 px-5 border border-primary text-primaryText rounded-[50px]'
							}
						>
							{theme.title}
						</div>
					))}
				</div>
				<div className='pt-10 flex flex-col'>
					<span className='font-gotham text-[24px] leading-[28px] font-medium text-primaryText'>
						Описание:
					</span>
					<span className='pt-5 w-full font-gotham font-normal text-[20px] leading-[28px] text-secondaryText break-words'>
						В лекции «Цифровая трансформация: Реальные кейсы» Иван Иванович
						Петров делится своим опытом внедрения цифровых технологий в крупных
						компаниях. Он расскажет о том, как традиционные бизнес-процессы
						трансформируются под влиянием современных IT-решений, поделится
						историями успеха и практическими рекомендациями для компаний,
						стремящихся к инновациям.
					</span>
				</div>
			</div>
		</div>
	)
}

export default LectureInfo
