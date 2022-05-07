<template>
	<div class="page">
		<div v-if="error">{{ error }}</div>
		<div v-else-if="!mod">Loading...</div>

		<markdown-renderer v-else :content="mod.body" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'

import MarkdownRenderer from '@/components/ui/MarkdownRenderer.vue'
import { getMod, getError } from '@/store/mod-details'

export default defineComponent({
	components: { MarkdownRenderer },
	setup: () => {
		const store = useStore()
		return { mod: getMod(store), error: getError(store) }
	},
})
</script>
