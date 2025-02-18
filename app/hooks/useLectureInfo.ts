import { LectureData, LectureResponse } from '@/shared/types/lecture.types'
import axios from 'axios'
import { useEffect, useState } from 'react'

export function useLectureData() {
	const [lectureData, setLectureData] = useState<LectureData | null>(null)
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		axios
			.get<LectureResponse>(
				'https://api.lectonic.skroy.ru/lecture/4c156f55-750a-4246-adb4-939f40d7dd2c'
			)
			.then(response => {
				const data = response.data
				if (data.detail.code === 'OK' && data.data.length > 0) {
					setLectureData(data.data[0])
				} else {
					setError('Не удалось получить данные о лекции')
				}
			})
			.catch(err => {
				setError(err.message || 'Ошибка при получении данных о лекции')
			})
			.finally(() => setLoading(false))
	}, [])

	return { lectureData, loading, error }
}
