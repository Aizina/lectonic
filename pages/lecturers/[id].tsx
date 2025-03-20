import { useRouter } from 'next/router'
import { FC } from 'react'
import LecturersPage from '../lecturers'

const LecturersPageId: FC = () => {
	const router = useRouter()
	const { id } = router.query

	if (!router.isReady) {
		return (
			<div className='container h-[700px] flex justify-center items-center mx-auto my-12 p-4 font-azoft uppercase font-bold text-[48px]'>
				Загрузка данных...
			</div>
		)
	}

	return (
		<LecturersPage
			id={(id as string)}
		/>
	)
}

export default LecturersPageId
