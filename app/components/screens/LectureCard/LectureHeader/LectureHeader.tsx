import { Lecture } from '@/shared/types/lecture.types'
import { FC } from 'react'

type LectureHeaderProps = Pick<Lecture, 'title'>

const LectureHeader: FC<LectureHeaderProps> = ({ title }) => {
	return (
		<div className='py-8 text-primaryText text-accent leading-[25px] border-b border-gray-400'>
			<div className='container flex gap-2 py-4 mx-auto font-gotham font-normal text-[20px]'>
				<p className='text-gray-400'>Главная / Иван Иванов /</p>
				<p className='font-medium'>{title}</p>
			</div>
		</div>
	)
}

export default LectureHeader
