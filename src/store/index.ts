import { createLogger, createStore } from 'vuex'

import modDetails, { ModState } from './mod-details'

// eslint disable next line
const debug = import.meta.env.NODE_ENV !== 'production'
export interface State {
	mod: ModState
}

export default createStore({
	modules: {
		modDetails,
	},
	strict: debug,
	plugins: debug ? [createLogger()] : [],
})
