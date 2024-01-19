export default {
    namespaced: true,
    state: {
        light: false as boolean
    },
    getters: {
        light(state: { light: boolean; }) {
            return state.light;
        },
    },
    mutations: {
        changeTheme(state: { light: boolean}, value: boolean) {
            state.light = value;
        }
    }
}