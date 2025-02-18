export function formatDuration(durationInMinutes: number): string {
	if (durationInMinutes < 60) {
		return `${durationInMinutes} минут`
	}

	const hours = Math.floor(durationInMinutes / 60)
	const minutes = durationInMinutes % 60

	const hourWord = hours === 1 ? 'час' : 'часа'

	if (minutes === 0) {
		return `${hours} ${hourWord}`
	} else {
		return `${hours} ${hourWord} ${minutes} минут`
	}
}
