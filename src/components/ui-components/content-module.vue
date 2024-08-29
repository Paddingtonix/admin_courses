<template>
    <div class="oil-course-content__attention" @click="toggleSummary">
        <div class="oil-course-content__attention__head">
            <slot name="header-icon">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                >
                    <path
                        d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                        stroke="#323C46"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </slot>
            <span>{{ title }}</span>
            <slot name="toggle-icon">
                <svg
                    class="oil-course-content__attention__chevron"
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
        >
            <div class="oil-course-content__attention__text__frame">
                <span>{{ instructionsTitle }}</span>
                <p>{{ instructionsDescription }}</p>
                <ul>
                    <li v-for="(rule, index) in rules" :key="index">
                        {{ rule }}
                    </li>
                </ul>
            </div>
        </div>
        <editor
            v-if="editorVisible"
            api-key="dz8c47wxakp97jftcugrneq2nl66wpkjv16yn8wgojhfzdw0"
            :init="editorInitConfig"
        />
        <BtnCmp :text="buttonText" class="oil-course-content__btn" />
    </div>
</template>

<script setup>
const props = defineProps({
    title: {
        type: String,
        default: "Как работать с содержанием модуля?",
    },
    instructionsTitle: {
        type: String,
        default: "Требования к оформлению и содержанию",
    },
    instructionsDescription: {
        type: String,
        default:
            "Вы можете добавить текст, изображения (*.png, *.jpeg), прикрепить файл формата *.pdf или видео. Ограничения по количеству символов нет. Также рекомендуется соблюдать следующие правила для единообразия всего курса:",
    },
    rules: {
        type: Array,
        default: () => [
            "Используйте одинаковый шрифт, размер и цвет текста для заголовков, подзаголовков и основного текста во всех модулях",
            "Структурируйте текст на логические блоки с заголовками и подзаголовками",
            "Убедитесь, что файлы формата *.pdf легко открываются и читаются на всех устройствах",
            "Убедитесь в отсутствии орфографических, грамматических и пунктуационных ошибок.",
        ],
    },
    editorVisible: {
        type: Boolean,
        default: true,
    },
    editorInitConfig: {
        type: Object,
        default: () => ({
            height: 500,
            menubar: false,
            plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
            ],
            toolbar:
                "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
        }),
    },
    buttonText: {
        type: String,
        default: "Сохранить",
    },
});

const isSummaryVisible = ref(false);

function toggleSummary() {
    isSummaryVisible.value = !isSummaryVisible.value;
}
</script>
