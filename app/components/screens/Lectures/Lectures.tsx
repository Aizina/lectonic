import defaultImage from '@/assets/img/theme_bg.png'
import down from '@/assets/svg/down.svg'
import rating from '@/assets/svg/rating.svg'
import { LectureDisplay } from '@/shared/types/lecture.types'
import { Meta } from '@/utils/Meta/Meta'
import { truncateTextByWord } from '@/utils/truncateTextByWord'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useState } from 'react'

interface LecturesProps {
	lectures: LectureDisplay[]
	hasMore: boolean
	loadMore: () => void
	loading: boolean
}

const Lectures: FC<LecturesProps> = ({
	lectures,
	hasMore,
	loadMore,
	loading,
}) => {
	const [hoveredLectureId, setHoveredLectureId] = useState<string | null>(null)

	const SHIFT_PX = 8

	return (
		<Meta title='Лекции'>
			<div>
				{lectures.map(lecture => {
					const isHovered = hoveredLectureId === lecture.id

					return (
						<div
							key={lecture.id}
							className='flex flex-col max-w-[1094px] gap-8 border-b border-[#B3B3B3] mb-10'
						>
							<div className='flex gap-6'>
								<div className='relative w-[163px] h-[156px]'>
									<Image
										src={lecture.image || defaultImage}
										alt='Изображение лекции'
										fill
										className='object-cover rounded-[26px] border'
									/>
								</div>
								<div className='max-w-[745px] flex flex-col gap-3'>
									{lecture.rating !== '0' && (
										<div className='flex gap-2'>
											<span className='font-montserrat text-[20px] text-[#1E1E1E]'>
												{lecture.rating}
											</span>
											<Image
												src={rating}
												width={16}
												height={16}
												alt='Рейтинг'
												style={{ width: 'auto', height: 'auto' }}
											/>
										</div>
									)}

									<span
										className={`font-roboto text-[24px] leading-[136%] uppercase ${
											lecture.title.length < 50 && lecture.rating
												? 'mb-[74px]'
												: 'mb-[40px]'
										}`}
									>
										{lecture.title}
									</span>

									<div className='flex gap-5'>
										{lecture.themes.map((theme, index) => (
											<div
												key={index}
												className='py-1 px-5 bg-[#F7F7F7] text-primaryText rounded-[50px] text-[10px] 2xl:text-[16px] leading-7 font-medium'
											>
												{theme}
											</div>
										))}
									</div>
								</div>
							</div>

							<div>
								<span className='font-montserrat text-[16px] leading-[136%] text-[#6B6B6B]'>
									{truncateTextByWord(lecture.description, 200)}
								</span>
							</div>

							<div className='flex pt-5 pb-10 justify-between'>
								{lecture.lecturers.length === 1 && (
									<Link
										href={`/lecturer/${lecture.lecturers[0].lecturer_id}`}
									>
										<div className='flex gap-3 items-center justify-between'>
											<div className='relative w-[38px] h-[38px] rounded-full overflow-hidden'>
												<Image
													src={lecture.lecturers[0].photo_main}
													alt='Лектор'
													fill
													className='object-cover'
												/>
											</div>
											<div>
												<div className='font-montserrat font-medium text-[14px] text-[#202020] leading-[125%]'>
													{lecture.lecturers[0].first_name}{' '}
													{lecture.lecturers[0].middle_name}{' '}
													{lecture.lecturers[0].last_name}
												</div>
												<div className='max-w-[850px] font-montserrat text-[14px] text-[#454545] leading-[125%]'>
													{lecture.lecturers[0].specialization}
												</div>
											</div>
										</div>
									</Link>
								)}

								{lecture.lecturers.length === 2 && (
									<div className='flex gap-6'>
										{lecture.lecturers.map(lect => (
											<Link
												key={lect.lecturer_id}
												href={`/lecturer/${lect.lecturer_id}`}
											>
												<div className='flex gap-3 items-center justify-between'>
													<div className='relative w-[38px] h-[38px] rounded-full overflow-hidden'>
														<Image
															src={lect.photo_main}
															alt='Лектор'
															fill
															className='object-cover'
														/>
													</div>
													<div>
														<div className='font-montserrat font-medium text-[14px] text-[#202020] leading-[125%]'>
															{lect.first_name} {lect.middle_name}{' '}
															{lect.last_name}
														</div>
														<div className='max-w-[850px] font-montserrat text-[14px] text-[#454545] leading-[125%]'>
															{lect.specialization}
														</div>
													</div>
												</div>
											</Link>
										))}
									</div>
								)}

								{lecture.lecturers.length > 2 && (
									<div
										className='flex items-center'
										onMouseEnter={() => setHoveredLectureId(lecture.id)}
										onMouseLeave={() => setHoveredLectureId(null)}
									>
										<div className='flex -space-x-4 relative'>
											{lecture.lecturers.slice(0, 3).map((lec, i) => (
												<Link
													key={lec.lecturer_id}
													href={`/lecturer/${lec.lecturer_id}`}
													className='relative w-[38px] h-[38px] rounded-full overflow-hidden border-2 border-white
					transition-transform duration-300'
													style={{
														zIndex: 100 - i,
														transform: isHovered
															? `translateX(${(i + 1) * SHIFT_PX}px)`
															: 'none',
													}}
												>
													<Image
														src={lec.photo_small}
														alt='Лектор'
														fill
														className='object-cover'
													/>
												</Link>
											))}
										</div>
										{lecture.lecturers.length > 3 && (
											<span
												className='ml-2 transition-transform duration-300'
												style={{
													transform: isHovered
														? `translateX(${(3 + 1) * SHIFT_PX}px)`
														: 'none',
												}}
											>
												+{lecture.lecturers.length - 3} лекторов на тему
											</span>
										)}
									</div>
								)}

								<Link href={`/lecture/${lecture.id}`}>
									<div>
										<div className='flex justify-between items-center py-2 px-8 rounded-[52px] bg-primary hover:bg-primary-hover hover:cursor-pointer'>
											<span className='font-roboto text-white text-[20px]'>
												Подробнее
											</span>
										</div>
									</div>
								</Link>
							</div>
						</div>
					)
				})}

				{loading && lectures.length > 0 && (
					<div className='font-montserrat text-[14px] text-[#454545] leading-[130%] text-center my-4'>
						Загрузка...
					</div>
				)}

				{hasMore && !loading && (
					<div
						onClick={loadMore}
						className='flex justify-center my-8 hover:cursor-pointer items-center gap-5'
					>
						<span className='font-montserrat font-medium text-[14px] text-[#454545] leading-[130%]'>
							Показать больше
						</span>
						<Image src={down} alt='Вниз' />
					</div>
				)}
			</div>
		</Meta>
	)
}

export default Lectures
