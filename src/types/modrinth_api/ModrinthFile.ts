export default interface ModrinthFile {
	hashes: {
		sha1: string
		sha512: string
	}
	url: string
	filename: string
	primary: boolean
}
