<template>
    <section class="oil-container oil-course-content">
        <breadCmp 
            :prev_page="['Курсы', `${course_name}`]"
            :current_page="'Создание курса'"
            class="oil-course-content__bread"
        />
        <template v-if="content === 'text'">
            <div 
                class="oil-course-content__attention"
                @click="openSummary"
            >
                <div class="oil-course-content__attention__head">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#323C46" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span>Как работать с содержанием раздела?</span>
                    <svg class="oil-course-content__attention__chevron" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 9L12 15L18 9" stroke="#374351" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <div v-if="visible_simmary.value" class="oil-course-content__attention__text">
                    <div class="oil-course-content__attention__text__frame">
                        <span>Структура теста</span>
                        <ul>
                            <li>Тест должен содержать хотя бы один вопрос. Наполнение вопроса включает в себя следующие блоки:</li>
                            <ul>
                                <li>
                                    направление вопроса
                                </li>
                                <li>
                                    тело вопроса
                                </li>
                                <li>
                                    четыре варианта ответа
                                </li>
                                <li>
                                    балл за правильный ответ.
                                </li>
                            </ul>
                            <li>Проходной балл указывается отдельно от вопросов (общий для всего теста).</li>
                        </ul>
                    </div>
                    <div class="oil-course-content__attention__text__frame">
                        <span>Добавление нового вопроса</span>
                        <ul>
                            <li>Чтобы добавить новый вопрос, наведите курсор на структуру теста и нажмите на кнопку “Добавить вопрос”, он появится в общем списке вопросов и станет доступным для наполнения.</li>
                        </ul>
                    </div>
                    <div class="oil-course-content__attention__text__frame">
                        <span>Внимание!</span>
                        <ul>
                            <li>Убедитесь в том, что вы выбрали направления курса во вкладке “Общие настройки курса”, так как тема каждого вопроса должна соответствовать одному из направлений курса.</li>
                        </ul>
                    </div>
                </div>
            </div>
            <editor
                v-if="editorVisible"
                api-key="dz8c47wxakp97jftcugrneq2nl66wpkjv16yn8wgojhfzdw0"
                :init="{
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar:
                        'undo redo | formatselect | bold italic backcolor | \
                        alignleft aligncenter alignright alignjustify | \
                        bullist numlist outdent indent | removeformat | help'
                }"
            />
            <btnCmp 
                :text="'Сохранить'"
                class="oil-course-content__btn"
            />
        </template>
        <template v-else-if="content === 'test'">
            <div class="oil-course-content__test">
                <div class="oil-course-content__test__general-settings" v-for="(setting, idx) in general_setting.value" :key="idx">
                    <span class="oil-course-content__test__general-settings__name">{{ setting.name }}</span>
                    <div class="oil-course-content__test__general-settings__value">
                        <span>{{ setting.value.length ? setting.value.length : 'Нет данных' }}</span>
                        <span v-if="!setting.value.length">{{ setting.desc }}</span>
                    </div>
                </div>
                <div 
                    class="oil-course-content__attention"
                    @click="openSummary"
                >
                    <div class="oil-course-content__attention__head">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#323C46" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span>Как работать с содержанием теста?</span>
                        <svg class="oil-course-content__attention__chevron" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 9L12 15L18 9" stroke="#374351" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div v-if="visible_simmary.value" class="oil-course-content__attention__text">
                        <div class="oil-course-content__attention__text__frame">
                            <span>Структура теста</span>
                            <ul>
                                <li>Тест должен содержать хотя бы один вопрос. Наполнение вопроса включает в себя следующие блоки:</li>
                                <ul>
                                    <li>
                                        направление вопроса
                                    </li>
                                    <li>
                                        тело вопроса
                                    </li>
                                    <li>
                                        четыре варианта ответа
                                    </li>
                                    <li>
                                        балл за правильный ответ.
                                    </li>
                                </ul>
                                <li>Проходной балл указывается отдельно от вопросов (общий для всего теста).</li>
                            </ul>
                        </div>
                        <div class="oil-course-content__attention__text__frame">
                            <span>Добавление нового вопроса</span>
                            <ul>
                                <li>Чтобы добавить новый вопрос, наведите курсор на структуру теста и нажмите на кнопку “Добавить вопрос”, он появится в общем списке вопросов и станет доступным для наполнения.</li>
                            </ul>
                        </div>
                        <div class="oil-course-content__attention__text__frame">
                            <span>Внимание!</span>
                            <ul>
                                <li>Убедитесь в том, что вы выбрали направления курса во вкладке “Общие настройки курса”, так как тема каждого вопроса должна соответствовать одному из направлений курса.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </section>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import Editor from '@tinymce/tinymce-vue'

export default defineComponent({
    props: {
        course_name: {
            type: String,
            default: 'Геологическое моделирование пласта'
        },
        content: {
            type: String,
            default: 'test' //text
        }
    },
    setup() {
        const editorVisible = ref(false);

        const visible_simmary = reactive({
            value: false
        })

        const general_setting = reactive({
            value: [
                {
                    name: 'Название теста (опционально)',
                    value: '',
                    desc: 'Укажите название теста здесь или в настройках структуры курса (это необязательно)'
                },
                {
                    name: 'Проходной балл *',
                    value: '',
                    desc: 'Укажите минимальный процент правильных ответов, необходимый для прохождения теста (это обязательное поле)'
                },
            ]
        })

        const openSummary = () => {
            visible_simmary.value = !visible_simmary.value
        }

        onMounted(() => {
            editorVisible.value = true;
        });

        return {
            editorVisible,
            openSummary,
            visible_simmary,
            general_setting
        };
    },
    components: {
        Editor
    }
})
</script>

<style lang="sass">
.oil-course-content
    @include flex_column()
    gap: rem(32)    
    &__attention 
        width: rem(924)
        padding: rem(16) rem(24)

        @include flex_column()  
        gap: rem(12)
        background-color: $basic_light_gray
        border-radius: rem(8)
        border: rem(1) solid $light_gray
        &__head 
            gap: rem(12)

            display: flex 
            align-items: center
            position: relative
            
        &__chevron 
            position: absolute
            top: 50%
            right: rem(16)
            transform: translateY(-50%)

        &__text 
            @include flex_column()   
            ul 
                list-style: inside 
                & > ul 
                    padding-left: rem(32)

            span 
                display: inline-flex
                font-weight: bold
                margin-bottom: rem(12)
            
            &__frame 
                &:not(:last-child)
                    margin-bottom: rem(20)

    &__test
        &__general-settings
            @include flex_start()
            &__value
                @include flex_column()
                gap: rem(2)
                span 
                    &:first-child
                        font-weight: bold
                    
                    &:last-child
                        font-size: rem(12)
            
            &__name 
                padding: rem(28) rem(108) rem(28) rem(8)
                min-width: rem(360)


    &__btn 
        width: fit-content

</style>
