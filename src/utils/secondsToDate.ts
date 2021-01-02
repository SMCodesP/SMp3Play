export default function secondsToDate(seconds: number) {
	const date = new Date(0)
	date.setSeconds(seconds)
	return date.toISOString().substr(11, 8)
}