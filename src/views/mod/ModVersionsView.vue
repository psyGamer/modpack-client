<template>
	<div class="content-page">
		<div v-if="versions" class="versions">
			<div
				v-for="version in versions"
				:key="version.id"
				:class="`entry ${version.version_type}`"
			>
				<div class="info-bar">
					<div class="title-info">
						<div>
							<h2 class="version-name">{{ version.name }}</h2>
							<br />

							<div class="stats">
								<p class="author"><account-icon />{{ version.author_id }}</p>
								<p class="downloads">
									<download-icon />{{ formatNumber(version.downloads) }}
								</p>
								<p class="published">
									<calendar-icon />{{ formatDate(version.date_published) }}
								</p>
							</div>
						</div>
					</div>

					<primary-button @click="download(version)" class="install-btn">
						Install
					</primary-button>
				</div>

				<markdown-renderer :content="version.changelog" class="changelog" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'

import { invoke } from '@tauri-apps/api'

import { getVersions } from '@/store/mod-details'
import formatNumber from '@/composables/formatNumber'
import formatDate from '@/composables/formatDate'

import MarkdownRenderer from '@/components/ui/MarkdownRenderer.vue'
import PrimaryButton from '@/components/ui/PrimaryButton.vue'
import AccountIcon from '@/components/icon/AccountIcon.vue'
import DownloadIcon from '@/components/icon/DownloadIcon.vue'
import CalendarIcon from '@/components/icon/CalendarIcon.vue'
import ModrinthVersion from '@/types/modrinth_api/ModrinthVersion'

export default defineComponent({
	components: { MarkdownRenderer, PrimaryButton, AccountIcon, DownloadIcon, CalendarIcon },
	setup: () => {
		const store = useStore()

		const download = (version: ModrinthVersion) => {
			console.log(`Downloading: ${version}`)
			invoke('download_file')
		}

		return { versions: getVersions(store), download, formatNumber, formatDate }
	},
})
</script>

<style lang="scss" scoped>
.entry {
	font-size: 1.4rem;
	background-color: $color-bg2;

	margin-block: 1em;
	border-radius: 1.25em;

	.info-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;

		padding-top: 1em;

		.version-name,
		.stats {
			margin-left: 2.5rem;
			font-weight: bold;
			display: inline-block;
		}

		.version-name {
			font-size: 2em;
			color: $color-text-heading;
		}

		.stats {
			display: flex;
			justify-content: flex-start;
			align-items: baseline;

			margin-top: 0.25em;

			color: $color-text-subheading;

			p {
				margin-right: 1em;
			}

			svg {
				stroke: $color-text-subheading;
				width: 1.5em;
				height: 1.5em;
				margin-right: 0.5em;
			}
		}

		.install-btn {
			font-size: 1.25em;
			margin-right: 2em;
			height: 2.5em;
		}
	}

	.changelog {
		background-color: $color-bg3;
		border-radius: 0.75em;

		margin-top: 1em;
		padding: 0.5em 1em;
	}

	svg {
		width: 1.5em;
		height: 1.5em;
	}

	&.alpha {
		color: aqua;
		svg {
			stroke: aqua;
		}
	}
	&.beta {
		color: lime;
		svg {
			stroke: lime;
		}
	}
}
</style>
