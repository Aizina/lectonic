export interface Lecture {
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

export interface Themes {
	subtheme_list: string[]
	main_themes: string[]
	image: Image
}

export interface PriceItem {
  [key: string]: string;
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

export interface Image {
	long: string
	short: string
}

export interface Info {
	api_version: string
}

export interface Detail {
	code: string
	message: string
}
