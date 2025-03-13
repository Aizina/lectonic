import { Lecture } from './lecture.types'

export interface LecturerResponse {
	detail: LecturerDetail
	data: LecturerDataItem[]
	info: LecturerInfo
}

export interface LecturerDetail {
	code: string
	message: string
}

export interface LecturerInfo {
	api_version: string
}

export interface LecturerDataItem {
	lecturer: Lecturer
	profile: LecturerProfile
	lectures: Lecture[]
	themes: string[]
	publications: Publication[]
}

export interface Lecturer {
	specialization: string
	academic_degree: string
	format: string[]
	experience: ExperienceItem[]
	achievements: AchievementItem[]
	location: string
	about: string
	quote: string
	language: string
	contact_media: ContactMedia[]
	lectures_conducted: number
	confirmed: number
	emergency_speaking: boolean
	is_subscribed: boolean
	teaching_locations: TeachingLocations[]
}

export interface LecturerItem {
	lecturer_id: string
	lecturer: LecturerProfile
}

export interface LecturersData {
	lecturers: LecturerItem[]
}

export interface ExperienceItem {
	experience: string
}

export interface AchievementItem {
	achievement: string
}

export interface ContactMedia {
	title: string
	value: string
}

export interface Image {
	long: string
	short: string
}

export interface LecturerProfile {
	lecturer_id: string
	first_name: string
	last_name: string
	middle_name: string
	photo_main: string
	photo_small: string
	specialization: string
}

export interface TeachingLocations {
	logo: string
	name: string
	position: string
}

export interface PublicationItem {
	title: string
	image: Image
	description: string
}

export interface Publication {
	id: string
	publication: PublicationItem
}
