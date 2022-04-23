/* Source: https://github.com/modrinth/knossos/blob/51a9a7b75d9f574e99674551565b808c836cd1c3/plugins/shorthands.js#L5-L14 */

export default function formatNumber(number: number) {
	// Displaying downloads, etc. with giga would seem weird.
	if (number >= 1000000) return (number / 1000000).toFixed(2).toString() + 'M'
	else if (number >= 10000) return (number / 1000).toFixed(1).toString() + 'K'
	// Add a command between ever pair of 3 digets: 8999 -> 8,999
	else return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
