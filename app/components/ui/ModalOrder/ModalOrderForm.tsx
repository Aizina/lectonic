import arrowRight from '@/assets/svg/arrow-right.svg'
import checkIcon from '@/assets/svg/checked.svg'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { Calendar, Clock } from 'lucide-react'
import Image from 'next/image'
import React, { FC, useRef, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useOrderLecture } from '@/hooks/useOrderLecture'

interface ModalOrderFormProps {
	onSubmit: () => void
	btnVariant: 'Заказать лекцию' | 'Заказать лектора'
	isSubmitted: boolean
	setIsSubmitted: (value: boolean) => void
	modalTitle: 'лекцию' | 'лектора'
	lectureId?: string
    speakerId?: string
}

interface CalendarContainerProps {
	children?: React.ReactNode
	className?: string
	onApply: () => void
}

const ModalOrderForm: FC<ModalOrderFormProps> = ({
	onSubmit,
	btnVariant,
	isSubmitted,
	setIsSubmitted,
	modalTitle,
    lectureId,  
    speakerId,  
}) => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [phone, setPhone] = useState('')
	const [org, setOrg] = useState('')
	const [message, setMessage] = useState('')
	const [agree, setAgree] = useState(false)
	const [selectedDate, setSelectedDate] = useState<Date | null>(null)
	const [tempDate, setTempDate] = useState<Date | null>(null)
	const [selectedTime, setSelectedTime] = useState('')
	const [isCalendarOpen, setIsCalendarOpen] = useState(false)
	const timeInputRef = useRef<HTMLInputElement | null>(null)

	const [nameError, setNameError] = useState('')
	const [emailError, setEmailError] = useState('')
	const [phoneError, setPhoneError] = useState('')
	const [orgError, setOrgError] = useState('')
	const [dateError, setDateError] = useState('')
	const [timeError, setTimeError] = useState('')

	const { postLectureOrder, loading, error } = useOrderLecture()


	const handleCalendarClick = () => {
		setTempDate(selectedDate)
		setIsCalendarOpen(true)
	}

	function CalendarContainerWithApply({
		className,
		children,
		onApply,
	}: CalendarContainerProps) {
		return (
			<div className={className}>
				{children}
				<div className='flex justify-center p-1'>
					<button
						onClick={onApply}
						className='bg-primary text-white text-[16px] w-[260px] h-[42px] px-4 py-2 rounded-[50px] hover:bg-primary-hover'
					>
						Применить
					</button>
				</div>
			</div>
		)
	}

	const openTimePicker = () => {
		if (timeInputRef.current) {
			timeInputRef.current.showPicker()
			setTimeError('')
		}
	}

	const handleTempDateChange = (date: Date | null) => {
		setTempDate(date)
	}

	const handleApplyDate = () => {
		setSelectedDate(tempDate)
		setIsCalendarOpen(false)
	}

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
		setOrgError('')
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

	const handleFormSubmit = async (e: React.FormEvent) => {
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

		if (!selectedDate) {
			setDateError('Выберите дату')
			isValid = false
		} else {
			setDateError('')
		}

		if (!selectedTime) {
			setTimeError('Выберите время')
			isValid = false
		} else {
			setTimeError('')
		}

		if (!isValid) return

		const [hours, minutes] = selectedTime.split(':')
        
        const nameParts = name.trim().split(' ')
        const first_name = nameParts[0] || ''
        const last_name = nameParts[1] || ''
        const middle_name = nameParts[2] || ''

        let dateString = ''
        if (selectedDate) {
            const year = selectedDate.getFullYear()
            const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0')
            const day = selectedDate.getDate().toString().padStart(2, '0')
            dateString = `${year}-${month}-${day}`
        }

        const requestBody = {
          description: message, 
          custom_fields: {
            cf_time_preferred: [
              {
                hours: Number(hours),
                minutes: Number(minutes),
                seconds: 0,
              },
			  {
                hours: Number(hours),
                minutes: Number(minutes),
                seconds: 0,
              },
            ],
            cf_date_preferred: dateString, 
            cf_contact: {
              email: email,
              phone: phone,
            },
            cf_org_name: org,
            cf_lecture_id: lectureId ? lectureId : undefined,
            cf_speaker_id: speakerId ? speakerId : undefined,
            cf_client: {
              first_name,
              last_name,
              middle_name,
            },
          },
        }

        await postLectureOrder(requestBody)

        if (!error) {
            setName('')
            setEmail('')
            setPhone('')
            setOrg('')
            setMessage('')
            setAgree(false)
            setSelectedDate(null)
            setSelectedTime('')
            setNameError('')
            setEmailError('')
            setPhoneError('')
            setOrgError('')
            setDateError('')
            setTimeError('')
            setIsSubmitted(true)
        }

	}

	if (isSubmitted) {
		return (
			<div className='mt-[45%] p-6 sm:p-8 flex flex-col items-center justify-center text-center font-lato font-normal leading-[24px]'>
				<div className='w-[64px] h-[64px] mb-4 flex items-center justify-center rounded-full bg-[#4860EF]'>
					<Image src={checkIcon} alt='Успех' width={32} height={32} />
				</div>

				<h2 className='text-[24px] leading-[40px] font-bold mb-2'>
					ЗАЯВКА УСПЕШНО ОТПРАВЛЕНА!
				</h2>
				<p className='font-montserrat text-[14px] mb-6'>
					{modalTitle === 'лектора'
						? 'Мы свяжемся с вами в ближайшее время для уточнения деталей. Спасибо за ваш интерес к нашим лекторам!'
						: 'Мы свяжемся с вами в ближайшее время для уточнения деталей. Спасибо за ваш интерес к нашим лекциям!'}
				</p>

				<button
					onClick={onSubmit}
					className='flex w-[590px] mt-72 justify-between items-center py-3 px-6 rounded-[52px] bg-primary hover:bg-primary-hover'
				>
					<span className='font-montserrat text-white text-[24px]'>
						{modalTitle === 'лектора'
							? 'Вернуться к лектору'
							: 'Вернуться к лекции'}
					</span>
					<span className='flex items-center justify-center w-[40px] h-[40px] rounded-full bg-white ml-2'>
						<Image src={arrowRight} alt='Arrow right' />
					</span>
				</button>
			</div>
		)
	}

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
					className={`w-full p-4 rounded-xl bg-gray-100 outline-none ${
						nameError ? 'border border-red-500' : ''
					}`}
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
					className={`w-full p-4 rounded-xl bg-gray-100 outline-none ${
						emailError ? 'border border-red-500' : ''
					}`}
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
					className={`w-full p-4 rounded-xl bg-gray-100 outline-none ${
						phoneError ? 'border border-red-500' : ''
					}`}
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
						className={`w-full p-4 rounded-xl bg-gray-100 outline-none ${
							orgError ? 'border border-red-500' : ''
						}`}
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

			<div className='mb-3 flex flex-row gap-[10px]'>
				<div className='relative'>
					<input
						type='text'
						readOnly
						value={selectedDate ? selectedDate.toLocaleDateString('ru-RU') : ''}
						className='w-[286px] h-[56px] pl-4 rounded-xl bg-gray-100 outline-none border-gray-300'
						onClick={handleCalendarClick}
						placeholder='Выбор даты'
					/>
					{isCalendarOpen && (
						<div className='absolute z-30'>
							<DatePicker
								selected={tempDate}
								onChange={handleTempDateChange}
								dateFormat='dd.MM.yyyy'
								inline
								locale={ru}
								open={isCalendarOpen}
								onClickOutside={() => setIsCalendarOpen(false)}
								shouldCloseOnSelect={false}
								calendarContainer={props => (
									<CalendarContainerWithApply
										{...props}
										onApply={handleApplyDate}
									/>
								)}
								minDate={new Date(new Date().setDate(new Date().getDate() + 1))}
								calendarClassName='custom-calendar'
								popperClassName='custom-calendar-popper'
								renderCustomHeader={({
									date,
									decreaseMonth,
									increaseMonth,
									prevMonthButtonDisabled,
									prevYearButtonDisabled,
									nextMonthButtonDisabled,
									decreaseYear,
									increaseYear,
								}) => (
									<div className='flex items-center justify-between px-7 py-1 rounded-t-lg bg-white'>
										<button
											type='button'
											onClick={decreaseYear}
											disabled={prevYearButtonDisabled}
											className='text-[20px] text-black hover:text-black'
										>
											«
										</button>
										<button
											type='button'
											onClick={decreaseMonth}
											disabled={prevMonthButtonDisabled}
											className='text-[20px] text-black hover:text-black'
										>
											‹
										</button>
										<span className='text-sm font-medium capitalize'>
											{format(date, 'LLLL yyyy', { locale: ru })}
										</span>
										<button
											type='button'
											onClick={increaseMonth}
											disabled={nextMonthButtonDisabled}
											className='text-[20px] text-black hover:text-black'
										>
											›
										</button>
										<button
											type='button'
											onClick={increaseYear}
											className='text-[20px] text-black hover:text-black'
										>
											»
										</button>
									</div>
								)}
							/>
						</div>
					)}
					<Calendar
						className={`absolute ${
							dateError ? 'right-3 top-7' : 'right-4 top-7'
						} -translate-y-1/2 cursor-pointer`}
						onClick={handleCalendarClick}
					/>
					{dateError && (
						<p className='text-xs text-red-500 mt-1 ml-4'>{dateError}</p>
					)}
				</div>

				<div className='relative mb-4 items-center justify-center'>
					<input
						ref={timeInputRef}
						type='time'
						value={selectedTime}
						onChange={e => setSelectedTime(e.target.value)}
						placeholder='__:__'
						className='w-[131px] h-[56px] pl-3 rounded-xl bg-gray-100 outline-none border-gray-300 appearance-none pr-14'
					/>
					<Clock
						className={`absolute ${
							timeError ? 'right-3 top-7' : 'right-4 top-7'
						} -translate-y-1/2 cursor-pointer`}
						onClick={openTimePicker}
					/>
					{timeError && (
						<p className='text-xs text-red-500 mt-1 ml-4'>{timeError}</p>
					)}
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
				disabled={loading} 
				className='flex justify-between items-center py-3 px-8 rounded-[52px] bg-primary hover:bg-primary-hover hover:cursor-pointer'
			>
				<span className='font-gotham text-white text-[24px]'>{btnVariant}</span>
				<span className='flex items-center justify-center w-[49px] h-[49px] rounded-[24px] bg-white'>
					<Image src={arrowRight} alt='Arrow right' />
				</span>
			</button>

			{error && <p className='text-red-500 mt-4'>Произошла ошибка: {error}</p>}
		</form>
	)
}

export default ModalOrderForm
