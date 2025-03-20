import Lectures from '@/components/screens/Lectures/Lectures'
import { useLecturesData } from '@/hooks/useLecturesData'
import { NextPage } from 'next'

interface LecturesCatalogueProps {
	id?: string
}

const LecturesPage: NextPage<LecturesCatalogueProps> = ({ id }) => {
	const { lectures, loading, error, hasMore, loadMore } = useLecturesData(id)

	if (loading && lectures.length === 0) {
		return (
			<div className='container h-[700px] flex justify-center items-center mx-auto my-12 p-4 font-roboto uppercase font-bold text-[48px]'>
				Загрузка данных...
			</div>
		)
	}

	if (error || lectures.length === 0) {
		return (
			<div className='container h-[700px] flex justify-center items-center mx-auto my-12 p-4 font-roboto uppercase font-bold text-[48px] text-center'>
				Произошла ошибка: {error || 'Данных о лекторе нет.'}
			</div>
		)
	}

	return (
		<Lectures
			lectures={lectures}
			hasMore={hasMore}
			loadMore={loadMore}
			loading={loading}
		/>
	)
}

export default LecturesPage
