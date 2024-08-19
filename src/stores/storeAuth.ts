import { defineStore } from "pinia";

export const useStoreAuth = defineStore('auth', {
    state: () => ({
        // isAuth: false,
        isAuth: true,
    }),
    actions: {
        logIn() {
            this.isAuth = true
        },
        logOut() {
            this.isAuth = false
        },
    },
})
