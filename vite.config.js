import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	// Prevent vite from obscuring rust errors
	clearScreen: true,
	server: {
		port: 8080,
	},
	// to make use of `TAURI_PLATFORM`, `TAURI_ARCH`, `TAURI_FAMILY`,
	// `TAURI_PLATFORM_VERSION`, `TAURI_PLATFORM_TYPE` and `TAURI_DEBUG`
	// env variables
	envPrefix: ['VITE_', 'TAURI_'],

	build: {
		// Tauri supports es2021
		target: ['es2021', 'chrome97', 'safari13'],
		// Don't minify for debug builds
		minify: !process.env.TAURI_DEBUG && 'esbuild',
		// Produce sourcemaps for debug builds
		sourcemap: !!process.env.TAURI_DEBUG,
	},

	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},

	css: {
		preprocessorOptions: {
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
