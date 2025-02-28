import lector from '@/assets/img/lector_avatar_example.png'
import defaultImage from '@/assets/img/theme_bg.png'
import arrowRight from '@/assets/svg/arrow-right.svg'
import { usePriceFormatter } from '@/hooks/usePriceFormatter'
import { LectureData } from '@/shared/types/lecture.types'
import ModalOrder from '@/ui/ModalOrder/ModalOrder'
import Image from 'next/image'
import { FC, useState } from 'react'

interface LectureInfoProps {
	lectureData: LectureData
}

const LectureInfo: FC<LectureInfoProps> = ({ lectureData }) => {
	const [isModalOpen, setIsModalOpen] = useState(false)

	const formatPrice = usePriceFormatter()

	const { lecture, themes } = lectureData

	const priceArray = lecture.price
	const nonProfit =
		priceArray.find(obj => obj['non-profit'] !== undefined)?.['non-profit'] ||
		'по запросу'
	const corporate =
		priceArray.find(obj => obj['corporate'] !== undefined)?.['corporate'] ||
		'по запросу'
	const educational =
		priceArray.find(obj => obj['educational'] !== undefined)?.['educational'] ||
		'по запросу'

	console.log(lecture.image)

	const imageSrc =
		lecture.image === null
			? defaultImage
			: lecture.image.long
			? lecture.image.long
			: themes.image.long || defaultImage

	return (
		<div className='container mx-auto my-12 flex xl:justify-between max-2xl:gap-14'>
			<div className='flex flex-col justify-between gap-24 max-w-[50%]'>
				<div className='flex flex-col justify-between gap-24'>
					<div>
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
					</div>
					<div className='font-gotham'>
						<div className='flex leading-5 justify-between items-center border-y-2'>
							<span className='font-normal text-[20px] text-primaryText py-5'>
								Некоммерческим организациям (НКО):
							</span>
							<span className='font-medium text-[24px] text-secondaryText'>
								{formatPrice(nonProfit)}
							</span>
						</div>
						<div className='flex justify-between items-center border-b-2'>
							<span className='font-normal text-[20px] text-primaryText leading-5 py-5'>
								Бизнесу:
							</span>
							<span className='font-medium text-[24px] text-secondaryText'>
								{formatPrice(corporate)}
							</span>
						</div>
						<div className='flex justify-between items-center border-b-2'>
							<span className='font-normal text-[20px] text-primaryText leading-5 py-5'>
								Образовательным организациям:
							</span>
							<span className='font-medium text-[24px] text-secondaryText'>
								{formatPrice(educational)}
							</span>
						</div>
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
			</div>
			<div className='max-w-[656px] max-xl:max-w-[450px]'>
				<div className='relative border w-[656px] h-[285px] max-xl:w-[450px] rounded-[26px] overflow-hidden'>
					<Image
						src={imageSrc}
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
							className='py-3 px-5 bg-[#F7F7F7] text-primaryText rounded-[50px]'
						>
							{theme}
						</div>
					))}

					{themes.subtheme_list.map((subtheme, idx) => (
						<div
							key={`sub-${idx}`}
							className='py-3 px-5 bg-[#F7F7F7] text-primaryText rounded-[50px]'
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
