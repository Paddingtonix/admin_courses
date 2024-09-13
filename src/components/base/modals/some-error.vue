<template>
    <div :class="`oil-modal__course-create`">
        <div :class="`oil-modal__course-create__text`">
            <span>Вы не можете отправить курс на публикацию.</span>
            <ul>Обнаружены ошибки:
                <li>Дата снятия курса с витрины меньше текущей даты</li>
                <li>Дата снятия курса с витрины меньше текущей даты</li>
                <li>Дата снятия курса с витрины меньше текущей даты</li>
            </ul>
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
            ul
                list-style-type: disc
                li
                    margin-left: rem(24)

                    &:first-child
                        margin-top: rem(8)

                    &:not(:last-child)
                        margin-bottom: rem(8)
</style>