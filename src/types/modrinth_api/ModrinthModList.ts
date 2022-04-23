import ModrinthSearchEntry from './ModrinthSearchEntry'

export default interface ModrinthModList {
	hits: ModrinthSearchEntry[]

	total_hits: number
	offset: number
	limit: number
}
