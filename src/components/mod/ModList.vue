<template>
	<div v-if="error">{{ error }}</div>
	<div v-else-if="!modList">Loading...</div>
	<div v-else>
		<div v-for="mod in modList.hits" :key="mod.project_id" class="mods">
			<mod-preview :mod="mod" />
		</div>
	</div>
</template>

<script lang="ts">
import { PropType, reactive, ref, watch } from 'vue'
import ModPreview from './ModPreview.vue'
import fetchModList from '@/composables/fetchModList'
import SearchContext from '@/types/SearchContext'

export default {
	name: 'ModList',
	components: { ModPreview },
	props: {
		searchContext: {
			required: true,
			type: Object as PropType<SearchContext>,
		},
	},
	setup(props: any) {
		const { modList, error, load, refetch } = fetchModList(props.searchContext)

		load()
		watch(props.searchContext, (newContext: SearchContext) => refetch(newContext))

		return { modList, error }
	},
}
</script>

<style></style>
