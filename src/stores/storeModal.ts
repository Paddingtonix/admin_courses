import { defineStore } from 'pinia'

export const useStoreModal = defineStore('modal', {
  state: () => ({
    isOpen: false,
    auth: false
  }),
  actions: {
    openModal() {
      this.isOpen = true
    },
    closeModal() {
      this.isOpen = false
    }
  }
})