<template>
	<div v-if="error">{{ error }}</div>
	<div v-else-if="!mod">Loading...</div>

	<markdown-renderer v-else :content="mod.body" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'

import ModrinthMod from '@/types/modrinth_api/ModrinthMod'
import MarkdownRenderer from '@/components/ui/MarkdownRenderer.vue'
import fetchMod from '@/composables/fetchMod'

export default defineComponent({
	components: { MarkdownRenderer },
	setup: () => {
		const route = useRoute()

		const mod = ref<ModrinthMod | null>(null)
		const error = ref<string | null>(null)

		fetchMod(route.params.id as string, mod, error)

		onBeforeRouteUpdate((to, from) => {
			if (to.params.id != from.params.id) fetchMod(to.params.id as string, mod, error)
		})

		return { mod, error }
	},
})
</script>

<style></style>
