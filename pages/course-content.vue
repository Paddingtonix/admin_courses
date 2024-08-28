<template>
	<section class="oil-container">
		<div class="oil-course-content">
			<breadCmp
				:prev_page="['Курсы', `${course_name}`]"
				:current_page="'Создание курса'"
				class="oil-course-content__bread"
			/>
			<template v-if="courseStore.status === 'Archived'">
				<div class="oil-course-content__info__attention">
					<i class="oil-course-content__info__attention__icon">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="40"
							height="40"
							viewBox="0 0 40 40"
							fill="none"
						>
							<path
								d="M20.0007 26.6673V20.0007M20.0007 13.334H20.0173M36.6673 20.0007C36.6673 29.2054 29.2054 36.6673 20.0007 36.6673C10.7959 36.6673 3.33398 29.2054 3.33398 20.0007C3.33398 10.7959 10.7959 3.33398 20.0007 3.33398C29.2054 3.33398 36.6673 10.7959 36.6673 20.0007Z"
								stroke="#176DC1"
								stroke-width="3.33"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</i>
					<p class="oil-course-content__info__attention__text">
						Курс архивирован, вы не можете просмотреть его
						наполнение на сайте. Доступна опция выгрузки курса на ПК
						в формате PDF.
					</p>
					<BtnCmp
						:text="'Скачать PDF'"
						@click="downloadPDF"
						:background_type="'_primary'"
					>
						<svg
							width="20"
							height="20"
							viewBox="0 0 20 20"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M19 13V14.2C19 15.8802 19 16.7202 18.673 17.362C18.3854 17.9265 17.9265 18.3854 17.362 18.673C16.7202 19 15.8802 19 14.2 19H5.8C4.11984 19 3.27976 19 2.63803 18.673C2.07354 18.3854 1.6146 17.9265 1.32698 17.362C1 16.7202 1 15.8802 1 14.2V13M15 8L10 13M10 13L5 8M10 13V1"
								stroke="white"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</BtnCmp>
				</div>
			</template>
			<template v-if="content === 'text'">
				<div class="oil-course-content__attention" @click="openSummary">
					<div class="oil-course-content__attention__head">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
						>
							<path
								d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
								stroke="#323C46"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
						<span>Как работать с содержанием модуля?</span>
						<svg
							class="oil-course-content__attention__chevron"
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
					</div>
					<div
						v-if="visible_simmary.value"
						class="oil-course-content__attention__text"
					>
						<div class="oil-course-content__attention__text__frame">
							<span>Требования к оформлению и содержанию</span>
							<span></span>
							<ul>
								<p>
									Вы можете добавить текст, изображения
									(*.png, *.jpeg), прикрепить файл формата
									*.pdf или видео. Ограничения по количеству
									символов нет
								</p>
								<p>
									Также рекомендуется соблюдать следующие
									правила для единообразия всего курса:
								</p>
								<ul>
									<li>
										используйте одинаковый шрифт, размер и
										цвет текста для заголовков,
										подзаголовком и основного текста во всех
										модулях
									</li>
									<li>
										структурируйте текст на логические блоки
										с заголовками и подзаголовками
									</li>
									<li>
										убедитесь, что файлы формата *.pdf легко
										открываются и читаются на всех
										устройствах
									</li>
									<li>
										убедитесь в отсутствии орфографических,
										грамматических и пунктуационных ошибок.
									</li>
								</ul>
							</ul>
						</div>
					</div>
				</div>
				<editor
					v-if="editorVisible"
					api-key="dz8c47wxakp97jftcugrneq2nl66wpkjv16yn8wgojhfzdw0"
					:init="{
						height: 500,
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
				<btnCmp :text="'Сохранить'" class="oil-course-content__btn" />
			</template>
			<template v-else-if="content === 'test'">
				<div class="oil-course-content__test">
					<div>
						<div
							class="oil-course-content__test__general-settings"
							v-for="(setting, idx) in general_setting.value"
							:key="idx"
						>
							<span
								class="oil-course-content__test__general-settings__name"
								>{{ setting.name }}</span
							>
							<div
								class="oil-course-content__test__general-settings__value"
							>
								<span>{{
									setting.value.length
										? setting.value.length
										: "Нет данных"
								}}</span>
								<span v-if="!setting.value.length">{{
									setting.desc
								}}</span>
								<i>
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
							</div>
						</div>
					</div>
					<div
						class="oil-course-content__attention"
						@click="openSummary"
					>
						<div class="oil-course-content__attention__head">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
							>
								<path
									d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
									stroke="#323C46"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
							<span>Как работать с содержанием теста?</span>
							<svg
								class="oil-course-content__attention__chevron"
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
						</div>
						<div
							v-if="visible_simmary.value"
							class="oil-course-content__attention__text"
							@click.stop="() => {}"
						>
							<div
								class="oil-course-content__attention__text__frame"
							>
								<span>Структура теста</span>
								<ul>
									<li>
										Тест должен содержать хотя бы один
										вопрос. Наполнение вопроса включает в
										себя следующие блоки:
									</li>
									<ul>
										<li>направление вопроса</li>
										<li>тело вопроса</li>
										<li>четыре варианта ответа</li>
										<li>балл за правильный ответ.</li>
									</ul>
									<li>
										Проходной балл указывается отдельно от
										вопросов (общий для всего теста).
									</li>
								</ul>
							</div>
							<div
								class="oil-course-content__attention__text__frame"
							>
								<span>Добавление нового вопроса</span>
								<ul>
									<li>
										Чтобы добавить новый вопрос, наведите
										курсор на структуру теста и нажмите на
										кнопку “Добавить вопрос”, он появится в
										общем списке вопросов и станет доступным
										для наполнения.
									</li>
								</ul>
							</div>
							<div
								class="oil-course-content__attention__text__frame"
							>
								<span>Внимание!</span>
								<ul>
									<li>
										Убедитесь в том, что вы выбрали
										направления курса во вкладке “Общие
										настройки курса”, так как тема каждого
										вопроса должна соответствовать одному из
										направлений курса.
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div>
						<div
							v-for="question in 5"
							class="oil-course-content__test__question"
							@click="openQuestion(question)"
						>
							<div
								class="oil-course-content__test__question__frame"
							>
								<span
									class="oil-course-content__test__question__title"
									>Вопрос {{ question }}</span
								>
							</div>
							<QuestionCmp
								@click.stop="() => {}"
								v-if="question === open_question.value"
								:name="question"
							/>
						</div>
					</div>
				</div>
			</template>
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
    &__info
        &__attention
            padding: rem(16) rem(24)
            margin-bottom: rem(32)

            border: 1px solid $basic-primary
            background-color: $disabled_basic
            max-width: rem(972)
            @include flex_center()
            gap: rem(10)
            border-radius: rem(12)

            &__icon
                padding: rem(12)

                border-radius: 50%
                background-color: #176DC10D
                @include flex_center()

            &__text
                min-width: rem(640)
                font-size: rem(16)
                line-height: 150%

    &__attention
        padding: rem(16) rem(24)
        // margin-bottom: rem(32)

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
                margin-bottom: rem(16)
                line-height: rem(24)


            &__frame
                &:not(:last-child)
                    margin-bottom: rem(20)
                ul
                    li
                        color: $basic_table_header
                        margin-left: rem(8)

    &__test
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

            &:last-child
                margin-bottom: rem(32)

            &__name
                padding: rem(28) rem(108) rem(28) rem(8)
                min-width: rem(360)

        &__question
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

    &__btn
        width: fit-content
</style>
