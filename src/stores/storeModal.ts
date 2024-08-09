import { defineStore } from 'pinia'

export const useStoreModal = defineStore('modal', {
    state: () => ({
        // стандарт - false
        // isOpen: true,
        isOpen: false,
    }),
    actions: {
        triggerModal() {
            this.isOpen = !this.isOpen;
        }
    },
})
