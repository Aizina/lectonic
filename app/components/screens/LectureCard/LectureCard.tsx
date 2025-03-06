import { useLectureData } from '@/hooks/useLectureInfo'
import SubHeader from '@/ui/subheader/SubHeader'
import { Meta } from '@/utils/Meta/Meta'
import { FC } from 'react'
import LectureDetails from './LectureDetails/LectureDetails'
import LectureInfo from './LectureInfo/LectureInfo'
import ReviewsCarousel from './Reviews/ReviewsCarousel'

interface LectureCardProps {
	id?: string
}

const LectureCard: FC<LectureCardProps> = ({ id }) => {
	const { lectureData, lecturerData, loading, error } = useLectureData(id)

	if (loading) {
		return (
			<div className='container h-[700px] flex justify-center items-center mx-auto my-12 p-4 font-azoft uppercase font-bold text-[48px]'>
				Загрузка данных...
			</div>
		)
	}

	if (error || !lectureData || !lecturerData) {
		return (
			<div className='container h-[700px] flex justify-center items-center mx-auto my-12 p-4 font-azoft uppercase font-bold text-[48px] text-center'>
				Произошла ошибка: {error || 'Данных о лекции нет.'}
			</div>
		)
	}

	const { lecture, themes } = lectureData

	const fullName =
		lecturerData.lecturers[0].lecturer.first_name +
		' ' +
		lecturerData.lecturers[0].lecturer.last_name

	return (
		<>
			<Meta title={lecture.title}>
				<SubHeader
					lecturerId={lecturerData.lecturers[0].lecturer_id}
					lecturer={fullName}
					titleLecture={lecture.title}
				/>
				<LectureInfo
					lectureData={{ lecture, themes }}
					lecturerData={lecturerData.lecturers}
				/>
				<LectureDetails
					duration={lecture.duration}
					format={lecture.format}
					targetAudience={lecture.target_audience}
					result={lecture.result}
				/>
				<ReviewsCarousel />
			</Meta>
		</>
	)
}

export default LectureCard
