<template>
	<div class="oil-row">
		<template v-for="field in fields">
			<div
				class="oil-row__cell"
				v-if="typeof field === 'string' && field.length"
				:key="field"
			>
				<!-- <a v-if="redirect" :href="`/course-setting?search=${id}`">{{field}}</a> -->
				<NuxtLink v-if="redirect" :to="{ path: '/course-setting', query: { search: id } }">{{field}}</NuxtLink>
				<span v-else-if="!redirect">{{ field }}</span>
			</div>
		</template>
		<slot name="svg" />
	</div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	props: {
		id: {
			type: Number,
			required: true,
		},
		redirect: {
			type: Boolean,
			default: true,
		},
		name: {
			type: String,
			default: "",
		},
		lastChangeDateTime: {
			type: String,
			default: "",
		},
		localizedName: {
			type: String,
			default: "",
		},
		status: {
			type: [String, Number],
			default: "",
		},
		authors: {
			type: String,
			default: "",
		},
		direction: {
			type: String,
			default: "",
		},
		lang: {
			type: String,
			default: "",
		},
		date_edit: {
			type: String,
			default: "",
		},
		end_date: {
			type: String,
			default: "",
		},
		isVisible: {
			type: Boolean,
			default: false,
		},
		count: {
			type: [String, Number],
			default: "",
		},
	},
	setup(props) {
		const fields = props;

		return {
			fields,
		};
	},
});
</script>
<style lang="sass">
.oil-row
    @include flex_center_spacing()
    border-bottom: rem(1) solid $disabled_basic
    &__cell
        padding: rem(8)

        &:nth-child(1)
            flex: 4
            *
                color: $basic_primary

        &:nth-child(2)
            flex: 2
            color: $basic_primary

        &:nth-child(3)
            flex: 3

        &:nth-child(4)
            flex: 3

        &:nth-child(5)
            flex: 1

        &:nth-child(6)
            flex: 2

        &:nth-child(7)
            flex: 2
</style>
