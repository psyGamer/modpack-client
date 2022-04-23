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
			<icon-button src="download_white.svg" alt="Download icon" class="download-btn"
				>Download</icon-button
			>
		</div>

		<div class="content">
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
			<markdown-renderer :content="mod.body" />
		</div>
	</div>
</template>

<script lang="ts">
import { computed, ref } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'

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
	font-size: 1rem;

	display: flex;
	justify-content: space-between;
	align-items: center;

	padding-inline: 2em;

	.mod-details {
		display: flex;
		align-items: center;

		font-size: 3em;

		img {
			width: 4em;
			height: 4em;
			border-radius: $border-radius-icon;
		}
		.title-and-author {
			display: flex;
			align-items: baseline;
			font-weight: bold;

			h1 {
				color: $color-text-heading;
				font-size: 1em;
				margin-inline: 1em 0.5em;
			}
			p {
				color: $color-text-subheading;
				font-size: 0.5em;
			}
		}
	}
	.download-btn {
		font-size: 2em;
	}
}

.content {
	background: $color-bg2;
	border-radius: 2.5em;
	margin: 2em;

	.markdown {
		max-width: 60vw;
		margin: 0 auto;
	}
}
</style>
