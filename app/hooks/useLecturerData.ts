import {
	LecturerDataItem,
	LecturerResponse,
} from '@/shared/types/lecturer.types'
import axios from 'axios'
import { useEffect, useState } from 'react'

export function useLecturerData(lecturerId?: string) {
	const [data, setData] = useState<LecturerDataItem | null>(null)
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if (!lecturerId) {
			setLoading(false)
			return
		}

		setLoading(true)
		setError(null)

		const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/lecturer/${lecturerId}?add_theme_data=true&add_lecture_data=true&add_publication_data=true`

		axios
			.get<LecturerResponse>(url, {
				headers: {
					'project-id': process.env.PROJECT_ID,
				},
			})
			.then(response => {
				const result = response.data
				if (result.detail.code === 'OK' && result.data.length > 0) {
					setData(result.data[0])
				} else {
					setError('Данные о лекторе не найдены')
				}
			})
			.catch(err => {
				setError(err.message || 'Ошибка при загрузке данных о лекторе')
			})
			.finally(() => {
				setLoading(false)
			})
	}, [lecturerId])

	return { data, loading, error }
}
