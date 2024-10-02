<template>
	<div class="oil-course-content__test">
		<div>
			<div
				v-for="(setting, idx) in general_settings"
				:key="idx"
				class="oil-course-content__test__general-settings"
			>
				<template
					v-if="
						courseContentState.testType !== 'Entrance' ||
						setting.type !== 'score'
					"
				>
					<span
						class="oil-course-content__test__general-settings__name"
					>
						{{ setting.name }}
					</span>
					<div
						class="oil-course-content__test__general-settings__value"
						:class="{ fullfiled: setting.title }"
						v-if="!setting.isEditing"
					>
						<span>
							{{ setting.title ? setting.title : noDataText }}
							{{
								setting.title && setting.type === "score"
									? "%"
									: ""
							}}
						</span>
						<div
							v-if="
								(courseContentState.testType !== 'Entrance' &&
									courseContentState.testType !== 'Final') ||
								(courseContentState.testType === 'Final' &&
									setting.type === 'score')
							"
							class="oil-course-content__test__general-settings__value__wrapper"
							@click="editSetting(idx)"
						>
							<span v-if="!setting?.title">{{
								setting.desc
							}}</span>
							<i v-html="defaultIcon"></i>
						</div>
						<div v-else>
							<p v-if="!setting?.title">{{ setting.desc }}</p>
						</div>
					</div>
					<template v-else>
						<!-- @vue-expect-error -->
						<CourseSettingsInput
							:id="idx"
							:error="generalSettingsErrors[setting.type as 'title' | 'score']"
							:type="setting.type as unknown as 'title' | 'score' | undefined"
							:input_type="
								setting.type === 'score' ? 'number' : 'text'
							"
							:label="
								setting.type === 'score'
									? 'Балл'
									: 'Название теста'
							"
							@set_value="
								changeValueSetting(
									idx,
									$event,
									setting.type as 'score' | 'title'
								)
							"
							@accept="
								acceptEditing(
									$event,
									setting.type,
									changing_field
								)
							"
							@decline="cancelEditing(idx, setting.type)"
							:model_value="changing_field"
						/>
					</template>
				</template>
			</div>
		</div>
		<div class="oil-course-content__attention" @click="toggleSummary">
			<div
				class="oil-course-content__attention__head"
				:class="{ active: isSummaryVisible }"
			>
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
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
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
				@click.stop
			>
				<slot name="summary-text"></slot>
			</div>
		</div>
		<div>
			<template v-for="(question, index) in questions" :key="index">
				<QuestionCmp
					:question_title="question.title || questionTitle"
					:question_id="index"
					:question="question"
					:active_id="active_questions.value"
					@open_question="setActiveQuestion($event)"
					@close_question="closeQuestion($event)"
					@change_question="changeQuestion($event)"
					@delete_question="deleteQuestion($event)"
					:isLast="questions.length === 1"
					:selector-object="courseContentStore.directions"
				/>
				<div class="oil-course-content__test__add_questuon_wrapper">
					<hr />
					<BtnCmp
						class="btn__add_question"
						:background_type="'_secondary'"
						:text="'Добавить вопрос'"
						@click="addQuestion"
					>
						<svg
							width="16"
							height="16"
							viewBox="0 0 16 16"
							fill="none"
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
import {
	ref,
	defineProps,
	reactive,
	onMounted,
	defineEmits,
	type PropType,
} from "vue";
import { useStoreCourseContent } from "~/src/stores/storeCourseContent";
import { useStoreModal } from "~/src/stores/storeModal";
import type { ICourseContentQuestions } from "~/src/ts-interface/course-content";
import type { IDeleteModal } from "~/src/ts-interface/storeModal.type";

const route = useRoute();
const { id } = route.params as unknown as { id: string };

const courseContentStore = useStoreCourseContent();
const courseContentState = courseContentStore.$state;

const emit = defineEmits(["change-setting"]);

