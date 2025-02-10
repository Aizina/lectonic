import { FC } from 'react'
import LectureHeader from './LectureHeader/LectureHeader'
import LectureInfo from './LectureInfo/LectureInfo'

const LectureCard: FC = () => {
	return (
		<>
			<LectureHeader />
			<LectureInfo />
		</>
	)
}

export default LectureCard
