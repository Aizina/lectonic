import { useFreezeScroll } from '@/hooks/useFreezeScroll'
import { FC } from 'react'
import ModalContent from './ModalContent'
import ModalOverlay from './ModalOverlay'

interface ModalProps {
	isOpen: boolean
	onClose: () => void
	btnVariant: 'Заказать лекцию' | 'Заказать лектора'
	modalTitle: 'лекцию' | 'лектора'
}

const ModalOrder: FC<ModalProps> = ({
	isOpen,
	onClose,
	modalTitle,
	btnVariant,
}) => {
	useFreezeScroll(isOpen)
	return (
		<ModalOverlay isOpen={isOpen} onClose={onClose}>
			<ModalContent
				modalTitle={modalTitle}
				btnVariant={btnVariant}
				isOpen={isOpen}
				onClose={onClose}
			/>
		</ModalOverlay>
	)
}

export default ModalOrder
