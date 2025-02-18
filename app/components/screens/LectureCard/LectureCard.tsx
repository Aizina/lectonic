import { useLectureData } from '@/hooks/useLectureInfo'
import { FC } from 'react'
import LectureDetails from './LectureDetails/LectureDetails'
import LectureHeader from './LectureHeader/LectureHeader'
import LectureInfo from './LectureInfo/LectureInfo'
import ReviewsCarousel from './Reviews/ReviewsCarousel'

const LectureCard: FC = () => {
	const { lectureData, loading, error } = useLectureData()

	if (loading) {
		return (
			<div className='container h-[700px] flex justify-center items-center mx-auto my-12 p-4 font-azoft uppercase font-bold text-[48px]'>
				Загрузка данных...
			</div>
		)
	}

	if (error || !lectureData) {
		return (
			<div className='container h-[700px] flex justify-center items-center mx-auto my-12 p-4 font-azoft uppercase font-bold text-[48px]'>
				Произошла ошибка: {error || 'Данных о лекции нет.'}
			</div>
		)
	}

	const { lecture, themes } = lectureData
	return (
		<>
			<LectureHeader title={lecture.title} />
			<LectureInfo lectureData={{ lecture, themes }} />
			<LectureDetails
				duration={lecture.duration}
				format={lecture.format}
				targetAudience={lecture.target_audience}
				result={lecture.result}
			/>
			<ReviewsCarousel />
		</>
	)
}

export default LectureCard
