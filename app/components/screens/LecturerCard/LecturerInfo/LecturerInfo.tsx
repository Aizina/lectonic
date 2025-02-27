import lecturer from '@/assets/img/lecturer.png'
import arrowDown from '@/assets/svg/arrow-down.svg'
import arrowRight from '@/assets/svg/arrow-right.svg'
import arrowUp from '@/assets/svg/arrow-up.svg'
import mapPin from '@/assets/svg/map-pin.svg'
import star from '@/assets/svg/Star.svg'
import Image from 'next/image'
import { FC, useState } from 'react'
import ModalOrder from '../../../ui/ModalOrder/ModalOrder'


const LecturerInfo: FC = () => {
	const [regaliaOpen, setRegaliaOpen] = useState(false)
	const [experienceOpen, setExperienceOpen] = useState(false)
	const [isModalOpen, setIsModalOpen] = useState(false)
	return (
		<div className='container mx-auto my-8 flex gap-36 max-2xl:gap-20'>
			<div className='flex flex-col max-w-[508px] gap-8'>
				<div className='relative w-[508px] h-[486px] rounded-[26px] overflow-hidden'>
					<Image
						src={lecturer}
						alt='Лектор'
						fill
						objectFit='cover'
						objectPosition='center'
						priority
					/>
					<div className='absolute bottom-5 left-3 gap-3 flex font-gotham text-[16px] leading-[20px] font-medium text-white'>
						<div className='w-[85px] h-[40px] bg-[#2A2A2A] rounded-[20px] flex items-center justify-center'>
							Online
						</div>
						<div className='w-[85px] h-[40px] bg-[#798CFC] rounded-[20px] flex items-center justify-center'>
							Offline
						</div>
					</div>
				</div>
				<div className='pl-5'>
					<div>
						<div className='flex justify-between'>
							<span className='font-azoft font-bold uppercase text-[26px] 2xl:text-[32px] leading-[44px]'>
								Иван Иванович Петров
							</span>
							<div className='relative group'>
								<div className='w-[40px] h-[40px] bg-[#4860EF] text-[44px] 2xl:rounded-[50px] flex items-center justify-center'>
									<Image src={star} alt='Знак подтверждения' />
								</div>
								<div
									className={`absolute hidden group-hover:flex flex-col items-center w-[300px] xl:w-[463px] h-[83px] px-5 py-6 bg-[#F6F9FF] rounded-[20px] shadow-lg border border-gray-200 text-sm text-[#282828] leading-5 left-[230px] -translate-x-1/2 bottom-[105%]`}
								>
									<p className='font-gotham font-normal text-[10px] 2xl:text-[14px] leading-5 text-[#6B6B6B]'>
										Профиль прошёл верификацию экспертами Лектоника — проверка
										документов и рекомендаций
									</p>
									<div
										className={`absolute w-5 h-5 border-[10px] border-transparent border-t-[#F6F9FF] bottom-[-19px] left-[20px] -translate-x-1/2`}
									></div>
								</div>
							</div>
						</div>
						<span className='font-gotham font-normal text-[14px] 2xl:text-[20px] leading-[28px] text-secondaryText'>
							Специалист по цифровым технологиям и инновациям
						</span>
					</div>
					<div className='border-b-2'>
						<div className='flex gap-3 py-8'>
							<Image src={mapPin} alt='Значок геолокации' />
							<span className='font-gotham font-medium text-[14px] 2xl:text-[20px] leading-[24px] text-[#282828]'>
								Омск
							</span>
						</div>
					</div>
					<div className='border-b-2'>
						<div
							className='flex gap-3 py-8 items-center justify-between cursor-pointer'
							onClick={() => setRegaliaOpen(!regaliaOpen)}
						>
							<span className='font-gotham font-medium text-[18px] 2xl:text-[24px] leading-[30px] text-[#404040]'>
								Регалии:
							</span>
							<div className='flex items-center justify-center'>
								{regaliaOpen ? (
									<span className='flex items-center justify-center w-[40px] h-[40px] rounded-[24px] bg-[#1C1C1C]'>
										<Image src={arrowUp} alt='Arrow right' />
									</span>
								) : (
									<span className='flex items-center justify-center w-[40px] h-[40px] rounded-[24px] bg-[#1C1C1C]'>
										<Image src={arrowDown} alt='Arrow right' />
									</span>
								)}
							</div>
						</div>
						<div
							className={`
                px-3 transition-all duration-300 overflow-hidden
                ${regaliaOpen ? 'max-h-[200px] py-4' : 'max-h-0 py-0'}
              `}
						>
							<ul className='font-gotham list-disc list-outside pl-2 text-[14px] 2xl:text-[20px] leading-[28px] text-[#6B6B6B] space-y-3'>
								<li>Доктор наук в области информационных технологий</li>
								<li>Профессор кафедры цифровых систем</li>
								<li>Автор 30+ публикаций</li>
							</ul>
						</div>
					</div>
					<div className='pb-10'>
						<div
							className='flex gap-3 py-8 items-center justify-between cursor-pointer'
							onClick={() => setExperienceOpen(!experienceOpen)}
						>
							<span className='font-gotham font-medium text-[18px] 2xl:text-[24px] leading-[30px] text-[#404040]'>
								Опыт:
							</span>
							<div className='flex items-center justify-center'>
								{experienceOpen ? (
									<span className='flex items-center justify-center w-[40px] h-[40px] rounded-[24px] bg-[#1C1C1C]'>
										<Image src={arrowUp} alt='Arrow right' />
									</span>
								) : (
									<span className='flex items-center justify-center w-[40px] h-[40px] rounded-[24px] bg-[#1C1C1C]'>
										<Image src={arrowDown} alt='Arrow right' />
									</span>
								)}
							</div>
						</div>
						<div
							className={`
                px-3 transition-all duration-300 overflow-hidden
                ${experienceOpen ? 'max-h-[200px] py-4' : 'max-h-0 py-0'}
              `}
						>
							<ul className='font-gotham list-disc list-outside pl-2 text-[14px] 2xl:text-[20px] leading-[28px] text-[#6B6B6B] space-y-3'>
								<li>Более 15 лет в IT-индустрии</li>
								<li>Опыт руководства крупными проектами</li>
								<li>Преподавание в ведущих вузах региона</li>
							</ul>
						</div>
					</div>
					<div
						onClick={() => setIsModalOpen(true)}
						className='flex justify-between items-center py-3 px-8 rounded-[52px] bg-primary hover:bg-primary-hover hover:cursor-pointer'
					>
						<span className='font-gotham text-white text-[18px] 2xl:text-[24px]'>
							Пригласить спикера
						</span>
						<span className='flex items-center justify-center w-[49px] h-[49px] rounded-[24px] bg-white'>
							<Image src={arrowRight} alt='Arrow right' />
						</span>
					</div>
					<ModalOrder
						isOpen={isModalOpen}
						onClose={() => setIsModalOpen(false)}
						modalTitle='лектора'
						btnVariant='Нанять лектора'
					/>
				</div>
			</div>
		</div>
	)
}

export default LecturerInfo
