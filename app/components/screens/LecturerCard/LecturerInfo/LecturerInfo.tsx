import defaultAvatar from '@/assets/img/lector_avatar_example.png'
import arrowDown from '@/assets/svg/arrow-down.svg'
import arrowRight from '@/assets/svg/arrow-right.svg'
import arrowUp from '@/assets/svg/arrow-up.svg'
import check from '@/assets/svg/check.svg'
import facebookIcon from '@/assets/svg/facebook.svg'
import linkedinIcon from '@/assets/svg/linkedin.svg'
import mapPin from '@/assets/svg/map-pin.svg'
import star from '@/assets/svg/Star 1.svg'
import twitterIcon from '@/assets/svg/twitter-alt.svg'
import youtubeIcon from '@/assets/svg/youtube.svg'
import { Lecturer, LecturerProfile } from '@/shared/types/lecturer.types'
import ModalOrder from '@/ui/ModalOrder/ModalOrder'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useState } from 'react'

interface LecturerInfoProps {
	lecturer: Lecturer
	profile: LecturerProfile
	lecturerId? : string
}

const socialIcons: Record<string, string> = {
	Facebook: facebookIcon,
	Twitter: twitterIcon,
	YouTube: youtubeIcon,
	LinkedIn: linkedinIcon,
}

