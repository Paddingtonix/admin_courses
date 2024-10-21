<template>
    <section class="oil-container oil-create-course">
        <div class="oil-create-course__form oil-page">
            <breadCmp
                :prev_page="'Курсы'"
                :current_page="'Создание курса'"
                class="oil-create-course__form__bread"
                :prev_link="'/course-page'"
            />
            <div class="oil-create-course__form__fields">
                <span class="oil-create-course__form__fields__title">Общая информация</span>
                <div class="oil-create-course__form__fields__container">
                    <template v-for="(field, idx) in form.slice(0, 2)" :key="idx">
                        <selectorCmp
                            v-if="field.selector?.length"
                            :list="field.selector"
                            :label="field.label"
                            :type="field.type"
                            :error="field.error"
                            @setValue="setValueSelector"
                        />
                        <inputCmp
                            v-else
                            :placeholder="field.label"
                            :type="field.type"
                            :error="field.error = field.value.length > 103 ? 'Не больше 103 символов' : field.error"
                            :maxlength="103"
                            @set_value="setValueSelector"
                        />
                    </template>
                </div>
            </div>
            <div class="oil-create-course__form__fields">
                <span class="oil-create-course__form__fields__title">Параметры курса</span>
                <div class="oil-create-course__form__fields__attention">
                    <i class="oil-create-course__form__fields__attention__icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                            <path d="M20.0002 15.0004V21.667M20.0002 28.3337H20.0169M17.6924 6.48659L3.9843 30.1643C3.22395 31.4776 2.84378 32.1343 2.89997 32.6732C2.94898 33.1433 3.19527 33.5705 3.57753 33.8484C4.01579 34.167 4.77456 34.167 6.2921 34.167H33.7084C35.2259 34.167 35.9847 34.167 36.423 33.8484C36.8052 33.5705 37.0515 33.1433 37.1005 32.6732C37.1567 32.1343 36.7765 31.4776 36.0162 30.1643L22.308 6.48658C21.5504 5.17798 21.1716 4.52368 20.6774 4.30392C20.2463 4.11223 19.7542 4.11223 19.3231 4.30392C18.8289 4.52368 18.4501 5.17798 17.6924 6.48659Z" stroke="#F9AD4E" stroke-width="3.33" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </i>
                    <p>Внимание! После сохранения изменений, редактирование параметров будет невозможно.</p>
                </div>
                <SummaryCmp>
                    <template v-slot:summary-text>
                        <ul v-for="(text_block, idx) in guide_text" :key="idx">
                            <span>{{ text_block.title }}</span>
                            <p
                                v-for="(
                                    text, idx
                                ) in text_block.text"
                                :key="idx"
                            >
                                {{ text }}
                            </p>


                            <li v-for="(rule, index) in text_block.rules" :key="index">
                                {{ rule }}
                            </li>
                        </ul>
                    </template>
                </SummaryCmp>
                <div class="oil-create-course__form__fields__container">
                    <template v-for="(field, idx) in form.slice(2)" :key="idx">
                        <selectorCmp
                            v-if="field.selector?.length"
                            :label="field.label"
                            :list="field.selector"
                            :type="field.type"
                            :error="field.error"
                            @setValue="setValueSelector"
                        />
                    </template>
                </div>
                <div class="oil-create-course__form__fields__btns">
                    <BtnCmp
                        :background_type="'_secondary'"
                        :text="'Отмена'"
                        @click="$router.go(-1)"
                    />
                    <BtnCmp
                        :text="'Создать'"
                        @click="submitForm"
                        :class="{_disable: form.some(field => !field.value.length)}"
                        :disabled="form.some(field => !field.value.length)"
                    />
                </div>
            </div>
        </div>
    </section>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
import type { FormField } from '~/src/ts-interface/create-course-form'
import { useStoreCourses } from '@/src/stores/storeCourse'
import { useStoreModal } from '@/src/stores/storeModal'

