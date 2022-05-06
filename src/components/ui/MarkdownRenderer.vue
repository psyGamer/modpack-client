<template>
	<div v-html="markdownHTML" class="markdown"></div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { marked } from 'marked'
import sanitizeHtml from 'sanitize-html'

export default defineComponent({
	name: 'MarkdownRenderer',
	props: {
		content: {
			required: true,
			type: String as PropType<string>,
		},
	},
	setup(props) {
		const markdownHTML = computed(() => {
			return sanitizeHtml(marked(props.content), {
				allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'center']),
			})
		})

		return { markdownHTML }
	},
})
</script>

<style lang="scss">
.markdown {
	font-size: 1.5rem;
	line-height: 1.4em;
	padding: 3em;
	padding-top: 0;

	a {
		position: relative;
		color: $color-link;
		text-decoration: none;
		transition: color 0.1s;

		&:hover,
		&:focus-visible {
			color: $color-link-hover;
			&::after {
				//width: 100%; Uncomment this line to enable a indicator on hovered links
				left: 0;
			}
		}
		&:active {
			color: $color-link-active;
		}

		&::after {
			content: '';
			position: absolute;
			background: $color-primary-hover;

			width: 0%;
			height: 0.1em;

			left: 50%;
			bottom: -0.1em;

			border-radius: 100vw;
			transition: all 0.25s ease;
		}
	}

	h1, h2 {
		position: relative;
		font-size: 2em;
		margin-block: 1em 0.75em;

		height: fit-content;

		&::after {
			content: '';
			position: absolute;
			background: $color-bg3;

			width: 100%;
			height: 0.1em;

			left: 0;
			bottom: -0.5em;

			border-radius: 100vw;
		}

		img {
			height: 100%;
			margin: 0 !important;
		}
	}
	h1 {
		font-size: 2.75em;
	}

	ul,
	ol {
		margin-block: 1em;
		margin-inline: 2em 0;
		li {
			font-size: 1.1em;

			&::marker {
				font-weight: bold;
			}
		}
	}

	img {
		max-width: 100%;
		margin-block: 0.75em;
	}
	code {
		font-size: 0.8em;
		font-family: 'Jetbrains Mono';

		padding: 0.3em 0.4em;

		background: $color-bg-codeblock;
		border-radius: 0.3em;
	}
}
</style>
