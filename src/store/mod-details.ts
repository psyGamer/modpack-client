import { computed } from 'vue'
import { Store, ActionContext } from 'vuex'
import { State } from '.'

import ModrinthMod from '@/types/modrinth_api/ModrinthMod'

export const getMod = (store: Store<any>) => computed(() => store.getters['modDetails/getMod'])
export const getError = (store: Store<any>) => computed(() => store.getters['modDetails/getError'])

export const fetchMod = (store: Store<any>, id: string) => store.dispatch('modDetails/fetchMod', id)
export const resetMod = (store: Store<any>) => store.commit('modDetails/setMod', null)

export interface ModState {
	mod: ModrinthMod | null
	error: string | null
}

type Context = ActionContext<ModState, State>

const state: ModState = {
	mod: null,
	error: null,
}
const actions = {
	fetchMod: async (context: Context, id: string) => {
		try {
			const response = await fetch(`https://api.modrinth.com/v2/project/${id}`)
			console.log(`Got ${response} from https://api.modrinth.com/v2/project/${id}`)
			if (!response.ok) {
				throw Error('Failed fetching mod!')
			}

			context.commit('setMod', await response.json())
		} catch (err: any) {
			context.commit('setError', err.message)
		}
	},
}
const getters = {
	getMod: (state: ModState) => state.mod,
	getError: (state: ModState) => state.error,
}
const mutations = {
	setMod: (state: ModState, mod: ModrinthMod) => (state.mod = mod),
	setError: (state: ModState, error: string) => (state.error = error),
}

export default {
	namespaced: true,

	state,
	getters,
	actions,
	mutations,
}
