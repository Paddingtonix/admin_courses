<template>
	<div
		class="oil-checkbox"
		@click="
			setCheckboxValue({
				active: active,
				id: id ? id : 0,
			})
		"
	>
		<div
			class="oil-checkbox__field"
			:class="{
				_active: $props.active,
				_checked_dis: $props.checked_disable,
				_unchecked_dis: $props.unchecked_disable,
			}"
		>
			<svg
				v-if="$props.active"
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				viewBox="0 0 16 16"
				fill="none"
			>
				<path
					d="M6.0001 10.7799L3.2201 7.9999L2.27344 8.93989L6.0001 12.6666L14.0001 4.66656L13.0601 3.72656L6.0001 10.7799Z"
					fill="white"
				/>
			</svg>
			<svg
				v-if="$props.checked_disable"
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				viewBox="0 0 16 16"
				fill="none"
			>
				<path
					d="M6.0001 10.7799L3.2201 7.9999L2.27344 8.93989L6.0001 12.6666L14.0001 4.66656L13.0601 3.72656L6.0001 10.7799Z"
					fill="#5B6C7B"
				/>
			</svg>
		</div>
		<span class="oil-checkbox__text">{{ $props.text }}</span>
	</div>
</template>
<script lang="ts">
import { defineComponent, type PropType } from "vue";

export default defineComponent({
	props: {
		text: {
			type: String,
			default: "text",
		},
		active: {
			type: Boolean as PropType<boolean>,
			default: false,
		},
		id: {
			type: [Number, String],
			default: 0,
		},
		checked_disable: {
			type: Boolean,
			default: false,
		},
		unchecked_disable: {
			type: Boolean,
			default: false,
		},
	},
	setup(props, { emit }) {
        console.log("Props:", props);
		const setCheckboxValue = (obj: { id: number; active: boolean }) => {
            console.log("Checkbox Clicked:", obj);
			switch (obj.active) {
				case false:
					emit("set_value", { id: obj.id, active: true });
					break;
				case true:
					emit("set_value", { id: obj.id, active: false });
					break;
				default:
					break;
			}
		};

		return {
			setCheckboxValue,
		};
	},
});
</script>
<style scoped lang="sass">
.oil-checkbox
    display: flex
    gap: rem(8)
    align-items: center
    cursor: pointer
    &__field
        display: flex
        align-items: center
        justify-content: center
        border: 1px solid $basic_primary
        min-width: rem(20)
        height: rem(20)
        border-radius: rem(4)
        transition: border .1s
        &._active
            background-color: $basic_primary
            border: 1px solid $basic_primary

        &._checked_disable
            background-color: $light_gray
            border: 1px solid $light_gray

        &._unchecked_disable
            border: 1px solid $light_gray

    &__text
        font-weight: 400
        line-height: rem(24)
</style>
