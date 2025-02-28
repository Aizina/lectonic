export function truncateTextByWord(text: string, maxLength: number): string {
	if (text.length <= maxLength) {
		return text
	}

	let truncated = text.slice(0, maxLength)

	const lastSpaceIndex = truncated.lastIndexOf(' ')

	if (lastSpaceIndex > 0) {
		truncated = truncated.slice(0, lastSpaceIndex)
	}

	return truncated + '...'
}
