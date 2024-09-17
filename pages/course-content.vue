<template>
    <section class="oil-container">
        <div class="oil-course-content">
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
                        <span>Как работать с содержанием модуля?</span>
                        <svg class="oil-course-content__attention__chevron" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 9L12 15L18 9" stroke="#374351" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div v-if="visible_simmary.value" class="oil-course-content__attention__text">
                        <div class="oil-course-content__attention__text__frame">
                            <span>Требования к оформлению и содержанию</span>
                            <span></span>
                            <ul>
                                <p>Вы можете добавить текст, изображения (*.png, *.jpeg), прикрепить файл формата *.pdf или видео. Ограничения по количеству символов нет</p>
                                <p>Также рекомендуется соблюдать следующие правила для единообразия всего курса:</p>
                                <ul>
                                    <li>
                                        используйте одинаковый шрифт, размер и цвет текста для заголовков, подзаголовком и основного текста во всех модулях
                                    </li>
                                    <li>
                                        структурируйте текст на логические блоки с заголовками и подзаголовками
                                    </li>
                                    <li>
                                        убедитесь, что файлы формата *.pdf легко открываются и читаются на всех устройствах
                                    </li>
                                    <li>
                                        убедитесь в отсутствии орфографических, грамматических и пунктуационных ошибок.
                                    </li>
                                </ul>
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
                    <div>
                        <div class="oil-course-content__test__general-settings" v-for="(setting, idx) in general_setting.value" :key="idx">
                            <span class="oil-course-content__test__general-settings__name">{{ setting.name }}</span>
                            <div class="oil-course-content__test__general-settings__value">
                                <span>{{ setting.value.length ? setting.value.length : 'Нет данных' }}</span>
                                <span v-if="!setting.value.length">{{ setting.desc }}</span>
                            </div>
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
                    <div>
                        <div v-for="question in 5" class="oil-course-content__test__question">
                            <div @click="openQuestion(question)" class="oil-course-content__test__question__frame">
                                <span class="oil-course-content__test__question__title">Вопрос {{question}}</span>
                            </div>
                            <QuestionCmp v-if="question === open_question.value" :name="question"/>
                        </div>
                    </div>
                </div>
            </template>
        </div>

    </section>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useStoreCourses } from '~/src/stores/storeCourse'
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
        const courseStore = useStoreCourses()

        const visible_simmary = reactive({
            value: false
        })

        const open_question = reactive({
            value: 0
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
            if (courseStore.status === 'Archived') return;
            visible_simmary.value = !visible_simmary.value
        }

        const openQuestion = (idx: number) => {
            if (courseStore.status === 'Archived') return;
            open_question.value = open_question.value === idx ? 0 : idx
        }

		onMounted(() => {
			editorVisible.value = true;
		});

        return {
            editorVisible,
            openSummary,
            openQuestion,
            visible_simmary,
            open_question,
            general_setting,
            courseStore
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
    background-color: $basic_white
    padding: rem(32)

    &__attention
        padding: rem(16) rem(24)
        // margin-bottom: rem(32)

        @include flex_column()
        gap: rem(12)
        background-color: $basic_light_gray
        border-radius: rem(8)
        border: rem(1) solid $light_gray
        cursor: pointer
        &__head
            gap: rem(12)

            display: flex
            align-items: center
            position: relative
            span
                font-weight: bold

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

            // &__frame
            //     &:not(:last-child)
            //         margin-bottom: rem(20)

    &__test
        max-width: rem(972)
        &__general-settings
            @include flex_start()
            border-bottom: rem(1) solid $disabled_basic
            &__value
                @include flex_column()
                gap: rem(2)
                span
                    &:first-child
                        font-weight: bold

                    &:last-child
                        font-size: rem(12)

            &:last-child
                margin-bottom: rem(32)

            &__name
                padding: rem(28) rem(108) rem(28) rem(8)
                min-width: rem(360)

        &__question
            padding: rem(16) rem(24)
            background-color: $basic_light_gray
            border: rem(1) solid $light_gray
            cursor: pointer
            &:first-child
                border-radius: rem(8) rem(8) 0 0

            &:last-child
                border-radius: 0 0 rem(8) rem(8)

            &__title
                font-weight: bold

    &__btn
        width: fit-content

</style>
