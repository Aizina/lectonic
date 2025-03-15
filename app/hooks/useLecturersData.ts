import { LecturerDisplay, allLecturersResponseData } from '@/shared/types/lecturer.types'
import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'

export function useLecturersData() {
  const [lecturers, setLecturers] = useState<LecturerDisplay[]>([])
  const [objectsNum, setObjectsNum] = useState<number>(4)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState<boolean>(true)

  const fetchLecturers = useCallback(async (objectsNum: number) => {
    try {
      setLoading(true)

      const url = `https://api.lectonic.skroy.ru/organization/2817fcea-d2b8-4e3c-b990-8c2dfc21e89f/lecturers?current_page=1&objects_per_page=${objectsNum}`
      const headers = { 'project-id': '7bad8c49-6e57-4347-9e14-ebc056c21136' }
      const response = await axios.get<allLecturersResponseData>(url, { headers })

      console.log(response); 
      if (!Array.isArray(response.data?.data)) {
        throw new Error('Data is not an array or is undefined');
      }

      if (!response.data || !Array.isArray(response.data.data)) {
        throw new Error('Invalid response structure or missing data');
      }

      const bundles = response.data.data || []; 
      console.log(bundles)

      if (bundles.length === 0) {
        throw new Error('No data available');
      }

      const lecturersTransformed : LecturerDisplay[] = bundles.map((LecturersResponseData) => ({
        id: LecturersResponseData.lecturer_id,
        name: `${LecturersResponseData.profile.first_name} ${LecturersResponseData.profile.middle_name ?? ''} ${LecturersResponseData.profile.last_name}`.trim(),
        about: LecturersResponseData.lecturer.about,
        image: LecturersResponseData.profile.photo_main,
        specialization: LecturersResponseData.lecturer.specialization,
        themes: LecturersResponseData.themes,
        formats: LecturersResponseData.lecturer.format,
        emergencySpeaking: LecturersResponseData.lecturer.emergency_speaking,
      }));
      

      setLecturers(prev => {
        const combined = [...prev, ...lecturersTransformed]
        const unique = combined.filter(
          (item, index, self) => index === self.findIndex(t => t.id === item.id)
        )
        console.log("unique: ", combined)
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
