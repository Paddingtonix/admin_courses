<template>
	<div class="oil-course-setting__content">
		<div
			v-if="storeCourseSettings.CourseType === 'Archived'"
			class="oil-course-setting__content__info__attention"
		>
			<i class="oil-course-setting__content__info__attention__icon">
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
			<p class="oil-course-setting__content__info__attention__text">
				Курс архивирован, вы не можете просмотреть его наполнение на
				сайте. Доступна опция выгрузки курса на ПК в формате PDF.
			</p>
			<BtnCmp
				:text="'Скачать PDF'"
				@click=""
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
		<div
			v-else
			style="max-width: 972px"
			class="oil-course-content__attention"
			@click="toggleSummary"
		>
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
				<span>Как работать с содержанием курса?</span>
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
				<ul>
					<span>Редактирование структуры курса</span>
					<li>
						Основные модули курса могут перетаскиваться, если их
						количество больше одного. При этом соблюдайте иерархию:
						части перетаскиваются между частями, главы — между
						главами в пределах одной части, разделы — между
						разделами в пределах одной главы.
					</li>
					<li>
						Главы и Разделы нельзя удалить, если они в единственном
						экземпляре в части. Если модулей несколько, их можно
						удалять до тех пор, пока не останется один экземпляр.
						Тест, входящий в главу, недоступен для удаления.
					</li>
				</ul>
				<ul>
					<span>Наполнение модулей</span>
					<li>
						Для перехода к наполнению разделов, тестов и
						дополнительных модулей нажмите на название модуля и
						перейдите к редактированию страницы.
					</li>
				</ul>
				<ul>
					<span>Управление модулями</span>
					<li>
						Для того, чтобы получить возможность совершать действия
						с модулем, необходимо навести на него курсор мыши -
						тогда станут видимы все возможные действия.
					</li>
					<li>
						Можно изменить названия основных модулей (Часть, Глава,
						Раздел и Тест), а также удалить или добавить их. При
						добавлении Части автоматически создаётся одна Глава,
						один Раздел и один Тест в этой Части.
					</li>
					<li v-if="storeCourseSettings.IsPartialAvailable">
						При редактировании Главы необходимо также указать её
						стоимость, т.к. стоимость всего курса формируется как
						сумма стоимости всех Глав этого курса.
					</li>
					<ul>
						<span>Дополнительные модули:</span>
						<li>
							Редактирование названий дополнительных модулей
							недоступно.
						</li>
						<li>
							Вводная страница - разместите общую и/или
							дополнительную информацию о курсе.
						</li>
						<li>
							Входной тест - тест для оценки знаний учеников в
							начале прохождения курса.
						</li>
						<li>
							Итоговый тест - тест для оценки знаний учеников в
							конце прохождения курса.
						</li>
						<li>
							Итоги (страница недоступна для удаления) - страница
							с дополнительной информацией для учеников, прошедших
							курс, включая опцию скачивания сертификата.
						</li>
					</ul>
				</ul>
			</div>
		</div>
		<div
			class="oil-course-setting__content__container"
			v-if="!preloader.value"
		>
			<div
				class="oil-course-setting__content__container__inner"
				:class="{
					_filled: content_inner.value.initialPage,
					_disable:
						edit_field.type_field !== '' &&
						edit_field.idx_field !== null,
				}"
				@mousemove="createBlock($event, 'introductory')"
			>
				<template v-if="content_inner.value.initialPage">
					<span
						:style="{ color: '#176DC1' }"
						@click="
							$router.push(
								`content-module/${content_inner.value.initialPage.contentId}?courseTitle=${storeCourseSettings.Title}&contentName=Вводная%20страница&=text`
							)
						"
						>{{
							content_inner.value.initialPage.title === null
								? "Вводная страница"
								: content_inner.value.initialPage.title
						}}</span
					>
					<CourseArchitectureIcons
						v-if="storeCourseSettings.CourseType !== 'Archived'"
						:arrow="false"
						:is-editable="false"
						:delete_id="content_inner.value.initialPage.id"
						:delete_type="'Page'"
						@delete-trigger="reloadContent"
					/>
				</template>
				<transition name="fade">
					<CourseArchitectureAddBlock
						v-if="
							!content_inner.value.initialPage &&
							storeCourseSettings.CourseType !== 'Archived' &&
							!canAddPart()
						"
						:style="{ top: -15 + 'px' }"
						:btn_text="
							!content_inner.value.initialPage &&
							!content_inner.value.initialTesting
								? 'вводную страницу и входной тест'
								: 'вводную страницу'
						"
						:request_type="{
							type: 'Page',
							query: 'courseId',
						}"
						:block_id="Number($route.query.search) || undefined"
						@request-trigger="reloadContent"
					/>
				</transition>
			</div>
			<div
				class="oil-course-setting__content__container__inner"
				:class="{
					_filled: content_inner.value.initialTesting,
					_disable:
						edit_field.type_field !== '' &&
						edit_field.idx_field !== null,
				}"
				@mousemove="createBlock($event, 'start_test')"
			>
				<template v-if="content_inner.value.initialTesting">
					<span
						@click="
							$router.push(
								`course-content/${content_inner.value.initialTesting.id}?courseTitle=${storeCourseSettings.Title}&=test`
							)
						"
						:style="{ color: '#176DC1' }"
						>{{ content_inner.value.initialTesting.title }}</span
					>
					<CourseArchitectureIcons
						v-if="storeCourseSettings.CourseType !== 'Archived'"
						:arrow="false"
						:fields_valid="isSettingValid"
						:is-editable="false"
						:delete_id="content_inner.value.initialTesting.id"
						:delete_type="'Testing'"
						@delete-trigger="reloadContent"
					/>
				</template>
				<transition name="fade">
					<CourseArchitectureAddBlock
						v-if="
							!content_inner.value.initialTesting &&
							content_inner.value.initialPage &&
							storeCourseSettings.CourseType !== 'Archived' &&
							!canAddPart()
						"
						:style="{ top: -15 + 'px' }"
						:btn_text="'входной тест'"
						:request_type="{
							type: 'Testing',
							query: 'courseId',
							testing_type: 'Entrance',
						}"
						:block_id="Number($route.query.search) || undefined"
						@request-trigger="reloadContent"
					/>
				</transition>
			</div>
			<template
				v-for="(part, idx) in content_inner.value.parts.sort(
					(a, b) => a.orderInCourse - b.orderInCourse
				)"
				:key="idx"
			>
				<div
					class="oil-course-setting__content__container__inner"
					@mousemove="createBlock($event, 'part')"
					:class="{
						_filled: part,
						_active:
							edit_field.type_field === 'Part' &&
							edit_field.idx_field === part.id,
						_disable:
							(edit_field.type_field !== 'Part' ||
								edit_field.idx_field !== part.id) &&
							edit_field.idx_field !== null,
					}"
				>
					<InputCmp
						v-if="
							edit_field.type_field === 'Part' &&
							edit_field.idx_field === part.id
						"
						class="oil-course-setting__content__container__inner__input"
						:model-value="changes_value.value"
						@set_value="changes_value.value = $event.value"
						:error="
							validationErrors.find(
								(item) => item?.id === part.id
							)?.error ?? ''
						"
					/>
					<span v-else>{{
						part.title === null ? "Вводная страница" : part.title
					}}</span>
					<CourseArchitectureIcons
						v-if="storeCourseSettings.CourseType !== 'Archived'"
						:delete_id="part.id"
						:delete_type="'Part'"
						@delete-trigger="reloadContent"
						:fields_valid="isSettingValid"
						@move-trigger="
							moveToStructure(
								$event,
								`/admin/v1/Part/${part.id}/move`
							)
						"
						@edit-trigger="
							editTitle($event, idx, 'Part', part.id, part.title)
						"
						:arrow="{
							up: !idx ? false : true,
							down:
								idx === content_inner.value.parts.length - 1
									? false
									: true,
						}"
					/>
					<transition name="fade">
						<CourseArchitectureAddBlock
							:btn_text="'часть'"
							:request_type="{
								type: 'Part',
								query: 'courseId',
							}"
							:block_id="Number($route.query.search) || undefined"
							@request-trigger="reloadContent"
							v-if="
								idx === content_inner.value.parts.length - 1 &&
								storeCourseSettings.CourseType !== 'Archived' &&
								canAddPart()
							"
						/>
					</transition>
				</div>
				<template
					v-for="(chapter, idx) in part.chapters.sort(
						(a, b) => a.orderInPart - b.orderInPart
					)"
					:key="idx"
				>
					<div
						class="oil-course-setting__content__container__inner _chapter"
						@mousemove="createBlock($event, 'chapter')"
						:class="{
							_filled: chapter,
							_active:
								edit_field.type_field === 'Chapter' &&
								edit_field.idx_field === chapter.id,
							_disable:
								(edit_field.type_field !== 'Chapter' ||
									edit_field.idx_field !== chapter.id) &&
								edit_field.idx_field !== null,
						}"
					>
						<span
							v-if="
								edit_field.type_field !== 'Chapter' &&
								edit_field.idx_field !== chapter.id
							"
							>{{
								chapter.title === null
									? "Вводная страница"
									: chapter.title
							}}</span
						>
						<span
							class="oil-course-setting__content__container__inner__chapter-price"
							v-if="
								storeCourseSettings.IsPartialAvailable &&
								edit_field.type_field !== 'Chapter' &&
								edit_field.idx_field !== chapter.id
							"
							>{{
								chapter.priceInRubles
									? chapter.priceInRubles
									: null
							}}
							<span>RUB</span></span
						>
						<InputCmp
							v-if="
								edit_field.type_field === 'Chapter' &&
								edit_field.idx_field === chapter.id
							"
							:error="
								validationErrors.find(
									(item) => item?.id === chapter.id
								)?.error ?? ''
							"
							class="oil-course-setting__content__container__inner__input"
							@set_value="changes_value.value = $event.value"
							:model-value="changes_value.value"
						/>
						<!-- TODO: chaper-input -->
						<div
							class="oil-course-setting__content__container__inner__input-wrapper"
							v-if="
								edit_field.type_field === 'Chapter' &&
								edit_field.idx_field === chapter.id &&
								storeCourseSettings.IsPartialAvailable
							"
						>
							<InputCmp
								class="oil-course-setting__content__container__inner__input__price"
								:error="
									validationErrors.find(
										(item) => item?.id === chapter.id
									)?.error ?? ''
								"
								@set_value="chapter_price_value = $event.value"
								:model-value="chapter_price_value"
							/>
						</div>

						<CourseArchitectureIcons
							v-if="
								storeCourseSettings.CourseType !== 'Archived' &&
								!storeCourseSettings.IsPartialAvailable
							"
							:delete_id="chapter.id"
							:delete_type="'Chapter'"
							:fields_valid="!validationErrors.length"
							@move-trigger="
								moveToStructure(
									$event,
									`/admin/v1/Chapter/${chapter.id}/move`
								)
							"
							@delete-trigger="reloadContent"
							@edit-trigger="
								editTitle(
									$event,
									idx,
									'Chapter',
									chapter.id,
									chapter.title
								)
							"
							:arrow="{
								up: !idx ? false : true,
								down:
									idx === part.chapters.length - 1
										? false
										: true,
							}"
						/>
						<CourseArchitectureIcons
							v-else
							:delete_id="chapter.id"
							:delete_type="'Chapter'"
							@move-trigger="
								moveToStructure(
									$event,
									`/admin/v1/Chapter/${chapter.id}/move`
								)
							"
							:fields_valid="isSettingValid"
							@delete-trigger="reloadContent"
							@edit-trigger="
								editPriceAndTitle(
									$event,
									idx,
									'Chapter',
									chapter.id,
									chapter.title,
									chapter.priceInRubles
								)
							"
							:arrow="{
								up: !idx ? false : true,
								down:
									idx === part.chapters.length - 1
										? false
										: true,
							}"
						/>
						<transition name="fade">
							<CourseArchitectureAddBlock
								:btn_text="'главу'"
								:request_type="{
									type: 'Chapter',
									query: 'partId',
								}"
								:block_id="part.id"
								@request-trigger="reloadContent"
								v-if="
									idx === part.chapters.length - 1 &&
									storeCourseSettings.CourseType !==
										'Archived'
								"
							/>
						</transition>
					</div>
					<div
						class="oil-course-setting__content__container__inner _section"
						@mousemove="createBlock($event, 'section')"
						:class="{
							_filled: section,
							_active:
								edit_field.type_field === 'Section' &&
								edit_field.idx_field === section.id,
							_disable:
								(edit_field.type_field !== 'Section' ||
									edit_field.idx_field !== section.id) &&
								edit_field.idx_field !== null,
						}"
						v-for="(section, idx) in chapter.sections.sort(
							(a, b) => a.orderInChapter - b.orderInChapter
						)"
						:key="idx"
					>
						<InputCmp
							v-if="
								edit_field.type_field === 'Section' &&
								edit_field.idx_field === section.id
							"
							class="oil-course-setting__content__container__inner__input"
							:model-value="changes_value.value"
							:error="
								validationErrors.find(
									(item) => item?.id === section.id
								)?.error ?? ''
							"
							@set_value="changes_value.value = $event.value"
						/>

						<span
							:style="{ color: '#176DC1' }"
							v-else
							@click="
								$router.push(
									`content-module/${section.contentId}?courseTitle=${storeCourseSettings.Title}&contentName=${section.title}&=text`
								)
							"
							>{{
								section.title === null
									? "Вводная страница"
									: section.title
							}}</span
						>
						<CourseArchitectureIcons
							v-if="storeCourseSettings.CourseType !== 'Archived'"
							:delete_id="section.id"
							:delete_type="'Section'"
							:fields_valid="isSettingValid"
							@delete-trigger="reloadContent"
							@edit-trigger="
								editTitle(
									$event,
									idx,
									'Section',
									section.id,
									section.title
								)
							"
							@move-trigger="
								moveToStructure(
									$event,
									`/admin/v1/Section/${section.id}/move`
								)
							"
							:arrow="{
								up: !idx ? false : true,
								down:
									idx === chapter.sections.length - 1
										? false
										: true,
							}"
						/>
						<transition name="fade">
							<CourseArchitectureAddBlock
								:btn_text="'раздел'"
								:request_type="{
									type: 'Section',
									query: 'chapterId',
								}"
								:block_id="chapter.id"
								@request-trigger="reloadContent"
								v-if="
									idx === chapter.sections.length - 1 &&
									storeCourseSettings.CourseType !==
										'Archived'
								"
							/>
						</transition>
					</div>
					<div
						class="oil-course-setting__content__container__inner _chapter"
						:class="{
							_filled: chapter,
							_active:
								edit_field.type_field === 'Testing' &&
								edit_field.idx_field === chapter.testing.id,
							_disable:
								(edit_field.type_field !== 'Testing' ||
									edit_field.idx_field !==
										chapter.testing.id) &&
								edit_field.idx_field !== null,
						}"
					>
						<InputCmp
							v-if="
								edit_field.type_field === 'Testing' &&
								edit_field.idx_field === chapter.testing.id
							"
							:error="
								validationErrors.find(
									(item) => item?.id === chapter.testing.id
								)?.error ?? ''
							"
							@set_value="changes_value.value = $event.value"
							class="oil-course-setting__content__container__inner__input"
							:model-value="changes_value.value"
						/>

						<span
							:style="{ color: '#176DC1' }"
							@click="
								$router.push(
									`course-content/${chapter.testing.id}?courseTitle=${storeCourseSettings.Title}&=test`
								)
							"
							v-else
							>{{
								!chapter.testing
									? "Тест"
									: chapter.testing.title
							}}</span
						>
						<CourseArchitectureIcons
							v-if="storeCourseSettings.CourseType !== 'Archived'"
							:delete_id="chapter.id"
							:delete_type="'Chapter'"
							:is-deletable="false"
							:fields_valid="isSettingValid"
							@delete-trigger="reloadContent"
							@edit-trigger="
								editTitle(
									$event,
									idx,
									'Testing',
									chapter.testing.id,
									chapter.testing.title
								)
							"
						/>
					</div>
				</template>
			</template>
			<div
				class="oil-course-setting__content__container__inner"
				:class="{
					_filled: content_inner.value.finalTesting,
					_active:
						edit_field.type_field === 'final_test' &&
						edit_field.idx_field === idx,
					_disable:
						edit_field.type_field !== '' &&
						edit_field.idx_field !== null,
				}"
				@mousemove="createBlock($event, 'final_test')"
			>
				<template v-if="content_inner.value.finalTesting">
					<span
						@click="
							$router.push(
								`course-content/${content_inner.value.finalTesting.id}?courseTitle=${storeCourseSettings.Title}&=test`
							)
						"
						:style="{ color: '#176DC1' }"
						>{{
							!content_inner.value.finalTesting.title
								? "Итоговый тест"
								: content_inner.value.finalTesting.title
						}}</span
					>
					<CourseArchitectureIcons
						v-if="storeCourseSettings.CourseType !== 'Archived'"
						:delete_id="content_inner.value.finalTesting.id"
						:fields_valid="isSettingValid"
						:delete_type="'Testing'"
						:is-editable="false"
						@delete-trigger="reloadContent"
						:arrow="false"
					/>
				</template>
				<transition name="fade">
					<CourseArchitectureAddBlock
						v-if="
							!content_inner.value.finalTesting &&
							storeCourseSettings.CourseType !== 'Archived' &&
							!canAddPart()
						"
						:style="{ top: -15 + 'px' }"
						:btn_text="'итоговый тест'"
						:request_type="{
							type: 'Testing',
							query: 'courseId',
							testing_type: 'Final',
						}"
						:block_id="Number($route.query.search) || undefined"
						@request-trigger="reloadContent"
					/>
				</transition>
			</div>
			<div
				class="oil-course-setting__content__container__inner"
				:class="{
					_filled: content_inner.value.finalPage.contentId,
					_disable:
						edit_field.type_field !== '' &&
						edit_field.idx_field !== null,
				}"
			>
				<span
					@click="
						$router.push(
							`content-module/${content_inner.value.finalPage.contentId}?courseTitle=${storeCourseSettings.Title}&contentName=Итоги&=text`
						)
					"
					>{{
						content_inner.value.finalPage.title === null
							? "Итоги"
							: content_inner.value.finalPage.title
					}}</span
				>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import axios from "axios";
