<template>
	<div class="oil-filter">
		<div class="oil-filter__button" @click="openFilter(true)">
			<svg
				class="oil-filter__icon"
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 20 20"
				fill="none"
			>
				<path
					d="M2.5 6.6665L12.5 6.6665M12.5 6.6665C12.5 8.04722 13.6193 9.1665 15 9.1665C16.3807 9.1665 17.5 8.04722 17.5 6.6665C17.5 5.28579 16.3807 4.1665 15 4.1665C13.6193 4.1665 12.5 5.28579 12.5 6.6665ZM7.5 13.3332L17.5 13.3332M7.5 13.3332C7.5 14.7139 6.38071 15.8332 5 15.8332C3.61929 15.8332 2.5 14.7139 2.5 13.3332C2.5 11.9525 3.61929 10.8332 5 10.8332C6.38071 10.8332 7.5 11.9525 7.5 13.3332Z"
					stroke="#176DC1"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
			<div>
				<span class="oil-filter__button__text">Фильтры</span>
			</div>
		</div>
		<div class="oil-filter__body-wrapper">
			<div class="oil-filter__body" v-if="filter_frame.value">
				<svg
					@click="openFilter(false)"
					class="oil-filter__body__close"
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
				<div class="oil-filter__body__frame">
					<span class="oil-filter__body__frame__title">Статус</span>
					<CheckboxCmp
						v-for="(checkbox, idx) in filters.value.slice(0, 6)"
						:key="idx"
						:text="checkbox.text"
						:id="checkbox.id"
						:active="checkbox.active"
					/>
				</div>
				<div class="oil-filter__body__frame">
					<span class="oil-filter__body__frame__title">Язык</span>
					<CheckboxCmp
						v-for="(checkbox, idx) in filters.value.slice(7, 10)"
						:key="idx"
						:text="checkbox.text"
						:id="checkbox.id"
						:active="checkbox.active"
					/>
				</div>
				<div class="oil-filter__body__frame">
					<span class="oil-filter__body__frame__title"
						>Направления</span
					>
					<CheckboxCmp
						v-for="(checkbox, idx) in filters.value.slice(11)"
						:key="idx"
						:text="checkbox.text"
						:id="checkbox.id"
						:active="checkbox.active"
					/>
				</div>
				<div class="oil-filter__body__btns">
					<BtnCmp
						:background_type="'_secondary'"
						:text="'Сбросить'"
					/>
					<BtnCmp :text="'Применить'" />
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
const { is_body_visible } = defineProps({
	is_body_visible: {
		type: Boolean,
		default: false,
	},
	filters: {
		type: Object,
		default: {
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
		},
	},
});

const filter_frame = reactive({
	value: false as boolean,
});

const openFilter = (state: boolean) => {
	filter_frame.value = state;
};
</script>
<style lang="sass">
.oil-filter
    z-index: 99
    &__button
        padding: rem(8) rem(16)
        border: rem(1) solid $basic_primary
        border-radius: rem(8)
        @include flex_center_spacing()
        gap: rem(8)
        cursor: pointer
        &__text
            color: $basic_primary
            font-weight: bold

    &__body-wrapper
        position: fixed
        background-color: $basic_white
        top: -50%
        transform: translateY(60%)
        left: 75%
        width: auto
        box-shadow: 0px 8px 18px -6px rgba(24, 39, 75, 0.12), 0px 12px 42px -4px rgba(24, 39, 75, 0.12)


    &__body
        padding: rem(32)
        @include flex_column()
        height: max-content
        gap: rem(32)

        .oil-checkbox
            width: rem(347)
            &__text
                font-size: rem(14)

        &__frame
            position: relative
            gap: rem(12)
            @include flex_column()
            &__title
                font-weight: bold
                margin-bottom: rem(4)
                font-size: rem(14)

        &__btns
            @include flex_start()
            gap: rem(12)

        &__close
            position: absolute
            z-index: 1
            top: rem(24)
            right: rem(24)
            cursor: pointer
</style>
