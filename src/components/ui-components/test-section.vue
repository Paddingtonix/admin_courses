<template>
	<div class="oil-course-content__test">
		<div>
			<div
				v-for="(setting, idx) of general_settings_values"
				:key="idx"
				class="oil-course-content__test__general-settings"
			>
				<span class="oil-course-content__test__general-settings__name">
					{{ setting.name }}
				</span>
				<div
					class="oil-course-content__test__general-settings__value"
					:class="{ fullfiled: setting.value.length }"
					v-if="
						idx !==
						general_settings_values.findIndex(
							(item) => item.isEditing
						)
					"
				>
					<span>
						{{ setting.value.length ? setting.value : noDataText }}
					</span>
					<div
						class="oil-course-content__test__general-settings__value__wrapper"
						@click="editSetting(idx)"
					>
						<span v-if="!setting.value.length">
							{{ setting.desc }}
						</span>
						<i v-html="setting.icon || defaultIcon"></i>
					</div>
				</div>

				<template v-else>
					<CourseSettingsInput
						:id="idx"
						:type="setting.type"
						@set_value="changeValueSetting(idx, $event)"
						@accept="acceptEditing($event)"
						@decline="cancelEditing($event)"
						:model_value="setting.value"
					/>
				</template>
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
					:question_title="
						!question.title ? 'Вопрос' : question.title
					"
					:question_id="index"
					:question="question"
					@changeQuestion="changeQuestion($event)"
					:selector-object="courseContentState.directions"
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

<script setup lang="ts">
import { ref, defineProps, type PropType } from "vue";
import { useStoreCourseContent } from "~/src/stores/storeCourseContent";
import type { ICourseContentQuestions } from "~/src/ts-interface/course-content";

const courseContentStore = useStoreCourseContent();

const courseContentState = courseContentStore.$state;

const props = defineProps({
	general_setting: {
		type: Array,
		default: () => [
			{
				name: "Название теста (опционально)",
				value: "",
				type: "title",
				desc: "Укажите название теста здесь или в настройках структуры курса (это необязательно)",
			},
			{
				name: "Проходной балл *",
				value: "",
				type: "score",
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
		type: Array as PropType<ICourseContentQuestions[]>,
		required: true,
	},
	noDataText: {
		type: String,
		default: "Нет данных",
	},
	defaultIcon: {
		type: String,
		default: `<svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 4.00023H5.8C4.11984 4.00023 3.27976 4.00023 2.63803 4.32721C2.07354 4.61483 1.6146 5.07377 1.32698 5.63826C1 6.27999 1 7.12007 1 8.80023V17.2002C1 18.8804 1 19.7205 1.32698 20.3622C1.6146 20.9267 2.07354 21.3856 2.63803 21.6732C3.27976 22.0002 4.11984 22.0002 5.8 22.0002H14.2C15.8802 22.0002 16.7202 22.0002 17.362 21.6732C17.9265 21.3856 18.3854 20.9267 18.673 20.3622C19 19.7205 19 18.8804 19 17.2002V13.0002M6.99997 16.0002H8.67452C9.1637 16.0002 9.40829 16.0002 9.63846 15.945C9.84254 15.896 10.0376 15.8152 10.2166 15.7055C10.4184 15.5818 10.5914 15.4089 10.9373 15.063L20.5 5.50023C21.3284 4.6718 21.3284 3.32865 20.5 2.50023C19.6716 1.6718 18.3284 1.6718 17.5 2.50022L7.93723 12.063C7.59133 12.4089 7.41838 12.5818 7.29469 12.7837C7.18504 12.9626 7.10423 13.1577 7.05523 13.3618C6.99997 13.5919 6.99997 13.8365 6.99997 14.3257V16.0002Z" stroke="#808E9D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
	},
});

onMounted(() => {
	courseContentStore.getDirections();
	console.log("StateCOurse: ", courseContentState.directions);
});

const isSummaryVisible = ref(false);

const openSummary = () => {
	isSummaryVisible.value = !isSummaryVisible.value;
};

const general_settings_values = reactive(
	props.general_setting.map((item: any) => ({
		...item,
		value: item.value || "",
		isEditing: false,
	}))
);

const changeQuestion = ({
	question,
}: {
	question: ICourseContentQuestions;
}) => {
	courseContentStore.$patch((state) => {
		state.questions[question.id] = question;
	});
};

const editSetting = (id: number) => {
	for (const value of general_settings_values) {
		value.isEditing = false;
	}
	general_settings_values[id].isEditing = true;
};

const changeValueSetting = (id: number, value: string) => {
	console.log(value);

	general_settings_values[id].value = value;
};

const cancelEditing = (id: number) => {
	general_settings_values[id].value = "";
	general_settings_values[id].isEditing = false;
};

const acceptEditing = (id: number) => {
	general_settings_values[id].isEditing = false;
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
            position: relative
            width: 100%
            &.fullfiled
                flex-direction: row
                justify-content: space-between
                align-items: center

            span
                font-weight: bold
            &__wrapper
                display: flex
                align-items: stretch
                cursor: pointer
                justify-content: space-between
                i
                    svg
                        path
                            transition: stroke .3s
                span
                    font-size: rem(12)
                    font-weight: 400
                &:hover
                    i
                        svg
                            path
                                stroke: $basic_primary


        &__name
            padding: rem(28) rem(108) rem(28) rem(8)
            min-width: rem(360)

        &:last-child
            margin-bottom: rem(32)


    &__add_questuon_wrapper
        cursor: pointer
        opacity: 0
        &:hover
            opacity: 1
        hr
            display: block
            border: 0
            height: 1px
            border-top: 2px solid $basic-primary
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
