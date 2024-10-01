<template>
    <div
        :class="`oil-modal__course-create`"
        v-if="store_role.role === 'Admin'"
    >
        <div :class="`oil-modal__course-create__text`">
            <span>Этот курс находится в статусе “На модерации”.</span>
            <span>Если вы закончили проверку курса, и курс не нуждается в изменениях от автора, измените статус на “Опубликован” и курс станет доступен к приобретению.</span>
            <span>Если курс нуждается в доработке, измените статус на “В разработке”.</span>
        </div>
        <div :class="`oil-modal__course-create__radios`">
            <RadioCmp
                v-for="(radio, radio_idx) in radio_moderation" :key="radio_idx"
                :text="radio.text"
                :id="radio_idx"
                :active="active_radio"
                @set_radio="setRadioValue"
            />
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

    <div
        :class="`oil-modal__course-create`"
        v-if="store_role.role === 'Author'"
    >
        <div :class="`oil-modal__course-create__text`">
            <span>Курс находится на модерации у администратора.</span>
            <span>Ожидайте смены статуса.</span>
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
import { useUserRoleStore } from "~/src/stores/storeRole";
import axios from "axios";

export default defineComponent({
    setup() {
        const store_modal = useStoreModal();
        const store_role = useUserRoleStore();

        const radio_moderation = reactive([
            {
                text: "В разработке",
                status: "inDevelopment"
            },
            {
                text: "Опубликован",
                status: "published"
            },
        ]);

        const active_radio = ref<number | null>(null);

        const closeModal = () => {
            store_modal.closeModal();
        };

        const modalData = store_modal.$state;

        const formModel = reactive({
            courseId: modalData.modalProps.courseId ?? "",
            statusToChange: modalData.modalProps.status ?? "",
        });

        const setRadioValue = (id_radio: number) => {
            active_radio.value = id_radio;
            formModel.statusToChange = radio_moderation[id_radio].status;
            console.log(formModel.statusToChange, 'выбранный статус')
        };
        console.log(formModel.statusToChange, 'проверяем какой статус')

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
                    console.log('статус не изменился, повышение не получил', error)
                    store_modal.$patch({
                        label: "Внимание!",
                        activeModal: "one-error",
                        modalProps: {
                            courseId: courseId,
                            status: 'published'
                        }
                    });
                })
        })

        return {
            store_modal,
            radio_moderation,
            active_radio,
            closeModal,
            setRadioValue,
            changeStatus,
            store_role
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

        &__radios
            @include flex_column
            gap: rem(16)
            align-self: flex-start
</style>