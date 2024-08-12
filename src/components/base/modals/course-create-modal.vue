<template>
	<!-- курс создан -->
	<div
		:class="`${main_class}__course-create`"
		v-if="storeCourse.createCourse"
	>
		<svg
			width="88"
			height="88"
			viewBox="0 0 88 88"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g clip-path="url(#clip0_239_29489)">
				<circle
					cx="44"
					cy="44"
					r="44"
					fill="#27AE63"
					fill-opacity="0.05"
				/>
				<circle
					cx="44"
					cy="44"
					r="32"
					fill="#27AE63"
					fill-opacity="0.1"
				/>
				<path
					d="M36.5007 44.0007L41.5007 49.0007L51.5007 39.0007M60.6673 44.0007C60.6673 53.2054 53.2054 60.6673 44.0007 60.6673C34.7959 60.6673 27.334 53.2054 27.334 44.0007C27.334 34.7959 34.7959 27.334 44.0007 27.334C53.2054 27.334 60.6673 34.7959 60.6673 44.0007Z"
					stroke="#27AE63"
					stroke-width="3.33"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</g>
			<defs>
				<clipPath id="clip0_239_29489">
					<rect width="88" height="88" fill="white" />
				</clipPath>
			</defs>
		</svg>
		<span :class="`${main_class}__course-create__text`"
			>Курс создан, можете приступать к наполнению</span
		>
		<BtnCmp :text="'Понятно'" @click="closeModal" />
	</div>
	<!-- в разработке -->
	<div :class="`${main_class}__course-create`" v-if="storeCourse.development">
		<span :class="`${main_class}__course-create__text`"
			>Курс находится в разработке у автора. Вы не можете изменить статус
			курса.</span
		>
		<BtnCmp :text="'Понятно'" @click="closeModal" />
	</div>
	<!-- на модерации -->
	<div :class="`${main_class}__course-create`" v-if="storeCourse.moderation">
		<div :class="`${main_class}__course-create__text`">
			<span>Этот курс находится в статусе “На модерации”.</span>
			<span
				>Если вы закончили проверку курса, и курс не нуждается в
				изменениях от автора, измените статус на “Опубликован” и курс
				станет доступен к приобретению.</span
			>
			<span
				>Если курс нуждается в доработке, измените статус на “В
				разработке”.</span
			>
		</div>
		<div :class="`${main_class}__course-create__radios`">
			<RadioCmp
				v-for="(radio, radio_idx) in radio_moderation"
				:key="radio_idx"
				:text="radio.text"
				:id="radio_idx"
				:active="active_radio"
				@set_radio="setRadioValue"
			/>
		</div>
		<div :class="`${main_class}__course-create__btns`">
			<BtnCmp
				:text="'Отмена'"
				:background_type="'_secondary'"
				@click="closeModal"
			/>
			<BtnCmp :text="'Изменить'" />
		</div>
	</div>
	<!-- есть ошибка по дате -->
	<div :class="`${main_class}__course-create`" v-if="storeCourse.oneError">
		<div :class="`${main_class}__course-create__text`">
			<span>Вы не можете отправить курс на публикацию.</span>
			<span
				>Обнаружена ошибка: дата снятия курса с витрины меньше текущей
				даты.</span
			>
			<span
				>Исправьте ошибку и попробуйте ещё раз или убедитесь что вы
				совершаете правильное действие.
			</span>
		</div>
		<BtnCmp :text="'Понятно'" @click="closeModal" />
	</div>
	<!-- есть несколько ошибок -->
	<div :class="`${main_class}__course-create`" v-if="storeCourse.someError">
		<div :class="`${main_class}__course-create__text`">
			<span>Вы не можете отправить курс на публикацию.</span>
			<ul>
				Обнаружены ошибки:
				<li>Дата снятия курса с витрины меньше текущей даты</li>
				<li>Дата снятия курса с витрины меньше текущей даты</li>
				<li>Дата снятия курса с витрины меньше текущей даты</li>
			</ul>
			<span
				>Исправьте ошибку и попробуйте ещё раз или убедитесь что вы
				совершаете правильное действие.
			</span>
		</div>
		<BtnCmp :text="'Понятно'" @click="closeModal" />
	</div>
	<!-- опубликован -->
	<div :class="`${main_class}__course-create`" v-if="storeCourse.published">
		<span :class="`${main_class}__course-create__text`"
			>Курс размещен на витрине сайта. Дата снятия курса с витрины -
			{{ published_date }}</span
		>
		<BtnCmp :text="'Понятно'" @click="closeModal" />
	</div>
	<!-- снят с витрины -->
	<div :class="`${main_class}__course-create`" v-if="storeCourse.removed">
		<div :class="`${main_class}__course-create__text`">
			<span
				>Курс снят с витрины сайта и доступен только тем пользователям,
				которые приобрели его ранее.</span
			>
			<span
				>Курс автоматически переместится в архив после
				{{ removed_date }}.</span
			>
		</div>
		<BtnCmp :text="'Понятно'" @click="closeModal" />
	</div>
	<!-- в архивк -->
	<div :class="`${main_class}__course-create`" v-if="storeCourse.archived">
		<div :class="`${main_class}__course-create__text`">
			<span>Курс находится в архиве.</span>
			<span
				>Весь контент курса доступен в PDF-файле, который можно найти на
				странице просмотра курса во вкладке “Содержание”.</span
			>
		</div>
		<BtnCmp :text="'Понятно'" @click="closeModal" />
	</div>
	<!-- удаление курса -->
	<div
		:class="`${main_class}__course-create`"
		v-if="storeCourse.deleteCourse"
	>
		<div :class="`${main_class}__course-create__text`">
			<span
				>Внимание! Если вы удалите курс, всё его содержимое удалится
				автоматически и не будет доступно к восстановлению.</span
			>
			<span>Вы уверены, что хотите удалить курс “[Название курса]”?</span>
		</div>
		<div :class="`${main_class}__course-create__btns`">
			<BtnCmp
				:text="'Отмена'"
				:background_type="'_secondary'"
				@click="closeModal"
			/>
			<BtnCmp :text="'Удалить'" :background_type="'_quaternary'" />
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useStoreModal } from "~/src/stores/storeModal";
import { useStoreCourses } from "~/src/stores/storeCourse";
import BtnCmp from "../../ui-components/btn-cmp.vue";
import RadioCmp from "../../ui-components/radio-cmp.vue";

