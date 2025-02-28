import placeholderImg from '@/assets/img/theme_carousel.png'
import { truncateTextByWord } from '@/utils/truncateTextByWord'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

const publications = [
	{
		title: 'Современные технологии в образовании',
		description:
			'Как новые технологии помогают улучшить процесс обучения и сделать его более эффективным.',
		image: '',
	},
	{
		title: 'Психология мотивации',
		description:
			'Как мотивировать себя и других на достижение высоких результатов.',
		image: '',
	},
	{
		title: 'Дизайн мышления',
		description:
			'Применение методологии дизайн-мышления для решения сложных задач.',
		image: '',
	},
	{
		title: 'Современные технологии в образовании',
		description:
			'Как новые технологии помогают улучшить процесс обучения и сделать его более эффективным.',
		image: '',
	},
	{
		title: 'Психология мотивации',
		description:
			'Как мотивировать себя и других на достижение высоких результатов.',
		image: '',
	},
	{
		title: 'Дизайн мышления',
		description:
			'Применение методологии дизайн-мышления для решения сложных задач.',
		image: '',
	},
]

const CARD_WIDTH = 288
const GAP = 24

const PublicationsCarousel: FC = () => {
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
		<div className='py-16 font-gotham mx-auto'>
			<div className='mx-auto'>
				<div className='flex justify-between items-center pb-10'>
					<span className='text-[32px] font-bold font-azoft'>Публикации</span>
					<div className='flex gap-4'>
						<button
							className='w-10 h-10 flex items-center justify-center rounded-full bg-black text-white cursor-pointer'
							onClick={handlePrev}
						>
							<FaArrowLeft size={20} />
						</button>
						<button
							className='w-10 h-10 flex items-center justify-center rounded-full bg-black text-white cursor-pointer'
							onClick={handleNext}
						>
							<FaArrowRight size={20} />
						</button>
					</div>
				</div>

				<div
					className='max-2xl:max-w-[700px] overflow-hidden mx-auto'
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
								<Image
									src={publication.image || placeholderImg}
									alt={publication.title}
									width={278}
									height={180}
									className='rounded-[26px] w-full h-auto'
								/>
								<span className='block mt-4 text-[20px] font-medium text-[#252525]'>
									{publication.title}
								</span>
								<p className='mt-2 text-[16px] text-[#6B6B6B]'>
									{truncateTextByWord(publication.description, 60)}
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
