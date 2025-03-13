import placeholderImg from '@/assets/img/theme_carousel.png'
import { Lecture } from '@/shared/types/lecture.types'
import { truncateTextByWord } from '@/utils/truncateTextByWord'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

interface LecturesCarouselProps {
	lectures: Lecture[]
}

const CARD_WIDTH = 288
const GAP = 24

const LecturesCarousel: FC<LecturesCarouselProps> = ({ lectures }) => {
	const [index, setIndex] = useState(0)

	const [visibleCount, setVisibleCount] = useState(3)

	const maxIndex = Math.max(0, lectures.length - visibleCount)

	const containerWidth = visibleCount * CARD_WIDTH + (visibleCount - 1) * GAP

	useEffect(() => {
		function handleResize() {
			if (window.innerWidth < 1536) {
				setVisibleCount(2)
			} else {
				setVisibleCount(3)
			}
		}
		handleResize()

		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	const handlePrev = () => {
		setIndex(prev => Math.max(prev - 1, 0))
	}

	const handleNext = () => {
		setIndex(prev => Math.min(prev + 1, maxIndex))
	}

	return (
		<div className='pt-20 pb-16 mx-auto'>
			<div className='mx-auto'>
				<div className='flex max-w-[910px] justify-between items-center py-6'>
					<span className='text-[32px] font-normal leading-[124%] font-roboto uppercase'>
						Лекции
					</span>
					<div className='flex gap-8'>
						<button
							className='w-10 h-10 flex items-center justify-center rounded-full bg-[#1F1F20] text-white'
							onClick={handlePrev}
						>
							<FaArrowLeft size={18} />
						</button>
						<button
							className='w-10 h-10 flex items-center justify-center rounded-full bg-[#1F1F20] text-white'
							onClick={handleNext}
						>
							<FaArrowRight size={18} />
						</button>
					</div>
				</div>

				<div
					className='max-2xl:max-w-[700px] overflow-hidden'
					style={{ width: containerWidth }}
				>
					<div
						className='flex transition-transform duration-300'
						style={{
							width: lectures.length * (CARD_WIDTH + GAP),
							transform: `translateX(-${index * (CARD_WIDTH + GAP)}px)`,
							gap: `${GAP}px`,
						}}
					>
						{lectures.map(lecture => (
							<Link href={`/lecture/${lecture.id}`} key={lecture.id}>
								<div
									className='bg-white flex-shrink-0'
									style={{ width: CARD_WIDTH }}
								>
									<div className='relative w-[288px] h-[199px]'>
										<Image
											src={lecture.lecture.image.long || placeholderImg}
											alt={lecture.lecture.title}
											fill
											priority
											sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
											className='rounded-[26px] w-full h-auto border'
										/>
									</div>
									<span className='font-montserrat min-h-[60px] leading-[136%] block mt-4 text-[20px] font-medium text-[#404040]'>
										{lecture.lecture.title}
									</span>
									<p className='font-montserrat mt-2 text-[16px] text-[#6B6B6B]'>
										{lecture.lecture.description.trim().length > 0
											? truncateTextByWord(lecture.lecture.description, 60)
											: 'Описание отсутствует'}
									</p>
								</div>
							</Link>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default LecturesCarousel
