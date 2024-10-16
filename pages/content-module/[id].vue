<template>
	<section class="oil-container">
		<div class="oil-course-content">
			<breadCmp
				:prev_page="['Список курсов', `${$route.query.courseTitle}`]"
				:current_page="$route.query?.contentName ?? ''"
				class="oil-course-content__bread"
			/>
			<SummaryCmp>
				<template v-slot:summary-text>
					<ul>
						<span>{{ instructionsTitle }}</span>
						<p
							v-for="(
								instruction, idx
							) in instructionsDescription.split(
								/(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s/g
							)"
							:key="idx"
						>
							{{ instruction }}
						</p>

						<li v-for="(rule, index) in rules" :key="index">
							{{ rule }}
						</li>
					</ul>
				</template>
			</SummaryCmp>
			<editor
				v-if="editorVisible"
				api-key="dz8c47wxakp97jftcugrneq2nl66wpkjv16yn8wgojhfzdw0"
				:init="editorInitConfig"
				v-model="editor_text.value"
			/>
			<BtnCmp
				@click="sendContent"
				:text="buttonText"
				class="oil-course-content__btn"
			/>
		</div>
	</section>
</template>

<script setup lang="ts">
import Editor from "@tinymce/tinymce-vue";
import { useRoute } from "vue-router";
import axios from "axios";

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
		default: `Вы можете добавить текст, изображения (*.png, *.jpeg), прикрепить файл формата *.pdf или видео.
            Ограничения по количеству символов нет. 
            Также рекомендуется соблюдать следующие правила для единообразия всего курса:`,
	},
	rules: {
		type: Array,
		default: () => [
			"используйте одинаковый шрифт, размер и цвет текста для заголовков, подзаголовков и основного текста во всех модулях",
			"структурируйте текст на логические блоки с заголовками и подзаголовками",
			"используйте изображения и видео высокого качества",
			"убедитесь, что файлы формата *.pdf легко открываются и читаются на всех устройствах",
			"убедитесь в отсутствии орфографических, грамматических и пунктуационных ошибок.",
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
			width: 830,
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

const route = useRoute();

const editor_text = reactive({
	value: "",
});

const isSummaryVisible = ref(false);

function toggleSummary() {
	isSummaryVisible.value = !isSummaryVisible.value;
}

const sendContent = () => {
	axios.patch(`/admin/v1/Content/${route.params.id}`, {
		text: editor_text.value,
	});
};

onMounted(() => {
	nextTick(() => {
		axios
			.get(`/admin/v1/Content/${route.params.id}`)
			.then((response_content) => {
				editor_text.value = response_content.data.text;
			});
	});
});
</script>

<style lang="sass">
.oil-course-content
    &__btn
        max-width: rem(152)

    &__attention
        padding: rem(16) rem(24)
        // margin-bottom: rem(32)
        max-width: rem(972)
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
            &.active
                transform: rotate(180deg) translateY(50%)


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
                margin-bottom: rem(12)
                line-height: rem(24)


            &__frame
                li, p
                    color: $basic_table_header
                    line-height: rem(24)
                &:not(:last-child)
                    margin-bottom: rem(20)
                ul
                    line-height: rem(24)
                    li
                        margin-left: rem(8)
</style>
