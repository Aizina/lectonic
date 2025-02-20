export interface Lecture {
	duration: number
	type: string
	description: string
	title: string
	price: string[]
	result: string
	format: string
	image: Image
	target_audience: string
}

export interface Image {
	long: string
	short: string
}

export interface Themes {
	subtheme_list: string[]
	main_themes: string[]
}

export interface LectureData {
	lecture: Lecture
	themes: Themes
}

export interface LectureResponse {
	detail: Detail
	data: LectureData[]
	info: Info
}

export interface Info {
	api_version: string
}

export interface Detail {
	code: string
	message: string
}
