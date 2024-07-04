import { defineStore } from 'pinia'

export const useStoreModal = defineStore('modal', {
    state: () => ({
        // стандарт - false
        // isOpen: true,
        isOpen: false,
    }),
    actions: {
        openModal() {
            this.isOpen = true
        },
        closeModal() {
            this.isOpen = false
        },
    },
})
