import { defineStore } from 'pinia'

export const useStoreAuth = defineStore('auth', {
    state: () => ({
        isAuth: false,
    }),
    actions: {
        logIn() {
            this.isAuth = true
            console.log('pinia sasat! ya zaloginen')
        },
        logOut() {
            this.isAuth = false
        },
    },
})
