import ModrinthGalleryImage from './ModrinthGalleryImage'

export default interface ModrinthSearchEntry {
	project_type: string
	project_id: string

	slug: string
	title: string
	description: string
	author: string

	icon_url: string | null

	categories: string[]
	versions: string[]
	latest_version: string

	downloads: number
	follows: number

	date_created: string
	date_modified: string

	client_side: string
	server_side: string

	license: string
	gallery: ModrinthGalleryImage[] | null
}