import { useStoreCourseSettings } from "~/src/stores/storeCourseSettings";
import InputCmp from "./input-cmp.vue";

const storeCourseSettings = useStoreCourseSettings();
const route = useRoute();

defineProps({
	course_setting: {
		type: Object,
		default: {},
	},
});
// TODO: chapter_value
const chapter_price_value = ref("");

const preloader = reactive({
	value: true as boolean,
});
const content_inner = reactive({
	value: [] as any,
});
const edit_field = reactive({
	idx_field: null as null | number,
	type_field: null as null | string,
});

const validationErrors = reactive([] as { id: number; error: string }[]);

const visible_block = reactive({
	value: "",
});

const reload_state = reactive({
	value: false as boolean,
});

const changes_value = reactive({
	value: "",
});

const createBlock = (e: { offsetY: number }, block_type: string) => {
	if (e.offsetY <= 50 && e.offsetY >= 40) {
		visible_block.value = block_type;
	}
};

const reloadContent = (val: boolean) => {
	reload_state.value = val;
};

const moveToStructure = (direction: string, endpoint: string) => {
	axios.patch(`${endpoint}?moveOrientation=${direction}`).finally(() => {
		axios
			.get(`/admin/v1/Course/${route.query.search}/content`)
			.then((struct_response) => {
				content_inner.value = struct_response.data;
				reload_state.value = false;
			});
	});
};

