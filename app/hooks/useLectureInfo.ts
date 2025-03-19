import { LectureData, LectureResponse } from '@/shared/types/lecture.types'
import { LecturersData } from '@/shared/types/lecturer.types'
import axios from 'axios'
import { useEffect, useState } from 'react'

export function useLectureData(lectureId?: string) {
	const [lectureData, setLectureData] = useState<LectureData | null>(null)
	const [lecturerData, setLecturerData] = useState<LecturersData | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if (!lectureId) {
			setLoading(false)
			return
		}

		const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/lecture/${lectureId}?add_lecturer_data=true`

		setLoading(true)
		axios
			.get<LectureResponse>(url, {
				headers: {
					'project-id': process.env.NEXT_PUBLIC_PROJECT_ID,
				},
			})
			.then(res => {
				setLectureData(res.data.data[0])
				setLecturerData(res.data.data[1])
			})
			.catch(err => {
				setError(err.message || 'Произошла ошибка при загрузке данных о лекции')
			})
			.finally(() => setLoading(false))
	}, [lectureId])

	return { lectureData, lecturerData, loading, error }
}
