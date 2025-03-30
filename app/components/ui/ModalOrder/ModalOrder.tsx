import { useFreezeScroll } from '@/hooks/useFreezeScroll'
import { FC } from 'react'
import ModalContent from './ModalContent'
import ModalOverlay from './ModalOverlay'

interface ModalProps {
	isOpen: boolean
	onClose: () => void
	btnVariant: 'Заказать лекцию' | 'Заказать лектора'
	modalTitle: 'лекцию' | 'лектора'
	lectureId?: string 
	speakerId?: string
}

const ModalOrder: FC<ModalProps> = ({
	isOpen,
	onClose,
	modalTitle,
	btnVariant,
	lectureId,
	speakerId

}) => {
	useFreezeScroll(isOpen)
	return (
		<ModalOverlay isOpen={isOpen} onClose={onClose}>
			<ModalContent
				modalTitle={modalTitle}
				btnVariant={btnVariant}
				isOpen={isOpen}
				onClose={onClose}
				lectureId = {lectureId}
				speakerId = {speakerId}
			/>
		</ModalOverlay>
	)
}

export default ModalOrder
