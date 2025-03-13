import down from '@/assets/svg/down.svg'
import rating from '@/assets/svg/rating.svg'
import { LectureDisplay } from '@/shared/types/lecture.types'
import { Meta } from '@/utils/Meta/Meta'
import { truncateTextByWord } from '@/utils/truncateTextByWord'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

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
	return (
		<Meta title='Лекции'>
			<div className='container mx-auto flex py-32 justify-between gap-10'>
				<div className='text-left'>
					<div className='max-w-[356px] flex flex-col gap-5'>
						<span className='font-roboto font-medium text-[48px] leading-[125%]'>
							Каталог лекций
						</span>
						<span className='font-montserrat font-normal text-[20px] text-[#6B6B6B] leading-[136%]'>
							Выберите интересующую вас тему из широкого ассортимента лекций от
							ведущих экспертов.
						</span>
					</div>
				</div>
				<div>
					{lectures.map(lecture => (
						<div
							key={lecture.id}
							className='flex flex-col max-w-[1094px] gap-8 border-b border-[#B3B3B3] mb-10'
						>
							<div className='flex gap-6'>
								<div className='relative w-[163px] h-[156px]'>
									<Image
										src={lecture.image}
										alt='Изображение лекции'
										sizes='(max-width: 288px) 100vw, (max-width: 1200px) 50vw, 33vw'
										fill
										className='object-cover rounded-[26px] border'
									/>
								</div>
								<div className='max-w-[745px] flex flex-col gap-3'>
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
									<span
										className={`font-roboto text-[24px] leading-[136%] uppercase ${
											lecture.title.length < 50 ? 'mb-[30px]' : ''
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
								<div className='flex'>
									{lecture.lecturers.length > 1 ? (
										<div className='flex items-center gap-2'>
											<div className='flex -space-x-4'>
												{lecture.lecturers.slice(0, 3).map((lec, idx) => (
													<div
														key={idx}
														className='relative w-[38px] h-[38px] rounded-full overflow-hidden border-2 border-white'
														style={{ zIndex: 100 - idx }}
													>
														<Image
															src={lec.photo_small}
															alt='Лектор'
															sizes='(max-width: 288px) 100vw, (max-width: 1200px) 50vw, 33vw'
															fill
															className='object-cover'
														/>
													</div>
												))}
											</div>
											{lecture.lecturers.length > 3 && (
												<span className='font-montserrat text-[16px] leading-[18px]'>
													+{lecture.lecturers.length - 3} лекторов на тему
												</span>
											)}
										</div>
									) : (
										<Link
											href={`/lecturer/${lecture.lecturers[0].lecturer_id}`}
										>
											<div className='flex gap-3 items-center justify-between'>
												<div className='relative w-[38px] h-[38px] rounded-full overflow-hidden'>
													<Image
														src={lecture.lecturers[0].photo_main}
														alt='Лектор'
														sizes='(max-width: 288px) 100vw, (max-width: 1200px) 50vw, 33vw'
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
								</div>
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
					))}
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
			</div>
		</Meta>
	)
}

export default Lectures
