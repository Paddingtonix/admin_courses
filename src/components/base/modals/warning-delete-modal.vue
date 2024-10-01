<template>
    <div>
        <span class="delete-modal__text">
            Направление {{ modal_data.modalProps.data.localizedName }} используется на сайте, как единственное для следующих курсов:
        </span>
        <ul class="delete-modal__list">
            <li class="delete-modal__link" v-for="(courses, index) in modal_data.modalProps.related_courses" :key="index">
                <router-link
                    class="delete-modal__link"
                    :to="{ path: '/course-setting', query: { search: courses.courseId } }"
                    @click.native="closeModal"
                >
                    {{ courses.title }}
                </router-link>
            </li>
        </ul>
        <span class="delete-modal__text">Для того, чтобы удалить это направление, вам необходимо сменить его в настройках этих курсов, либо удалить сами курсы.</span>
        <BtnCmp
            :text="'Понятно'"
            @click="store_modal.closeModal()"
        />
    </div>
</template>

<script lang="ts" setup>
import { useStoreModal } from "~/src/stores/storeModal";
import type { IDeleteDirection } from "~/src/ts-interface/direction";

const store_modal = useStoreModal();
const modal_data = store_modal.$state as IDeleteDirection;

const closeModal = () => {
    store_modal.closeModal();
};

</script>

<style lang="sass" scoped>
.delete-modal
    &__list
        list-style: disc
        margin: rem(16)

    &__link
        color: $basic_primary

</style>
