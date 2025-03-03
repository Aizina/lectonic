import Image, { StaticImageData } from 'next/image'
import { FC, useState } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import stars4 from '../../../../assets/img/stars/stars4.png'

const reviews = [
	{
		name: 'Анна Смирнова',
		company: 'СберУниверситет',
		rating: 4.8,
		review:
			'Лекция оказалась невероятно полезной! Простым языком о сложных вещах, с примерами и кейсами. Спасибо за структурированную подачу!',
	},
	{
		name: 'Анна Смирнова',
		company: 'СберУниверситет',
		rating: 4.8,
		review:
			'Лекция оказалась невероятно полезной! Простым языком о сложных вещах, с примерами и кейсами. Спасибо за структурированную подачу!',
	},
	{
		name: 'Анна Смирнова',
		company: 'СберУниверситет',
		rating: 4.8,
		review:
			'Лекция оказалась невероятно полезной! Простым языком о сложных вещах, с примерами и кейсами. Спасибо за структурированную подачу!',
	},
	{
		name: 'Анна Смирнова',
		company: 'СберУниверситет',
		rating: 4.8,
		review:
			'Лекция оказалась невероятно полезной! Простым языком о сложных вещах, с примерами и кейсами. Спасибо за структурированную подачу!',
	},
	{
		name: 'Анна Смирнова',
		company: 'СберУниверситет',
		rating: 4.8,
		review:
			'Лекция оказалась невероятно полезной! Простым языком о сложных вещах, с примерами и кейсами. Спасибо за структурированную подачу!',
	},
	{
		name: 'Анна Смирнова',
		company: 'СберУниверситет',
		rating: 4.8,
		review:
			'Лекция оказалась невероятно полезной! Простым языком о сложных вещах, с примерами и кейсами. Спасибо за структурированную подачу!',
	},
]

const starImages: { [key: number]: StaticImageData } = {
	4: stars4,
}
const CARD_WIDTH = 507
const GAP = 24
const VISIBLE_COUNT = 3

const ReviewsCarousel: FC = () => {
	const [index, setIndex] = useState(0)

	const maxIndex = Math.max(0, reviews.length - VISIBLE_COUNT)

	const handlePrev = () => {
		setIndex(prev => Math.max(prev - 1, 0))
	}

	const handleNext = () => {
		setIndex(prev => Math.min(prev + 1, maxIndex))
	}

	return (
		<div className='bg-white py-16 px-6 font-gotham'>
			<div className='mx-auto'>
				<div className='flex justify-between items-center pb-10 py-12 px-44 '>
					<span className='text-[32px] font-bold font-azoft '>
						Что говорят о лекции
					</span>
					<div className='flex gap-4'>
						<div
							className='w-10 h-10 flex items-center justify-center rounded-full bg-black text-white cursor-pointer'
							onClick={handlePrev}
						>
							<FaArrowLeft size={20} />
						</div>
						<div
							className='w-10 h-10 flex items-center justify-center rounded-full bg-black text-white cursor-pointer'
							onClick={handleNext}
						>
							<FaArrowRight size={20} />
						</div>
					</div>
				</div>
				<div className='overflow-hidden p-1 mx-auto h-[260px] w-[1590px]'>
					<div
						className='flex transition-transform duration-300'
						style={{
							width: reviews.length * (CARD_WIDTH + GAP),
							transform: `translateX(-${index * (CARD_WIDTH + GAP)}px)`,
							gap: `${GAP}px`,
						}}
					>
						{reviews.map((review, i) => (
							<div
								key={i}
								className='p-6 rounded-[26px] shadow-lg flex-shrink-0 transition-transform duration-300}'
								style={{ width: CARD_WIDTH }}
							>
								<span className='text-[25px] font-medium text-[#252525]'>
									{review.name}
								</span>
								<div className='flex justify-between items-center gap-8 mt-2 border-b border-[#3F3F3F2B] pb-4'>
									<span className='text-[16px] font-normal text-[#4860EF]'>
										{review.company}
									</span>
									<div className='flex items-center gap-1'>
										<Image
											src={starImages[Math.round(review.rating)] || stars4}
											alt={`Rating ${review.rating}`}
											width={80}
											height={16}
										/>
										<span className='text-[16px] font-normal text-[#2A2A2A]'>
											{review.rating}
										</span>
									</div>
								</div>
								<p className='text-[16px] font-normal text-[#252525AD] mt-8'>
									{review.review}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default ReviewsCarousel
