<template>
	<section class="oil-container">
		<div class="oil-course-content">
			<breadCmp
				:prev_page="['Курсы', `${course_settings.title_course}`]"
				:current_page="courseContentStore.generalSettings?.title ?? ''"
				class="oil-course-content__bread"
			/>
			<!-- @vue-expect-error -->
			<AttentionMessage
				v-if="courseStore?.status === 'Archived'"
				message="Курс архивирован, вы не можете просмотреть его наполнение на сайте. Доступна опция выгрузки курса на ПК в формате PDF."
				:buttonText="'Скачать PDF'"
				:buttonClick="() => {}"
			/>
			<ContentModule v-if="course_settings.type_course === 'text'" />
			<TestSection
				:questions="courseContentStore?.questions"
				:id="id"
				v-else-if="content === 'test' && !isLoading"
			>
				<template #summary-text>
					<div
						v-for="section in summarySections"
						:key="section.title"
						class="oil-course-content__attention__text__frame"
					>
						<span>{{ section.title }}</span>
						<ul>
							<li v-for="item in section.content" :key="item">
								{{ item }}
							</li>
						</ul>
					</div>
				</template>
			</TestSection>
			<div v-else-if="isLoading">loading</div>
		</div>
	</section>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from "vue";
import { useStoreCourses } from "~/src/stores/storeCourse";
import { useStoreCourseContent } from "~/src/stores/storeCourseContent";
import { useRoute } from "vue-router";

export default defineComponent({
	props: {
		content: {
			type: String,
			default: "test", //text
		},
	},
	setup() {
		const courseStore = useStoreCourses();
		const courseContentStore = useStoreCourseContent();
		const route = useRoute();
		const { id } = route.params as unknown as { id: string };
		const course_settings = reactive({
			title_course: "",
			type_course: "",
		});

		const summarySections = [
			{
				title: "Структура теста",
				content: [
					"Тест должен содержать хотя бы один вопрос. Наполнение вопроса включает в себя следующие блоки:",
					"направление вопроса",
					"тело вопроса",
					"четыре варианта ответа",
					"балл за правильный ответ.",
					"Проходной балл указывается отдельно от вопросов (общий для всего теста).",
				],
			},
			{
				title: "Добавление нового вопроса",
				content: [
					"Чтобы добавить новый вопрос, наведите курсор на структуру теста и нажмите на кнопку 'Добавить вопрос', он появится в общем списке вопросов и станет доступным для наполнения.",
				],
			},
			{
				title: "Внимание!",
				content: [
					"Убедитесь в том, что вы выбрали направления курса во вкладке 'Общие настройки курса', так как тема каждого вопроса должна соответствовать одному из направлений курса.",
				],
			},
		];

		const isLoading = ref(true);

		onMounted(() => {
			nextTick(() => {
				courseContentStore
					.getCourseContent(id)
					.catch((error) => {
						console.error(
							"Ошибка при загрузке содержания курса:",
							error
						);
					})
					.finally(() => {
						isLoading.value = false;
						if (route.query[""] !== null) {
							course_settings.title_course =
								route.query[""][0] ?? "";
							course_settings.type_course =
								route.query[""][1] ?? "";
						} else {
							course_settings.title_course = "unknown_title";
							course_settings.type_course = "unknown_type";
						}
					});
			});
		});

		onErrorCaptured((err) => console.log(err));

		return {
			courseStore,
			courseContentStore,
			course_settings,
			summarySections,
			id,
			isLoading,
		};
	},
});
</script>

<style lang="sass">
.spinner
    display: block
    margin: 0 auto
    width: 20%
    height: max-content

.oil-course-content
    @include flex_column()
    gap: rem(32)
    background-color: $basic_white
    padding: rem(32)

    &__btn
        width: fit-content
</style>