watch(changes_value, () => {
	validateSettings({
		value: changes_value.value,
		type: edit_field.type_field as string,
	});
});

watch(chapter_price_value, () => {
	validateSettings({
		value: chapter_price_value.value,
		type: "price",
	});
});

const validateSettings = ({ value, type }: { value: string; type: string }) => {
	function setError(errorMessage: string) {
		const errorIndex = validationErrors.findIndex(
			(field) => field?.id === edit_field.idx_field
		);

		if (errorIndex < 0) {
			validationErrors.push({
				id: edit_field.idx_field as number,
				error: errorMessage,
			});
		} else {
			validationErrors[errorIndex].error = errorMessage;
		}
	}

	function deleteError() {
		const deleteIndex = validationErrors.findIndex((item) =>
			validationErrors.length ? item?.id === edit_field.idx_field : null
		);

		if (deleteIndex !== -1) {
			validationErrors.splice(deleteIndex, 1);
		} else {
			return;
		}
	}

	if (!value || (typeof value === "string" && value.trimStart().length < 1)) {
		setError("Поле обязательно к заполнению!");
		return;
	} else if (type !== "price" && value.length > 80) {
		setError("Название должно содержать не более 80 символов!");
	} else if (type === "price" && !/^\d+$/.test(value)) {
		setError("Цена может содержать только цифры");
	} else if (
		(type === "price" &&
			/^(0|[1-9][0-9]*)$/.test(value) &&
			parseInt(value) > 100000) ||
		parseInt(value) < 1
	) {
		setError(
			"Стоимость главы не может быть больше 100000 или меньше 1 руб."
		);
	} else {
		deleteError();
	}
};

