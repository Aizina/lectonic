import down from '@/assets/svg/down.svg'
import { LecturerDisplay } from '@/shared/types/lecturer.types'
import { Meta } from '@/utils/Meta/Meta'
import { truncateTextByWord } from '@/utils/truncateTextByWord'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

interface LecturersProps {
	lecturers: LecturerDisplay[]
	hasMore: boolean
	loadMore: () => void
	loading: boolean
}

const Lecturers: FC<LecturersProps> = ({
	lecturers,
	hasMore,
	loadMore,
	loading,
}) => {
	return (
		<Meta title='Лекторы'>
				<div>
					{lecturers.map(lecturer => (
						<div
							key={lecturer.id}
							className='flex flex-col max-w-[1094px] gap-8 border-b border-[#B3B3B3] mb-10'
						>
							<div className='flex flex-row gap-6 justify-between items-start'>
								<div className='flex gap-6'>
									<div className='relative w-[163px] h-[156px]'>
										<Image
											src={lecturer.image}
											alt='Изображение лекции'
											sizes='(max-width: 288px) 100vw, (max-width: 1200px) 50vw, 33vw'
											fill
											className='object-cover rounded-[26px] border'
										/>
									</div>

									<div className='max-w-[745px] flex flex-col gap-3'>
										<span
											className={`font-roboto text-[24px] leading-[136%] uppercase ${
												lecturer.name.length < 50 ? 'mb-[74px]' : ''
											}`}
										>
											{lecturer.name}
										</span>

										{lecturer.themes.length >= 1 && (
											<div className='flex gap-5'>
												{lecturer.themes.map((theme, index) => (
													<div
														key={theme.id ?? index}
														className='py-1 px-5 bg-[#F7F7F7] text-primaryText rounded-[50px] text-[10px] 2xl:text-[16px] leading-7 font-medium'
													>
														{theme.title}
													</div>
												))}
											</div>
										)}
									</div>
								</div>

								{lecturer.emergencySpeaking && (
									<div className='items-end bg-[#FFBA1A] rounded-[20px] py-[8px] px-[12px] font-montserrat text-[#363636] text-[14px]'>
										Спикер на завтра
									</div>
								)}
							</div>

							<div>
								<span className='font-montserrat text-[16px] leading-[136%] text-[#6B6B6B]'>
									{truncateTextByWord(lecturer.about, 200)}
								</span>
							</div>
							<div className='flex pt-5 pb-10 justify-between'>
								<div className='flex font-montserrat text-[16px] items-center'>
									{lecturer.formats.length > 1 ||
									lecturer.formats[0] === 'any' ? (
										<p>Проводит лекции online и offline</p>
									) : (
										<p>Проводит лекции {lecturer.formats[0]}</p>
									)}
								</div>
								<Link href={`/lecturer/${lecturer.id}`}>
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
					{loading && lecturers.length > 0 && (
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

export default Lecturers
