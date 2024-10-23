<template>
	<div class="oil-filter">
		<div
			class="oil-filter__button"
			:class="{ _active: filter_frame.value }"
			@click="openFilter(true)"
		>
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
				<template v-for="(filter_block, idx) in filters_block.value" :key="idx">
					<span>{{ filter_block.title }}</span>
					<CheckboxCmp
						v-for="filter_state in filter_block.filters_values"
						:key="filter_state"
						:text="filter_state.translate ? filter_state.translate : filter_state.name"
						:id="filter_state.id"
						:active="filter_state.active" 
						@set_value="setCheckbox($event, idx)"
					/>
				</template>
				<div class="oil-filter__body__btns">
					<BtnCmp
						@click="cancelFilters"
						:background_type="'_secondary'"
						:text="'Сбросить'"
					/>
					<BtnCmp @click="setFilter" :text="'Применить'" />
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router' 

const props = defineProps({
	is_body_visible: {
		type: Boolean,
		default: false,
	},
	filters: {
		type: Array,
		default: () => [
			{
				filters_values: [] as any,
				title: '' as string
			}
		]
	},
	pressed_button: {
		type: Boolean,
		default: false,
	},
	isMarks: {
		type: Boolean,
		default: false,
	},
});

const router = useRouter() 
const route = useRoute() 


const filters_block = reactive({
	value: props.filters
})

const filter_frame = reactive({
	value: false as boolean,
});

const setCheckbox = (val: any, idx: number) => {    
    filters_block.value[idx]!.filters_values.find((field: { id: number; }) => field.id === val.id).active = val.active	
}

const setFilter = () => {
    console.log(filters_block.value.find(type => type.query === 'languageIds'));
    
	router.push({
		query: {
			...route.query,
			statuses: filters_block.value.find(type => type.query === 'statuses')?.filters_values.some(item => item.active) ? filters_block.value.find(type => type.query === 'statuses')?.filters_values
				.filter((item: { id: any }) => {
					if(item.active) {
						return item.name
					}
				})
				.map((item: { id: any }) => item.name )
				.join(",")
				: undefined,
                
			languageIds: filters_block.value.find(type => type.query === 'languageIds')?.filters_values.some(item => item.active) ? filters_block.value.find(type => type.query === 'languageIds')?.filters_values
				.filter((item: { id: any }) => {
					if(item.active) {
						return item.name
					}
				})
				.map((item: { id: any }) => item.name )
				.join(",")
				: undefined,

			directionIds: filters_block.value.find(type => type.query === 'directionIds')?.filters_values.some(item => item.active) ? filters_block.value.find(type => type.query === 'directionIds')?.filters_values
				.filter((item: { id: any }) => {
					if(item.active) {
						return item.name
					}
				})
				.map((item: { id: any }) => item.name )
				.join(",")
				: undefined,

            section: filters_block.value.find(type => type.query === 'section')?.filters_values.some(item => item.active) ? filters_block.value.find(type => type.query === 'section')?.filters_values
				.filter((item: { id: any }) => {
					if(item.active) {
						return item.name
					}
				})
				.map((item: { id: any }) => item.name )
				.join(",")
				: undefined,
		} 
	})
}

const cancelFilters = () => {	
	router.push({ query: {
		...route.query,
		statuses: undefined,
		languageIds: undefined,
		directionIds: undefined,
	} });
}

const openFilter = (state: boolean) => {
	filter_frame.value = state;
}

const syncCheckboxesWithUrl = () => {
  	const query = route.query

  	filters_block.value.forEach(filter_block => {
		const query_key = filter_block.query

		const active_values = (query[query_key] || '').split(',')

		filter_block.filters_values.forEach(filter_value => {
			filter_value.active = active_values.includes(filter_value.name)
    	})
  	})
};

watch(() => props.filters, () => {
	filters_block.value = props.filters

	syncCheckboxesWithUrl()
	
})

</script>
<style lang="sass">
.oil-filter
    z-index: 1
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

        &._active
            background-color: $light_primary
            span
                color: $basic_white

            svg path
                stroke: $basic_white

    &__body-wrapper
        position: absolute
        background-color: $basic_white
        top: rem(-180)
        right: 0
        width: auto
        box-shadow: 0px 8px 18px -6px rgba(24, 39, 75, 0.12), 0px 12px 42px -4px rgba(24, 39, 75, 0.12)

    &__body
        padding: rem(32)
        @include flex_column()
        height: max-content
        gap: rem(24)

        .oil-checkbox
            width: rem(347)
            &__text
                font-size: rem(14)
                white-space: nowrap
                overflow: hidden
                text-overflow: ellipsis

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
