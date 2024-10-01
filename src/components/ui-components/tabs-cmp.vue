<template>
	<div
		class="oil-tabs"
		:class="{ _active: active === id }"
		@click="selectTab(id)"
	>
		<span class="oil-tabs__text">{{ text }}</span>
	</div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	props: {
		text: {
			type: String,
			default: "text",
		},
		id: {
			type: Number,
			default: 1,
		},
		active: {
			type: Number,
			default: 1,
		},
	},
	setup(props, { emit }) {
		const selectTab = (tab_id: number) => {
			emit("select-tab", tab_id);
		};

		return {
			selectTab,
		};
	},
});
</script>
<style scoped lang="sass">
.oil-tabs
    cursor: pointer
    transition: color .5s
    color: $basic_gray
    font-weight: 700
    font-size: 16px
    line-height: 24px
    &:not(&._active)
        &:hover
            // color: $hover-blue

        &:active
            // color: $text-color

        &:after
            display: block
            position: absolute
            top: 32px
            left: 0
            width: 0
            height: 2px
            // background-color: $btn-background
            content: ""
            transition: width 0.3s

        &:hover:after
            width: 100%
            left: 0
            right: auto

        &:not(&:hover)
            &::after
                right: 0
                left: auto

    &__text
        color: $basic_gray

    &._active
        padding-bottom: 8px
        border-bottom: 2px solid $basic_primary
        span 
            color: $basic_primary

</style>
