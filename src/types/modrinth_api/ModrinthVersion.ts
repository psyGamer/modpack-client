import ModrinthDependency from './ModrinthDependency'
import ModrinthFile from './ModrinthFile'

export default interface ModrinthVersion {
	id: string
	project_id: string
	author_id: string

	name: string
	version_number: string

	files: ModrinthFile[]
	downloads: number
	changelog: string | null

	dependencies: ModrinthDependency[]
	game_versions: string[]
	loaders: string[]

	version_type: 'alpha' | 'beta' | 'release'
	featured: boolean

	date_published: string
}
