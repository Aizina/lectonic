import { LectureDisplay, LecturesResponse } from '@/shared/types/lecture.types'
import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import api from '../../api.json'

export function useLecturesData() {
	const [lectures, setLectures] = useState<LectureDisplay[]>([])
	const [objectsNum, setObjectsNum] = useState<number>(4)
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)
	const [hasMore, setHasMore] = useState<boolean>(true)

	const fetchLectures = useCallback(async (objectsNum: number) => {
		try {
			setLoading(true)

			const url = `https://api.lectonic.skroy.ru/organization/${api.organization_id}/lectures?current_page=1&objects_per_page=${objectsNum}&add_lecturer_data=true`

			const headers = { 'project-id': api.project_name }
			const response = await axios.get<LecturesResponse>(url, { headers })
			const bundles = response.data.data

			const lecturesTransformed: LectureDisplay[] = bundles.map(
				([lectureItem, themesItem, lecturersItem]) => ({
					id: lectureItem.id,
					title: lectureItem.lecture_data.title,
					description: lectureItem.lecture_data.description,
					image: lectureItem.lecture_data.image.long,
					rating: lectureItem.lecture_data.rating ?? '0',
					themes: themesItem.themes.theme_list.map(t => t.theme),
					lecturers: lecturersItem.lecturers.map(obj => ({
						lecturer_id: obj.lecturer_id,
						specialization: obj.lecturer.specialization,
						first_name: obj.lecturer.first_name,
						last_name: obj.lecturer.last_name,
						middle_name: obj.lecturer.middle_name,
						photo_main: obj.lecturer.photo_main,
						photo_small: obj.lecturer.photo_small,
					})),
				})
			)

			setLectures(prev => {
				const combined = [...prev, ...lecturesTransformed]
				const unique = combined.filter(
					(item, index, self) => index === self.findIndex(t => t.id === item.id)
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
	}, [])

	useEffect(() => {
		fetchLectures(objectsNum)
	}, [objectsNum, fetchLectures])

	const loadMore = useCallback(() => {
		setObjectsNum(prev => prev + 4)
	}, [])

	return { lectures, loading, error, hasMore, loadMore }
}
