import lector from '@/assets/img/lector_avatar_example.png'
import arrowRight from '@/assets/svg/arrow-right.svg'
import { LectureData } from '@/shared/types/lecture.types'
import ModalOrder from '@/ui/ModalOrder/ModalOrder'
import Image from 'next/image'
import { FC, useState } from 'react'

interface LectureInfoProps {
	lectureData: LectureData
}

const LectureInfo: FC<LectureInfoProps> = ({ lectureData }) => {
	const [isModalOpen, setIsModalOpen] = useState(false)

	const { lecture, themes } = lectureData

	return (
		<div className='container mx-auto my-12 flex xl:justify-between max-2xl:gap-14'>
			<div className='flex flex-col justify-between max-w-[50%]'>
				<div className='flex flex-col'>
					<div className='pb-9 font-azoft sm:text-[48px] xl:text-[48px] text-primaryText leading-[64px] uppercase'>
						{lecture.title}
					</div>
					<div
						onClick={() => setIsModalOpen(true)}
						className='flex justify-between items-center w-[440px] py-3 px-8 rounded-[52px] bg-primary hover:bg-primary-hover hover:cursor-pointer'
					>
						<span className='font-gotham text-white text-[24px]'>
							Заказать лекцию
						</span>
						<span className='flex items-center justify-center w-[49px] h-[49px] rounded-[24px] bg-white'>
							<Image src={arrowRight} alt='Arrow right' />
						</span>
					</div>
					<ModalOrder
						isOpen={isModalOpen}
						onClose={() => setIsModalOpen(false)}
						modalTitle='лекцию'
						btnVariant='Заказать лекцию'
					/>
					<span className='px-8 py-3 text-secondaryText text-[14px] leading-[20px]'>
						Стоимость лекции по запросу*
					</span>
				</div>
				<div className='flex'>
					<div className='flex items-center'>
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
			<div className='max-w-[656px] max-xl:max-w-[450px]'>
				<div className='relative border w-[656px] h-[285px] max-xl:w-[450px] rounded-[26px] overflow-hidden'>
					<Image
						src={lecture.image.long ? lecture.image.long : themes.image.long}
						alt='Картинка лекции'
						fill
						objectFit='cover'
						objectPosition='center'
						priority
					/>
				</div>
				<div className='flex flex-wrap gap-4 pt-12 font-gotham font-medium text-[16px] leading-[28px] items-center'>
					{themes.main_themes.map((theme, index) => (
						<div
							key={`main-${index}`}
							className='py-3 px-5 bg-primary text-white rounded-[50px]'
						>
							{theme}
						</div>
					))}

					{themes.subtheme_list.map((subtheme, idx) => (
						<div
							key={`sub-${idx}`}
							className='py-3 px-5 border border-primary text-primaryText rounded-[50px]'
						>
							{subtheme}
						</div>
					))}
				</div>
				<div className='pt-10 flex flex-col'>
					<span className='font-gotham text-[24px] leading-[28px] font-medium text-primaryText'>
						Описание:
					</span>
					<span className='pt-5 w-full font-gotham font-normal text-[20px] leading-[28px] text-secondaryText break-words'>
						{lecture.description}
					</span>
				</div>
			</div>
		</div>
	)
}

export default LectureInfo
