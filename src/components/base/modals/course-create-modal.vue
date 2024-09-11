<template>
    <div :class="`oil-modal__course-create`">
        <svg width="88" height="88" viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_239_29489)">
                <circle cx="44" cy="44" r="44" fill="#27AE63" fill-opacity="0.05" />
                <circle cx="44" cy="44" r="32" fill="#27AE63" fill-opacity="0.1" />
                <path d="M36.5007 44.0007L41.5007 49.0007L51.5007 39.0007M60.6673 44.0007C60.6673 53.2054 53.2054 60.6673 44.0007 60.6673C34.7959 60.6673 27.334 53.2054 27.334 44.0007C27.334 34.7959 34.7959 27.334 44.0007 27.334C53.2054 27.334 60.6673 34.7959 60.6673 44.0007Z" stroke="#27AE63" stroke-width="3.33" stroke-linecap="round" stroke-linejoin="round" />
            </g>
            <defs>
                <clipPath id="clip0_239_29489">
                    <rect width="88" height="88" fill="white" />
                </clipPath>
            </defs>
        </svg>
        <span :class="`oil-modal__course-create__text`">Курс создан, можете приступать к наполнению</span>
        <BtnCmp
            :text="'Понятно'"
            @click="closeModal"
        />
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useStoreModal } from "~/src/stores/storeModal";

export default defineComponent({
	setup() {
		const storeModal = useStoreModal();

		const closeModal = () => {
			storeModal.closeModal();
		};

		return {
			storeModal,
			closeModal,
		};
	},
});
</script>
<style scoped lang="sass">
.oil-modal
    &__course-create
        @include flex_column_center
        gap: rem(32)
        width: rem(400)
        margin: 0 auto

        &__text
            align-self: flex-start
            display: flex
            flex-direction: column
            gap: rem(12)
</style>