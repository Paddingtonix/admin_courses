import { defineStore } from "pinia";
import type { IStoreModal } from "../ts-interface/storeModal.type";

export const useStoreModal = defineStore("modal", {
	state: (): IStoreModal => ({
		// стандарт - false
		// isOpen: true,
		isOpen: false,
		activeModal: "",
		label: "label",
		modalProps: {},
	}),
	actions: {
        openModal() {
            this.isOpen = true
        },
        closeModal() {
            this.isOpen = false
        },
    },
});
