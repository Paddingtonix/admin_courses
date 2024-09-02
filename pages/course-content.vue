<template>
	<section class="oil-container">
		<div class="oil-course-content">
			<breadCmp
				:prev_page="['Курсы', `${course_name}`]"
				:current_page="'Создание курса'"
				class="oil-course-content__bread"
			/>
			<AttentionMessage
				v-if="courseStore.status === 'Archived'"
				message="Курс архивирован, вы не можете просмотреть его
						наполнение на сайте. Доступна опция выгрузки курса на ПК
						в формате PDF."
				:buttonText="'Скачать PDF'"
				:buttonClick="downloadPDF"
			>
			</AttentionMessage>
			<ContentModule
				:general_setting="general_setting.value"
				v-if="content === 'text'"
			></ContentModule>
			<TestSection v-else-if="content === 'test'">
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

		const visible_simmary = reactive({
			value: false,
		});

		const open_question = reactive({
			value: 0,
		});

		const general_setting = reactive({
			value: [
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
		});

		const openSummary = () => {
			visible_simmary.value = !visible_simmary.value;
		};

		const openQuestion = (idx: number) => {
			open_question.value = open_question.value === idx ? 0 : idx;
		};

		const downloadPDF = () => {
			const element = document.querySelector(".oil-course-content");

			if (element) {
				const options = {
					margin: 1,
					filename: `course-info.pdf`,
					image: { type: "jpeg", quality: 0.98 },
					html2canvas: { scale: 2 },
					jsPDF: {
						unit: "in",
						format: "letter",
						orientation: "portrait",
					},
				};
			} else {
				console.error("Не получилось, не фортмануло :(");
			}
		};

		onMounted(() => {
			editorVisible.value = true;
			console.log("initial-settings", general_setting.value);
		});

		return {
			editorVisible,
			openSummary,
			openQuestion,
			visible_simmary,
			open_question,
			general_setting,
			courseStore,
			downloadPDF,
		};
	},
	components: {
		Editor,
	},
});
</script>

<style lang="sass">
.oil-course-content
    @include flex_column()
    gap: rem(32)
    background-color: $basic_white
    padding: rem(32)

    &__btn
        width: fit-content
</style>
