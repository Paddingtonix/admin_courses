<template>
    <div class="oil-course-content__test">
        <div>
            <div
                v-for="(setting, idx) in general_setting"
                :key="idx"
                class="oil-course-content__test__general-settings"
            >
                <span class="oil-course-content__test__general-settings__name">
                    {{ setting.name }}
                </span>
                <div class="oil-course-content__test__general-settings__value">
                    <span>
                        {{
                            setting.value.length
                                ? setting.value.length
                                : noDataText
                        }}
                    </span>
                    <span v-if="!setting.value.length">
                        {{ setting.desc }}
                    </span>
                    <i v-html="setting.icon || defaultIcon"></i>
                </div>
            </div>
        </div>
        <div class="oil-course-content__attention" @click="openSummary">
            <div class="oil-course-content__attention__head">
                <slot name="attention-icon">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                    >
                        <path
                            d="M12 16V12M12 8H12.01M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z"
                            stroke="#323C46"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </slot>
                <span>{{ attentionTitle }}</span>
                <slot name="attention-chevron">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M6 9L12 15L18 9"
                            stroke="#374351"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </slot>
            </div>
            <div
                v-if="isSummaryVisible"
                class="oil-course-content__attention__text"
                @click.stop="() => {}"
            >
                <slot name="summary-text"> </slot>
            </div>
        </div>
        <div>
            <div
                v-for="(question, index) in questions"
                :key="index"
                class="oil-course-content__test__question"
                @click="openQuestion(question)"
            >
                <div class="oil-course-content__test__question__frame">
                    <span class="oil-course-content__test__question__title">
                        {{ questionTitle }} {{ index + 1 }}
                    </span>
                </div>
                <QuestionCmp
                    v-if="question === openQuestionIndex"
                    :name="question"
                    @click.stop="() => {}"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps } from "vue";

const props = defineProps({
    general_setting: {
        type: Array,
        default: () => [
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
    },
    attentionTitle: {
        type: String,
        default: "Как работать с содержанием теста?",
    },
    questionTitle: {
        type: String,
        default: "Вопрос",
    },
    questions: {
        type: Array,
        default: () => [1, 2, 3, 4, 5],
    },
    noDataText: {
        type: String,
        default: "Нет данных",
    },
    defaultIcon: {
        type: String,
        default:
            '<svg width="23" height="23" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="..."/></svg>',
    },
});
console.log(props.generalSettings, "settings");

const isSummaryVisible = ref(false);
const openQuestionIndex = ref(null);

const openSummary = () => {
    isSummaryVisible.value = !isSummaryVisible.value;
};

const openQuestion = (question) => {
    openQuestionIndex.value =
        question === openQuestionIndex.value ? null : question;
};
</script>
