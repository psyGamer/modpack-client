<template>
	<mod-search v-model="searchContext" />
	<mod-list :searchContext="searchContext" />
</template>

<script lang="ts">
import { ref } from 'vue'
import ModList from '@/components/mod/ModList.vue'
import ModSearch from '@/components/mod/ModSearch.vue'
import SearchContext from '@/types/SearchContext'

export default {
	components: { ModList, ModSearch },
	setup() {
		const searchContext = ref<SearchContext>({
			query: '',
			sortBy: 'relevance',
			page: 0,
			resultsPerPage: 20,
		})

		return { searchContext }
	},
}
</script>

<style></style>
