export default function formatDate(isoString: string) {
	const date = new Date(isoString)

	const formatter = new Intl.RelativeTimeFormat('en-US', {
		numeric: 'auto',
		style: 'long',
	})
	const ranges = {
		months: 3600 * 24 * 30,
		weeks: 3600 * 24 * 7,
		days: 3600 * 24,
		hours: 3600,
		minutes: 60,
		seconds: 1,
	}
	const maxDurationForRelative = ranges.months * 3 // 3 Months
	const secondsElapsed = (date.getTime() - Date.now()) / 1000

	if (Math.abs(secondsElapsed) > maxDurationForRelative) {
		console.log('abs', date.toLocaleDateString())
		return date.toLocaleDateString()
	}

	type Durations = 'seconds' | 'minutes' | 'hours' | 'days' | 'weeks' | 'months'

	for (const key in ranges) {
		const value = ranges[key as Durations]
		if (value < Math.abs(secondsElapsed)) {
			const delta = secondsElapsed / value
			console.log('rel', delta)
			return formatter.format(Math.round(delta), key as Intl.RelativeTimeFormatUnit)
		}
	}

	// formatter.format()
	// const duration = date.diffNow()

	// console.log(date)
	// console.log(duration)
}
