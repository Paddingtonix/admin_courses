<template>
    <div class="oil-modal">
        <div class="oil-modal__container">
            <div
                class="oil-modal__container__header"
                v-if="modalData.label.length"
            >
                <span class="oil-modal__container__header__title">{{
                    modalData.label
                }}</span>
                <button
                    v-if="modalData.activeModal !== 'auth-modal'"
                    class="oil-modal__container__header__btn-close"
                    @click="storeModal.closeModal()"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <path
                            d="M18 6L6 18M6 6L18 18"
                            stroke="#808E9D"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </button>
            </div>
            <div class="oil-modal__container__content">
                <component :is="modalData.activeModal"></component>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { useStoreModal } from "@/src/stores/storeModal";
import authModal from "./auth-modal.vue";
import courseCreateModal from "./course-create-modal.vue";
import formTags from "../../ui-components/forms/form-tags.vue";
import formSections from "../../ui-components/forms/form-sections.vue";
import deleteModal from "./delete-modal.vue";
import directionModal from "./direction-modal.vue";
import developmentStatus from "./development-status.vue";
import archivedStatus from "./archived-status.vue";
import moderationStatus from "./moderation-status.vue";
import oneError from "./one-error.vue";
import someError from "./some-error.vue";
import outOfStockStatus from "./out-of-stock-status.vue";
import publishedStatus from "./published-status.vue";
import deleteCourse from "./delete-course.vue";
import warningDeleteModal from "./warning-delete-modal.vue"

export default defineComponent({
    setup() {
        const storeModal = useStoreModal();
        const modalData = reactive(storeModal.$state);

        onUnmounted(() => {
            storeModal.$reset();
        });

        return {
            storeModal,
            formTags,
            formSections,
            modalData,
        };
    },
    components: {
        "auth-modal": authModal,
        "course-create-modal": courseCreateModal,
        "form-tags": formTags,
        "form-sections": formSections,
        "delete-modal": deleteModal,
        "direction-modal": directionModal,
        "development-status": developmentStatus,
        "archived-status": archivedStatus,
        "moderation-status": moderationStatus,
        "one-error": oneError,
        "some-error": someError,
        "out-of-stock-status": outOfStockStatus,
        "published-status": publishedStatus,
        "delete-course": deleteCourse,
        "warning-delete-modal": warningDeleteModal
    },
});
</script>
<style scoped lang="sass">
.oil-modal
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: 900
    // &__container-auth
    //     width: auto
    //     height: auto
    //     padding: rem(56)
    //     box-shadow: rem(0) rem(8) rem(28) rem(-6) rgba(24, 39, 75, 0.12), rem(0) rem(18) rem(88) rem(-4) rgba(24, 39, 75, 0.14)
    //     border-radius: rem(24)
    //     background-color: $basic_white
    //     position: absolute
    //     top: 50%
    //     left: 50%
    //     transform: translate(-50%, -50%)

    &__container
        max-width: rem(580)
        height: auto
        box-shadow: rem(0) rem(8) rem(28) rem(-6) rgba(24, 39, 75, 0.12), rem(0) rem(18) rem(88) rem(-4) rgba(24, 39, 75, 0.14)
        border-radius: rem(24)
        background-color: $basic_white
        position: absolute
        top: 50%
        left: 50%
        transform: translate(-50%, -50%)
        overflow: hidden
        &__header
            width: 100%
            height: rem(76)
            padding: rem(24) rem(40)
            background-color: $basic_light_gray
            border: rem(1) solid $modal_border
            border-radius: rem(12) rem(12) 0 0
            @include flex_center_spacing
            &__btn-close
                cursor: pointer
                svg
                    path
                        transition: stroke .1s

                &:hover
                    svg
                        path
                            stroke: #5B6C7B

            &__title
                font-size: 20px
                font-weight: 700

        &__content
            width: auto
            height: auto
            padding: rem(32) rem(40) rem(40) rem(32)

    &__shadow
        position: absolute
        width: 100%
        height: 100vh
        z-index: 0
        opacity: 0.12
</style>
