<template>
    <section class="oil-container">
        <div class="oil-course-content">
            <breadCmp
                :prev_page="['Курсы', `${course_name}`]"
                :current_page="'Создание курса'"
                class="oil-course-content__bread"
            />
            <AttentionMessage
                v-if="courseStore.status === 'Archived'"
                message="Курс архивирован, вы не можете просмотреть его
						наполнение на сайте. Доступна опция выгрузки курса на ПК
						в формате PDF."
                :buttonText="'Скачать PDF'"
                :buttonClick="downloadPDF"
            >
            </AttentionMessage>
            <ContentModule
                :general_setting="general_setting.value"
                v-if="content === 'text'"
            ></ContentModule>
            <TestSection v-else-if="content === 'test'">
                <template #summary-text>
                    <div class="oil-course-content__attention__text__frame">
                        <span>Структура теста</span>
                        <ul>
                            <li>
                                Тест должен содержать хотя бы один вопрос.
                                Наполнение вопроса включает в себя следующие
                                блоки:
                            </li>
                            <ul>
                                <li>направление вопроса</li>
                                <li>тело вопроса</li>
                                <li>четыре варианта ответа</li>
                                <li>балл за правильный ответ.</li>
                            </ul>
                            <li>
                                Проходной балл указывается отдельно от вопросов
                                (общий для всего теста).
                            </li>
                        </ul>
                    </div>
                    <div class="oil-course-content__attention__text__frame">
                        <span>Добавление нового вопроса</span>
                        <ul>
                            <li>
                                Чтобы добавить новый вопрос, наведите курсор на
                                структуру теста и нажмите на кнопку “Добавить
                                вопрос”, он появится в общем списке вопросов и
                                станет доступным для наполнения.
                            </li>
                        </ul>
                    </div>
                    <div class="oil-course-content__attention__text__frame">
                        <span>Внимание!</span>
                        <ul>
                            <li>
                                Убедитесь в том, что вы выбрали направления
                                курса во вкладке “Общие настройки курса”, так
                                как тема каждого вопроса должна соответствовать
                                одному из направлений курса.
                            </li>
                        </ul>
                    </div>
                </template>
            </TestSection>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useStoreCourses } from "~/src/stores/storeCourse";
import Editor from "@tinymce/tinymce-vue";

export default defineComponent({
    props: {
        course_name: {
            type: String,
            default: "Геологическое моделирование пласта",
        },
        content: {
            type: String,
            default: "test", //text
        },
    },
    setup() {
        const editorVisible = ref(false);
        const courseStore = useStoreCourses();

        const visible_simmary = reactive({
            value: false,
        });

        const open_question = reactive({
            value: 0,
        });

        const general_setting = reactive({
            value: [
                {
                    name: "Название теста (опционально)",
                    value: "",
                    desc: "Укажите название теста здесь или в настройках структуры курса (это необязательно)",
                },
                {
                    name: "Проходной балл *",
                    value: "",
                    desc: "Укажите минимальный процент правильных ответов, необходимый для прохождения теста (это обязательное поле)",
                },
            ],
        });

        const openSummary = () => {
            visible_simmary.value = !visible_simmary.value;
        };

        const openQuestion = (idx: number) => {
            open_question.value = open_question.value === idx ? 0 : idx;
        };

        const downloadPDF = () => {
            const element = document.querySelector(".oil-course-content");

            if (element) {
                const options = {
                    margin: 1,
                    filename: `course-info.pdf`,
                    image: { type: "jpeg", quality: 0.98 },
                    html2canvas: { scale: 2 },
                    jsPDF: {
                        unit: "in",
                        format: "letter",
                        orientation: "portrait",
                    },
                };
            } else {
                console.error("Не получилось, не фортмануло :(");
            }
        };

        onMounted(() => {
            editorVisible.value = true;
            console.log("initial-settings", general_setting.value);
        });

        return {
            editorVisible,
            openSummary,
            openQuestion,
            visible_simmary,
            open_question,
            general_setting,
            courseStore,
            downloadPDF,
        };
    },
    components: {
        Editor,
    },
});
</script>

<style lang="sass">
.oil-course-content
    @include flex_column()
    gap: rem(32)
    background-color: $basic_white
    padding: rem(32)
    &__info
        &__attention
            padding: rem(16) rem(24)
            margin-bottom: rem(32)

            border: 1px solid $basic-primary
            background-color: $disabled_basic
            max-width: rem(972)
            @include flex_center()
            gap: rem(10)
            border-radius: rem(12)

            &__icon
                padding: rem(12)

                border-radius: 50%
                background-color: #176DC10D
                @include flex_center()

            &__text
                min-width: rem(640)
                font-size: rem(16)
                line-height: 150%

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
            cursor: default
            ul
                list-style: inside
                & > ul
                    padding-left: rem(32)

            span
                display: inline-flex
                font-weight: bold
                margin-bottom: rem(16)
                line-height: rem(24)


            &__frame
                &:not(:last-child)
                    margin-bottom: rem(20)
                ul
                    li
                        color: $basic_table_header
                        margin-left: rem(8)

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
                user-select: none

    &__btn
        width: fit-content
</style>
