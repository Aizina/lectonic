import { useCallback } from 'react'

export function usePriceFormatter() {
	const formatPrice = useCallback((raw: string | number): string => {
		if (!raw) return ''

		const num = typeof raw === 'string' ? parseInt(raw, 10) : raw
		if (isNaN(num)) return String(raw)

		const str = String(num).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

		return `${str} р.`
	}, [])

	return formatPrice
}
