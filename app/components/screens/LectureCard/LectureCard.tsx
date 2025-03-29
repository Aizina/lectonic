import { useLectureData } from '@/hooks/useLectureInfo'
import SubHeader from '@/ui/subheader/SubHeader'
import { Meta } from '@/utils/Meta/Meta'
import { FC } from 'react'
import LectureDetails from './LectureDetails/LectureDetails'
import LectureInfo from './LectureInfo/LectureInfo'
import ReviewsCarousel from './Reviews/ReviewsCarousel'
import { useRouter } from 'next/router'

interface LectureCardProps {
	id?: string
}

const LectureCard: FC<LectureCardProps> = ({ id }) => {
	const { lectureData, lecturerData, loading, error } = useLectureData(id)
	const router = useRouter();
	const lecturerId = router.query.lecturerId as string; 

	if (loading) {
		return (
			<div className='container h-[700px] flex justify-center items-center mx-auto my-12 p-4 font-roboto uppercase font-bold text-[48px]'>
				Загрузка данных...
			</div>
		)
	}

	if (error || !lectureData || !lecturerData) {
		return (
			<div className='container h-[700px] flex justify-center items-center mx-auto my-12 p-4 font-roboto uppercase font-bold text-[48px] text-center'>
				Произошла ошибка: {error || 'Данных о лекции нет.'}
			</div>
		)
	}

	const { lecture, themes } = lectureData

	const fullName =
		lecturerData.lecturers[0].lecturer.first_name +
		' ' +
		lecturerData.lecturers[0].lecturer.last_name

	const previousLecturer = lecturerData.lecturers.find(
		(lecturer) => lecturer.lecturer_id.toString() === lecturerId
		);
	const mainLecturerName = previousLecturer ? 
	previousLecturer?.lecturer.first_name + ' ' + previousLecturer?.lecturer.last_name 
	: fullName

	return (
		<>
			<Meta title={lecture.title}>
				<SubHeader
					lecturerId={previousLecturer?.lecturer_id || lecturerData.lecturers[0].lecturer_id}
					lecturer={mainLecturerName}
					titleLecture={lecture.title}
				/>
				<LectureInfo
					lectureData={{ lecture, themes }}
					lecturerData={lecturerData.lecturers}
					mainLecturer = {previousLecturer}
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
