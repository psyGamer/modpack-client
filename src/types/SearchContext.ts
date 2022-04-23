import SortBy from './SortBy'

export default interface SearchContext {
	query: string
	sortBy: SortBy

	page: number
	resultsPerPage: number
}