export default defineComponent({
	props: {
		main_class: {
			type: String,
		},
		published_date: {
			type: String,
			default: "28.07.2025",
		},
		removed_date: {
			type: String,
			default: "28.07.2026",
		},
	},

	setup() {
		const storeModal = useStoreModal();
		const storeCourse = useStoreCourses();

		const radio_moderation = reactive([
			{
				text: "В разработке",
			},
			{
				text: "Опубликован",
			},
		]);

		const active_radio = ref<number | null>(null);

		const closeModal = () => {
			storeModal.triggerModal();
		};

		const setRadioValue = (id_radio: number) => {
			active_radio.value = id_radio;
		};

		return {
			storeModal,
			storeCourse,
			radio_moderation,
			active_radio,
			closeModal,
			setRadioValue,
		};
	},
});
</script>
<style scoped lang="sass">
.oil-modal
    &__course-create
        @include flex_column_center
        gap: rem(32)
        width: rem(400)

        &__text
            align-self: flex-start
            display: flex
            flex-direction: column
            gap: rem(12)
            ul
                list-style-type: disc
                li
                    margin-left: rem(24)

                    &:first-child
                        margin-top: rem(8)

                    &:not(:last-child)
                        margin-bottom: rem(8)

        &__radio-btns
            @include flex_column

        &__btns
            @include flex_center
            gap: rem(12)
            .oil-btn
                width: rem(194)

        &__radios
            @include flex_column
            gap: rem(16)
            align-self: flex-start
</style>
