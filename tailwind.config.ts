import type { Config } from 'tailwindcss'

export default {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		fontFamily: {
			roboto: ['Roboto', 'sans-serif'],
			montserrat: ["Montserrat", 'sans-serif']
		},
		extend: {
			colors: {
				primary: {
					DEFAULT: '#4860EF',
					hover: '#2D43C5',
				},
				secondary: {
					DEFAULT: '#B2D6FF',
					hover: '#97BFEE',
				},
				primaryText: {
					DEFAULT: '#1F1F20',
				},
				secondaryText: {
					DEFAULT: '#565656',
				},
			},
		},
	},
	plugins: [],
} satisfies Config
