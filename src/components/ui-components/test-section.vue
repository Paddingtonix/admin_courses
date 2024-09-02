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
			<template v-for="(question, index) in questions" :key="index">
				<QuestionCmp
					:active_id="openQuestionIndex"
					:name="question"
					:question_title="'Вопрос'"
					:question_id="index"
					@click.stop="openQuestion(question)"
				/>
				<div class="oil-course-content__test__add_questuon_wrapper">
					<hr />
					<BtnCmp
						class="btn__add_question"
						:background_type="'_secondary'"
						:text="'Добавить вопрос'"
					>
						<svg
							width="16"
							height="16"
							viewBox="0 0 16 16"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M7.9987 5.33301V10.6663M5.33203 7.99967H10.6654M14.6654 7.99967C14.6654 11.6816 11.6806 14.6663 7.9987 14.6663C4.3168 14.6663 1.33203 11.6816 1.33203 7.99967C1.33203 4.31778 4.3168 1.33301 7.9987 1.33301C11.6806 1.33301 14.6654 4.31778 14.6654 7.99967Z"
								stroke="#176DC1"
								stroke-width="1.33"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</BtnCmp>
				</div>
			</template>
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

<style lang="sass">
.oil-course-content__test
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

        &__name
            padding: rem(28) rem(108) rem(28) rem(8)
            min-width: rem(360)

        &:last-child
            margin-bottom: rem(32)

    &__question
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
    &__add_questuon_wrapper
        .btn__add_question
            position: absolute
            padding: 0
            z-index: 2
            max-height: rem(32)
            background-color: #fff
            left: 35%
            transform: translateY(-50%) translateX(-100%)
            max-width: rem(156)
            font-size: rem(12)
            font-weight: 600
            &:hover
                background-color: #eee !important
</style>
