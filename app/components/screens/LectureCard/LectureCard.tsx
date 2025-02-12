import { FC } from 'react'
import LectureDetails from './LectureDetails/LectureDetails'
import LectureHeader from './LectureHeader/LectureHeader'
import LectureInfo from './LectureInfo/LectureInfo'
import ReviewsCarousel from './Reviews/ReviewsCarousel'

const LectureCard: FC = () => {
	return (
		<>
			<LectureHeader />
			<LectureInfo />
			<LectureDetails />
			<ReviewsCarousel />
		</>
	)
}

export default LectureCard