const editTitle = (
	state: boolean,
	idx: number,
	type: string,
	id: number,
	title: string
) => {
	if (state) {
		edit_field.idx_field = id;
		edit_field.type_field = type;
		changes_value.value = title.replace(/^.*?:\s*/, "");
	} else {
		axios
			.patch(`/admin/v1/${edit_field.type_field}/${id}`, {
				title: changes_value.value,
			})
			.then((resp) => {
				console.log(resp);
			})
			.finally(() => {
				edit_field.idx_field = null;
				edit_field.type_field = null;
				changes_value.value = "";
				axios
					.get(`/admin/v1/Course/${route.query.search}/content`)
					.then((struct_response) => {
						content_inner.value = struct_response.data;
						reload_state.value = false;
					});
			});
	}
};

const editPriceAndTitle = (
	state: boolean,
	idx: number,
	type: string,
	id: number,
	title: string,
	price: string
) => {
	if (state) {
		edit_field.idx_field = id;
		edit_field.type_field = type;
		changes_value.value = title.replace(/^.*?:\s*/, "");
		chapter_price_value.value = price;
	} else {
		axios
			.patch(`/admin/v1/${edit_field.type_field}/${id}`, {
				title: changes_value.value,
				priceInRubles: parseInt(chapter_price_value.value),
			})
			.then((resp) => {
				console.log(resp);
			})
			.finally(() => {
				edit_field.idx_field = null;
				edit_field.type_field = null;
				changes_value.value = "";
				chapter_price_value.value = "";
				axios
					.get(`/admin/v1/Course/${route.query.search}/content`)
					.then((struct_response) => {
						content_inner.value = struct_response.data;
						reload_state.value = false;
					});
			});
	}
};

const isSummaryVisible = ref(false);

const toggleSummary = () => {
	isSummaryVisible.value = !isSummaryVisible.value;
};
const canAddPart = () => {
	const { initialPage, initialTesting, finalTesting, finalPage } =
		content_inner.value;
	return !initialPage && !initialTesting && !finalTesting && finalPage;
};

watch(reload_state, () => {
	if (reload_state.value) {
		axios
			.get(`/admin/v1/Course/${route.query.search}/content`)
			.then((struct_response) => {
				content_inner.value = struct_response.data;
				reload_state.value = false;
			});
	}
});

const isSettingValid = computed(() => !validationErrors.length);
onMounted(() => {
	nextTick(() => {
		axios
			.get(`/admin/v1/Course/${route.query.search}/content`)
			.then((struct_response) => {
				console.log("dataStruct!:", struct_response.data);
				content_inner.value = struct_response.data;
				preloader.value = false;
			});
		console.log("inner!:", content_inner.value);
	});
});
</script>

<style></style>
