<template>
	<div class="content-page">
		<div v-if="error">{{ error }}</div>
		<div v-else-if="!mod">Loading...</div>

		<markdown-renderer v-else :content="mod.body" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'

import MarkdownRenderer from '@/components/ui/MarkdownRenderer.vue'
import { getModInfo, getError } from '@/store/mod-details'

export default defineComponent({
	components: { MarkdownRenderer },
	setup: () => {
		const store = useStore()
		return { mod: getModInfo(store), error: getError(store) }
	},
})
</script>
