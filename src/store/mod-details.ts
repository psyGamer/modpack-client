import { computed } from 'vue'
import { Store, ActionContext } from 'vuex'
import { State } from '.'

import ModrinthMod from '@/types/modrinth_api/ModrinthMod'
import ModrinthVersion from '@/types/modrinth_api/ModrinthVersion'

const modulePrefix = 'modDetails'

export const getModInfo = (store: Store<any>) =>
	computed(() => store.getters[`${modulePrefix}/getModInfo`])
export const getVersions = (store: Store<any>) =>
	computed(() => store.getters[`${modulePrefix}/getVersions`])
export const getError = (store: Store<any>) =>
	computed(() => store.getters[`${modulePrefix}/getError`])

export const fetchModData = (store: Store<any>, id: string) =>
	store.dispatch(`${modulePrefix}/fetchModData`, id)

export const resetModData = (store: Store<any>) => {
	store.commit(`${modulePrefix}/setModInfo`, null)
	store.commit(`${modulePrefix}/setVersions`)
}

export interface ModState {
	mod: ModrinthMod | null
	versions: ModrinthVersion[] | null

	error: string | null
}

type Context = ActionContext<ModState, State>

const state: ModState = {
	mod: null,
	versions: null,

	error: null,
}
const actions = {
	fetchModData: async (context: Context, id: string) => {
		try {
			const [modResponse, versionsResponse] = await Promise.all([
				fetch(`https://api.modrinth.com/v2/project/${id}`),
				fetch(`https://api.modrinth.com/v2/project/${id}/version`),
			])

			if (!modResponse.ok || !versionsResponse.ok) throw Error('Failed fetching mod data!')

			context.commit('setModInfo', await modResponse.json())
			context.commit('setVersions', await versionsResponse.json())
		} catch (err: any) {
			context.commit('setError', err.message)
		}
	},
}
const getters = {
	getModInfo: (state: ModState) => state.mod,
	getVersions: (state: ModState) => state.versions,
	getError: (state: ModState) => state.error,
}
const mutations = {
	setModInfo: (state: ModState, mod: ModrinthMod) => (state.mod = mod),
	setVersions: (state: ModState, versions: ModrinthVersion[]) => (state.versions = versions),
	setError: (state: ModState, error: string) => (state.error = error),
}

export default {
	namespaced: true,

	state,
	getters,
	actions,
	mutations,
}
