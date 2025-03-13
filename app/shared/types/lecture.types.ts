import { LecturerProfile, LecturersData } from './lecturer.types'

export interface LectureItem {
	duration: number
	type: string
	description: string
	title: string
	price: PriceItem[]
	result: string
	format: string
	image: Image
	target_audience: string
}

export interface LecturesItem {
	id: string
	lecture_data: LecturesData
}

export interface LectureDisplay {
	id: string
	title: string
	description: string
	image: string
	rating: string
	themes: string[]
	lecturers: LecturerProfile[]
}

export interface Lecture {
	id: string
	lecture: LectureItem
}

export interface Themes {
	subtheme_list: string[]
	main_themes: string[]
	image: Image
}

export interface ThemesItem {
	themes: {
		theme_list: { theme: string }[]
		theme_image: { long: string; short: string }[]
	}
}

export interface PriceItem {
	[key: string]: string
}

export interface LectureData {
	lecture: LectureItem
	themes: Themes
}

export interface LecturesData {
	duration: number
	type: string
	description: string
	title: string
	price: PriceItem[]
	result: string
	format: string[]
	image: Image
	target_audience: string
	rating?: string
}

export interface LectureResponse {
	detail: Detail
	data: [LectureData, LecturersData]
	info: Info
}

export interface LecturesResponse {
	detail: Detail
	data: Array<[LecturesItem, ThemesItem, LecturersData]>
	info: Info
}

export interface Image {
	long: string
	short: string
}

export interface Info {
	api_version: string
	count: number
}

export interface Detail {
	code: string
	message: string
}
