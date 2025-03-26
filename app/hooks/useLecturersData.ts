import {
	LecturerDisplay,
	allLecturersResponseData,
} from '@/shared/types/lecturer.types'
import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'

export function useLecturersData(organizationId?: string) {
	const [lecturers, setLecturers] = useState<LecturerDisplay[]>([])
	const [objectsNum, setObjectsNum] = useState<number>(4)
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)
	const [hasMore, setHasMore] = useState<boolean>(true)

	const fetchLecturers = useCallback(async (objectsNum: number) => {
		try {
			setLoading(true)

			const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL

			const url = organizationId
				? `${baseUrl}/organization/${organizationId}/lecturers?current_page=1&objects_per_page=${objectsNum}`
				: `${baseUrl}/lecturers?current_page=1&objects_per_page=${objectsNum}`
			const headers = { 'Project-ID': process.env.NEXT_PUBLIC_PROJECT_ID }
			const response = await axios.get<allLecturersResponseData>(url, {
				headers,
			})

			if (!Array.isArray(response.data?.data)) {
				throw new Error('Data is not an array or is undefined')
			}

			if (!response.data || !Array.isArray(response.data.data)) {
				throw new Error('Invalid response structure or missing data')
			}

			const bundles = response.data.data || []

			if (bundles.length === 0) {
				throw new Error('No data available')
			}

			const lecturersTransformed: LecturerDisplay[] = bundles.map(
				LecturersResponseData => ({
					id: LecturersResponseData.lecturer_id,
					name: `${LecturersResponseData.profile.first_name} ${
						LecturersResponseData.profile.middle_name ?? ''
					} ${LecturersResponseData.profile.last_name}`.trim(),
					about: LecturersResponseData.lecturer.about,
					image: LecturersResponseData.profile.photo_main,
					specialization: LecturersResponseData.lecturer.specialization,
					themes: LecturersResponseData.themes,
					formats: LecturersResponseData.lecturer.format,
					emergencySpeaking: LecturersResponseData.lecturer.emergency_speaking,
				})
			)

			setLecturers(prev => {
				const combined = [...prev, ...lecturersTransformed]
				const unique = combined.filter(
					(item, index, self) => index === self.findIndex(t => t.id === item.id)
				)
				return unique
			})

			setHasMore(lecturersTransformed.length >= objectsNum)
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err.message)
			} else {
				setError('Ошибка загрузки лекций')
			}
		} finally {
			setLoading(false)
		}
	}, [])

	useEffect(() => {
		fetchLecturers(objectsNum)
	}, [objectsNum, fetchLecturers])

	const loadMore = useCallback(() => {
		setObjectsNum(prev => prev + 4)
	}, [])

	return { lecturers, loading, error, hasMore, loadMore }
}
