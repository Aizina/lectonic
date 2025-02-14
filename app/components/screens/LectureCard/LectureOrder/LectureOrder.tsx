import arrowRight from '@/assets/svg/arrow-right.svg'
import Image from 'next/image'
import { FC, useState } from 'react'

interface ModalProps {
	isOpen: boolean
	onClose: () => void
}

const LectureOrder: FC<ModalProps> = ({ isOpen, onClose }) => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [phone, setPhone] = useState('')
	const [org, setOrg] = useState('')
	const [message, setMessage] = useState('')
	const [agree, setAgree] = useState(false)

	const [nameError, setNameError] = useState('')
	const [phoneError, setPhoneError] = useState('')

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const rawValue = e.target.value
		const cleanedValue = rawValue.replace(/[^А-Яа-яЁё \-]/g, '')

		if (cleanedValue.length < rawValue.length) {
			setNameError('Только кириллица, пробел и дефис!')
		} else {
			setNameError('')
		}

		setName(cleanedValue)
	}

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value)
	}

	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const rawValue = e.target.value
		const cleanedValue = rawValue.replace(/[^\d+]/g, '')

		if (cleanedValue.length < rawValue.length) {
			setPhoneError('Только цифры и знак "+"!')
		} else {
			setPhoneError('')
		}

		setPhone(cleanedValue)
	}

	const handleOrgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setOrg(e.target.value)
	}

	const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setMessage(e.target.value)
	}

	const handleAgreeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAgree(e.target.checked)
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		setName('')
		setEmail('')
		setPhone('')
		setOrg('')
		setMessage('')
		setAgree(false)

		setNameError('')
		setPhoneError('')

		onClose()
	}

	return (
		<div
			className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-25 transition-opacity duration-300 ${
				isOpen
					? 'opacity-100 pointer-events-auto'
					: 'opacity-0 pointer-events-none'
			}`}
			onClick={onClose}
		>
			<div
				onClick={e => e.stopPropagation()}
				className={`relative py-10 px-14 max-w-[702px] bg-white rounded-[36px] shadow-lg transform transition-transform duration-300 ${
					isOpen
						? 'translate-y-0 scale-100 opacity-100'
						: 'translate-y-4 scale-95 opacity-0'
				}`}
			>
				<button
					onClick={onClose}
					className='absolute top-4 right-4 text-gray-500  hover:text-gray-800 transition-colors'
				>
					✕
				</button>

				<h2 className='font-azoft text-[32px] font-bold mb-10'>
					Оставьте заявку на лекцию
				</h2>

				<form
					onSubmit={handleSubmit}
					className='flex flex-col font-lato font-normal leading-[24px]'
				>
					<div>
						<input
							type='text'
							placeholder='Имя*'
							required
							pattern='^[А-Яа-яЁё\s-]+$'
							title='Разрешены только буквы русского алфавита, пробелы и дефис'
							value={name}
							onChange={handleNameChange}
							className={`bg-gray-100 rounded-[40px] outline-none p-4 w-full ${
								!nameError && 'mb-8'
							}`}
						/>
						{nameError && (
							<p className='text-xs text-red-500 mt-1 ml-4 mb-8 '>
								{nameError}
							</p>
						)}
					</div>
					<input
						type='email'
						placeholder='Почта*'
						value={email}
						onChange={handleEmailChange}
						required
						className='bg-gray-100 rounded-[40px] outline-none p-4 mb-8'
					/>
					<div>
						<input
							type='tel'
							placeholder='Номер телефона*'
							required
							value={phone}
							onChange={handlePhoneChange}
							className={`bg-gray-100 rounded-[40px] outline-none p-4 w-full ${
								!phoneError && 'mb-8'
							}`}
						/>
						{phoneError && (
							<p className='text-xs text-red-500 mt-1 ml-4 mb-8'>
								{phoneError}
							</p>
						)}
					</div>
					<input
						type='text'
						placeholder='Название организации'
						value={org}
						onChange={handleOrgChange}
						className='bg-gray-100 rounded-[40px] outline-none p-4 mb-8'
					/>
					<textarea
						placeholder='Введите ваше сообщение и укажите, где с вами можно связаться (например, Telegram @username).'
						value={message}
						onChange={handleMessageChange}
						className='bg-gray-100 rounded-[26px] outline-none p-4 mb-8 h-40'
					/>

					<label className='text-sm flex items-center space-x-2 font-roboto font-light mb-8'>
						<div className='relative'>
							<input
								type='checkbox'
								required
								className='peer appearance-none h-6 w-6 bg-[#D9D9D9] rounded-sm transition-colors'
								checked={agree}
								onChange={handleAgreeChange}
							/>
							<svg
								className='w-4 h-4 text-black absolute top-1 left-1 hidden peer-checked:block pointer-events-none'
								fill='none'
								stroke='currentColor'
								strokeWidth='3'
								viewBox='0 0 24 24'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M5 13l4 4L19 7'
								/>
							</svg>
						</div>
						<span>
							Согласен(на) с{' '}
							<a href='#' className='text-black font-bold underline'>
								пользовательским соглашением
							</a>{' '}
							и даю согласие на обработку и сбор своих персональных данных
						</span>
					</label>

					<button
						type='submit'
						className='flex justify-between items-center py-3 px-8 rounded-[52px] bg-primary hover:bg-primary-hover hover:cursor-pointer'
					>
						<span className='font-gotham text-white text-[24px]'>
							Заказать лекцию
						</span>
						<span className='flex items-center justify-center w-[49px] h-[49px] rounded-[24px] bg-white'>
							<Image src={arrowRight} alt='Arrow right' />
						</span>
					</button>
				</form>
			</div>
		</div>
	)
}

export default LectureOrder
