<template>
	<div class="oil-textarea" :class="{ '_error-frame': error.length }">
		<label
			class="oil-textarea__label"
			:class="[
				'oil-textarea__label',
				{ _fill: textarea_value && textarea_value.length },
			]"
			>{{ label }}</label
		>
		<textarea
			:maxlength="max_length"
			v-model="textarea_value"
			:type="type"
			@input="setValue"
		/>
		<div class="oil-textarea__message" v-if="error.length">
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
import { defineComponent } from "vue";

export default defineComponent({
	props: {
		label: {
			type: String,
			default: "label",
		},
		error: {
			type: String,
			default: "",
		},
		type: {
			type: String,
			default: "",
		},
		modelValue: {
			type: String,
			default: "",
		},
		max_length: {
			type: Number,
			default: 550,
		},
	},
	emits: ["set_textarea"],

	setup(props, { emit }) {
		const { modelValue } = toRefs(props);

		const textarea_value = ref<string>(modelValue.value || "");

		watch(modelValue, (newValue) => {
			textarea_value.value = newValue ?? "";
		});

		const setValue = () => {
			emit("set_textarea", {
				value: textarea_value.value,
				type: props.type,
			});
		};

		return {
			textarea_value,
			setValue,
		};
	},
});
</script>
<style lang="sass">
.oil-textarea
    border: rem(1) solid $light_gray
    border-radius: rem(8)
    height: rem(216)
    position: relative
    padding: rem(26) rem(16)

    &:focus-within
        label
            &:not(._fill)
                transform: translateY(rem(-8))

    &__message
        @include position_message_input()
        span
            color: $basic_error

    &._error-frame
        border-color: $basic_error
        background-color: #F845440D
        label
            color: $basic_error

        input::placeholder
            color: $basic_error

        &:hover
            border-color: $basic_error

    textarea
        resize: none
        height: 100%
        width: 100%
        font-size: rem(16)

    &__label
        color: $light_gray
        position: absolute
        pointer-events: none
        user-select: none
        top: rem(16)
        transition: all .2s
        left: rem(16)

        &._fill
            top: rem(-8)
            background-color: white
            font-size: rem(16)
            color: $light_primary
</style>