const LecturerInfo: FC<LecturerInfoProps> = ({ lecturer, profile, lecturerId }) => {
	const [regaliaOpen, setRegaliaOpen] = useState(false)
	const [experienceOpen, setExperienceOpen] = useState(false)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const hasAchievements = lecturer.achievements.some(
		achievement => achievement.achievement.trim().length > 0
	)
	const hasExperience = lecturer.experience.some(
		experience => experience.experience.trim().length > 0
	)
	return (
		<div className='mx-auto my-8 flex gap-36 max-2xl:gap-20'>
			<div className='flex flex-col max-w-[508px] gap-3'>
				<div className='relative w-[508px] h-[486px] rounded-[26px] overflow-hidden'>
					<Image
						src={profile.photo_main || defaultAvatar}
						className='object-cover object-center'
						alt='Лектор'
						sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
						fill
						priority
					/>
					<div className='absolute bottom-5 left-3 gap-3 flex font-montserrat text-[16px] leading-[20px] font-medium text-[#363636]'>
						{lecturer.emergency_speaking ? (
							<div className='w-[184px] h-[40px] bg-[#FFBA1A] rounded-[20px] flex items-center justify-center'>
								Спикер на завтра
							</div>
						) : null}
					</div>
					<div className='absolute top-3 right-4 w-[50px] h-[50px] bg-white rounded-[50px] flex justify-center items-center'>
						<Image src={star} alt='Награда' />
					</div>
				</div>
				<div className='pl-5'>
					<div className='flex flex-col gap-2'>
						<div className='flex justify-between'>
							<span className='font-roboto font-normal uppercase text-[26px] 2xl:text-[32px] leading-[124%]'>
								{profile.first_name} {profile.middle_name} {profile.last_name}
							</span>
							{lecturer.confirmed === 0 ? (
								<div className='relative group'>
									<div className='w-[40px] h-[40px] bg-[#4860EF] text-[44px] rounded-[50px] flex items-center justify-center'>
										<Image src={check} alt='Знак подтверждения' />
									</div>
									<div
										className={`absolute hidden group-hover:flex flex-col items-center w-[300px] xl:w-[463px] h-[83px] px-5 py-6 bg-[#F6F9FF] rounded-[20px] shadow-lg border border-gray-200 text-sm text-[#282828] leading-5 left-[230px] -translate-x-1/2 bottom-[105%] z-10`}
									>
										<p className='font-montserrat font-normal text-[10px] 2xl:text-[14px] leading-[136%] text-[#6B6B6B]'>
											Профиль прошёл верификацию экспертами Лектоника — проверка
											документов и рекомендаций
										</p>
										<div
											className={`absolute w-5 h-5 border-[10px] border-transparent border-t-[#F6F9FF] bottom-[-19px] left-[20px] -translate-x-1/2`}
										></div>
									</div>
								</div>
							) : null}
						</div>
						<span className='font-montserrat font-normal text-[14px] 2xl:text-[20px] leading-[136%] text-secondaryText'>
							{lecturer.specialization}
						</span>
					</div>
					<div className='border-b-2 mt-10'>
						<div className='flex gap-3 py-8'>
							<Image src={mapPin} alt='Значок геолокации' />
							<span className='font-montserrat font-medium text-[14px] 2xl:text-[20px] leading-[136%] text-[#282828]'>
								{lecturer.location !== '' ? lecturer.location : null}
							</span>
						</div>
					</div>
					<div className='border-b-2'>
						<div
							className={`flex gap-3 py-8 items-center justify-between ${
								hasAchievements
									? 'cursor-pointer'
									: 'pointer-events-none opacity-50'
							}`}
							onClick={() => setRegaliaOpen(!regaliaOpen)}
						>
							<span className='font-montserrat font-medium text-[18px] 2xl:text-[24px] leading-[136%] text-[#404040]'>
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
                ${regaliaOpen ? 'max-h-[500px] py-4' : 'max-h-0 py-0'}
              `}
						>
							<ul className='font-montserrat list-disc list-outside pl-2 text-[14px] 2xl:text-[20px] leading-[136%] text-[#6B6B6B] space-y-3'>
								{lecturer.achievements.map((achievement, index) => (
									<li key={index}>{achievement.achievement}</li>
								))}
							</ul>
						</div>
					</div>
					<div className='pb-10'>
						<div
							className={`flex gap-3 py-8 items-center justify-between ${
								hasExperience
									? 'cursor-pointer'
									: 'pointer-events-none opacity-50'
							}`}
							onClick={() => setExperienceOpen(!experienceOpen)}
						>
							<span className='font-montserrat font-medium text-[18px] 2xl:text-[24px] leading-[136%] text-[#404040]'>
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
                ${experienceOpen ? 'max-h-[500px] py-4' : 'max-h-0 py-0'}
              `}
						>
							<ul className='font-montserrat list-disc list-outside pl-2 text-[14px] 2xl:text-[20px] leading-[136%] text-[#6B6B6B] space-y-3'>
								{lecturer.experience.map((experience, index) => (
									<li key={index}>{experience.experience}</li>
								))}
							</ul>
						</div>
					</div>
					<div className='pb-20'>
						<span className='font-montserrat font-medium text-[18px] 2xl:text-[24px] leading-[136%] text-[#404040]'>
							Проводит лекции:
						</span>
						<ul className='font-montserrat list-disc list-outside pl-8 pt-5 text-[14px] 2xl:text-[20px] leading-[136%] text-[#6B6B6B] space-y-3'>
							{lecturer.format.map(fmt =>
								fmt === 'any' ? (
									<>
										<li>Online</li>
										<li>Offline</li>
									</>
								) : (
									<li key={fmt}>{fmt}</li>
								)
							)}
						</ul>
					</div>
					<div
						onClick={() => setIsModalOpen(true)}
						className='flex justify-between items-center py-3 px-8 rounded-[52px] bg-primary hover:bg-primary-hover hover:cursor-pointer'
					>
						<span className='font-montserrat font-medium text-white text-[18px] 2xl:text-[24px]'>
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
						btnVariant='Пригласить спикера'
						speakerId = {lecturerId}
						
					/>
					<div className='flex gap-8 pt-12 pl-3'>
						{lecturer.contact_media.length > 1
							? lecturer.contact_media.map((contact, i) => {
									const iconSrc = socialIcons[contact.title] || star
									return (
										<Link href={contact.value} key={i} target='_blank'>
											<Image src={iconSrc} alt={contact.title} />
										</Link>
									)
							  })
							: null}
					</div>
				</div>
			</div>
		</div>
	)
}

export default LecturerInfo
