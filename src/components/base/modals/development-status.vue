<template>
    <div
        :class="`oil-modal__course-create`"
        v-if="store_role.role === 'Admin'"
    >
        <span :class="`oil-modal__course-create__text`">Курс находится в разработке у автора. Вы не можете изменить статус курса.</span>
        <BtnCmp
            :text="'Понятно'"
            @click="closeModal"
        />
    </div>

    <div
        :class="`oil-modal__course-create`"
        v-if="store_role.role === 'Author'"
    >
        <div :class="`oil-modal__course-create__text`">
            <span>Если вы закончили наполнение курса, то можете отправить его на модерацию.</span>
            <span>В разработке → На модерации</span>
            <span>В случае успешной проверки курс будет размещен на сайте и статус изменится на “Опубликован”. Если курс будет нуждаться в доработке, то модератор вернёт курс в статус “В разработке”.</span>
        </div>
        <div :class="`oil-modal__course-create__btns`">
            <BtnCmp
                :text="'Отмена'"
                :background_type="'_secondary'"
                @click="closeModal"
            />
            <BtnCmp
                :text="'Изменить'"
                @click="changeStatus"
            />
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useStoreModal } from "~/src/stores/storeModal";
import {useUserRoleStore} from "~/src/stores/storeRole";
import axios from "axios";

export default defineComponent({
    setup() {
        const store_modal = useStoreModal();
        const store_role = useUserRoleStore();

        const modalData = store_modal.$state;

        const formModel = reactive({
            courseId: modalData.modalProps.courseId ?? "",
            statusToChange: modalData.modalProps.status ?? "",
        });
        console.log(formModel, 'ну-ка, блять')

        const closeModal = () => {
            store_modal.closeModal();
        };

        const changeStatus = (() => {
            const { courseId, statusToChange } = formModel;
            axios
                .patch('/admin/v1/courseStatus', {
                    courseId,
                    statusToChange
                })
                .then((response) => {
                    console.log('статус изменен, поздравляю с  повышением!', response);
                    store_modal.closeModal()
                })
                .catch(error => {
                    console.log('статус не изменился, повышение не получил', error.response.data)
                    store_modal.$patch({
                        label: "Внимание!",
                        activeModal: "some-error",
                        modalProps: {
                            data: error.response.data,
                            courseId: courseId,
                            status: 'onModeration'
                        }
                    });
                })
        })

        return {
            store_modal,
            store_role,
            closeModal,
            changeStatus
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