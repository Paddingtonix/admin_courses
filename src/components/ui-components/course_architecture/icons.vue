<template>
	<div class="oil-architecture__icons" v-if="!edit.value">
		<template v-if="arrow">
			<svg
				:class="{ _disable: !arrow.down }"
				@click="moveState('Down')"
				class="oil-architecture__icons__child"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M12 4V20M12 20L18 14M12 20L6 14"
					stroke="#808E9D"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
			<svg
				:class="{ _disable: !arrow.up }"
				@click="moveState('Up')"
				class="oil-architecture__icons__child"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M12 20V4M12 4L6 10M12 4L18 10"
					stroke="#808E9D"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</template>
		<svg
			v-if="isEditable"
			@click="editActive(true)"
			class="oil-architecture__icons__child"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M11 4.00023H6.8C5.11984 4.00023 4.27976 4.00023 3.63803 4.32721C3.07354 4.61483 2.6146 5.07377 2.32698 5.63826C2 6.27999 2 7.12007 2 8.80023V17.2002C2 18.8804 2 19.7205 2.32698 20.3622C2.6146 20.9267 3.07354 21.3856 3.63803 21.6732C4.27976 22.0002 5.11984 22.0002 6.8 22.0002H15.2C16.8802 22.0002 17.7202 22.0002 18.362 21.6732C18.9265 21.3856 19.3854 20.9267 19.673 20.3622C20 19.7205 20 18.8804 20 17.2002V13.0002M7.99997 16.0002H9.67452C10.1637 16.0002 10.4083 16.0002 10.6385 15.945C10.8425 15.896 11.0376 15.8152 11.2166 15.7055C11.4184 15.5818 11.5914 15.4089 11.9373 15.063L21.5 5.50023C22.3284 4.6718 22.3284 3.32865 21.5 2.50023C20.6716 1.6718 19.3284 1.6718 18.5 2.50022L8.93723 12.063C8.59133 12.4089 8.41838 12.5818 8.29469 12.7837C8.18504 12.9626 8.10423 13.1577 8.05523 13.3618C7.99997 13.5919 7.99997 13.8365 7.99997 14.3257V16.0002Z"
				stroke="#808E9D"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
		<svg
			v-show="isDeletable"
			class="oil-architecture__icons__child"
			@click="deleteBlock()"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M16 6V5.2C16 4.0799 16 3.51984 15.782 3.09202C15.5903 2.71569 15.2843 2.40973 14.908 2.21799C14.4802 2 13.9201 2 12.8 2H11.2C10.0799 2 9.51984 2 9.09202 2.21799C8.71569 2.40973 8.40973 2.71569 8.21799 3.09202C8 3.51984 8 4.0799 8 5.2V6M3 6H21M19 6V17.2C19 18.8802 19 19.7202 18.673 20.362C18.3854 20.9265 17.9265 21.3854 17.362 21.673C16.7202 22 15.8802 22 14.2 22H9.8C8.11984 22 7.27976 22 6.63803 21.673C6.07354 21.3854 5.6146 20.9265 5.32698 20.362C5 19.7202 5 18.8802 5 17.2V6"
				stroke="#808E9D"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	</div>
	<div class="oil-architecture__icons" v-else :style="{ opacity: 1 }">
		<svg
			:class="{ _disable: !fields_valid }"
			@click="editActive(false)"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M7.5 12L10.5 15L16.5 9M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
				stroke="#27AE63"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
		<svg
			@click="editActive(false)"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M15 9L9 15M9 9L15 15M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
				stroke="#F84544"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	</div>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";
import axios from "axios";

export default defineComponent({
	props: {
		delete_id: {
			type: Number,
			default: 0,
		},
		delete_type: {
			type: String,
			default: "",
		},
		arrow: {
			type: [Object, Boolean],
		},
		isEditable: {
			type: Boolean,
			default: true,
		},
		isDeletable: {
			type: Boolean,
			default: true,
		},
		fields_valid: {
			type: Boolean,
			default: false,
		},
	},
	setup(props, { emit }) {
		const deleteBlock = () => {
			axios
				.delete(`/admin/v1/${props.delete_type}/${props.delete_id}`)
				.then(() => {
					emit("delete-trigger", true);
				})
				.catch((err) => {
					console.log(err);
				});
		};

		const moveState = (direction: string) => {
			emit("move-trigger", direction);
		};

		const edit = reactive({
			value: false,
		});

		const editActive = (state: boolean) => {
			edit.value = state;
			emit("edit-trigger", state);
		};

		return {
			edit,
			deleteBlock,
			editActive,
			moveState,
		};
	},
});
</script>
<style lang="sass">
.oil-architecture
    &__icons
        gap: rem(16)
        @include flex_start()
        svg
            &._disable
                opacity: .4
                pointer-events: none
                user-select: none
                cursor: not-allowed
        // position: absolute
        // right: rem(24)
        // top:50%
        // transform: translateY(-50%)
        &__child
            cursor: pointer
            path
                transition: stroke .2s

            &._disable
                opacity: .4
                pointer-events: none
                user-select: none
                cursor: not-allowed

            &:hover
                &:not(:last-child)
                    path
                        stroke: $basic_primary

                &:last-child
                    path
                        stroke: $basic_error
</style>
