import SubHeader from '@/components/ui/subheader/SubHeader'
import { Meta } from '@/utils/Meta/Meta'
import { FC } from 'react'
import LecturerInfo from './LecturerInfo/LecturerInfo'

const LecturerCard: FC = () => {
	return (
		<>
			<Meta title='Карточка лектора'>
				<SubHeader lecturer='Иван Иванов' />
				<LecturerInfo />
			</Meta>
		</>
	)
}

export default LecturerCard
