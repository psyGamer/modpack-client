import { Ref, ref } from 'vue'
import ModrinthMod from '@/types/modrinth_api/ModrinthMod'

export default async function fetchMods(
	id: string,
	resultRef: Ref<ModrinthMod | null>,
	errorRef: Ref<string | null>
) {
	console.log(id)
	try {
		const response = await fetch(`https://api.modrinth.com/v2/project/${id}`)
		console.log(`Got ${response} from https://api.modrinth.com/v2/project/${id}`)
		if (!response.ok) {
			throw Error('Failed fetching mod!')
		}
		resultRef.value = await response.json()
	} catch (err: any) {
		errorRef.value = err.message
		console.log(err)
	}
}
