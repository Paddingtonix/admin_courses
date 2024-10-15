<template>
	<div class="oil-course-setting__info" v-if="!edit_mode.value">
		<div
			class="oil-course-setting__info__fields"
			v-for="info in course_info"
			:key="info.id"
		>
			<div class="oil-course-setting__info__fields__cell">
				<span>{{ info.field }}</span>
			</div>
			<div class="oil-course-setting__info__fields__cell">
				<span>{{ info.value || "Нет данных" }}</span>
			</div>
		</div>
		<BtnCmp
			class="oil-course-setting__info__btn"
			:text="'Редактировать'"
			@click="openEditFrame"
		/>
	</div>
	<div class="oil-course-setting__edit" v-else>
		<InputCmp
			v-for="(field, field_idx) in edit_info.slice(0, 2)"
			:key="field_idx"
			:type="field.type"
			:label="field.label"
			:error="field.error"
			@set_value="(value) => (edit_info[field_idx].value = value.value)"
			v-model="edit_info[field_idx].value"
		/>
		<div v-for="(field, field_idx) in edit_info.slice(2)" :key="field_idx">
			<TextareaCmp
				:type="field.type"
				:value="field.value"
				:label="field.label"
				:error="field.error"
				v-model="edit_info[field_idx + 2].value"
				@set_textarea="
					(value) => (edit_info[field_idx + 2].value = value.value)
				"
				class="oil-course-setting__edit__textarea"
			/>
			<div class="oil-course-setting__edit__example">
				<div
					@click="openExample(field_idx)"
					class="oil-course-setting__edit__example__btn"
				>
					<div class="oil-course-setting__edit__example__btn__frame">
						<span> Пример </span>
						<i>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="12"
								height="12"
								viewBox="0 0 12 12"
								fill="none"
							>
								<path
									d="M3 4.5L6 7.5L9 4.5"
									stroke="#176DC1"
									stroke-width="1.2"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						</i>
					</div>
					<div>
						{{ edit_info[field_idx + 2].value.length }}
						/ 470
					</div>
				</div>
				<div
					v-if="active_example.value === field_idx"
					class="oil-course-setting__edit__example__text"
				>
					<p>{{ field.example }}</p>
				</div>
			</div>
		</div>
		<div class="oil-course-setting__edit__btns">
			<BtnCmp
				:text="'Отмена'"
				@click="openEditFrame"
				:background_type="'_secondary'"
			/>
			<BtnCmp :text="'Сохранить'" @click="saveEditFrame" />
		</div>
	</div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useCourseInfo } from "~/src/stores/storeCourseInfo";
import { useRoute } from "vue-router";
import type { ICourseInfo } from "~/src/ts-interface/course-info";

const course_info_store = useCourseInfo();
const route = useRoute();

const id = route.query.search;

const edit_mode = reactive({
	value: false,
});

const active_example = reactive({
	value: null as number | null,
});

const openEditFrame = () => {
	edit_mode.value = !edit_mode.value;
};

const course_info = computed(() => [
	{
		field: "Название курса",
		value: course_info_store.course_info.title,
		id: "course_name",
	},
	{
		field: "Авторы",
		value: course_info_store.course_info.authors,
		id: "author",
	},
	{
		field: "Описание",
		value: course_info_store.course_info.description,
		id: "description",
	},
	{
		field: "Целевая аудитория",
		value: course_info_store.course_info.targetAudience,
		id: "target_audience",
	},
	{
		field: "Методика обучения",
		value: course_info_store.course_info.educationMethods,
		id: "methodology",
	},
	{
		field: "Результаты обучения",
		value: course_info_store.course_info.educationResults,
		id: "results",
	},
]);

const edit_info = ref([
	{
		id: "courseTitle",
		type: "text",
		value: course_info_store.course_info.title || "",
		required: true,
		valid: false,
		pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
		label: "Название курса",
		error: "",
		example: "",
	},
	{
		id: "author",
		type: "text",
		value: course_info_store.course_info.authors || "",
		required: true,
		valid: false,
		pattern: "",
		label: "Авторы",
		error: "",
		example: "",
	},
	{
		id: "description",
		type: "text",
		value: course_info_store.course_info.description || "",
		required: true,
		valid: false,
		pattern: "",
		label: "Описание",
		error: "",
		example:
			"Курс посвящен методам и инструментам, применяемым для геологического моделирования нефтяных и газовых месторождений. В рамках курса слушатели ознакомятся с основными принципами и техниками создания геологических моделей, а также научатся анализировать и интерпретировать данные для оптимизации добычи углеводородов.",
	},
	{
		id: "targetAudience",
		type: "text",
		value: course_info_store.course_info.targetAudience || "",
		required: true,
		valid: false,
		pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
		label: "Целевая аудитория",
		error: "",
		example:
			"Специалисты с высшим геологическим или геофизическим образованием, инженеры-нефтяники, а также студенты старших курсов профильных вузов. Курс также будет полезен для сотрудников нефтегазовых компаний, работающих в смежных областях и желающих расширить свои знания в области геологического моделирования.",
	},
	{
		id: "educationMethods",
		type: "text",
		value: course_info_store.course_info.educationMethods || "",
		required: true,
		valid: false,
		pattern: "",
		label: "Методика обучения",
		error: "",
		example:
			"Обучение включает в себя лекционные занятия, проведение семинаров и практических занятий. Участники курса будут работать с современными программными комплексами для моделирования, выполнять практические задания на реальных данных и обсуждать результаты с преподавателями.",
	},
	{
		id: "educationResults",
		type: "text",
		value: course_info_store.course_info.educationResults || "",
		required: true,
		valid: false,
		pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
		label: "Результаты обучения",
		error: "",
		example:
			"По окончании курса участники смогут: создавать и анализировать геологические модели, используя специализированное программное обеспечение; применять полученные знания для оптимизации процессов разведки и добычи углеводородов; понимать основные методы и подходы к моделированию пластов, а также интегрировать полученные данные в общие проекты разработки месторождений.",
	},
]);

const openExample = (id: number) => {
	active_example.value = active_example.value === id ? null : id;
};

const saveEditFrame = () => {
	const courseInfoData: ICourseInfo = {
		title: edit_info.value[0]?.value,
		authors: edit_info.value[1]?.value,
		description: edit_info.value[2]?.value,
		targetAudience: edit_info.value[3]?.value,
		educationMethods: edit_info.value[4]?.value,
		educationResults: edit_info.value[5]?.value,
	};

	course_info_store
		.patchCourseInfo(id as unknown as number, courseInfoData)
		.then(() => {
			openEditFrame();
		});
};

watch(
	() => course_info_store.course_info,
	(newInfo) => {
		if (newInfo) {
			edit_info.value[0].value = newInfo.title || "";
			edit_info.value[1].value = newInfo.authors || "";
			edit_info.value[2].value = newInfo.description || "";
			edit_info.value[3].value = newInfo.targetAudience || "";
			edit_info.value[4].value = newInfo.educationMethods || "";
			edit_info.value[5].value = newInfo.educationResults || "";
		}
	}
);

onMounted(() => {
	nextTick(() => {
		course_info_store.getCourseInfo(id as unknown as number);
	});
});
</script>
