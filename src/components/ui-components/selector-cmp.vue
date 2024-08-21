<template>
	<div
		class="oil-selector"
		@click="openList"
		:class="{ '_error-frame': error }"
	>
		<div class="oil-selector__chooses">
			<label v-if="!choosesVariable">{{ label }}</label>
			<span v-if="choosesVariable"
				>{{ choosesVariable }} {{ listText }}</span
			>
			<svg
				:class="{ '_active-list': listOpened }"
				class="oil-selector__chooses__chevron"
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 20 20"
				fill="none"
			>
				<path
					d="M5 7.5L10 12.5L15 7.5"
					stroke="#B6C2D0"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</div>
		<div class="oil-selector__list" v-if="listOpened">
			<span
				v-for="(listItem, idx) in list"
				:key="idx"
				@click="selectValue(listItem.text)"
				>{{ listItem.text }} {{ listText }}</span
			>
		</div>
		<div class="oil-selector__message" v-if="error">
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
			<span>{{ error }}</span>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, type PropType } from "vue";
import type { Selector } from "~/src/ts-interface/create-course-form";

export default defineComponent({
	props: {
		list: {
			type: Array as PropType<Selector[]>,
			default: () => [],
		},
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
		listText: {
			type: String,
			default: "",
		},
	},
	setup(props, { emit }) {
		const listOpened = ref(false);
		const choosesVariable = ref<string | number>("");

		const openList = () => {
			listOpened.value = !listOpened.value;
		};

		const selectValue = (val: string | number) => {
			choosesVariable.value = val;
			emit("setValue", {
				value: choosesVariable.value,
				type: props.type,
			});
		};

		return {
			listOpened,
			choosesVariable,
			openList,
			selectValue,
		};
	},
});
</script>

<style lang="sass" scoped>
.oil-selector
    padding: rem(16) rem(36) rem(16) rem(16)
    border: rem(1) solid $light_gray
    border-radius: rem(8)
    background-color: $basic_white
    position: relative
    cursor: pointer
    &__chooses
        &__chevron
            position: absolute
            right: rem(18)
            top: 50%
            transform: translateY(-40%)
            transition: all .2s
            span
                font-size: rem(24)
                line-height: 150%

            &._active-list
                transform: rotate(-180deg) translateY(40%)

        label
            color: #9AA7BB
            cursor: pointer

    &__list
        position: absolute
        left: 0
        overflow-y: auto
        top: rem(60)
        padding: rem(8) rem(16)
        width: 100%
        max-height: rem(200)
        border: rem(1) solid $light_gray
        border-radius: rem(8)
        background-color: $basic_white
        z-index: 10
        @include flex_column()
        span
            cursor: pointer
            transition: color .2s
            height: rem(24)
            display: flex
            align-items: center
            &:hover
                color: $light_primary

    &:hover
        border-color: $basic_gray
        .oil-selector__chooses__chevron
            path
                stroke: $basic_gray

    &__message
        @include position_message_input()
        span
            color: $basic_error

    &._error-frame
        border-color: $basic_error
        background-color: #F845440D
        label
            color: $basic_error

        .oil-selector__chooses__chevron
            path
                stroke: $basic_error
</style>
