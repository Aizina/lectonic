import { LectureData, LectureResponse } from '@/shared/types/lecture.types'
import { LecturerItem } from '@/shared/types/lecturer.types'
import axios from 'axios'
import { useEffect, useState } from 'react'

export function useLectureData(lectureId?: string) {
	const [lectureData, setLectureData] = useState<LectureData | null>(null)
	const [lecturerData, setLecturerData] = useState<LecturerItem | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if (!lectureId) {
			setLoading(false)
			return
		}

		const url = `https://api.lectonic.skroy.ru/lecture/${lectureId}?add_lecturer_data=true`

		const projectId = '7bad8c49-6e57-4347-9e14-ebc056c21136'

		setLoading(true)
		axios
			.get<LectureResponse>(url, {
				headers: {
					'project-id': projectId,
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
