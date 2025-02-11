import { FC } from 'react'
import LectureHeader from './LectureHeader/LectureHeader'
import LectureInfo from './LectureInfo/LectureInfo'
import LectureDetails from './LectureDetails/LectureDetails'
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
