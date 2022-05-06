<template>
	<div class="info-bar">
		<div class="mod-details">
			<img :srcset="`${iconURL} 2x`" :alt="mod.title" />
			<div class="title-and-author">
				<h1>{{ mod.title }}</h1>
				<p>by {{ mod.team }}</p>
			</div>
		</div>
		<!-- <primary-button class="download-btn"> <download-icon />Add</primary-button> -->
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'

import ModrinthMod from '@/types/modrinth_api/ModrinthMod'

import PrimaryButton from '@/components/ui/PrimaryButton.vue'
import DownloadIcon from '@/components/icon/DownloadIcon.vue'

export default defineComponent({
	name: 'ModTitlebar',
	components: {
		PrimaryButton,
		DownloadIcon,
	},
	props: {
		mod: {
			type: Object as PropType<ModrinthMod>,
			required: true,
		},
	},
	setup(props) {
		const iconURL = computed(() => {
			return props.mod.icon_url || 'https://cdn-raw.modrinth.com/placeholder.svg'
		})
		return { iconURL }
	},
})
</script>

<style lang="scss" scoped>
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
</style>
