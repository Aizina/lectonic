import SubHeader from '@/components/ui/subheader/SubHeader'
import { useLecturerData } from '@/hooks/useLecturerData'
import { Meta } from '@/utils/Meta/Meta'
import { FC } from 'react'
import DetailedInfo from './DetailedInfo/DetailedInfo'
import LecturerInfo from './LecturerInfo/LecturerInfo'
import LecturesCarousel from './LecturesCarousel/LecturesCarousel'
import PublicationsCarousel from './PublicationsCarousel/PublicationsCarousel'

interface LecturerCardProps {
	id?: string
}

const LecturerCard: FC<LecturerCardProps> = ({ id }) => {
	const { data, loading, error } = useLecturerData(id)

	if (loading) {
		return (
			<div className='container h-[700px] flex justify-center items-center mx-auto my-12 p-4 font-roboto uppercase font-bold text-[48px]'>
				Загрузка данных...
			</div>
		)
	}

	if (error || !data) {
		return (
			<div className='container h-[700px] flex justify-center items-center mx-auto my-12 p-4 font-roboto uppercase font-bold text-[48px] text-center'>
				Произошла ошибка: {error || 'Данных о лекторе нет.'}
			</div>
		)
	}

	const { lecturer, profile, lectures, themes, publications } = data

	return (
		<>
			<Meta title={`${profile.first_name} ${profile.last_name}`}>
				<SubHeader lecturer={`${profile.first_name} ${profile.last_name}`} />
				<div className='container flex flex-col md:flex-row mx-auto gap-20 2xl:gap-36 '>
					<LecturerInfo lecturer={lecturer} profile={profile} />
					<div className='max-2xl:max-w-[700px]'>
						<DetailedInfo
							lecturer={lecturer}
							themes={themes}
							profile={profile}
						/>
						{lectures.length !== 0 ? (
							<LecturesCarousel lectures={lectures} />
						) : null}
						{publications.length !== 0 ? (
							<PublicationsCarousel publications={publications} />
						) : null}
						{/* <TeachingPlaces /> */}
					</div>
				</div>
			</Meta>
		</>
	)
}

export default LecturerCard
