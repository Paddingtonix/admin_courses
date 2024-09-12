<template>
	<section class="oil-container">
		<div class="oil-course-content">
			<breadCmp
				:prev_page="['Курсы', `${course_name}`]"
				:current_page="courseContentStore.generalSettings.title"
				class="oil-course-content__bread"
			/>
			<AttentionMessage
				v-if="courseStore.status === 'Archived'"
				message="Курс архивирован, вы не можете просмотреть его
						наполнение на сайте. Доступна опция выгрузки курса на ПК
						в формате PDF."
				:buttonText="'Скачать PDF'"
				:buttonClick="() => {}"
			>
			</AttentionMessage>
			<ContentModule v-if="content === 'text'"></ContentModule>
			<TestSection
				@change-setting="changeGeneralSetting($event)"
				@change-question="changeQuestion($event)"
				:general_setting="generalSettings"
				:questions="courseContentStore.questions"
				v-else-if="content === 'test'"
			>
				<template #summary-text>
					<div class="oil-course-content__attention__text__frame">
						<span>Структура теста</span>
						<ul>
							<li>
								Тест должен содержать хотя бы один вопрос.
								Наполнение вопроса включает в себя следующие
								блоки:
							</li>
							<ul>
								<li>направление вопроса</li>
								<li>тело вопроса</li>
								<li>четыре варианта ответа</li>
								<li>балл за правильный ответ.</li>
							</ul>
							<li>
								Проходной балл указывается отдельно от вопросов
								(общий для всего теста).
							</li>
						</ul>
					</div>
					<div class="oil-course-content__attention__text__frame">
						<span>Добавление нового вопроса</span>
						<ul>
							<li>
								Чтобы добавить новый вопрос, наведите курсор на
								структуру теста и нажмите на кнопку “Добавить
								вопрос”, он появится в общем списке вопросов и
								станет доступным для наполнения.
							</li>
						</ul>
					</div>
					<div class="oil-course-content__attention__text__frame">
						<span>Внимание!</span>
						<ul>
							<li>
								Убедитесь в том, что вы выбрали направления
								курса во вкладке “Общие настройки курса”, так
								как тема каждого вопроса должна соответствовать
								одному из направлений курса.
							</li>
						</ul>
					</div>
				</template>
			</TestSection>
		</div>
	</section>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useStoreCourses } from "~/src/stores/storeCourse";
import Editor from "@tinymce/tinymce-vue";
import { useStoreCourseContent } from "~/src/stores/storeCourseContent";
import type { ICourseContentQuestions } from "~/src/ts-interface/course-content";

export default defineComponent({
	props: {
		course_name: {
			type: String,
			default: "Геологическое моделирование пласта",
		},
		content: {
			type: String,
			default: "test", //text
		},
	},
	setup() {
		const editorVisible = ref(false);
		const courseStore = useStoreCourses();
		const route = useRoute();

		const { id } = route.params as unknown as { id: number };
		const courseContentStore = useStoreCourseContent();
		const visible_simmary = reactive({
			value: false,
		});

		const open_question = reactive({
			value: 0,
		});

		const openSummary = () => {
			visible_simmary.value = !visible_simmary.value;
		};

		const openQuestion = (idx: number) => {
			open_question.value = open_question.value === idx ? 0 : idx;
		};

		const storeCourseContent = useStoreCourseContent();

		onMounted(() => {
			courseContentStore.getCourseContent(id);
		});
		const generalSettings = [
			{
				name: "Название теста (опционально)",
				title: storeCourseContent.generalSettings.title,
				type: "title",
				desc: "Укажите название теста здесь или в настройках структуры курса (это необязательно)",
			},
			{
				name: "Проходной балл *",
				title: storeCourseContent.generalSettings.cutScorePercentages,
				type: "score",
				desc: "Укажите минимальный процент правильных ответов, необходимый для прохождения теста (это обязательное поле)",
			},
		];

		const changeGeneralSetting = ({
			type,
			value,
		}: {
			type: string;
			value: string;
		}) => {
			switch (type) {
				case "title":
					storeCourseContent.$patch({
						generalSettings: { title: value },
					});
					storeCourseContent.patchCourseContent(id, { title: value });
					return;
				case "score":
					storeCourseContent.$patch({
						generalSettings: {
							cutScorePercentages: value,
						},
					});
					storeCourseContent.patchCourseContent(id, {
						cutScorePercentages: value,
					});
					return;
			}
		};

		const changeQuestion = (formdata: ICourseContentQuestions) => {
			storeCourseContent.patchQuestion(formdata);
		};

		return {
			editorVisible,
			openSummary,
			openQuestion,
			visible_simmary,
			open_question,
			courseStore,
			courseContentStore,
			generalSettings,
			changeGeneralSetting,
			changeQuestion,
		};
	},
	components: {
		Editor,
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
