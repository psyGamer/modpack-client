import { ref } from 'vue'
import ModrinthModList from '@/types/modrinth_api/ModrinthModList'
import SearchContext from '@/types/SearchContext'

export default function fetchMods(searchContext: SearchContext) {
	const modList = ref<ModrinthModList | null>(null)
	const error = ref<string | null>(null)

	const refetch = async (searchContext: SearchContext) => {
		// Remap sortBy since Modrinth uses different names
		const mappedSortBy = (() => {
			switch (searchContext.sortBy) {
				case 'date_created':
					return 'newest'
				case 'date_updated':
					return 'updated'
				default:
					return searchContext.sortBy
			}
		})()
		const offset = searchContext.page * searchContext.resultsPerPage

		try {
			const response = await fetch(
				`https://api.modrinth.com/v2/search?query=${searchContext.query}&offset=${offset}&limit=${searchContext.resultsPerPage}&index=${mappedSortBy}`
			)
			if (!response.ok) {
				throw Error('Failed fetching mod list!')
			}
			modList.value = await response.json()
		} catch (err: any) {
			error.value = err.message
			console.log(err)
		}
	}
	const load = async () => refetch(searchContext)

	return { modList, error, load, refetch }
}
