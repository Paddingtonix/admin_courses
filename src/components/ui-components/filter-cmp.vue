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
				<!-- <div
					v-for="(key, index) in filterKeys"
					class="oil-filter__body__frame"
				> -->
					<!-- <span class="oil-filter__body__frame__title">{{ key }}</span> -->	
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
						
					<!-- </div>
					<div>
						<span>{{ filters.languages ? 'Направления' : '' }}</span>
						<CheckboxCmp
							v-for="filter_state in filters.languages"
							:key="filter_state"
							:text="filter_state.name"
							:id="filter_state.id"
						/>
					</div>
					<div>
						<CheckboxCmp 
							v-for="filter_state in filters.statuses"
							:key="filter_state"
							:text="filter_state.name"
							:id="filter_state.id"
						/>
					</div> -->
					<!-- <template v-if="!isMarks || key !== 'Язык'">
						<CheckboxCmp
							v-for="(checkbox, idx) in filter_values.value[
								index
							][key]"
							:key="idx"
							:text="checkbox.name"
							:id="checkbox.id"
							:active="checkbox.active"
							@click="setActiveFilter(index, key, idx)"
						/>
					</template>
					<template v-else-if="key === 'Язык'">
						<RadioCmp
							v-for="(radio, idx) in filter_values.value[index][
								key
							]"
							:key="idx"
							:text="radio.name"
							:id="radio.id"
							:active="radio.active ? radio.id : ''"
							@click="setActiveFilter(index, key, idx)"
						/>
					</template> -->
				<!-- </div> -->
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

const router = useRouter() as useRouter
const route = useRoute() as useRoute

const emit = defineEmits(["send-fiters", "cancel-filters"]);

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
	router.push({
		query: {
			statuses: filters_block.value[0]!.filters_values.some(item => item.active) ? filters_block.value[0]!.filters_values
				.filter((item: { id: any }) => {
					if(item.active) {
						return item.name
					}
				})
				.map((item: { id: any }) => item.name )
				.join(",")
				: undefined,
			languageIds: filters_block.value[1]!.filters_values.some(item => item.active) ? filters_block.value[1]!.filters_values
				.filter((item: { id: any }) => {
					if(item.active) {
						return item.name
					}
				})
				.map((item: { id: any }) => item.name )
				.join(",")
				: undefined,
			directionIds: filters_block.value[2]!.filters_values.some(item => item.active) ? filters_block.value[2]!.filters_values
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

onMounted(() => {
	console.log(route);
	
	// nextTick(() => {
	// 	for(let i = 0; i < filters_block.value.length; i++) {
	// 		setCheckbox(i, )
	// 	}
	// })
})

// const filterKeys = Object.keys(filters || {});

// const mapFilters = (key: string) =>
// 	computed(() => filters[key].map((filter) => ({ ...filter, active: false })))
// 		.value;

// const getMappedFilters = () =>
// 	filterKeys.map((key) => ({
// 		[key]: mapFilters(key),
// 	})) as unknown as {
// 		[key: string]: {
// 			active: boolean;
// 			id: string | number;
// 			name: string;
// 			isRadio?: boolean;
// 		}[];
// 	}[];

// onMounted(() => {
// 	console.log(getMappedFilters());
// });

// const initialFilter_values = getMappedFilters();

// const filter_values = reactive({ value: initialFilter_values });

// const setActiveFilter = (index: number, key: string, id: number) => {
// 	if (filter_values !== undefined) {
// 		if (filter_values.value[index][key][id].isRadio) {
// 			filter_values.value[index][key].forEach((item) => {
// 				item.active = false;
// 			});
// 			filter_values.value[index][key][id].active = true;
// 		} else {
// 			filter_values.value[index][key]![id].active =
// 				!filter_values.value[index][key]![id].active;
// 		}
// 	}
// };

// const sendFilters = () => {
// 	const formData = () => {
// 		const result: { [key: string]: any } = {};

// 		for (const key in filterKeys) {
// 			result[filterKeys[key]] = Object.values(filter_values.value[key])
// 				.map((item) =>
// 					item.filter((filterItem) => filterItem.active)
// 				)[0]
// 				.map((item) => item.id);
// 		}

// 		return result;
// 	};
// 	const formedData = formData();
// 	emit("send-fiters", formedData);
// };

const cancelFilters = () => {
	emit("cancel-filters", []);
	// filter_values.value = getMappedFilters();
};

const openFilter = (state: boolean) => {
	filter_frame.value = state;
};
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
