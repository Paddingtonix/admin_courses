<template>
	<div class="oil-calendar">
		<VDatePicker v-model="date" :popover="popover" :masks="masks">
			<template #default="{ inputValue, inputEvents }">
				<InputCmp
					:error="error"
					:date_calendar="inputValue"
					:placeholder="'ДД.ММ.ГГ'"
					@set_value="handleSetValue"
				/>
				<svg
					v-on="inputEvents"
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 20 20"
					fill="none"
				>
					<path
						d="M17.5 8.33268H2.5M13.3333 1.66602V4.99935M6.66667 1.66602V4.99935M6.5 18.3327H13.5C14.9001 18.3327 15.6002 18.3327 16.135 18.0602C16.6054 17.8205 16.9878 17.4381 17.2275 16.9677C17.5 16.4329 17.5 15.7328 17.5 14.3327V7.33268C17.5 5.93255 17.5 5.23249 17.2275 4.69771C16.9878 4.2273 16.6054 3.84485 16.135 3.60517C15.6002 3.33268 14.9001 3.33268 13.5 3.33268H6.5C5.09987 3.33268 4.3998 3.33268 3.86502 3.60517C3.39462 3.84485 3.01217 4.2273 2.77248 4.69771C2.5 5.23249 2.5 5.93255 2.5 7.33268V14.3327C2.5 15.7328 2.5 16.4329 2.77248 16.9677C3.01217 17.4381 3.39462 17.8205 3.86502 18.0602C4.3998 18.3327 5.09987 18.3327 6.5 18.3327Z"
						stroke="#B6C2D0"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</template>
		</VDatePicker>
	</div>
</template>
<script lang="ts">
import { defineComponent, type PropType } from "vue";

export default defineComponent({
	props: {
		input_value: {
			type: String as unknown as PropType<Date | null>,
			default: null,
		},
		error: {
			type: String,
			default: "",
		},
	},
	emits: ["update-date"],
	setup(_, { emit }) {
		const init_date = ref(_.input_value);

		const date = ref<number | null | Date>(init_date.value);

		const popover = ref({
			visibility: "click",
		});

		const masks = ref({
			input: "DD.MM.YY",
		});

		const handleSetValue = (value: {
			value: string | number;
			type: string;
		}) => {
			console.log("clicked!");

			console.log("calendar-change", value.value);

			emit("update-date", value.value);
		};

		watch(date, (newDate) => {
			if (newDate) {
				emit("update-date", newDate);
			}
		});

		return {
			date,
			popover,
			masks,
			handleSetValue,
		};
	},
});
</script>

<style scoped lang="sass">
.oil-calendar
    position: relative
    cursor: pointer
    svg
        position: absolute
        width: 100%
        height: 100%
        top: rem(0)
        cursor: pointer
        padding: rem(10) rem(88) rem(10) rem(0)
        &:hover
            path
                transition: stroke .2s
                stroke: #398BDB

    &:hover
        .oil-input
            transition: border-color .2s
            border-color: $basic_gray

    .oil-input
        cursor: pointer
        height: rem(40)
        width: rem(136)
        padding: rem(0) rem(16) rem(0) rem(44)
</style>
