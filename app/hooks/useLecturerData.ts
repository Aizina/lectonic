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

		const url = `https://api.lectonic.skroy.ru/lecturer/${lecturerId}?add_theme_data=true&add_lecture_data=true&add_publication_data=true`

		const projectId = '7bad8c49-6e57-4347-9e14-ebc056c21136'

		axios
			.get<LecturerResponse>(url, {
				headers: {
					'project-id': projectId,
				},
			})
			.then(response => {
				const result = response.data
				console.log(result)
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
