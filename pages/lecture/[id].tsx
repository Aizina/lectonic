import LectureCard from '@/components/screens/LectureCard/LectureCard'
import { useRouter } from 'next/router'
import { FC } from 'react'

const LecturePage: FC = () => {
	const router = useRouter()
	const { id } = router.query

	if (!router.isReady) {
		return <div>Подготовка маршрута...</div>
	}

	return <LectureCard id={id as string} />
}

export default LecturePage
