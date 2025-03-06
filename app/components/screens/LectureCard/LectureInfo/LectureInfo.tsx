import defaultImage from '@/assets/img/theme_bg.png'
import arrowRight from '@/assets/svg/arrow-right.svg'
import { usePriceFormatter } from '@/hooks/usePriceFormatter'
import { LectureData } from '@/shared/types/lecture.types'
import { LecturerData } from '@/shared/types/lecturer.types'
import ModalOrder from '@/ui/ModalOrder/ModalOrder'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useEffect, useRef, useState } from 'react'

interface LectureInfoProps {
	lectureData: LectureData
	lecturerData: LecturerData[]
}

const LectureInfo: FC<LectureInfoProps> = ({ lectureData, lecturerData }) => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [smallHeight, setSmallHeight] = useState(false)
	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (containerRef.current) {
			const height = containerRef.current.offsetHeight
			if (height < 600) {
				setSmallHeight(true)
			}
		}
	}, [])

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

	const imageSrc =
		lecture.image && lecture.image.long
			? lecture.image.long
			: themes.image.long || defaultImage

	return (
		<div className='container mx-auto my-12 flex justify-between'>
			<div
				ref={containerRef}
				className={`flex flex-col justify-between max-w-[730px] max-xl:max-w-[450px] gap-32 ${
					smallHeight ? 'gap-28' : ''
				}`}
			>
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
					{!lecture.price.length && (
						<span className='mt-2 ml-8 text-[14px] text-[#6B6B6B] leading-5'>
							Стоимость лекции по запросу*
						</span>
					)}
				</div>
				{lecture.price.length > 0 && (
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
				)}
				<Link href={`/lecturer/${lecturerData[0].lecturer_id}`}>
					<div className='flex'>
						<div className='relative flex w-[102px] h-[102px] rounded-full overflow-hidden'>
							<Image
								src={lecturerData[0].lecturer.photo_small}
								fill
								sizes='(max-width: 288px) 100vw, (max-width: 1200px) 50vw, 33vw'
								alt='Лектор'
								className='object-cover'
							/>
						</div>
						<div className='p-5 flex flex-col'>
							<span className='font-azoft text-black uppercase text-[24px] leading-[32px]'>
								{lecturerData[0].lecturer.first_name}{' '}
								{lecturerData[0].lecturer.middle_name}{' '}
								{lecturerData[0].lecturer.last_name}
							</span>
							<span className='font-gotham text-secondaryText text-[16px]'>
								{lecturerData[0].lecturer.specialization}
							</span>
						</div>
					</div>
				</Link>
			</div>
			<div className='flex flex-col justify-between max-w-[656px] max-xl:max-w-[450px]'>
				<div>
					<div className='relative border w-[656px] h-[285px] max-xl:w-[450px] rounded-[26px] overflow-hidden'>
						<Image
							src={imageSrc}
							className='object-cover object-center'
							sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
							alt='Картинка лекции'
							fill
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
				</div>
				<div className='flex flex-col mt-40'>
					<span className='font-gotham text-[24px] leading-[28px] font-medium text-primaryText'>
						Описание:
					</span>
					<span className='pt-5 w-full font-gotham font-normal text-[20px] leading-[28px] text-secondaryText break-words'>
						{lecture.description.trim().length > 0
							? lecture.description
							: 'Описание отсутствует'}
					</span>
				</div>
			</div>
		</div>
	)
}

export default LectureInfo
