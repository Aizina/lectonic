import {
	LectureDisplay,
	LecturesResponse,
	LecturesWithoutOrganization,
} from '@/shared/types/lecture.types'
import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'

export function useLecturesData(organizationId?: string) {
	const [lectures, setLectures] = useState<LectureDisplay[]>([])
	const [objectsNum, setObjectsNum] = useState<number>(4)
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)
	const [hasMore, setHasMore] = useState<boolean>(true)

	const fetchLectures = useCallback(
		async (objectsNum: number) => {
			try {
				setLoading(true)

				const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL

				const url = organizationId
					? `${baseUrl}/organization/${organizationId}/lectures?current_page=1&objects_per_page=${objectsNum}&add_lecturer_data=true`
					: `${baseUrl}/lectures?current_page=1&objects_per_page=${objectsNum}&add_lecturer_data=true`

				const headers = { 'project-id': process.env.NEXT_PUBLIC_PROJECT_ID }
				const response = await axios.get<LecturesResponse>(url, { headers })
				const data = response.data.data

				console.log(data)

				let lecturesTransformed: LectureDisplay[] = []

				if (organizationId) {
					const bundles = data as LecturesWithoutOrganization[]
					lecturesTransformed = bundles.map(item => ({
						id: item.id,
						title: item.lecture_data.title,
						description: item.lecture_data.description,
						image: item.lecture_data.image.long,
						rating: item.lecture_data.rating ?? '0',
						themes: item.themes.map(t => t.title),
						lecturers: item.lecturers.map(obj => ({
							lecturer_id: obj.lecturer_id,
							specialization: obj.lecturer.specialization,
							first_name: obj.lecturer.first_name,
							last_name: obj.lecturer.last_name,
							middle_name: obj.lecturer.middle_name,
							photo_main: obj.lecturer.photo_main,
							photo_small: obj.lecturer.photo_small,
						})),
					}))
				} else {
					const bundles = data as LecturesWithoutOrganization[]
					lecturesTransformed = bundles.map(item => ({
						id: item.id,
						title: item.lecture_data.title,
						description: item.lecture_data.description,
						image: item.lecture_data.image.long,
						rating: item.lecture_data.rating ?? '0',
						themes: item.themes.map(t => t.title),
						lecturers: item.lecturers.map(obj => ({
							lecturer_id: obj.lecturer_id,
							specialization: obj.lecturer.specialization,
							first_name: obj.lecturer.first_name,
							last_name: obj.lecturer.last_name,
							middle_name: obj.lecturer.middle_name,
							photo_main: obj.lecturer.photo_main,
							photo_small: obj.lecturer.photo_small,
						})),
					}))
				}

				setLectures(prev => {
					const combined = [...prev, ...lecturesTransformed]
					const unique = combined.filter(
						(item, index, self) =>
							index === self.findIndex(t => t.id === item.id)
					)
					return unique
				})

				if (lecturesTransformed.length < objectsNum - 1) {
					setHasMore(false)
				} else {
					setHasMore(true)
				}
			} catch (err: unknown) {
				if (err instanceof Error) {
					setError(err.message)
				} else {
					setError('Ошибка загрузки лекций')
				}
			} finally {
				setLoading(false)
			}
		},
		[organizationId]
	)

	useEffect(() => {
		fetchLectures(objectsNum)
	}, [objectsNum, fetchLectures])

	const loadMore = useCallback(() => {
		setObjectsNum(prev => prev + 4)
	}, [])

	return { lectures, loading, error, hasMore, loadMore }
}
