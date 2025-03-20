import Lecturers from '@/components/screens/Lecturers/Lecturers'
import { useLecturersData } from '@/hooks/useLecturersData'
import { NextPage } from 'next'

interface LecturersCatalogueProps {
	id?: string
}

const LecturersPage: NextPage<LecturersCatalogueProps> = ({ id }) => {
	const { lecturers, loading, error, hasMore, loadMore } = useLecturersData(id)

	if (loading && lecturers.length === 0) {
		return (
			<div className='container h-[700px] flex justify-center items-center mx-auto my-12 p-4 font-roboto uppercase font-bold text-[48px]'>
				Загрузка данных...
			</div>
		)
	}

	if (error || lecturers.length === 0) {
		return (
			<div className='container h-[700px] flex justify-center items-center mx-auto my-12 p-4 font-roboto uppercase font-bold text-[48px] text-center'>
				Произошла ошибка: {error || 'Данных о лекторе нет.'}
			</div>
		)
	}

	return (
		<Lecturers
			lecturers={lecturers}
			hasMore={hasMore}
			loadMore={loadMore}
			loading={loading}
		/>
	)
}

export default LecturersPage
