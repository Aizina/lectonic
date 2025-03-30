import { FC, useEffect, useState } from 'react'
import LectureOrderForm from './ModalOrderForm'

interface ModalContentProps {
	isOpen: boolean
	modalTitle: 'лекцию' | 'лектора'
	btnVariant: 'Заказать лекцию' | 'Заказать лектора'
	onClose: () => void
	lectureId?: string 
	speakerId?: string
	
}

const ModalContent: FC<ModalContentProps> = ({
	isOpen,
	onClose,
	modalTitle,
	btnVariant,
	lectureId,
	speakerId
}) => {
	const [isSubmitted, setIsSubmitted] = useState(false)

	useEffect(() => {
		if (!isOpen) {
			setIsSubmitted(false)
		}
	}, [isOpen])

	const handleClose = () => {
		setIsSubmitted(false)
		onClose()
	}

	if (!isOpen) return null

	return (
		<div
			className={`relative py-10 px-14 w-[702px] h-[950px] bg-white rounded-[36px] shadow-lg transform transition-transform duration-300 ${
				isOpen
					? 'translate-y-0 scale-100 opacity-100'
					: 'translate-y-4 scale-95 opacity-0'
			}`}
		>
			<button
				onClick={handleClose}
				className='absolute top-4 right-7 text-black text-[17px] font-bold hover:text-gray-800 transition-colors'
			>
				✕
			</button>
			{!isSubmitted && (
				<h2 className='font-azoft text-[32px] font-bold mb-10 uppercase'>
					Оставьте заявку на {modalTitle}
				</h2>
			)}
			<LectureOrderForm
				btnVariant={btnVariant}
				onSubmit={handleClose}
				isSubmitted={isSubmitted}
				setIsSubmitted={setIsSubmitted}
				modalTitle={modalTitle}
				lectureId = {lectureId}
				speakerId = {speakerId}
			/>
		</div>
	)
}

export default ModalContent
