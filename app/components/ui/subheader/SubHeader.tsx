import { FC } from 'react'

interface SubHeaderProps {
	titleLecture?: string
	lecturer: string
}

const SubHeader: FC<SubHeaderProps> = ({ titleLecture, lecturer }) => {
	return (
		<div className='py-8 text-primaryText leading-[25px] border-b border-gray-400'>
			<div className='container flex gap-2 py-4 mx-auto font-gotham  text-[21px]'>
				<p className='font-normal text-gray-400'>Главная /</p>
				<p
					className={
						!titleLecture ? 'font-medium' : 'font-normal text-gray-400'
					}
				>
					{lecturer}
				</p>
				{titleLecture ? (
					<>
						<p className='font-normal text-gray-400'>/</p>{' '}
						<p className='font-medium'> {titleLecture}</p>
					</>
				) : (
					''
				)}
			</div>
		</div>
	)
}

export default SubHeader
