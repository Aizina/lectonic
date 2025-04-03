import { useEffect, useRef } from 'react'

export function useFreezeScroll(isOpen: boolean) {
	const scrollPositionRef = useRef(0)
	useEffect(() => {
		if (isOpen) {
			scrollPositionRef.current = window.scrollY
			document.body.style.position = 'fixed'
			document.body.style.top = `-${scrollPositionRef.current}px`
			document.body.style.left = '0'
			document.body.style.right = '0'
		} else {
			document.body.style.position = ''
			document.body.style.top = ''
			document.body.style.left = ''
			document.body.style.right = ''
			window.scrollTo(0, scrollPositionRef.current)
		}
		return () => {
			document.body.style.position = ''
			document.body.style.top = ''
			document.body.style.left = ''
			document.body.style.right = ''
		}
	}, [isOpen])
}
