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
				<span className='font-roboto uppercase font-normal text-[26px] 2xl:text-[32px] leading-10 pb-5'>
					О лекторе
				</span>
				<span className='max-w-[944px] font-montserrat font-normal text-[14px] 2xl:text-[20px] text-[#6B6B6B] leading-7 pb-8'>
					{lecturer.about}
				</span>
				<div className='flex gap-5 pb-8 border-b border-[#B2B2B2]'>
					{themes.map((theme, index) => (
						<div
							key={index}
							className='py-3 px-5 bg-[#F7F7F7] text-primaryText rounded-[50px]'
						>
							<span className='font-montserrat text-[10px] 2xl:text-[16px] leading-7 font-medium'>
								{theme}
							</span>
						</div>
					))}
				</div>
				{lecturer.quote === '' ? null : (
					<>
						<span className='max-w-[910px] font-roboto font-normal uppercase text-[32px] 2xl:text-[32px] leading-[52px] text-left pt-5 pb-3'>
							«{lecturer.quote}»
						</span>
						<span className='max-w-[910px] font-montserrat font-normal text-[18px] 2xl:text-[24px] text-[#6B6B6B] text-right leading-7'>
							– говорит {profile.first_name} {profile.last_name}
						</span>
					</>
				)}
			</div>
		</div>
	)
}

export default DetailedInfo
