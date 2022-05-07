<template>
	<div v-if="error">{{ error }}</div>
	<div v-else-if="!mod">Loading...</div>

	<div v-else class="mod">
		<div class="title-bar">
			<div class="mod-info">
				<img :srcset="`${iconURL} 2x`" :alt="mod.title" />
				<div class="title-and-author">
					<h1>{{ mod.title }}</h1>
					<p>by {{ mod.team }}</p>
				</div>
			</div>
			<subroute-selector
				class="content-selector"
				:routes="[
					{ routeName: 'mod-description', displayName: 'Description' },
					{ routeName: 'mod-versions', displayName: 'Versions' },
					{ routeName: 'mod-changelog', displayName: 'Changelog' },
					{ routeName: 'mod-gallery', displayName: 'Gallery' },
				]"
			/>
			<div class="mod-stats">
				<!-- <p class="description">{{ mod.description }}</p> -->
				<p class="description">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod, minus! Optio
					nostrum in, ducimus velit iste necessitatibus id tempora saepe aut, eaque
					voluptatibus et sed totam praesentium accusantium? Ex, omnis!
				</p>
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
			<!-- <primary-button class="download-btn"> <download-icon />Add</primary-button> -->
		</div>

		<div class="content">
			<router-view v-slot="{ Component }">
				<transition
					:enter-active-class="contentInTransition"
					:leave-active-class="contentOutTransition"
				>
					<component :is="Component" />
				</transition>
			</router-view>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRoute } from 'vue-router'

import SubrouteSelector from '@/components/SubrouteSelector.vue'

import PrimaryButton from '@/components/ui/PrimaryButton.vue'
import DownloadIcon from '@/components/icon/DownloadIcon.vue'
import CalendarIcon from '@/components/icon/CalendarIcon.vue'
import RefreshIcon from '@/components/icon/RefreshIcon.vue'

import { fetchModData, resetModData, getModInfo, getError } from '@/store/mod-details'
import formatNumber from '@/composables/formatNumber'
import formatDate from '@/composables/formatDate'

export default {
	components: {
		SubrouteSelector,
		PrimaryButton,
		DownloadIcon,
		CalendarIcon,
		RefreshIcon,
	},
	setup: () => {
		const route = useRoute()
		const store = useStore()

		const contentInTransition = ref('animate__animated animate__flipInY')
		const contentOutTransition = ref('animate__animated animate__flipOutY')

		onBeforeRouteUpdate((to, from) => {
			if (to.params.id != from.params.id) fetchModData(store, route.params.id as string)

			const subroutes = ['mod-description', 'mod-versions', 'mod-changelog', 'mod-gallery']

			if (
				from.name &&
				to.name &&
				subroutes.indexOf(from.name.toString()) > subroutes.indexOf(to.name.toString())
			) {
				// Slide from right to left
				contentInTransition.value = 'animate__animated animate__fadeInLeft'
				contentOutTransition.value = 'animate__animated animate__fadeOutRight'
			} else {
				// Slide from left to right
				contentInTransition.value = 'animate__animated animate__fadeInRight'
				contentOutTransition.value = 'animate__animated animate__fadeOutLeft'
			}
		})
		onBeforeRouteLeave(() => resetModData(store))
		fetchModData(store, route.params.id as string)

		const mod = getModInfo(store)
		const iconURL = computed(() => {
			return mod.value.icon_url || 'https://cdn-raw.modrinth.com/placeholder.svg'
		})

		return {
			mod,
			error: getError(store),
			iconURL,

			formatNumber,
			formatDate,
			contentInTransition,
			contentOutTransition,
		}
	},
}
</script>

<style lang="scss">
.mod {
	position: relative;
}

.content {
	position: relative;
	display: flex;
	justify-content: center;

	border-radius: 2.5em;
	margin-block: 2em;
	margin-inline: 2em 1em;

	.page {
		width: 60vw;
		margin: 0 auto;
		padding: 1.5em;
		position: absolute;
	}
}
.title-bar {
	font-size: 1rem;

	display: grid;

	grid-template-rows: auto 5em;
	grid-template-columns: 1fr 1fr 1fr;
	grid-template-areas:
		'. mod-info mod-stats'
		'. content-selector mod-stats';

	padding-inline: 2em;

	.mod-info {
		grid-area: mod-info;
		justify-self: center;
		align-self: center;
		display: flex;
		flex-direction: column;
		align-items: center;

		font-size: 3em;

		img {
			width: 4.5em;
			height: 4.5em;
			border-radius: $border-radius-icon;
		}
		.title-and-author {
			margin-top: 0.25em;
			display: flex;
			flex-direction: column;
			align-items: center;
			font-weight: bold;

			h1 {
				color: $color-text-heading;
				font-size: 1.2em;
			}
			p {
				color: $color-text-subheading;
				font-size: 0.5em;
			}
		}
	}
	.content-selector {
		grid-area: content-selector;
		justify-self: center;
		align-self: center;

		margin: 0;
	}
	.mod-stats {
		grid-area: mod-stats;
		justify-self: end;
		min-width: 30rem;
		max-width: 35rem;
		height: fit-content;

		background: $color-bg2;
		border-radius: 2.5em;

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
			// margin: 0.25em;
		}

		.entry {
			font-size: 1.2em;
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
					width: 1.5em;
					height: 1.5em;
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
	.download-btn {
		font-size: 2em;
	}
}
</style>
