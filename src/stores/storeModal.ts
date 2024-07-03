import { defineStore } from 'pinia'

export const useStoreModal = defineStore('modal', {
    state: () => ({
        // поменять на false
        isOpen: true,
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
