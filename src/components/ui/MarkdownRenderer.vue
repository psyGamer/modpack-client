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
	font-size: 1rem;
	padding: 3em;

	img {
		max-width: 90%;
	}
	code {
		font-size: 90%;
		font-family: 'Jetbrains Mono';

		padding: 0.2em;

		background: $color-button-bg;
		border-radius: 0.2em;
	}
	a {
		color: $color-link;
		text-decoration: none;
		transition: color 0.1s;

		&:hover {
			color: $color-link-hover;
		}
	}
}
</style>
