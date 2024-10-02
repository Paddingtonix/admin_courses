<template>
	<div class="oil-course-content__test__question">
		<div class="oil-course-content__test__question__frame">
			<span class="oil-course-content__test__question__title">
				{{ questionName }}
			</span>
			<div
				v-show="!active_id.includes(question.id)"
				class="oil-course-content__test__question__btn-wrapper"
			>
				<!-- <i class="oil-arrow-up">
					<svg
						width="14"
						height="18"
						viewBox="0 0 14 18"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M7 17V1M7 1L1 7M7 1L13 7"
							stroke="#808E9D"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</i>
				<i class="oil-arrow-down">
					<svg
						width="14"
						height="18"
						viewBox="0 0 14 18"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M7 1V17M7 17L13 11M7 17L1 11"
							stroke="#808E9D"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</i> -->
				<i class="oil-edit" @click.stop="openQuestion">
					<svg
						width="23"
						height="23"
						viewBox="0 0 23 23"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M10 4.00023H5.8C4.11984 4.00023 3.27976 4.00023 2.63803 4.32721C2.07354 4.61483 1.6146 5.07377 1.32698 5.63826C1 6.27999 1 7.12007 1 8.80023V17.2002C1 18.8804 1 19.7205 1.32698 20.3622C1.6146 20.9267 2.07354 21.3856 2.63803 21.6732C3.27976 22.0002 4.11984 22.0002 5.8 22.0002H14.2C15.8802 22.0002 16.7202 22.0002 17.362 21.6732C17.9265 21.3856 18.3854 20.9267 18.673 20.3622C19 19.7205 19 18.8804 19 17.2002V13.0002M6.99997 16.0002H8.67452C9.1637 16.0002 9.40829 16.0002 9.63846 15.945C9.84254 15.896 10.0376 15.8152 10.2166 15.7055C10.4184 15.5818 10.5914 15.4089 10.9373 15.063L20.5 5.50023C21.3284 4.6718 21.3284 3.32865 20.5 2.50023C19.6716 1.6718 18.3284 1.6718 17.5 2.50022L7.93723 12.063C7.59133 12.4089 7.41838 12.5818 7.29469 12.7837C7.18504 12.9626 7.10423 13.1577 7.05523 13.3618C6.99997 13.5919 6.99997 13.8365 6.99997 14.3257V16.0002Z"
							stroke="#808E9D"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</i>
				<i
					v-if="!isLast"
					@click.stop="deleteQuestion"
					class="oil-delete"
				>
					<svg
						width="20"
						height="22"
						viewBox="0 0 20 22"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M14 5V4.2C14 3.0799 14 2.51984 13.782 2.09202C13.5903 1.71569 13.2843 1.40973 12.908 1.21799C12.4802 1 11.9201 1 10.8 1H9.2C8.07989 1 7.51984 1 7.09202 1.21799C6.71569 1.40973 6.40973 1.71569 6.21799 2.09202C6 2.51984 6 3.0799 6 4.2V5M1 5H19M17 5V16.2C17 17.8802 17 18.7202 16.673 19.362C16.3854 19.9265 15.9265 20.3854 15.362 20.673C14.7202 21 13.8802 21 12.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V5"
							stroke="#FF7C7C"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</i>
			</div>
			<transition name="fade">
				<CourseArchitectureAddBlock
					:btn_text="'вопрос'"
					:request_type="{
						type: 'Question',
						query: `${question.id}`,
					}"
					:block_id="question.id"
					@request-trigger=""
					v-if="question_id === questions_length - 1"
				/>
			</transition>
		</div>
		<div class="oil-question">
			<div
				class="oil-question__frame"
				v-if="active_id.includes(question.id)"
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
					<!-- @vue-expect-error -->
					<MarkSelector
						:label="'Направление'"
						:error="errors.directionId"
						:choosed_variable="
							directions.find(
								(value) => value.id === questionForm.directionId
							)
						"
						:object-list="directions"
						@select-object="changeActiveDirection($event)"
					/>
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
						:active="questionForm.showFullTitle"
						@click="setShowFullTitle"
						:text="`Отображать тело вопроса в названии (вместо “Вопрос ${
							question_id + 1
						}”)`"
					/>
					<editor
						v-if="editorVisible"
						id="tiny-editor"
						v-model="questionForm.content"
						api-key="dz8c47wxakp97jftcugrneq2nl66wpkjv16yn8wgojhfzdw0"
						:init="{
							language: 'ru',
							height: 233,
							menubar: false,
							plugins: [
								'advlist autolink lists link image charmap print preview anchor',
								'searchreplace visualblocks code fullscreen',
								'insertdatetime media table paste code help wordcount',
							],
							toolbar:
								'undo redo | formatselect | bold italic backcolor | \
                            alignleft aligncenter alignright alignjustify | link image \
                            bullist numlist outdent indent | removeformat | help',
						}"
					/>
				</div>
				<div class="oil-question__body">
					<span class="oil-question__title">Ответы</span>
					<span class="oil-question__desc"
						>Введите варианты ответов в соответствующие поля.
						Убедитесь, что каждый ответ понятен и не вызывает
						двусмысленности. Затем, используя радиокнопки, укажите
						правильный ответ.</span
					>
					<div
						class="oil-question__answer"
						v-for="(answer, index) in question?.answers"
						:key="index"
					>
						<RadioCmp
							:id="answer.id.toString()"
							:active="
								question.answers
									.find((item) => item.isCorrectAnswer)
									?.id.toString()
							"
							@click="setCorrectAnswer(index)"
						/>
						<InputCmp
							:label="`Ответ ${index + 1}`"
							:model-value="answer.text"
							:error="answerErrors[answer.id]"
							@set_value="setAnswerText(index, $event.value)"
						/>
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
					<!-- @vue-expect-error -->
					<InputCmp
						:class="{ error_score: errors?.correctAnswerScore }"
						:error="errors.correctAnswerScore"
						:max_length="1"
						:model-value="
							!questionForm.correctAnswerScore
								? null
								: questionForm.correctAnswerScore
						"
						:label="'Балл'"
						@set_value="setScore($event.value)"
					/>
				</div>
				<div class="oil-question__btns">
					<BtnCmp
						@click="closeQuestion"
						:background_type="'_secondary'"
						:text="'Отмена'"
					/>
					<BtnCmp
						:text="'Сохранить'"
						:disabled="!isAnswersValid && !isFormValid"
						@click="changeQuestion"
					/>
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, type PropType, onMounted } from "vue";
import Editor from "@tinymce/tinymce-vue";
import type { ICourseContentQuestions } from "~/src/ts-interface/course-content";
import { useFormValidate } from "~/src/utils/useFormValidate";

export default defineComponent({
	props: {
		question_id: {
			type: Number,
			default: 1,
		},
		question_title: {
			type: String,
			default: "Вопрос",
		},
		question_index: {
			type: Number,
			default: 1,
		},
		active_id: {
			type: Array<number>,
			default: [],
		},
		question: {
			type: Object as unknown as PropType<ICourseContentQuestions>,
			required: true,
		},
		score: {
			type: Number,
			default: null,
		},
		selectorObject: {
			type: Object as PropType<{ name: string; directionId: number }[]>,
			required: true,
		},
		isLast: {
			type: Boolean,
			default: false,
		},
		questions_length: {
			type: Number,
			default: 0,
		},
	},
	emits: [
		"set_score",
		"change_question",
		"open_question",
		"close_question",
		"delete_question",
	],
	setup(props, { emit }) {
		const visible_summary = reactive({
			value: false,
		});

		const initialForm = JSON.parse(
			JSON.stringify({
				content: "",
				directionId: null,
				showFullTitle: false,
				correctAnswerScore: null,
				answers: props.question.answers.map((item) => item),
			})
		);

		const questionName = computed(() =>
			props.question?.title.replace(
				/(?<=Вопрос )\d+/,
				`${props.question_id + 1}`
			)
		);

		const directions = computed(() => props.selectorObject);

		const transformDirection = (value?: {
			name: string;
			directionId: number;
		}) => (value ? { name: value.name, id: value.directionId } : value);

		const questionForm = reactive({
			content: props.question.content,
			directionId: props.question.directionId,
			showFullTitle: props.question.showFullTitle,
			correctAnswerScore: props.question.correctAnswerScore,
			answers: props.question.answers,
		});
		const { isFormValid, errors, validateOnSubmit } = useFormValidate(
			questionForm,
			{
				content: {
					required: { errorMessage: "Обязательно к заполнению" },
					min: {
						errorMessage: "Минимальное кол-во символов",
						minValue: 1,
					},
					max: {
						errorMessage: "Максимальное кол-во символов",
						maxValue: 600,
					},
					shouldChange: { errorMessage: "Вы должны что-то изменить" },
					defaultError: "Какая-то ошибка",
				},
				correctAnswerScore: {
					required: { errorMessage: "Обязательно к заполнению" },
					shouldChange: { errorMessage: "Вы должны что-то изменить" },
					validateNumber: {
						errorMessage: "Значение поля - целое число от 1 до 3",
						range: [1, 3],
					},
					defaultError: "Какая-то ошибка",
				},
				directionId: {
					required: { errorMessage: "Обязательно к заполнению" },
					shouldChange: { errorMessage: "Вы должны что-то изменить" },
					defaultError: "Какая-то ошибка",
				},
			}
		);

		onMounted(() => {
			console.log(directions.value);
		});

		const answersValidate = (answer: {
			text: string;
			isCorrectAnswer: boolean;
			id: number;
		}) => {
			if (!answer.text || !answer.text.trim().length) {
				answerErrors.value[answer.id] = "Обязательно к заполнению";
			} else if (answer.text.trim().length > 95) {
				answerErrors.value[answer.id] =
					"Максимальное количество символов - 95";
			} else {
				delete answerErrors.value[answer.id];
			}
		};
		const answerErrors = ref([] as unknown as any);
		const isAnswersValid = computed(() => !answerErrors.value.length);
		const hasCorrectAnswer = ref(
			!questionForm.answers.every((item) => !item.isCorrectAnswer)
		);
		const changeQuestion = () => {
			validateOnSubmit();
			for (const answer of questionForm.answers) {
				answersValidate(answer);
			}
			if (!hasCorrectAnswer.value) {
				for (const innerAnswer of questionForm.answers) {
					answerErrors.value[innerAnswer.id] =
						"Выберите правильный ответ";
				}
			}
			if (isAnswersValid.value && isFormValid.value) {
				emit("change_question", {
					question: questionForm,
					id: props.question.id,
				});
			}
		};

		const isOpened = ref<boolean>(
			props.active_id.includes(props.question.id)
		);

		const openQuestion = () => {
			emit("open_question", props.question.id);
		};

		const closeQuestion = () => {
			Object.assign(questionForm, {
				content: props.question.content,
				directionId: props.question.directionId,
				showFullTitle: props.question.showFullTitle,
				correctAnswerScore: props.question.correctAnswerScore,
				answers: props.question.answers,
			});
			emit("close_question", props.question.id);
		};

		const scoreValue = reactive({
			score: props.score,
			error: "",
		});

		const editorVisible = ref(false);
		const editorValue = ref("");

		onMounted(() => {
			editorVisible.value = true;
		});

		const openSummaryQuestion = () => {
			visible_summary.value = !visible_summary.value;
		};

		const setScore = (value: number) => {
			questionForm.correctAnswerScore = value;
			emit("set_score", questionForm.correctAnswerScore);
		};

		const setCorrectAnswer = (index: number) => {
			hasCorrectAnswer.value = true;
			for (const answer of questionForm.answers) {
				answer.isCorrectAnswer = false;
				delete answerErrors.value[answer.id];
			}
			questionForm.answers[index].isCorrectAnswer = true;
		};

		const setAnswerText = (index: number, text: string) => {
			questionForm.answers[index].text = text;
			answersValidate(questionForm.answers[index]);
		};

		const setShowFullTitle = () => {
			questionForm.showFullTitle = !questionForm.showFullTitle;
		};

		const deleteQuestion = () => {
			const data = {
				id: props.question.id,
				questionName,
			};
			emit("delete_question", data);
		};

		const changeActiveDirection = (direction: { id: number }) => {
			console.log(direction);

			questionForm.directionId = direction.id;
		};
		return {
			visible_summary,
			openSummaryQuestion,
			editorVisible,
			openQuestion,
			isOpened,
			setScore,
			scoreValue,
			editorValue,
			changeQuestion,
			questionForm,
			setCorrectAnswer,
			setAnswerText,
			setShowFullTitle,
			changeActiveDirection,
			closeQuestion,
			errors,
			isFormValid,
			isAnswersValid,
			answerErrors,
			deleteQuestion,
			questionName,
			directions,
			transformDirection,
		};
	},
	components: {
		Editor,
	},
});
</script>
<style lang="sass">
.oil-course-content__test__question

    position: relative
    z-index: 1
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

    &__btn-wrapper
        opacity: 0
        display: flex
        align-items: center
        position: absolute
        top: 50%
        transform: translateY(-50%)
        transition: opacity .3s

        right: rem(24)
        column-gap: rem(16)

        .oil-arrow-up
            svg
                path
                    transition: stroke .3s
        .oil-arrow-down
            svg
                    path
                        transition: stroke .3s
        .oil-edit
            svg
                path
                    transition: stroke .3s
        .oil-delete
            svg
                path
                    transition: stroke .3s


    &:hover
        .oil-course-content__test__question__btn-wrapper
            opacity: 1
            .oil-arrow-up:hover
                svg
                    path
                        stroke: $basic-primary
            .oil-arrow-down:hover
                svg
                    path
                        stroke: $basic-primary
            .oil-edit:hover
                svg
                    path
                        stroke: $basic-primary
            .oil-delete:hover
                svg
                    path
                        stroke: $basic-error

.oil-question
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

        .oil-input.error_score
            .oil-input__message
                width: max-content

    &__answer
        @include flex_start()
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
