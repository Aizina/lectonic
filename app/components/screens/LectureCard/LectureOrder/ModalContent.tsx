import { FC } from 'react'
import LectureOrderForm from './LectureOrderForm'

interface ModalContentProps {
	isOpen: boolean
	onClose: () => void
}

const ModalContent: FC<ModalContentProps> = ({ isOpen, onClose }) => (
	<div
		onClick={e => e.stopPropagation()}
		onMouseDown={e => e.stopPropagation()}
		className={`relative py-10 px-14 max-w-[702px] bg-white rounded-[36px] shadow-lg transform transition-transform duration-300 ${
			isOpen
				? 'translate-y-0 scale-100 opacity-100'
				: 'translate-y-4 scale-95 opacity-0'
		}`}
	>
		<button
			onClick={onClose}
			className='absolute top-4 right-6 text-black text-[15px] font-bold hover:text-gray-800 transition-colors'
		>
			✕
		</button>
		<h2 className='font-azoft text-[32px] font-bold mb-10'>
			Оставьте заявку на лекцию
		</h2>
		<LectureOrderForm onSubmit={onClose} />
	</div>
)

export default ModalContent
