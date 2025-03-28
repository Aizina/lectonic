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
	specialization: string;
	academic_degree: string;
	format: string[];
	experience: ExperienceItem[];
	achievements: AchievementItem[];
	location: string;
	about: string;
	quote: string;
	language: string;
	contact_media: ContactMedia[];
	confirmed: number;
	emergency_speaking: boolean;
	is_subscribed: boolean;
	lectures_conducted: number;
	business_trip_readiness: boolean;
	business_trip_locations: BusinessTripLocations;
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
	specialization?: string
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

export interface LecturerDisplay {
	id: string
	name: string
	about: string
	image: string
	specialization: string
	themes: Themes[]
	formats: string[]
	emergencySpeaking: boolean
}

export interface Themes {
	id: string
	title: string
}

export interface LecturersResponseData {
	lecturer_id: string,
    lecturer: Lecturer,
    profile_id: string,
	profile: LecturerProfile,
	themes: Themes[]
}

export interface allLecturersResponseData {
	detail: LecturerDetail;
	data: LecturersResponseData[];
	info: LecturerInfo;
}

export interface BusinessTripLocations {
	abroad: boolean;
	region: boolean;
	country: boolean;
  }