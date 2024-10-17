<template>
	<div
		class="oil-architecture__btn"
		:class="{ 'oil-architecture__btn-special': isSpecial }"
	>
		<div v-if="!isSpecial" class="oil-architecture__btn__line"></div>
		<div @click="addBlock" class="oil-architecture__btn__create">
			<svg
				width="16"
				height="16"
				viewBox="0 0 16 16"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<rect width="16" height="16" fill="#F8FAFD" />
				<g clip-path="url(#clip0_5268_78470)">
					<path
						d="M7.9987 5.3335V10.6668M5.33203 8.00016H10.6654M14.6654 8.00016C14.6654 11.6821 11.6806 14.6668 7.9987 14.6668C4.3168 14.6668 1.33203 11.6821 1.33203 8.00016C1.33203 4.31826 4.3168 1.3335 7.9987 1.3335C11.6806 1.3335 14.6654 4.31826 14.6654 8.00016Z"
						stroke="#176DC1"
						stroke-width="1.33"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</g>
				<defs>
					<clipPath id="clip0_5268_78470">
						<rect width="16" height="16" fill="white" />
					</clipPath>
				</defs>
			</svg>
			<span>Добавить {{ btn_text }}</span>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
	props: {
		btn_text: {
			type: String,
			default: "Поле",
		},
		request_type: {
			type: Object,
			default: () => {},
		},
		query_params: {
			type: String,
			default: "",
		},
		block_id: {
			type: Number,
			default: 0,
		},
		isSpecial: {
			type: Boolean,
			default: false,
		},
		additional_type: {
			type: [Boolean, Object],
			default: false,
		},
	},
	setup(props, { emit }) {
		const addBlock = () => {
			const addFirstBlock = axios.post(
				`/admin/v1/${props.request_type.type}`,
				{
					[props.request_type.query]: props.block_id,
					...(props.request_type.testing_type
						? { category: props.request_type.testing_type }
						: {}),
				}
			);
			const addSecondBlock = axios.post(
				`/admin/v1/${props.additional_type.type}`,
				{
					[props.additional_type.query]: props.block_id,
					...(props.additional_type.testing_type
						? { category: props.additional_type.testing_type }
						: {}),
				}
			);
			if (props.additional_type) {
				axios.all([addFirstBlock, addSecondBlock]).then(
					axios.spread((...res) => {
						emit("request-trigger", true);
					})
				);
				return;
			}
			addFirstBlock.then(() => {
				emit("request-trigger", true);
			});
		};

		return {
			addBlock,
		};
	},
});
</script>
<style lang="sass">
.oil-architecture
    &__btn
        position: absolute
        z-index: 2
        width: 100%
        min-height: rem(16)
        left: 0
        cursor: pointer
        &__line
            position: absolute
            bottom: 0
            width: 100%
            height: rem(2)
            background-color: $light_primary

        &__create
            position: absolute
            @include flex_start()
            gap: rem(8)
            background-color: $basic_white
            padding: rem(8) rem(16)
            border: rem(1) solid $light_primary
            border-radius: rem(8)
            width: fit-content
            left: 50%
            top: rem(-5)
            transform: translateX(-50%)
            span
                font-weight: bold
                color: $light_primary

    &__btn-special
        position: relative
        top: rem(-80)
        left: 10%
        transform: translateX(-50%)
        span
            font-weight: bold
            color: $light_primary
</style>
