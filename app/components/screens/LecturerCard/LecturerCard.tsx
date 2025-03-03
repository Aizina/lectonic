import SubHeader from '@/components/ui/subheader/SubHeader'
import { Meta } from '@/utils/Meta/Meta'
import { FC } from 'react'
import DetailedInfo from './DetailedInfo/DetailedInfo'
import LecturerInfo from './LecturerInfo/LecturerInfo'
import LecturesCarousel from './LecturesCarousel/LecturesCarousel'
import PublicationsCarousel from './PublicationsCarousel/PublicationsCarousel'
import TeachingPlaces from './TeachingPlaces/TeachingPlaces'

const LecturerCard: FC = () => {
	return (
		<>
			<Meta title='Карточка лектора'>
				<SubHeader lecturer='Иван Иванов' />
				<div className='container flex flex-col md:flex-row mx-auto gap-20 2xl:gap-36 '>
					<LecturerInfo />
					<div className='max-2xl:max-w-[700px]'>
						<DetailedInfo />
						<LecturesCarousel />
						<PublicationsCarousel />
						<TeachingPlaces />
					</div>
				</div>
			</Meta>
		</>
	)
}

export default LecturerCard
