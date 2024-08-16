<template>
	<div class="oil-selector" @click="openList">
		<div class="oil-selector__chooses">
			<label v-if="!chooses_variable">{{ label }}</label>

			<span v-else-if="!objectList.length"
				>{{ chooses_variable }} {{ tabText }} на стр.</span
			>
			<span v-else> {{ chooses_variable }} </span>
			<svg
				:class="{ '_active-list': list_openned.value }"
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

		<div
			class="oil-selector__list"
			v-if="list_openned.value && list.length"
		>
			<span
				v-for="(list_item, idx) in list"
				:key="idx"
				@click="selectValue(list_item)"
				>{{ list_item }} {{ tabText }} на стр.</span
			>
		</div>
		<div
			class="oil-selector__list"
			v-else-if="list_openned.value && objectList.length"
		>
			<span
				v-for="(list_item, idx) in objectList"
				:key="idx"
				@click="
					() => {
						selectObjectValue(list_item.name),
							getSelectorData(list_item);
					}
				"
				>{{ list_item.name }}</span
			>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent, reactive, type PropType } from "vue";

export default defineComponent({
	props: {
		list: {
			type: Array<number>,
			default: [],
		},
		label: {
			type: String,
			default: "label",
		},
		tabText: {
			type: String,
			default: "меток",
		},
		objectList: {
			type: Array as PropType<Array<{ name: string; id: number }>>,
			default: [],
		},
	},
	emits: ["select-value", "select-object"],
	setup(props, { emit }) {
		const list_openned = reactive({
			value: false,
		});

		const chooses_variable = ref<string | number>("");

		const openList = () => {
			list_openned.value = !list_openned.value;
		};

		const selectValue = (val: number | string) => {
			chooses_variable.value = val;
			emit("select-value", val);
		};

		const selectObjectValue = (val: string) => {
			chooses_variable.value = val;
			emit("select-value", val);
		};

		const getSelectorData = (data: object) => {
			emit("select-object", data);
		};

		return {
			list_openned,
			chooses_variable,
			openList,
			selectValue,
			selectObjectValue,
			getSelectorData,
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
        gap: rem(8)
        span
            cursor: pointer
            transition: color .2s
            &:hover
                color: $light_primary
</style>
