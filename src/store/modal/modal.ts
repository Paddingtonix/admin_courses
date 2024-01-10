export default {
    namespaced: true,
    state: {
        openModal: false as Boolean
    },
    getters: {},
    mutations: {
        open(state: { openModal: boolean }) {
            state.openModal = true
        },
        close(state: {openModal: boolean}) {
            state.openModal = false
        }
    }
}