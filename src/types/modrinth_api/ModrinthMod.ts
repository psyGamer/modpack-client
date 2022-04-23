import ModrinthDonationLink from './ModrinthDonationLink'
import ModrinthGalleryImage from './ModrinthGalleryImage'
import ModrinthLicense from './ModrinthLicense'
import ModrinthModeratorMessage from './ModrinthModeratorMessage'
import ModrinthProjectStatus from './ModrinthProjectStatus'

export default interface ModrinthMod {
	id: string
	project_type: string

	slug: string
	title: string
	team: string
	description: string
	body: string
	body_url: string | null

	categories: string[]
	versions: string[]

	downloads: number
	followers: number

	status: ModrinthProjectStatus
	published: string
	updated: string

	moderator_message: ModrinthModeratorMessage | null

	client_side: string
	server_side: string

	icon_url: string | null
	source_url: string | null
	issue_url: string | null
	wiki_url: string | null
	discord_url: string | null
	donation_url: ModrinthDonationLink[] | null

	license: ModrinthLicense
	gallery: ModrinthGalleryImage[] | null
}