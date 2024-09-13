<template>
    <div :class="`oil-modal__course-create`">
        <div :class="`oil-modal__course-create__text`">
            <span>Вы не можете отправить курс на публикацию.</span>
            <span>Обнаружена ошибка: дата снятия курса с витрины меньше текущей даты.</span>
            <span>Исправьте ошибку и попробуйте ещё раз или убедитесь что вы совершаете правильное действие. </span>
        </div>
        <BtnCmp
            :text="'Понятно'"
            @click="closeModal"
        />
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
</style>