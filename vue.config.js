const { defineConfig } = require('@vue/cli-service')
const npm_package = require('./package.json')

module.exports = defineConfig({
	transpileDependencies: true,
	css: {
		loaderOptions: {
			scss: {
				additionalData: `
				@import '@/styles/variables.scss';
				@import '@/styles/functions.scss';
				@import '@/styles/mixins.scss';
				`,
			},
		},
	},
})
