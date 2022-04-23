<template>
	<div v-if="error">{{ error }}</div>
	<div v-else-if="!mod">Loading...</div>

	<div v-else class="mod">
		<div class="info-bar">
			<div class="mod-details">
				<img :srcset="`${imageURL} 2x`" :alt="mod.title" />
				<div class="title-and-author">
					<h1>{{ mod.title }}</h1>
					<p>by {{ mod.team }}</p>
				</div>
			</div>
			<div class="download-btn">
				<icon-button src="download_white.svg" alt="Download icon">Download</icon-button>
			</div>
		</div>

		<subroute-selector
			class="content-selector"
			:routes="[
				{ route: 'description', name: 'Description' },
				{ route: 'versions', name: 'Versions' },
				{ route: 'changelog', name: 'Changelog' },
				{ route: 'gallery', name: 'Gallery' },
			]"
			routeName="mod-content"
			routeParamName="content"
		/>

		<div class="content">
			<markdown-renderer :content="mod.body" />
		</div>
	</div>
</template>

<script lang="ts">
import { computed, ref } from 'vue'
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'

import fetchMod from '@/composables/fetchMod'
import IconButton from '@/components/ui/IconButton.vue'
import SubrouteSelector from '@/components/SubrouteSelector.vue'
import MarkdownRenderer from '@/components/ui/MarkdownRenderer.vue'
import ModrinthMod from '@/types/modrinth_api/ModrinthMod'

type ContentType = 'description' | 'versions' | 'changelog' | 'gallery'

export default {
	components: { IconButton, MarkdownRenderer, SubrouteSelector },
	setup: () => {
		const route = useRoute()

		const mod = ref<ModrinthMod | null>(null)
		const error = ref<string | null>(null)

		const selectedContent = ref<ContentType>(
			(route.params.content || 'description') as ContentType
		)
		const reloadSelectedContent = () =>
			(selectedContent.value = (route.params.content || 'description') as ContentType)

		fetchMod(route.params.id as string, mod, error)
		onBeforeRouteUpdate((to, from) => {
			if (to.params.id != from.params.id) fetchMod(to.params.id as string, mod, error)
			if (to.params.content != from.params.content) reloadSelectedContent()
		})

		const imageURL = computed(() => {
			return mod.value?.icon_url || 'https://cdn-raw.modrinth.com/placeholder.svg'
		})

		return { mod, error, imageURL, selectedContent }
	},
}
</script>

<style lang="scss">
.info-bar {
	display: flex;
	justify-content: space-between;
	align-items: center;

	padding-inline: 2rem;

	.mod-details {
		display: flex;
		align-items: center;

		img {
			width: 8rem;
			height: 8rem;
			border-radius: $border-radius-icon;
		}
		.title-and-author {
			display: flex;
			align-items: baseline;
			font-weight: bold;

			h1 {
				color: $color-text-heading;
				font-size: 2rem;

				margin-inline: 1em 0.5em;
			}
			p {
				color: $color-text-subheading;
				font-size: 1rem;
			}
		}
	}
}
</style>
