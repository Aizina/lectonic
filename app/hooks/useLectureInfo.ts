import { LectureData, LectureResponse } from '@/shared/types/lecture.types'
import axios from 'axios'
import { useEffect, useState } from 'react'

export function useLectureData(lectureId?: string) {
	const [lectureData, setLectureData] = useState<LectureData | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if (!lectureId) {
			setLoading(false)
			return
		}

		setLoading(true)
		axios
			.get<LectureResponse>(
				`https://api.lectonic.skroy.ru/lecture/${lectureId}`
			)
			.then(res => {
				setLectureData(res.data.data[0])
			})
			.catch(err => {
				setError(err.message || 'Произошла ошибка при загрузке данных о лекции')
			})
			.finally(() => setLoading(false))
	}, [lectureId])

	return { lectureData, loading, error }
}
