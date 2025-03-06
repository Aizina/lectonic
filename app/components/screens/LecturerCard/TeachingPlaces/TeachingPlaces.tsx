import placeholderImg from '@/assets/img/theme_carousel.png'
import { TeachingLocations } from '@/shared/types/lecturer.types'
import Image from 'next/image'
import { FC } from 'react'

interface TeachingLocationsProps {
	teachingLocations: TeachingLocations[]
}

const TeachingPlaces: FC<TeachingLocationsProps> = ({ teachingLocations }) => {
	return (
		<div className='font-gotham mt-10 mb-28'>
			<div className='mx-auto'>
				<span className='text-[32px] font-bold font-azoft'>
					Места преподавания
				</span>
				<div className='flex flex-wrap gap-6 mt-10'>
					{teachingLocations
						? teachingLocations.map((place, i) => (
								<div
									key={i}
									className='flex items-center px-10 gap-10 w-[944px] h-[96px] rounded-[36px] border border-[#EAEAEA]'
								>
									<div className='relative w-[68px] h-[68px]'>
										<Image
											src={place.logo || placeholderImg}
											alt={place.name}
											fill
											sizes='(max-width: 288px) 100vw, (max-width: 1200px) 50vw, 33vw'
											className='object-fill'
										/>
									</div>
									<div className='flex flex-col gap-1 font-gotham font-normal justify-center text-[#6B6B6B] text-[16px] text-left'>
										<span className='font-medium'>{place.name}</span>
										<span>{place.position}</span>
									</div>
								</div>
						  ))
						: null}
				</div>
			</div>
		</div>
	)
}

export default TeachingPlaces
