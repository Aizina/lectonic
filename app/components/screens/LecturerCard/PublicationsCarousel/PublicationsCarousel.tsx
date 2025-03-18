import placeholderImg from '@/assets/img/theme_carousel.png'
import { Publication } from '@/shared/types/lecturer.types'
import { truncateTextByWord } from '@/utils/truncateTextByWord'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

interface PublicationsCarouselProps {
	publications: Publication[]
}

const CARD_WIDTH = 288
const GAP = 24

const PublicationsCarousel: FC<PublicationsCarouselProps> = ({
	publications,
}) => {
	const [index, setIndex] = useState(0)

	const [visibleCount, setVisibleCount] = useState(3)

	const maxIndex = Math.max(0, publications.length - visibleCount)

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
		<div className='pb-16 mx-auto'>
			<div className='mx-auto'>
				<div className='flex max-w-[910px] justify-between items-center py-6'>
					<span className='font-roboto text-[32px] font-normal uppercase leading-[124%]'>
						Публикации
					</span>
					{publications.length <= 3 ? null : (
						<div className='flex gap-8'>
							<button
								className='w-10 h-10 flex items-center justify-center rounded-full bg-[#1F1F20] text-white cursor-pointer'
								onClick={handlePrev}
							>
								<FaArrowLeft size={18} />
							</button>
							<button
								className='w-10 h-10 flex items-center justify-center rounded-full bg-[#1F1F20] text-white cursor-pointer'
								onClick={handleNext}
							>
								<FaArrowRight size={18} />
							</button>
						</div>
					)}
				</div>

				<div
					className='max-2xl:max-w-[700px] overflow-hidden'
					style={{ width: containerWidth }}
				>
					<div
						className='flex transition-transform duration-300'
						style={{
							width: publications.length * (CARD_WIDTH + GAP),
							transform: `translateX(-${index * (CARD_WIDTH + GAP)}px)`,
							gap: `${GAP}px`,
						}}
					>
						{publications.map((publication, i) => (
							<div
								key={i}
								className='bg-white flex-shrink-0'
								style={{ width: CARD_WIDTH }}
							>
								<div className='relative w-[288px] h-[199px]'>
									<Image
										src={
											publication.publication.image.long ||
											publication.publication.image.short ||
											placeholderImg
										}
										alt={publication.publication.title}
										sizes='(max-width: 288px) 100vw, (max-width: 1200px) 50vw, 33vw'
										fill
										priority
										className='rounded-[26px] w-full h-auto border'
									/>
								</div>
								<span className='font-montserrat min-h-[60px] block mt-4 text-[20px] font-medium text-[#404040]'>
									{publication.publication.title}
								</span>
								<p className='font-montserrat mt-2 text-[16px] text-[#6B6B6B]'>
									{publication.publication.description.trim().length > 0
										? truncateTextByWord(
												publication.publication.description,
												60
										  )
										: 'Описание отсутствует'}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default PublicationsCarousel
