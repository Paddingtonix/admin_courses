<template>
	<div class="delete-modal">
		<component :is="modalData.modalProps.modalComponent"></component>
	</div>
	<div class="delete-modal__btn-wrapper">
		<BtnCmp
			:text="'Отмена'"
			:background_type="'_secondary'"
			@click="storeModal.closeModal()"
		/>
		<BtnCmp
			:text="'Удалить'"
			background_type="_quaternary"
			@click="deleteItem"
		/>
	</div>
</template>

<script lang="ts">
import { useStoreModal } from "~/src/stores/storeModal";
import DeleteSection from "../../ui-components/forms/delete-section.vue";
import type { IDeleteModal } from "~/src/ts-interface/storeModal.type";
import DeleteTag from "../../ui-components/forms/delete-tag.vue";
import deleteCourse from "../../ui-components/forms/delete-course.vue";
import DeleteDirection from "~/src/components/ui-components/forms/delete-direction.vue";
import DeleteQuestion from "../../ui-components/forms/delete-question.vue";
import deleteChapter from "../../ui-components/forms/delete-chapter.vue";
import deletePart from "../../ui-components/forms/delete-part.vue";
import deleteModule from "../../ui-components/forms/delete-module.vue";

export default defineComponent({
	setup() {
		const storeModal = useStoreModal();
		const modalData = reactive(storeModal.$state as IDeleteModal);

		const deleteItem = () => {
			modalData.modalProps
				.deleteFunction(modalData.modalProps.data?.id)
				.then(() => {
					storeModal.closeModal();
				})
				.catch((err) => {
					console.log("Не получилось удалить", err);
				});
		};
		return {
			modalData,
			storeModal,
			deleteItem,
		};
	},
	components: {
		"delete-section": DeleteSection,
		"delete-tag": DeleteTag,
		"delete-course": deleteCourse,
		"delete-direction": DeleteDirection,
		"delete-question": DeleteQuestion,
		"delete-chapter": deleteChapter,
		"delete-part": deletePart,
		"delete-module": deleteModule,
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
