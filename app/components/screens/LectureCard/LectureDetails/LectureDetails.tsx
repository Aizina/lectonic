import { formatDuration } from '@/utils/formatDuration'
import { FC } from 'react'

interface LectureDetailsProps {
	duration: number
	format: string
	targetAudience: string
	result: string
}

const LectureDetails: FC<LectureDetailsProps> = ({
	duration,
	format,
	targetAudience,
	result,
}) => {
	return (
		<div className='w-[94vw] py-16 px-6 text-white m-auto font-roboto'>
			<div className='p-[40px] mx-auto'>
				<div
					className='flex flex-col items-left justify-left md:flex-row md:justify-between md:items-center 
        pb-8 text-left border-b border-[#1F1F20]'
				>
					<span className='text-xs lg:text-base font-normal text-[#565656]'>
						Что вас ждёт?
					</span>
					<span className='text-lg lg:text-[32px] font-bold text-[#1F1F20] font-roboto'>
						Основные детали лекции
					</span>
				</div>
				{targetAudience.trim().length > 0 && result.trim().length > 0 ? (
					<div className='flex flex-col gap-6 2xl:gap-[2vw] p-12 my-8 mx-auto bg-[#4860EF] rounded-[32px] max-w-[820px]'>
						<h3 className='font-bold text-2xl text-[#FCFCFC]'>
							01. Целевая аудитория
						</h3>
						<p className='font-normal text-base text-[#CBD3FF]'>
							{targetAudience.trim().length > 0
								? targetAudience
								: 'Описание отсутствует'}
						</p>
						<h3 className='font-bold text-2xl text-[#FCFCFC]'>02. Результат</h3>
						<p className='font-normal text-base text-[#CBD3FF]'>
							{result.trim().length > 0 ? result : 'Описание отсутствует'}
						</p>
					</div>
				) : null}

				<div className='flex flex-col items-left justify-left text-[#1F1F20]'>
					<div className='border-b border-[#1F1F20] flex flex-row justify-between items-center p-8'>
						<span className='text-md lg:text-2xl font-medium'>
							Длительность
						</span>
						<span className='text-3xl lg:text-[42px] font-bold'>
							{duration === 0 ? 90 : formatDuration(duration)}
						</span>
					</div>
					<div className='border-b border-[#1F1F20] flex flex-row justify-between items-center p-8'>
						<span className='text-md lg:text-2xl font-medium'>Формат</span>
						<span className='text-3xl lg:text-[42px] font-bold'>
							{format.length > 1 || format[0].trim().length === 0
								? 'Online'
								: format}
						</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default LectureDetails
