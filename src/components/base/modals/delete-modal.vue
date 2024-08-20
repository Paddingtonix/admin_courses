<template>
    <div class="delete-modal">
        <component :is="modalData.modalProps.modalComponent"></component>
    </div>
    <div class="delete-modal__btn-wrapper">
        <BtnCmp
            :text="'Отмена'"
            :background_type="'_secondary'"
            @click="modalStore.closeModal()"
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

export default defineComponent({
    setup() {
        const modalStore = useStoreModal();
        const modalData = reactive(modalStore.$state as IDeleteModal);

        const deleteItem = () => {
            modalData.modalProps
                .deleteFunction(modalData.modalProps.data.id)
                .then(() => {
                    modalStore.closeModal();
                })
                .catch(() => {
                    console.log("DA YOBANIY TI BLOOD");
                });
        };
        return {
            modalData,
            modalStore,
            deleteItem,
        };
    },
    components: {
        "delete-section": DeleteSection,
        "delete-tag": DeleteTag,
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
