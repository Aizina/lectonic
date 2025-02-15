import { useFreezeScroll } from '@/hooks/useFreezeScroll'
import { FC } from 'react'
import ModalContent from './ModalContent'
import ModalOverlay from './ModalOverlay'

interface ModalProps {
	isOpen: boolean
	onClose: () => void
}

const LectureOrder: FC<ModalProps> = ({ isOpen, onClose }) => {
	useFreezeScroll(isOpen)
	return (
		<ModalOverlay isOpen={isOpen} onClose={onClose}>
			<ModalContent isOpen={isOpen} onClose={onClose} />
		</ModalOverlay>
	)
}

export default LectureOrder
