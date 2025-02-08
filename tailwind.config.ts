import type { Config } from 'tailwindcss'

export default {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		fontFamily: {
			azoft: ['Azoft Sans', 'sans-serif'],
			gotham: ['Gotham', 'sans-serif'],
		},
		extend: {
			colors: {
				primary: {
					DEFAULT: '#4860EF',
					hover: '#798CFC',
				},
				secondary: {
					DEFAULT: '#B2D6FF',
					hover: '#97BFEE',
				},
			},
		},
	},
	plugins: [],
} satisfies Config
