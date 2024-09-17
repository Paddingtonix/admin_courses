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
	</div>
	<editor
		v-if="editorVisible"
		api-key="dz8c47wxakp97jftcugrneq2nl66wpkjv16yn8wgojhfzdw0"
		:init="editorInitConfig"
		v-model="editor_text.value"
	/>
	<BtnCmp @click="sendContent" :text="buttonText" class="oil-course-content__btn" />
</template>

<script setup lang="ts">
import { defineComponent } from 'vue'
import Editor from "@tinymce/tinymce-vue";
import { useRoute } from 'vue-router'
import axios from 'axios'

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

const route = useRoute()

const editor_text = reactive({
	value: ''
})

const isSummaryVisible = ref(false);

function toggleSummary() {
	isSummaryVisible.value = !isSummaryVisible.value;
}

const sendContent = () => {
	axios
		.patch(`/admin/v1/Content/${route.params.id}`, {
			text: editor_text.value
		})
}

onMounted(() => {
	nextTick(() => {
		axios
			.get(`/admin/v1/Content/${route.params.id}`)
			.then(response_content => {
				editor_text.value = response_content.data.text
			})
	})
})
</script>

<style lang="sass">
.oil-course-content__attention
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
</style>
