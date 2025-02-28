import placeholderImg from '@/assets/img/theme_carousel.png'
import Image from 'next/image'
import { FC, useState } from 'react'
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

const PublicationsCarousel: FC = () => {
	const [index, setIndex] = useState(0)

	const handlePrev = () => {
		setIndex(
			prevIndex => (prevIndex - 1 + publications.length) % publications.length
		)
	}

	const handleNext = () => {
		setIndex(prevIndex => (prevIndex + 1) % publications.length)
	}

	return (
		<div className='bg-white font-gotham max-w-[1000px] w-fit'>
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
				<div className='overflow-hidden relative w-[590px] 2xl:w-full'>
					<div
						className='flex gap-6 transition-transform duration-300'
						style={{ transform: `translateX(-${index * 100}%)` }}
					>
						{publications.map((publication, i) => (
							<div
								key={i}
								className='rounded-[26px] bg-white max-w-[278px] flex-shrink-0'
							>
								<Image
									src={publication.image || placeholderImg}
									alt={publication.title}
									width={278}
									height={200}
									className='rounded-[26px] w-full h-auto'
								/>
								<span className='text-[14px] 2xl:text-[20px] font-medium text-[#252525] mt-4 block'>
									{publication.title}
								</span>
								<p className='text-[10px] 2xl:text-[16px] font-normal text-[#6B6B6B] mt-2'>
									{publication.description}
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
