<template>
	<div
		class="oil-checkbox"
        :class="{ '_error-frame': error.length }"
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
        <div class="oil-checkbox__message" v-if="error.length">
            <i>
                <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M5.99988 4.50012V6.50012M5.99988 8.50012H6.00488M5.30754 1.94598L1.19509 9.04929C0.966991 9.44328 0.85294 9.64028 0.869797 9.80196C0.884499 9.94299 0.958384 10.0711 1.07306 10.1545C1.20454 10.2501 1.43217 10.2501 1.88744 10.2501H10.1123C10.5676 10.2501 10.7952 10.2501 10.9267 10.1545C11.0414 10.0711 11.1153 9.94299 11.13 9.80196C11.1468 9.64028 11.0328 9.44328 10.8047 9.04929L6.69222 1.94598C6.46493 1.55339 6.35129 1.3571 6.20303 1.29118C6.0737 1.23367 5.92606 1.23367 5.79673 1.29118C5.64846 1.3571 5.53482 1.55339 5.30754 1.94598Z"
                        stroke="#F84544"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </i>
            <span v-if="error.length">{{ error }}</span>
        </div>
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
        error: {
            type: String,
            default: "",
        }
	},
	setup(props, { emit }) {
		const setCheckboxValue = (obj: { id: number; active: boolean }) => {
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

    &__message
        @include flex_center()
        position: absolute
        margin-top: rem(48)
        gap: rem(4)
        font-size: rem(12)
        span
            color: $basic_error

    &._error-frame
        .oil-checkbox__field
            border-color: $basic_error
        .oil-checkbox__text
            color: $basic_error

        label
            color: $basic_error

        input::placeholder
            color: $basic_error

        &:hover
            border-color: $basic_error
</style>