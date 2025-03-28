import { LecturerItem, LecturerProfile, LecturersData } from './lecturer.types'

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
export interface newThemes {
	id: string
	title: string
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

export interface LecturesWithoutOrganization {
	id: string
	lecture_data: LecturesData
	lecturers: LecturerItem[]
	themes: {
		id: string
		title: string
	}[]
}

export type LecturesResponseData =
	| LecturesWithoutOrganization[]
	| LecturesWithoutOrganization[]

export interface LecturesResponse {
	detail: Detail
	data: LecturesResponseData
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

export type BundlesWithOrg = {
	id: string;
	lecture_data: {
	  duration: number;
	  type: string;
	  description: string;
	  title: string;
	  price: {
		"non-profit": string;
		corporative: string;
		educational: string;
		goverment: string;
	  }[];
	  result: string;
	  format: string[];
	  image: {
		long: string;
		short: string;
	  };
	  target_audience: string;
	};
	themes: {
	  id: string;
	  title: string;
	}[];
	lecturers: LecturerItem[]
  };
  