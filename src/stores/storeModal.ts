import { defineStore } from "pinia";

export const useStoreModal = defineStore("modal", {
	state: (): { isOpen: boolean; activeModal: string; modalProps: {} } => ({
		// стандарт - false
		// isOpen: true,
		isOpen: false,
		activeModal: "",
		modalProps: {},
	}),
	actions: {
		triggerModal() {
			this.isOpen = !this.isOpen;
		},
	},
});
