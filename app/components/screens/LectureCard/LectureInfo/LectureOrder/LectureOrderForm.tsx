import arrowRight from '@/assets/svg/arrow-right.svg'
import Image from 'next/image'
import { FC, useState } from 'react'

interface LectureOrderFormProps {
	onSubmit: () => void
}

const LectureOrderForm: FC<LectureOrderFormProps> = ({ onSubmit }) => {
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
		setNameError(
			cleanedValue.length < rawValue.length
				? 'Только кириллица, пробел и дефис!'
				: ''
		)
		setName(cleanedValue)
	}

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setEmail(e.target.value)
	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const rawValue = e.target.value
		const cleanedValue = rawValue.replace(/[^\d+]/g, '')
		setPhoneError(
			cleanedValue.length < rawValue.length ? 'Только цифры и знак "+"!' : ''
		)
		setPhone(cleanedValue)
	}
	const handleOrgChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setOrg(e.target.value)
	const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
		setMessage(e.target.value)
	const handleAgreeChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setAgree(e.target.checked)

	const handleFormSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		setName('')
		setEmail('')
		setPhone('')
		setOrg('')
		setMessage('')
		setAgree(false)
		setNameError('')
		setPhoneError('')
		onSubmit()
	}

	return (
		<form
			onSubmit={handleFormSubmit}
			className='flex flex-col font-lato font-normal leading-[24px]'
		>
			<div>
				<input
					type='text'
					placeholder='Имя*'
					required
					maxLength={30}
					pattern='^[А-Яа-яЁё\s-]+$'
					title='Разрешены только буквы русского алфавита, пробелы и дефис'
					value={name}
					onChange={handleNameChange}
					className={`bg-gray-100 rounded-[40px] outline-none p-4 w-full ${
						!nameError ? 'mb-8' : ''
					}`}
				/>
				{nameError && (
					<p className='text-xs text-red-500 mt-1 ml-4 mb-8'>{nameError}</p>
				)}
			</div>
			<input
				type='email'
				placeholder='Почта*'
				value={email}
				onChange={handleEmailChange}
				maxLength={50}
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
					maxLength={17}
					className={`bg-gray-100 rounded-[40px] outline-none p-4 w-full ${
						!phoneError ? 'mb-8' : ''
					}`}
				/>
				{phoneError && (
					<p className='text-xs text-red-500 mt-1 ml-4 mb-8'>{phoneError}</p>
				)}
			</div>
			<input
				type='text'
				placeholder='Название организации'
				value={org}
				onChange={handleOrgChange}
				maxLength={50}
				className='bg-gray-100 rounded-[40px] outline-none p-4 mb-8'
			/>
			<textarea
				placeholder='Введите ваше сообщение и укажите, где с вами можно связаться (например, Telegram @username).'
				value={message}
				onChange={handleMessageChange}
				maxLength={250}
				className='bg-gray-100 rounded-[26px] outline-none p-4 mb-8 h-40 max-h-[160px] resize-none'
			/>
			<label className='text-sm flex items-center space-x-2 font-roboto font-light mb-16'>
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
				<span className='pl-2'>
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
	)
}

export default LectureOrderForm