export default defineComponent({
    setup() {
        const storeCourses = useStoreCourses()
        const storeModal = useStoreModal()

        const open_guide = reactive({
            value: false as boolean
        })

        const guide_text = reactive([
            {
                title: 'Типы курса',
                rules: [
                    "Асинхронный — обучение, не привязанное к конкретному времени или месту",
                    "Синхронный — обучение проходит в режиме реального времени сразу для всех",
                ],
            },
            {
                title: 'Формат курса',
                rules: [
                    "Онлайн — обучение происходит с помощью интернета и электронных технологий",
                    "Оффлайн — обучение предполагает получение знаний в стенах учебного заведения",
                ],
            },
            {
                title: 'Приобретение',
                rules: [
                    "Платно — платный курс",
                    "Бесплатно — бесплатный курс",
                ],
            },
            {
                title: 'Доступ',
                rules: [
                    "Полный — пользователь может купить курс только целиком",
                    "Частичный — пользователь может купить курс частично (по главам) или целиком",
                ],
            },
        ])

        const form = reactive<FormField[]>([
            {
                label: 'Язык',
                type: 'lang',
                value: '',
                error: '',
                selector: [
                    {
                        text: 'Русский',
                        active: false,
                        translate: 'ru'
                    },
                    {
                        text: 'Английский',
                        active: false,
                        translate: 'en'
                    },
                    {
                        text: 'Французский',
                        active: false,
                        translate: 'fr'
                    }
                ]
            },
            {
                value: "",
                type: "title",
                label: "Название курса",
                error: ""
            },
            {
                label: 'Тип',
                type: 'type',
                value: '',
                error: '',
                selector: [
                    {
                        text: 'Асинхронный',
                        active: false
                    },
                    {
                        text: 'Синхронный',
                        active: false
                    }
                ]
            },
            {
                label: 'Формат',
                type: 'format',
                value: '',
                error: '',
                selector: [
                    {
                        text: 'Онлайн',
                        active: false
                    },
                    {
                        text: 'Оффлайн',
                        active: false
                    }
                ]
            },
            {
                label: 'Приобретение',
                type: "acquired",
                value: '',
                error: '',
                selector: [
                    {
                        text: 'Платно',
                        active: false
                    },
                    {
                        text: 'Бесплатно',
                        active: false
                    }
                ]
            },
            {
                label: 'Доступ',
                type: "access",
                value: '',
                error: '',
                selector: [
                    {
                        text: 'Полный',
                        active: false
                    },
                    {
                        text: 'Частичный',
                        active: false
                    }
                ]
            },
        ])

		const openGuide = () => {
			open_guide.value = !open_guide.value;
		};

        const setValueSelector = (val: { type: string, value: string }) => {            
            const field = form.find(field => field.type === val.type)!
            field.value = val.value

            if (field.selector) {
                field.selector!.forEach(option => {
                    option.active = option.text === val.value
                })
            }
        }

        const validCheck = (field: FormField) => {                        
            if(!field.value.length) {
                field.error = 'Это поле обязательно к заполнению'
            } else {
                field.error = ''
            }
        }

        // const isFormValid = () => {
        //     let course_data = {
        //         languageId: form[0].selector?.find((lang: { text: string | number, active: boolean }) => lang.active)?.translate,
        //         title: form[1].value,
        //         courseType: form[2].selector?.find((type: { text: string | number, active: boolean }) => type.active)?.text === 'Асинхронный' ? 2 : 1,
        //         courseFormat: form[3].selector?.find((format: { text: string | number, active: boolean }) => format.active)?.text === 'Онлайн' ? 2 : 1,
        //         isFree: form[4].selector?.find((option: { text: string | number, active: boolean }) => option.active)?.text === 'Бесплатно',
        //         isPartialAvailable: form[5].selector?.find((option: { text: string | number, active: boolean }) => option.active)?.text === 'Частичный'
        //     }


        //     if (course_data.courseType === 2 && course_data.courseFormat === 1) {
        //         form.find(field => field.type === 'type')!.error = 'Валидация не пройдена: Асинхронный курс не может быть оффлайн'
        //         form.find(field => field.type === 'format')!.error = 'Валидация не пройдена: Асинхронный курс не может быть оффлайн'
        //         console.log('Валидация не пройдена: Асинхронный курс не может быть оффлайн')
        //         return false
        //     }

        //     if (course_data.isFree && course_data.isPartialAvailable) {
        //         form.find(field => field.type === 'acquired')!.error = 'Валидация не пройдена: Бесплатный курс не может быть частично доступен'
        //         form.find(field => field.type === 'access')!.error = 'Валидация не пройдена: Бесплатный курс не может быть частично доступен'
        //         console.log('Валидация не пройдена: Бесплатный курс не может быть частично доступен')
        //         return false
        //     }

        //     if (course_data.courseType === 1 && course_data.isPartialAvailable) {
        //         form.find(field => field.type === 'type')!.error = 'Валидация не пройдена: Синхронный курс не может быть частично доступен'
        //         form.find(field => field.type === 'access')!.error = 'Валидация не пройдена: Синхронный курс не может быть частично доступен'
        //         console.log('Валидация не пройдена: Синхронный курс не может быть частично доступен')
        //         return false
        //     }

        //     return true
        // }

        const submitForm = () => {
            // let form_is_valid = true

            // form.forEach((field) => {
            //     validCheck(field)
            //     if (field.error) {
            //         form_is_valid = false
            //     }
            // })

            // if (!form_is_valid || !isFormValid()) return
            let course_data = {
                languageId: form[0].selector?.find((lang: { text: string | number, active: boolean }) => lang.active)?.translate,
                title: form[1].value,
                courseType: form[2].selector?.find((type: { text: string | number, active: boolean }) => type.active)?.text === 'Асинхронный' ? 2 : 1,
                courseFormat: form[3].selector?.find((format: { text: string | number, active: boolean }) => format.active)?.text === 'Онлайн' ? 2 : 1,
                isFree: form[4].selector?.find((option: { text: string | number, active: boolean }) => option.active)?.text === 'Бесплатно',
                isPartialAvailable: form[5].selector?.find((option: { text: string | number, active: boolean }) => option.active)?.text === 'Частичный'
            }

            axios
                .post('admin/v1/course', course_data)
                .then(response => {
                    if(response.data) {
                        storeModal.$patch({
                            label: "Курс создан!",
                            activeModal: "course-create-modal",
                        });
                        storeModal.openModal()
                    }
                })
                .catch((error) => {
                    console.error('Ошибка при получении данных:', error.response.data)
                    form.find(field => field.type === 'title')!.error = error.response.data
                    })
        }

        return {
            open_guide,
            openGuide,
            guide_text,
            form,
            submitForm,
            setValueSelector,
            validCheck,
            storeCourses,
            storeModal,
            // isFormValid
        }
    }
})
</script>
<style lang="sass" scoped>
.oil-create-course
    &__form
        &__bread
            margin-bottom: rem(40)

        &__fields
            max-width: rem(600)
            &__container
                display: flex
                flex-direction: column
                gap: rem(16)
                margin-bottom: rem(32)
                ._disable
                    border: rem(1) solid red


            &__title
                display: inline-block
                margin-bottom: rem(24)

            &__attention
                padding: rem(16) rem(24)
                border: rem(1) solid $dark_warning
                background-color: rgba(249, 173, 78, 0.0509803922)
                @include flex_start()
                margin-bottom: rem(24)
                gap: rem(12)
                border-radius: rem(12)
                p
                    font-size: rem(16)
                    line-height: 150%

                &__icon
                    padding: rem(12)
                    background-color: #F9AD4E1A
                    border-radius: 50%

            &__guide
                border: rem(1) solid $light_gray
                border-radius: rem(8)
                margin-bottom: rem(24)
                &__title
                    border-radius: rem(8)
                    padding: rem(16) rem(24)
                    position: relative
                    @include flex_start()
                    gap: rem(12)
                    background-color: $basic_light_gray
                    cursor: pointer
                    &__chevron
                        position: absolute
                        top: 50%
                        right: rem(24)
                        transform: translateY(-50%)
                        svg
                            transition: transform .2s
                            &._active
                                transform: rotate(180deg)

                &__text
                    padding: rem(24) rem(48)
                    span
                        display: inline-block
                        font-size: rem(16)
                        margin-bottom: rem(12)
                        font-weight: bold

                    ul
                        list-style: inside
                        &:not(:last-child)
                            margin-bottom: rem(20)

                        li
                            color: #5B6C7B

            &__btns
                @include flex_center_spacing()
                gap: rem(12)
                ._disable
                    opacity: .5
                    pointer-events: none 
</style>
