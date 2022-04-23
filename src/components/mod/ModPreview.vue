<template>
	<div class="card">
		<div class="icon">
			<router-link :to="{ name: 'mod', params: { id: mod.slug } }">
				<img :src="iconURL" :alt="mod.title" />
			</router-link>
		</div>
		<div class="content">
			<div class="info">
				<div class="title-bar">
					<h2>
						<router-link :to="{ name: 'mod', params: { id: mod.slug } }">
							{{ mod.title }}
						</router-link>
					</h2>
					<p>
						by <a :href="`https://modrinth.com/user/${mod.author}`">{{ mod.author }}</a>
					</p>
				</div>
				<p>{{ mod.description }}</p>
			</div>
			<div class="stats">
				<p>
					<strong>{{ formatNumber(mod.downloads) }}</strong> downloads
				</p>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, PropType } from '@vue/runtime-core'
import ModrinthMod from '@/types/modrinth_api/ModrinthSearchEntry'
import formatNumber from '@/composables/formatNumber'

export default {
	name: 'ModPreview',
	props: {
		mod: {
			type: Object as PropType<ModrinthMod>,
			required: true,
		},
	},
	setup(props: any) {
		const iconURL = computed(() => {
			if (props.mod.icon_url) return props.mod.icon_url
			return 'https://cdn-raw.modrinth.com/placeholder.svg'
		})

		return { iconURL, formatNumber }
	},
}
</script>

<style lang="scss" scoped>
.card {
	font-size: 1rem;

	background: $color-raised-bg;

	display: flex;
	justify-content: left;

	margin-block: 1em;
	padding: 1em;

	border-radius: 1rem;
}

.icon {
	margin-right: 1em;

	img {
		max-width: 6em;
		max-height: 6em;
		border-radius: 1rem;
	}
}

.content {
	color: $color-text;

	width: 100%;

	display: flex;
	justify-content: space-between;
	align-items: flex-start;
}

.title-bar {
	display: flex;
	align-items: baseline;

	margin-bottom: 0.5rem;

	h2 a {
		color: $color-heading;
		text-decoration: none;
	}
	p {
		color: $color-text;
		margin: 0 0 0 0.5em;

		a {
			color: inherit;
		}
	}
}

.stats {
	white-space: nowrap;

	strong {
		font-size: 1.5rem;
	}
}
</style>
