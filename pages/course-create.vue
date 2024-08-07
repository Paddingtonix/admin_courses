<template>
    <section class="oil-container oil-create-course">
        <div class="oil-create-course__form oil-page">
            <breadCmp 
                :prev_page="'Курсы'"
                :current_page="'Создание курса'"
                class="oil-create-course__form__bread"
            />
            <div class="oil-create-course__form__fields">
                <span class="oil-create-course__form__fields__title">Общая информация</span>
                <div class="oil-create-course__form__fields__container">
                    <template v-for="(field, idx) in form.slice(0, 2)" :key="idx">
                        <selectorCmp
                            v-if="field.selector?.length"
                            :list="field.selector"
                            :label="field.label"
                        />
                        <inputCmp 
                            v-else
                            :label="field.label"
                        />
                    </template>
                </div>
            </div>
            <div class="oil-create-course__form__fields">
                <span class="oil-create-course__form__fields__title">Параметры курса</span>
                <div>
                    <div class="oil-create-course__form__fields__attention">
                        <i class="oil-create-course__form__fields__attention__icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                                <path d="M20.0002 15.0004V21.667M20.0002 28.3337H20.0169M17.6924 6.48659L3.9843 30.1643C3.22395 31.4776 2.84378 32.1343 2.89997 32.6732C2.94898 33.1433 3.19527 33.5705 3.57753 33.8484C4.01579 34.167 4.77456 34.167 6.2921 34.167H33.7084C35.2259 34.167 35.9847 34.167 36.423 33.8484C36.8052 33.5705 37.0515 33.1433 37.1005 32.6732C37.1567 32.1343 36.7765 31.4776 36.0162 30.1643L22.308 6.48658C21.5504 5.17798 21.1716 4.52368 20.6774 4.30392C20.2463 4.11223 19.7542 4.11223 19.3231 4.30392C18.8289 4.52368 18.4501 5.17798 17.6924 6.48659Z" stroke="#F9AD4E" stroke-width="3.33" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </i>
                        <p>Внимание! После сохранения изменений, редактирование параметров будет невозможно.</p>
                    </div>
                    <div class="oil-create-course__form__fields__guide">
                        <div class="oil-create-course__form__fields__guide__title" @click="openGuide">
                            <i>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#323C46" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </i>
                            <span>Как правильно задать параметры курса?</span>
                            <i class="oil-create-course__form__fields__guide__title__chevron">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M6 9L12 15L18 9" stroke="#374351" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </i>
                        </div>
                        <div class="oil-create-course__form__fields__guide__text" v-if="open_guide.value">
                            <ul>
                                <span>Типы курса</span>
                                <li>Асинхронный — обучение, не привязанное к конкретному времени или месту</li>
                                <li>Синхронный — обучение проходит в режиме реального времени сразу для всех</li>
                            </ul>
                            <ul>
                                <span>Формат курса</span>
                                <li>Онлайн — обучение происходит с помощью интернета и электронных технологий</li>
                                <li>Оффлайн — обучение предполагает получение знаний в стенах учебного заведения</li>
                            </ul>
                            <ul>
                                <span>Покупка</span>
                                <li>Платно — платный курс</li>
                                <li>Бесплатно — бесплатный курс</li>
                            </ul>
                            <ul>
                                <span>Доступ</span>
                                <li>Полный — пользователь может купить курс только целиком</li>
                                <li>Частичный — пользователь может купить курс частично (по главам) или целиком</li>
                            </ul>
                        </div>
                    </div>
                    <div class="oil-create-course__form__fields__container">
                        <template v-for="(field, idx) in form.slice(3)" :key="idx">
                            <selectorCmp 
                                :label="field.label"
                                v-if="field.selector?.length"
                                :list="field.selector"
                            />
                        </template>
                    </div>
                    <div class="oil-create-course__form__fields__btns">
                        <BtnCmp 
                            :background_type="'_secondary'"
                            :text="'Отмена'"
                        />
                        <BtnCmp 
                            :text="'Создать'"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        const open_guide = reactive({
            value: false
        })

        const form = reactive([
            {
                label: 'Язык',
                selector: [
                    {
                        text: 'Русский',
                        active: false
                    },
                    {
                        text: 'Английский',
                        active: false
                    }
                ]
            },
            {
                id: "course_name",
                value: "",
                type: "text",
                pattern: '^([a-z0-9]+(?:[._-][a-z0-9]{1,50})*)@([a-z0-9]{4,31}(?:[.-][a-z0-9]{4,31})*.[a-z]{2,4})$',
                label: "Название курса",
                error: ""
            },
            {
                label: 'Тип',
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
                label: 'Формат',
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
                label: 'Покупка',
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
            {
                label: 'Доступ',
                selector: [
                    {
                        text: 'Русский',
                        active: false
                    },
                    {
                        text: 'Английский',
                        active: false
                    }
                ]
            },
        ])

        const openGuide = () => {
            open_guide.value = !open_guide.value
        }

        return {
            open_guide,
            openGuide,
            form
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
                gap: rem(12)
                margin-bottom: rem(32)
            
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


</style>