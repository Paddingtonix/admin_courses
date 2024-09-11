<template>
    <div :class="`oil-modal__course-create`">
        <div :class="`oil-modal__course-create__text`">
            <span>Внимание! Если вы удалите курс, всё его содержимое удалится автоматически и не будет доступно к восстановлению.</span>
            <span>Вы уверены, что хотите удалить курс “[Название курса]”?</span>
        </div>
        <div :class="`oil-modal__course-create__btns`">
            <BtnCmp
                :text="'Отмена'"
                :background_type="'_secondary'"
                @click="closeModal"
            />
            <BtnCmp
                :text="'Удалить'"
                :background_type="'_quaternary'"
            />
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useStoreModal } from "~/src/stores/storeModal";

export default defineComponent({
    setup() {
        const store_modal = useStoreModal();

        const closeModal = () => {
            store_modal.closeModal();
        };

        return {
            store_modal,
            closeModal
        };
    },
});
</script>
<style scoped lang="sass">
.oil-modal
    &__course-create
        @include flex_column_center
        gap: rem(32)
        width: rem(400)
        margin: 0 auto

        &__text
            align-self: flex-start
            display: flex
            flex-direction: column
            gap: rem(12)

        &__btns
            @include flex_center
            gap: rem(12)
            .oil-btn
                width: rem(194)
</style>