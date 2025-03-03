import { Lecturer, LecturerProfile } from '@/shared/types/lecturer.types'
import { FC } from 'react'

interface DetailedInfoProps {
	lecturer: Lecturer
	themes: string[]
	profile: LecturerProfile
}

const DetailedInfo: FC<DetailedInfoProps> = ({ lecturer, themes, profile }) => {
	return (
		<div className='container mx-auto my-8 flex gap-36 max-2xl:gap-20'>
			<div className='flex flex-col'>
				<span className='font-azoft uppercase font-bold text-[26px] 2xl:text-[32px] leading-10 pb-5'>
					О лекторе
				</span>
				<span className='font-gotham font-normal text-[14px] 2xl:text-[20px] text-[#6B6B6B] leading-7 pb-5'>
					{lecturer.about}
				</span>
				<div className='flex gap-5 pb-8'>
					{themes.map((theme, index) => (
						<div
							key={index}
							className='py-3 px-5 bg-[#F7F7F7] text-primaryText rounded-[50px]'
						>
							<span className='font-gotham text-[10px] 2xl:text-[16px] leading-7 font-medium'>
								{theme}
							</span>
						</div>
					))}
				</div>
				<span className='font-azoft font-bold text-[32px] 2xl:text-[38px] leading-[52px] text-left border-t-2 pt-5 pb-3'>
					«{lecturer.quote}»
				</span>
				<span className='font-gotham font-normal text-[18px] 2xl:text-[24px] text-[#6B6B6B] text-right leading-7'>
					– говорит {profile.first_name} {profile.last_name}
				</span>
			</div>
		</div>
	)
}

export default DetailedInfo
