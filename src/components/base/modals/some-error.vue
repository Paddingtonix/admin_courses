<template>
    <div :class="`oil-modal__course-create`">
        <div :class="`oil-modal__course-create__text`">
            <span>Вы не можете отправить курс на публикацию.</span>
            <ul>
                <template v-for="(error, index) in store_modal.modalProps.data" :key="index">
                    <template v-if="index + 1 === store_modal.modalProps.data.length">
                        <li class="oil-modal__course-create__text__block" v-for="(part, partIndex) in error.split(';')" :key="partIndex">
                            <!-- <span class="oil-modal__course-create__text__long-error" >{{ part }}</span> -->
                            {{ part }}
                        </li>
                    </template>
                    <li v-else>
                        {{ error }}
                    </li>
                </template>
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

        onMounted(() => {
            console.log(store_modal.modalProps.data.at(-1));
        })

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
                li
                    list-style: inside
                    max-width: calc(rem(472) - rem(72))
                    white-space: nowrap
                    overflow-x: hidden
                    text-overflow: ellipsis

                    &:not(:last-child)
                        margin-bottom: rem(8)
            &__block 
                padding-left: rem(24) 
            
            &__long-error
                @include flex_column()
                list-style: inside
                    
</style>