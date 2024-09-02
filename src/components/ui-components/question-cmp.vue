<template>
	<div class="oil-course-content__test__question">
		<div class="oil-course-content__test__question__frame">
			<span class="oil-course-content__test__question__title">
				{{ question_title }} {{ question_id + 1 }}
			</span>
		</div>
		<div class="oil-question">
			<div
				class="oil-question__frame"
				v-if="question_id === active_id - 1"
				@click.stop="() => {}"
			>
				<div class="oil-question__body">
					<span class="oil-question__title">Направление вопроса</span>
					<span class="oil-question__desc"
						>Выберите из выпадающего списка направление, которое
						лучше всего соответствует теме вашего вопроса. Это
						поможет правильно классифицировать вопрос и улучшить
						организацию курса.</span
					>
					<SelectorCmp :label="'Направление'" />
				</div>
				<div class="oil-question__body">
					<span class="oil-question__title">Тело вопроса</span>
					<span class="oil-question__desc"
						>Введите текст вопроса в это поле. Убедитесь, что вопрос
						сформулирован четко и понятно. Вы можете использовать
						инструменты форматирования, чтобы выделить важные части
						вопроса или добавить медиа.</span
					>
					<CheckboxCmp
						:text="`Отображать тело вопроса в названии (вместо “Вопрос ${name}”)`"
					/>
					<editor
						v-if="editorVisible"
						api-key="dz8c47wxakp97jftcugrneq2nl66wpkjv16yn8wgojhfzdw0"
						:init="{
							height: 233,
							menubar: false,
							plugins: [
								'advlist autolink lists link image charmap print preview anchor',
								'searchreplace visualblocks code fullscreen',
								'insertdatetime media table paste code help wordcount',
							],
							toolbar:
								'undo redo | formatselect | bold italic backcolor | \
                            alignleft aligncenter alignright alignjustify | \
                            bullist numlist outdent indent | removeformat | help',
						}"
					/>
				</div>
				<div class="oil-question__body">
					<span class="oil-question__title">Ответы</span>
					<span class="oil-question__title"
						>Введите варианты ответов в соответствующие поля.
						Убедитесь, что каждый ответ понятен и не вызывает
						двусмысленности. Затем, используя радиокнопки, укажите
						правильный ответ.</span
					>
					<div class="oil-question__answer" v-for="question in 4">
						<div class="oil-question__radio"></div>
						<InputCmp :label="`Ответ ${question}`" />
					</div>
				</div>
				<div class="oil-question__body">
					<span class="oil-question__title"
						>Балл за правильный ответ</span
					>
					<span class="oil-question__desc"
						>Введите количество баллов, которые будут присуждаться
						за правильный ответ на этот вопрос. Используйте шкалу от
						1 до 3, в зависимости от сложности вопроса.</span
					>
					<InputCmp :label="'Балл'" />
				</div>
				<div class="oil-question__btns">
					<BtnCmp :background_type="'_secondary'" :text="'Отмена'" />
					<BtnCmp :text="'Сохранить'" />
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";
import Editor from "@tinymce/tinymce-vue";

export default defineComponent({
	props: {
		name: {
			type: [String, Number],
			default: "",
		},
		question_title: {
			type: String,
			default: "Вопрос",
		},
		question_id: {
			type: Number,
			default: 1,
		},
		active_id: {
			type: Number,
			default: null,
		},
	},
	setup() {
		const visible_summary = reactive({
			value: false,
		});

		const editorVisible = ref(false);

		onMounted(() => {
			editorVisible.value = true;
		});

		const openSummaryQuestion = () => {
			visible_summary.value = !visible_summary.value;
		};

		return {
			visible_summary,
			openSummaryQuestion,
			editorVisible,
		};
	},
	components: {
		Editor,
	},
});
</script>
<style lang="sass">
.oil-question
    &__radio
        width: rem(20)
        height: rem(20)
        border-radius: 50%
        border: rem(1) solid $basic_primary

    span
        font-size: rem(16)

    &__title
        font-weight: bold
        margin-bottom: rem(20)

    &__desc
        margin-bottom: rem(16)

    &__body
        display: flex
        flex-direction: column
        padding: rem(24) rem(48)
        border-bottom: rem(1) solid $light_gray
        cursor: default
        .oil-selector
            max-width: rem(411)

        .oil-input
            height: rem(40)
            width: rem(73)

        .oil-checkbox
            margin-bottom: rem(16)

    &__answer
        @include flex_start()
        gap: rem(10)
        &:not(:last-child)
            margin-bottom: rem(16)

        .oil-input
            width: 100%

    &__btns
        @include flex_start()
        gap: rem(12)
        padding: rem(24) rem(48)
        .oil-btn
            width: fit-content
</style>
