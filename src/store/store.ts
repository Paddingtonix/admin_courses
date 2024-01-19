import { createStore } from 'vuex'
import modalModule from './modules/modal'
import themeModule from './modules/theme'

const store = createStore({
    state: {},
    mutations: {},
    modules: {
        modalModule,
        themeModule
    },
    actions: {}
})

export default store
