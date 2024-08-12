<template>
	<section class="oil-container oil-course">
		<div class="oil-course__info oil-page">
			<div class="oil-course__info__card">
				<CardInfo
					v-for="(card, idx) in course_info"
					:key="idx"
					:count="card.count"
					:text="card.text"
				/>
			</div>
			<template v-if="!course_list.value.length">
				<div class="oil-course__info__attention">
					<i class="oil-course__info__attention__icon">
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
					<p class="oil-course__info__attention__text">
						На данный момент в системе нет ни одного курса. Как
						только первые курсы будут созданы, здесь появится
						таблица, которая позволит управлять их параметрами и
						содержанием.
					</p>
				</div>
				<btnCmp
					:text="'Создать курс'"
					class="oil-course__info__btn"
					@click="navigate('/course-create')"
				/>
			</template>
			<template v-else>
				<div class="oil-course__settings-container">
					<div class="oil-course__settings">
						<SearchCmp :label="'Поиск'" />
						<FilterCmp @click="openFilter(true)" />
					</div>
					<div class="oil-course__create">
						<BtnCmp :text="'Создать курс'">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
							>
								<path
									d="M12 5V19M5 12H19"
									stroke="white"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						</BtnCmp>
					</div>
					<div class="oil-course__filter" v-if="filter_frame.value">
						<svg
							@click="openFilter(false)"
							class="oil-course__filter__close"
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 20 20"
							fill="none"
						>
							<path
								d="M15 5L5 15M5 5L15 15"
								stroke="#808E9D"
								stroke-width="1.67"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
						<div class="oil-course__filter__frame">
							<span class="oil-course__filter__frame__title"
								>Статус</span
							>
							<CheckboxCmp
								v-for="(
									checkbox, idx
								) in filter_course.value.slice(0, 6)"
								:key="idx"
								:text="checkbox.text"
								:id="checkbox.id"
								:active="checkbox.active"
							/>
						</div>
						<div class="oil-course__filter__frame">
							<span class="oil-course__filter__frame__title"
								>Язык</span
							>
							<CheckboxCmp
								v-for="(
									checkbox, idx
								) in filter_course.value.slice(7, 10)"
								:key="idx"
								:text="checkbox.text"
								:id="checkbox.id"
								:active="checkbox.active"
							/>
						</div>
						<div class="oil-course__filter__frame">
							<span class="oil-course__filter__frame__title"
								>Направления</span
							>
							<CheckboxCmp
								v-for="(
									checkbox, idx
								) in filter_course.value.slice(11)"
								:key="idx"
								:text="checkbox.text"
								:id="checkbox.id"
								:active="checkbox.active"
							/>
						</div>
						<div class="oil-course__filter__btns">
							<BtnCmp
								:background_type="'_secondary'"
								:text="'Сбросить'"
							/>
							<BtnCmp :text="'Применить'" />
						</div>
					</div>
				</div>
				<div class="oil-course__settings__course-list">
					<TableHeadCmp
						:name="'Название'"
						:status="'Статус'"
						:authors="'Авторы'"
						:direction="'направление'"
						:lang="'Язык'"
						:date_edit="'Дата посл. ред.'"
						:end_date="'Снятие с витрины'"
					/>
					<TableRowCmp
						v-for="(row, idx) in course_list.value"
						:key="idx"
						:name="row.name"
						:status="row.status"
						:authors="row.email"
						:direction="row.direction"
						:lang="row.lang"
						:date_edit="row.edit_data"
						:end_date="row.end_data"
					/>
				</div>
				<div class="oil-course__settings__pagination">
					<PaginationCmp :pages_count="14" />
				</div>
			</template>
		</div>
	</section>
</template>
<script lang="ts">
import { defineComponent, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default defineComponent({
	setup() {
		const router = useRouter();

		const course_info = reactive([
			{
				count: 0,
				text: "Всего",
			},
			{
				count: 0,
				text: "В разработке",
			},
			{
				count: 0,
				text: "На модерации",
			},
			{
				count: 0,
				text: "Опубликован",
			},
			{
				count: 0,
				text: "Снят с витрины",
			},
		]);

		const filter_course = reactive({
			value: [
				{
					text: "Все",
					id: "all_status",
					active: false,
				},
				{
					text: "В разработке",
					id: "in developing",
					active: false,
				},
				{
					text: "На модерации",
					id: "on_moderation",
					active: false,
				},
				{
					text: "Опубликован",
					id: "public",
					active: false,
				},
				{
					text: "Снят с витрины",
					id: "removed",
					active: false,
				},
				{
					text: "В архиве",
					id: "archive",
					active: false,
				},
				{
					text: "Все",
					id: "all_lang",
					active: false,
				},
				{
					text: "Русский",
					id: "russian",
					active: false,
				},
				{
					text: "Английский",
					id: "english",
					active: false,
				},
				{
					text: "Французский",
					id: "french",
					active: false,
				},
				{
					text: "Все",
					id: "all_direction",
					active: false,
				},
				{
					text: "Геология",
					id: "geology",
					active: false,
				},
				{
					text: "Разработка",
					id: "develop",
					active: false,
				},
				{
					text: "Бурение",
					id: "drilling",
					active: false,
				},
				{
					text: "Русский",
					id: "russian",
					active: false,
				},
				{
					text: "Технология добычи",
					id: "mining",
					active: false,
				},
				{
					text: "Шельф",
					id: "shelf",
					active: false,
				},
				{
					text: "Другое",
					id: "other",
					active: false,
				},
			],
		});

		const course_list = reactive({
			value: [],
		});

		const filter_frame = reactive({
			value: false,
		});

		const openFilter = (state: boolean) => {
			filter_frame.value = state;
		};

		const navigate = (url: string) => {
			router.push(url);
		};

		onMounted(() => {
			axios.get("/api/course_list.json").then((resp) => {
				console.log(resp);

				course_list.value = resp.data.courses;
			});
		});

		return {
			course_info,
			navigate,
			course_list,
			filter_course,
			filter_frame,
			openFilter,
		};
	},
});
</script>
<style lang="sass" scoped>
.oil-course
    &__info
        &__card
            margin-bottom: rem(48)

            @include flex_center_spacing()
            gap: rem(12)

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
                font-size: rem(16)
                line-height: 150%

        &__btn
            max-width: rem(192)

    &__settings
        @include flex_start()
        gap: rem(8)
        width: rem(742)
        &__course-list
            margin-bottom: rem(24)

        &-container
            margin-bottom: rem(16)

            @include flex_center_spacing()
            position: relative
            .oil-btn
                height: rem(38)
                padding: rem(8) rem(24)

        &__pagination
            @include flex_center()

    &__filter
        padding: rem(32)

        background-color: $basic_white
        box-shadow: 0px 8px 18px -6px rgba(24, 39, 75, 0.12), 0px 12px 42px -4px rgba(24, 39, 75, 0.12)
        @include flex_column()
        gap: rem(32)
        position: absolute
        right: 0
        top: rem(-132)
        .oil-checkbox
            width: rem(347)
            &__text
                font-size: rem(14)

        &__frame
            gap: rem(12)

            @include flex_column()
            &__title
                margin-bottom: rem(4)

                font-size: rem(14)

        &__btns
            @include flex_start()
            gap: rem(12)

        &__close
            position: absolute
            top: rem(24)
            right: rem(24)
            cursor: pointer
</style>
