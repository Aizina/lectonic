import arrowRight from '@/assets/svg/arrow-right.svg'
import Image from 'next/image'
import React, { FC, useState,useRef } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Calendar, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale'

interface ModalOrderFormProps {
	onSubmit: () => void
	btnVariant: 'Заказать лекцию' | 'Заказать лектора'
}

const ModalOrderForm: FC<ModalOrderFormProps> = ({ onSubmit, btnVariant }) => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [phone, setPhone] = useState('')
	const [org, setOrg] = useState('')
	const [message, setMessage] = useState('')
	const [agree, setAgree] = useState(false)
	const [selectedDate, setSelectedDate] = useState<Date | null>(null)
	const [selectedTime, setSelectedTime] = useState('')
	const [isCalendarOpen, setIsCalendarOpen] = useState(false);
	const timeInputRef = useRef<HTMLInputElement | null>(null);

	const [nameError, setNameError] = useState('')
	const [emailError, setEmailError] = useState('')
	const [phoneError, setPhoneError] = useState('')
	const [orgError, setOrgError] = useState('')

	

	const handleNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === ' ') {
			const input = e.target as HTMLInputElement
			if (
				input.selectionStart === 0 ||
				(input.selectionStart && input.value[input.selectionStart - 1] === ' ')
			) {
				e.preventDefault()
			}
		}
	}

	const handleNameBlur = () => {
		setName(prev => prev.trim())
		if (!name.trim()) {
			setNameError('Поле обязательно для заполнения')
		}
	}

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const rawValue = e.target.value
		const allowed = rawValue.replace(/[^A-Za-zА-Яа-яЁё' \-]/g, '')
		const collapsed = allowed.replace(/\s{2,}/g, ' ')
		if (collapsed.length < rawValue.length) {
			setNameError('Разрешены кириллица, латиница, пробел, дефис, апостроф.')
		} else {
			setNameError('')
		}
		setName(collapsed)
	}

	const handleEmailKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === ' ') {
			e.preventDefault()
		}
	}

	const handleEmailBlur = () => {
		const trimmed = email.trim()
		setEmail(trimmed)

		if (!trimmed) {
			setEmailError('Поле обязательно для заполнения')
		} else {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
			if (!emailRegex.test(trimmed)) {
				setEmailError('Введите корректный E-mail')
			} else {
				setEmailError('')
			}
		}
	}

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value)
		setEmailError('')
	}

	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const rawValue = e.target.value
		const cleanedValue = rawValue.replace(/[^\d+]/g, '')
		setPhoneError(
			cleanedValue.length < rawValue.length
				? 'Поле может содержать только цифры и знак "+"'
				: ''
		)
		setPhone(cleanedValue)
	}

	const handlePhoneBlur = () => {
		if (!phone.trim()) {
			setPhoneError('Поле обязательно для заполнения')
		} else {
			const phoneRegex = new RegExp('^\\+\\d{10,15}$')
			if (!phoneRegex.test(phone)) {
				setPhoneError('Неверный формат номера телефона')
			}
		}
	}

	const handleOrgBlur = () => {
		if (!org.trim()) {
			setOrgError('Поле обязательно для заполнения')
		}
	}

	const MAX_ORG = 50
	const handleOrgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let raw = e.target.value
		raw = raw.replace(/[#$&\${}\[\]<>\/\\;%=']/g, '')
		if (raw.length > MAX_ORG) {
			raw = raw.slice(0, MAX_ORG)
		}
		setOrg(raw)
	}

	const MAX_MESSAGE = 250
	const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		let raw = e.target.value
		raw = raw.replace(/[#$&\${}\[\]<>\/\\;%=']/g, '')
		if (raw.length > MAX_MESSAGE) {
			raw = raw.slice(0, MAX_MESSAGE)
		}
		setMessage(raw)
	}

	const handleAgreeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAgree(e.target.checked)
	}

	const handleFormSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		let isValid = true

		if (!name.trim()) {
			setNameError('Поле обязательно для заполнения')
			isValid = false
		}

		if (!email.trim()) {
			setEmailError('Поле обязательно для заполнения')
			isValid = false
		} else {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
			if (!emailRegex.test(email)) {
				setEmailError('Введите корректный E-mail')
				isValid = false
			}
		}

		if (!phone.trim()) {
			setPhoneError('Поле обязательно для заполнения')
			isValid = false
		} else {
			const phoneRegex = new RegExp('^\\+\\d{10,15}$')
			if (!phoneRegex.test(phone)) {
				setPhoneError('Неверный формат номера телефона')
				isValid = false
			}
		}

		if (!org.trim()) {
			setOrgError('Поле обязательно для заполнения')
			isValid = false
		}

		if (!isValid) return

		alert('Форма отправлена!')
		setName('')
		setEmail('')
		setPhone('')
		setOrg('')
		setMessage('')
		setAgree(false)
		setNameError('')
		setEmailError('')
		setPhoneError('')
		onSubmit()
	}

	const handleCalendarClick = () => {
		setIsCalendarOpen((prev) => !prev);
	};
	  
	const handleDateChange = (date: Date | null) => {
		setSelectedDate(date);
		setIsCalendarOpen(false); 
	};

	const openTimePicker = () => {
		if (timeInputRef.current) {
			timeInputRef.current.showPicker(); 
		}
	};
	
	return (
		<form
			onSubmit={handleFormSubmit}
			className='flex flex-col font-lato font-normal leading-[24px]'
		>
			<div className='mb-8'>
				<input
					type='text'
					placeholder='Имя*'
					required
					maxLength={30}
					pattern='^[А-Яа-яЁё\s-]+$'
					title='Разрешены кириллица, латиница, пробел, дефис, апостроф'
					value={name}
					onChange={handleNameChange}
					onKeyDown={handleNameKeyDown}
					onBlur={handleNameBlur}
					className={`w-full p-4 rounded-xl bg-gray-100 outline-none 
            ${nameError ? 'border border-red-500' : ''}
          `}
				/>
				{nameError && (
					<p className='text-xs text-red-500 mt-1 ml-4'>{nameError}</p>
				)}
			</div>

			<div className='mb-8'>
				<input
					type='email'
					value={email}
					onChange={handleEmailChange}
					onBlur={handleEmailBlur}
					onKeyDown={handleEmailKeyDown}
					className={`w-full p-4 rounded-xl bg-gray-100 outline-none 
            ${emailError ? 'border border-red-500' : ''}
          `}
					maxLength={50}
					placeholder='Почта*'
				/>
				{emailError && (
					<p className='text-xs text-red-500 mt-1 ml-4'>{emailError}</p>
				)}
			</div>

			<div className='mb-8'>
				<input
					type='tel'
					value={phone}
					onChange={handlePhoneChange}
					onBlur={handlePhoneBlur}
					className={`w-full p-4 rounded-xl bg-gray-100 outline-none
            ${phoneError ? 'border border-red-500' : ''}
          `}
					maxLength={17}
					placeholder='Номер телефона*'
				/>
				{phoneError && (
					<p className='text-xs text-red-500 mt-1 ml-4'>{phoneError}</p>
				)}
			</div>

			<div className='mb-8'>
				<div className='relative'>
					<input
						type='text'
						value={org}
						onChange={handleOrgChange}
						onBlur={handleOrgBlur}
						className={`w-full p-4 rounded-xl bg-gray-100 outline-none
							${orgError ? 'border border-red-500' : ''}
						`}
						placeholder='Название организации*'
					/>
					{orgError && (
						<p className='text-xs text-red-500 mt-1 ml-4'>{orgError}</p>
					)}
					<span className='absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-500'>
						{org.length}/{MAX_ORG}
					</span>
				</div>
			</div>

			<div className='mb-8 flex flex-row gap-[10px]'>
	
				<div className='relative mb-4'>
				<DatePicker
					selected={selectedDate}
					onChange={handleDateChange}
					dateFormat="dd.MM.yyyy"
					placeholderText="__.__.____"
					locale={ru}
					showPopperArrow={false}
					open={isCalendarOpen}
					onClickOutside={() => setIsCalendarOpen(false)}
					renderCustomHeader={({
						date, decreaseMonth, increaseMonth, prevMonthButtonDisabled,
						nextMonthButtonDisabled, decreaseYear, increaseYear,
					}) => (
						<div className="flex items-center justify-between px-2 py-1 rounded-t-lg">
	
						<button
							type="button"
							onClick={decreaseYear}
							className="text-gray-700 hover:text-black"
						>
							«
						</button>

						<button
							type="button"
							onClick={decreaseMonth}
							disabled={prevMonthButtonDisabled}
							className="text-gray-700 hover:text-black"
						>
							‹
						</button>

						<span className="text-sm font-medium capitalize">
							{format(date, 'LLLL yyyy', { locale: ru })}
						</span>

						<button
							type="button"
							onClick={increaseMonth}
							disabled={nextMonthButtonDisabled}
							className="text-gray-700 hover:text-black"
						>
							›
						</button>

						<button
							type="button"
							onClick={increaseYear}
							className="text-gray-700 hover:text-black"
						>
							»
						</button>
						</div>
					)}
					showYearDropdown
					scrollableYearDropdown
					yearDropdownItemNumber={100} 
					className="w-full p-4 rounded-xl bg-gray-100 outline-none border border-gray-300 focus:border-blue-500"
					/>
					<Calendar
						className='absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer'
						onClick={handleCalendarClick}
					/>
				</div>

				<div className='relative mb-4'>
					<input
					ref={timeInputRef}
					type='time'
					value={selectedTime}
					onChange={(e) => setSelectedTime(e.target.value)}
					placeholder='__:__'
					className='w-full p-4 rounded-xl bg-gray-100 outline-none border border-gray-300 focus:border-blue-500 appearance-none pr-14'
					/>
					<Clock className='absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer'
					onClick={openTimePicker}  />
				</div>
			</div>

			<div className='mb-8'>
				<div className='relative'>
					<textarea
						value={message}
						onChange={handleMessageChange}
						className='w-full p-4 rounded-xl bg-gray-100 outline-none h-40 max-h-[160px] resize-none'
						placeholder='Введите ваше сообщение и укажите, где с вами можно связаться (например, Telegram @username).'
					/>
					<span className='absolute right-4 bottom-3 -translate-y-1/2 text-xs text-gray-500'>
						{message.length}/{250}
					</span>
				</div>
			</div>

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
				<span className='font-gotham text-white text-[24px]'>{btnVariant}</span>
				<span className='flex items-center justify-center w-[49px] h-[49px] rounded-[24px] bg-white'>
					<Image src={arrowRight} alt='Arrow right' />
				</span>
			</button>
		</form>
	)
}

export default ModalOrderForm
