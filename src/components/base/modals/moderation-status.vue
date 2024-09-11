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

export default defineComponent({
    setup() {
        const store_modal = useStoreModal();
        const store_role = useUserRoleStore();

        const radio_moderation = reactive([
            {
                text: "В разработке",
            },
            {
                text: "Опубликован",
            },
        ]);

        const active_radio = ref<number | null>(null);

        const closeModal = () => {
            store_modal.closeModal();
        };

        const setRadioValue = (id_radio: number) => {
            active_radio.value = id_radio;
        };

        return {
            store_modal,
            radio_moderation,
            active_radio,
            closeModal,
            setRadioValue,
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