const props = defineProps({
	attentionTitle: {
		type: String,
		default: "Как работать с содержанием теста?",
	},
	questionTitle: { type: String, default: "Вопрос" },
	questions: {
		type: Array as PropType<ICourseContentQuestions[]>,
		required: true,
	},
	noDataText: { type: String, default: "Нет данных" },
	defaultIcon: {
		type: String,
		default: `<svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 4.00023H5.8C4.11984 4.00023 3.27976 4.00023 2.63803 4.32721C2.07354 4.61483 1.6146 5.07377 1.32698 5.63826C1 6.27999 1 7.12007 1 8.80023V17.2002C1 18.8804 1 19.7205 1.32698 20.3622C1.6146 20.9267 2.07354 21.3856 2.63803 21.6732C3.27976 22.0002 4.11984 22.0002 5.8 22.0002H14.2C15.8802 22.0002 16.7202 22.0002 17.362 21.6732C17.9265 21.3856 18.3854 20.9267 18.673 20.3622C19 19.7205 19 18.8804 19 17.2002V13.0002M6.99997 16.0002H8.67452C9.1637 16.0002 9.40829 16.0002 9.63846 15.945C9.84254 15.896 10.0376 15.8152 10.2166 15.7055C10.4184 15.5818 10.5914 15.4089 10.9373 15.063L20.5 5.50023C21.3284 4.6718 21.3284 3.32865 20.5 2.50023C19.6716 1.6718 18.3284 1.6718 17.5 2.50022L7.93723 12.063C7.59133 12.4089 7.41838 12.5818 7.29469 12.7837C7.18504 12.9626 7.10423 13.1577 7.05523 13.3618C6.99997 13.5919 6.99997 13.8365 6.99997 14.3257V16.0002Z" stroke="#808E9D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
	},
	id: { type: String, required: true },
});

const isSummaryVisible = ref(false);
const toggleSummary = () => (isSummaryVisible.value = !isSummaryVisible.value);
const storeModal = useStoreModal();
const generalSettingsTitle = computed(() =>
	courseContentStore.generalSettings.title?.replace(/^.*?:\s*/, "")
);
const generalSettingsCutScore = computed(
	() => courseContentStore.generalSettings.cutScorePercentages
);
const general_settings = reactive([
	{
		name: "Название теста (опционально)",
		title: generalSettingsTitle,
		type: "title",
		desc: "Укажите название теста здесь или в настройках структуры курса (это необязательно)",
		isEditing: false,
	},
	{
		name: "Проходной балл *",
		title: generalSettingsCutScore,
		type: "score",
		desc: "Укажите минимальный процент правильных ответов, необходимый для прохождения теста (это обязательное поле)",
		isEditing: false,
	},
]);

const active_questions = reactive({ value: [] as number[] });

const changing_field = ref("");

const setActiveQuestion = (id: number) => {
	active_questions.value.push(id);
};

const closeQuestion = (id: number) => {
	active_questions.value = active_questions.value.filter(
		(activeId) => activeId !== id
	);
};

const changeQuestion = ({
	question,
	id,
}: {
	question: ICourseContentQuestions;
	id: number;
}) => {
	console.log(question);

	courseContentStore.patchQuestion(question, id).then(async () => {
		await courseContentStore.getCourseContent(props.id).then((response) => {
			closeQuestion(id);
			return response;
		});
	});
};

const editSetting = (id: number) => {
	changing_field.value = general_settings[id].title as unknown as string;
	general_settings.forEach((setting) => (setting.isEditing = false));
	general_settings[id].isEditing = true;
};

onMounted(() => {
	nextTick(() => {
		courseContentStore
			.getDirections(courseContentStore.courseId)
			.finally(() => {});
	});
});

const changeValueSetting = (
	id: number,
	value: string,
	type: "score" | "title"
) => {
	validateGeneralSetting(value, type);
	changing_field.value = value;
};

const cancelEditing = (id: number, type: string | number) => {
	changing_field.value = "";
	general_settings[id].isEditing = false;
};

const generalSettingsErrors = ref({} as { score?: string; title?: string });

const validateGeneralSetting = (
	value: string | number,
	type: "score" | "title"
) => {
	if (value === undefined) {
		generalSettingsErrors.value[type] = "Поле обязательно к заполнению";
	}
	if (type === "title" && typeof value === "string") {
		if (!value.trim()) {
			generalSettingsErrors.value[type] = "Поле обязательно к заполнению";
		} else if (value.trimStart().length > 80) {
			generalSettingsErrors.value[type] =
				"Максимальное количество символов - 80";
		} else {
			delete generalSettingsErrors.value[type];
		}
	} else if (type === "score") {
		if (typeof value !== "number") {
			generalSettingsErrors.value[type] = "Поле обязательно к заполнению";
		} else if (value > 100 || value < 0 || !Number.isInteger(value)) {
			generalSettingsErrors.value[type] =
				"Значение поля - целое число от 0 до 100";
		} else {
			delete generalSettingsErrors.value[type];
		}
	}
};

const acceptEditing = (
	id: number,
	type: "score" | "title",
	value: string | number
) => {
	validateGeneralSetting(value, type);
	if (!generalSettingsErrors.value[type]?.length) {
		changeGeneralSetting({ type, value }).then(() => {
			general_settings[id].isEditing = false;
		});
	}
};

const addQuestion = () => {
	courseContentStore
		.addQuestion(props.id as unknown as number)
		.then(() => {
			courseContentStore.getCourseContent(props.id);
		})
		.catch((err) => {
			console.log("vopros ne dobavilsya", err);
		});
};
const deleteQuestion = (data: { id: number; questionName: string }) => {
	storeModal.$patch({
		label: "Удаление вопроса",
		activeModal: "delete-modal",
		isOpen: true,
		modalProps: {
			data,
			modalComponent: "delete-question",
			deleteFunction: courseContentStore.deleteQuestion,
		} as unknown as {
			data: { id: number; questionName: string };
			modalComponent: string;
			deleteFunction: () => typeof Promise;
		},
	} as unknown as IDeleteModal);
};

const changeGeneralSetting = async ({
	type,
	value,
}: {
	type: string;
	value: string | number;
}) => {
	const updatedData = () => {
		if (type === "title") {
			return {
				title: value as string,
				cutScorePercentages: general_settings[1].title as number,
			};
		} else {
			return {
				title: general_settings[0].title as string,
				cutScorePercentages: value as number,
			};
		}
	};
	const formData = updatedData();

	return courseContentStore
		.patchCourseContent(id, formData)
		.then((response) => {
			return response;
		})
		.catch((err) => {
			console.log("patchCourseError", err);
			throw err;
		});
};
</script>

<style lang="sass">
.oil-course-content
	&__attention
		&__head
			svg
				transition: transform .3s
				&:last-of-type
					margin-left: auto

			&.active
				svg
					&:last-of-type
						transform: rotate(180deg)
	&__test
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
