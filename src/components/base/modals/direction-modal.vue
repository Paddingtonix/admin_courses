<template>
    <div class="oil-direction">
        <span class="oil-direction__desc">Направление должно быть переведено на обязательные языки (помечены звёздочкой)</span>
        <LangSwitcherCmp
            class="oil-direction__tabs"
            :active="lang"
            @change-lang="setLang"
        />
        <InputCmp
            class="oil-direction__input"
           :label="`Название направления (${lang.toLocaleUpperCase()})*`"
           :modelValue="data.localizations[lang]"
           :error="errors.name"
           @set_value="(value) => setDirectionName(value)"
           @blur="isValid"
        />
        <TextareaCmp
            class="oil-direction__text-area"
            :label="`Описание направления (${lang.toLocaleUpperCase()})*`"
            :modelValue="data.localizations[lang]"
            :error="errors.name"
            :max_length="550"
            @set_textarea="(value) => setDirectionName(value)"
        ></TextareaCmp>
        <CheckboxCmp
            class="oil-direction__checkbox"
            :text="'Отображать на сайте'"
            :active="visible_direction"
            :error="errors.checkbox"
            @set_value="setCheckbox"
            @blur="isValid"
        />
        <div class="oil-direction__btns">
            <BtnCmp
                :text="'Отмена'"
                :background_type="'_secondary'"
                @click="closeModal"
            />
            <BtnCmp
                v-if="!modal_data.modalProps.edit"
                :text="'Добавить'"
                @click="sendDirection"
            />
            <BtnCmp
                v-if="modal_data.modalProps.edit"
                :text="'Сохранить'"
                @click="patchDirection"
            />
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useStoreModal } from "~/src/stores/storeModal";
import { useDirectionStore } from "~/src/stores/storeDirection";
import type { IDirection } from "~/src/ts-interface/direction";
import { useStoreCourses } from "~/src/stores/storeCourse";
import type { ILocalizations } from "~/src/ts-interface/direction";

export default defineComponent({
    components: {},

    setup() {
        const lang = ref('ru')

        const store_modal = useStoreModal();

        const modal_data = store_modal.$state;

        const visible_direction = ref(modal_data.modalProps?.data?.isVisible || false)

        const store_direction = useDirectionStore();
        const course_store = useStoreCourses();

        const initialDirection: IDirection = {
            directionId: 0,
            lastChangeDateTime: "",
            localizedName: "",
            isVisible: false,
            count: 0,
            localizations: { ru: "", en: "", fr: "" }
        }

        const initialLocalizations: ILocalizations = {
            isVisible: false,
            localizations: { ru: "", en: "", fr: "" }
        }

        // const data: ILocalizations = reactive(
        //     modal_data.modalProps?.data || initialLocalizations
        // );

        const data: IDirection = reactive(
            modal_data.modalProps?.data
                ? {
                    ...modal_data.modalProps.data,
                    localizations: {
                        ru: modal_data.modalProps.data.localizedName || "",
                        en: modal_data.modalProps.data.localizations?.en || "",
                        fr: modal_data.modalProps.data.localizations?.fr || ""
                    }
                }
                : initialDirection
        );
        console.log(data, 'dat data data')

        const closeModal = () => {
            store_modal.closeModal();
        };

        const setLang = (active_lang) => {
            lang.value = active_lang
            console.log(lang.value, 'lang.value')
        }

        const setCheckbox = (val) => {
            visible_direction.value = val.active
        }

        const setDirectionName = (val) => {
            data.localizations[lang.value] = val.value;
        }

        const errors = reactive({
            name: ''
        });

        const isDirectionExists = (name: string) => {
            return store_direction.directions.directions
                .some((direction: IDirection) => direction.localizedName === name);
        };

        const getRelatedCourses = (localizedName: string) => {
            const courses = course_store.course_list.filter((direction_in_course) => {
                return direction_in_course.directions.includes(localizedName);
            });
            return courses.length === 1 ? courses : [];
        };

        const isValid = () => {
            errors.name = '';
            errors.checkbox = '';

            const hasAtLeastOneLocalization = Object.values(data.localizations).some(value => value.trim() !== '');

            if (!hasAtLeastOneLocalization) {
                errors.name = 'Поле обязательно к заполнению';
                return false;
            }

            if (data.localizations[lang.value].length > 50) {
                errors.name = 'Максимальное количество символов - 50';
                return false;
            }

            if (!modal_data.modalProps.edit && isDirectionExists(data.localizations[lang.value])) {
                errors.name = 'Направление с таким названием уже существует';
                return false;
            }

            if (!visible_direction.value) {
                const related_courses = getRelatedCourses(data.localizations[lang.value]);
                if (related_courses.length > 0) {
                    errors.checkbox = 'Направление используется на сайте, его нельзя скрыть';
                    return false;
                }
            }

            return true;
        }

        const sendDirection = () => {
            if (isValid()) {
                const sendData = {
                    isVisible: visible_direction.value,
                    localizations: data.localizations
                    // localizations: {
                    //     en: input_value.value,
                    //     ru: input_value.value,
                    //     fr: input_value.value
                    // }
                }
                console.log(sendData, 'отправляемые данные при создании направления')

                store_direction.createDirection(sendData);
                store_modal.closeModal();
            }
        }

        const patchDirection = () => {
            if (isValid()) {
                const sendData = {
                    isVisible: visible_direction.value,
                    localizations: data.localizations
                    // localizations: {
                    //     en: input_value.value,
                    //     ru: input_value.value,
                    //     fr: input_value.value
                    // }
                }
                console.log(sendData, 'отправляемые данные при редактировании направления')

                store_direction.changeDirection(modal_data.modalProps?.data.directionId, sendData);
                store_modal.closeModal();
            }
        }

        return {
            lang,
            visible_direction,
            modal_data,
            data,
            errors,
            setLang,
            setCheckbox,
            setDirectionName,
            isValid,
            sendDirection,
            patchDirection,
            closeModal
        }
    }
})
</script>
<style lang="sass">
.oil-direction
    &__desc
        display: inline-flex
        margin-bottom: rem(24)

    &__tabs
        margin-bottom: rem(16)

    &__input
        margin-bottom: rem(24)

    &__text-area
        margin-bottom: rem(24)

    &__checkbox
        margin-bottom: rem(32)

    &__btns
        @include flex_start()
        gap: rem(16)

</style>
