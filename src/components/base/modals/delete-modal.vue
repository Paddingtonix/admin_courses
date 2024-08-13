<template>
	<div class="delete-modal">
		<component :is="modalData.modalProps.modalComponent"></component>
	</div>
	<div class="delete-modal__btn-wrapper">
		<BtnCmp
			:text="'Отмена'"
			:background_type="'_secondary'"
			@click="modalStore.triggerModal"
		/>
		<BtnCmp :text="'Удалить'" background_type="_quaternary" @click="" />
	</div>
</template>

<script lang="ts">
import { useStoreModal } from "~/src/stores/storeModal";
import DeleteSection from "../../ui-components/forms/delete-section.vue";
import type { IDeleteSection } from "~/src/ts-interface/storeModal.type";

export default defineComponent({
	setup() {
		const modalStore = useStoreModal();
		const modalData = reactive(modalStore.$state as IDeleteSection);
		return {
			modalData,
			modalStore,
		};
	},
	components: {
		"delete-section": DeleteSection,
	},
});
</script>

<style lang="sass">
.delete-modal
    max-width: rem(400)
    &__text
        display: block
        margin-bottom: rem(16)
        &:last-child
            margin-bottom: rem(32)
    &__btn-wrapper
        display: flex
        column-gap: rem(16)
</style>
