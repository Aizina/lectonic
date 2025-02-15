import { FC, useState } from 'react'

interface ModalOverlayProps {
	isOpen: boolean
	onClose: () => void
	children: React.ReactNode
}

const ModalOverlay: FC<ModalOverlayProps> = ({ isOpen, onClose, children }) => {
	const [mouseDownOnOverlay, setMouseDownOnOverlay] = useState(false)
	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.currentTarget === e.target && e.button === 0) {
			setMouseDownOnOverlay(true)
		}
	}
	const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
		if (mouseDownOnOverlay && e.currentTarget === e.target && e.button === 0) {
			onClose()
		}
		setMouseDownOnOverlay(false)
	}
	return (
		<div
			className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-25 transition-opacity duration-300 ${
				isOpen
					? 'opacity-100 pointer-events-auto'
					: 'opacity-0 pointer-events-none'
			}`}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
		>
			{children}
		</div>
	)
}

export default ModalOverlay
