export default interface ModrinthDependency {
	version_id: string
	project_id: string

	dependency_type: 'required' | 'optional' | 'incompatible'
}
