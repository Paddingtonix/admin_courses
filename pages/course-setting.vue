<template>
	<section class="oil-container">
		<div class="oil-page oil-course-setting">
			<breadCmp
				:prev_page="'Список курсов'"
				:current_page="'Геологическое моделирование пласта'"
				class="oil-course-setting__bread"
			/>
			<div class="oil-course-setting__menubar">
				<tabsCmp
					v-for="(tab, tab_idx) in tabs.list"
					:key="tab_idx"
					:text="tab.text"
					@click="selectTab(tab.id)"
				/>
			</div>
			<template v-if="active_tab === 1">
				<div class="oil-course-setting__info">
					<CardInfo
						v-for="(card, card_idx) in course_setting"
						:key="card_idx"
						:text="card.text"
						:subtext="card.subtext"
					/>
				</div>
			</template>
			<template v-else-if="active_tab === 2">
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
							<span>{{
								info.value ? info.value : "Нет данных"
							}}</span>
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
						:value="field.value"
						:label="field.label"
						:error="field.error"
					/>
					<div
						v-for="(field, field_idx) in edit_info.slice(3)"
						:key="field_idx"
					>
						<TextareaCmp
							:type="field.type"
							:value="field.value"
							:label="field.label"
							:error="field.error"
							class="oil-course-setting__edit__textarea"
						/>
						<div class="oil-course-setting__edit__example">
							<div
								@click="openExample(field_idx)"
								class="oil-course-setting__edit__example__btn"
							>
								<div
									class="oil-course-setting__edit__example__btn__frame"
								>
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
									{{ edit_info[field_idx].value.length }}
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
						<BtnCmp :text="'Сохранить'" />
					</div>
				</div>
			</template>
			<template v-else-if="active_tab === 3">
				<div class="oil-course-setting__content"></div>
			</template>
		</div>
	</section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	setup() {
		const active_tab = ref<number | null>(null);

		const active_example = reactive({
			value: null as number | null,
		});

		const tabs = reactive({
			list: [
				{
					id: 1,
					text: "Общие настройки",
				},
				{
					id: 2,
					text: "Информация о курсе",
				},
				{
					id: 3,
					text: "Содержание",
				},
			],
		});

		const course_info = reactive([
			{
				field: "Название курса",
				value: "Геологическое моделирование пласта",
				id: "course_name",
			},
			{
				field: "Авторы",
				value: "",
				id: "author",
			},
			{
				field: "Описание",
				value: "",
				id: "description",
			},
			{
				field: "Целевая аудитория",
				value: "",
				id: "target_audience",
			},
			{
				field: "Методика обучения",
				value: "",
				id: "methodology",
			},
			{
				field: "Результаты обучения",
				value: "",
				id: "results",
			},
		]);

		const edit_mode = reactive({
			value: false,
		});

		const course_setting = reactive([
			{
				subtext: "Тип",
				text: "Синхронный",
			},
			{
				subtext: "Формат",
				text: "Онлайн",
			},
			{
				subtext: "приобретение",
				text: "Платно",
			},
			{
				subtext: "Доступ",
				text: "Полный",
			},
		]);

		const edit_info = reactive([
			{
				id: "userName",
				type: "email",
				value: "",
				required: true,
				valid: false,
				pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
				label: "Название курса",
				error: "",
				example: "",
			},
			{
				id: "password",
				type: "text",
				value: "",
				required: true,
				valid: false,
				pattern: "",
				label: "Авторы",
				error: "",
				example: "",
			},
			{
				id: "password",
				type: "password",
				value: "",
				required: true,
				valid: false,
				pattern: "",
				label: "Описание",
				error: "",
				example:
					"Курс посвящен методам и инструментам, применяемым для геологического моделирования нефтяных и газовых месторождений. В рамках курса слушатели ознакомятся с основными принципами и техниками создания геологических моделей, а также научатся анализировать и интерпретировать данные для оптимизации добычи углеводородов.",
			},
			{
				id: "userName",
				type: "email",
				value: "",
				required: true,
				valid: false,
				pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
				label: "Целевая аудитория",
				error: "",
				example:
					"Специалисты с высшим геологическим или геофизическим образованием, инженеры-нефтяники, а также студенты старших курсов профильных вузов. Курс также будет полезен для сотрудников нефтегазовых компаний, работающих в смежных областях и желающих расширить свои знания в области геологического моделирования.",
			},
			{
				id: "password",
				type: "password",
				value: "",
				required: true,
				valid: false,
				pattern: "",
				label: "Методика обучения",
				error: "",
				example:
					"Обучение включает в себя лекционные занятия, проведение семинаров и практических занятий. Участники курса будут работать с современными программными комплексами для моделирования, выполнять практические задания на реальных данных и обсуждать результаты с преподавателями.",
			},
			{
				id: "userName",
				type: "email",
				value: "",
				required: true,
				valid: false,
				pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
				label: "Результаты обучения",
				error: "",
				example:
					"По окончании курса участники смогут: создавать и анализировать геологические модели, используя специализированное программное обеспечение; применять полученные знания для оптимизации процессов разведки и добычи углеводородов; понимать основные методы и подходы к моделированию пластов, а также интегрировать полученные данные в общие проекты разработки месторождений.",
			},
		]);

		const selectTab = (id: number) => {
			active_tab.value = id;
		};

		const openEditFrame = () => {
			edit_mode.value = !edit_mode.value;
		};

		const openExample = (id: number) => {
			active_example.value = active_example.value === id ? null : id;
		};

		return {
			active_tab,
			course_info,
			active_example,
			tabs,
			edit_mode,
			edit_info,
			course_setting,
			selectTab,
			openEditFrame,
			openExample,
		};
	},
});
</script>

<style scoped lang="sass">
.oil-course-setting
    @include flex_column()
    &__menubar
        margin-bottom: rem(32)

        @include flex_start()
        gap: rem(12)

    &__info
        width: rem(960)
        &__fields
            border-bottom: rem(1) solid $disabled_basic

            @include flex_start()
            &__cell
                padding: rem(16) rem(8)
                &:nth-child(1)
                    width: rem(272)

        &__btn
            margin-top: rem(32)

            width: fit-content
    &__edit
        width: rem(672)
        @include flex_column()
        gap: rem(16)
        &__btns
            width: rem(291)
            gap: rem(12)

            @include flex_start()

        &__example
            &__btn
                @include flex_center_spacing()
                span
                    color: $basic_primary
                    cursor: pointer

                p
                    display: inline-flex

                &__frame
                    @include flex_start()
                    gap: rem(2)

            &__text
                padding-top: rem(7)

        &__textarea
            margin-bottom: rem(8)
</style>
