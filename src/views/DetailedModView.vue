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
			<primary-button class="download-btn">
				<download-icon />Add
			</primary-button>
		</div>

		<div class="content">
			<div class="main">
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
			<div class="side">
				<p class="description">{{ mod.description }}</p>
				<div class="entry">
					<div class="name"><download-icon />Downloads</div>
					<div class="value">
						{{ formatNumber(mod.downloads) }}
					</div>
				</div>
				<div class="entry">
					<div class="name"><refresh-icon />Updated</div>
					<div class="value">
						{{ formatDate(mod.updated) }}
					</div>
				</div>
				<div class="entry">
					<div class="name"><calendar-icon />Created</div>
					<div class="value">
						{{ formatDate(mod.published) }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, ref } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'

import ModrinthMod from '@/types/modrinth_api/ModrinthMod'
import fetchMod from '@/composables/fetchMod'
import formatNumber from '@/composables/formatNumber'
import formatDate from '@/composables/formatDate'
import PrimaryButton from '@/components/ui/PrimaryButton.vue'
import SubrouteSelector from '@/components/SubrouteSelector.vue'
import MarkdownRenderer from '@/components/ui/MarkdownRenderer.vue'
import DownloadIcon from '@/components/icon/DownloadIcon.vue'
import CalendarIcon from '@/components/icon/CalendarIcon.vue'
import RefreshIcon from '@/components/icon/RefreshIcon.vue'

type ContentType = 'description' | 'versions' | 'changelog' | 'gallery'

export default {
	components: {
		PrimaryButton,
		MarkdownRenderer,
		SubrouteSelector,
		DownloadIcon,
		CalendarIcon,
		RefreshIcon,
	},
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
		console.log(mod)
		return { mod, error, imageURL, selectedContent, formatNumber, formatDate, DownloadIcon }
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
	display: flex;
	justify-content: space-around;

	.main {
		flex: 4;
		background: $color-bg2;
		border-radius: 2.5em;
		margin-block: 2em;
		margin-inline: 2em 1em;

		.content-selector {
			margin-top: 0;
		}
		.markdown {
			max-width: 60vw;
			margin: 0 auto;
		}
	}
	.side {
		flex: 1;
		min-width: 30rem;
		max-width: 35rem;
		height: fit-content;

		background: $color-bg2;
		border-radius: 2.5em;

		margin-block: 2em;
		margin-inline: 1em 2em;
		padding: 2em;

		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;

		p {
			margin-block: 0.5em;
		}

		.description {
			font-size: 1.6em;
			font-weight: bold;
			margin: 0.25em;
		}

		.entry {
			font-size: 1.4em;
			display: flex;
			justify-content: space-around;
			text-align: center;
			width: 100%;
			margin-top: 1.5em;

			.name,
			.value {
				display: flex;
				font-weight: bold;
				align-items: flex-end;
			}
			.name {
				font-size: 1.15em;
				flex: 1;
				text-align: start;
				justify-content: flex-start;
				color: $color-text-dark;

				svg {
					stroke: $color-text-dark;
					width: 2em;
					height: 2em;
					margin-right: 1em;
				}
			}
			.value {
				font-size: 1.5em;
				flex: 1;
				text-align: end;
				justify-content: flex-end;
			}
		}
	}
}
</style>
