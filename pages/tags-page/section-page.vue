<template>
    <!-- <button
		style="display: absolute; top: 0; left: 0; border: solid black 2px"
		@click="startAbomination"
	>
		START ABOMINATION!
	</button> -->
    <div class="section-page">
        <div class="section-page__widget-wrapper">
            <SearchCmp
                :modelValue="searchValue"
                class="section-page__search"
                label="Поиск"
                @change-value="updateSearchValue($event)"
            />

            <BtnCmp
                class="tags-page__add-tag-btn"
                background_type="_tertiary"
                text="Добавить раздел"
                @click="openAddModalHeader"
            >
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M9.9974 4.1665V15.8332M4.16406 9.99984H15.8307"
                        stroke="#176DC1"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </BtnCmp>
        </div>
        <template v-if="headersStore.headings.length">
            <TableHeadCmp
                class="section-table-header"
                :status="'Раздел меток'"
                :name="'Описание раздела'"
                :lang="'Кол-во меток'"
            />
            <template
                v-for="data in headersStore.$state.headings"
                :key="data.id"
            >
                <TableRowCmp
                    :id="data.id"
                    class="section-table-row"
                    :name="data.name"
                    :authors="data.description"
                    :status="data.labelsCount || '0'"
                    @click="
                        openAddModalHeader({
                            name: data.name,
                            description: data.description,
                            id: data.id,
                        })
                    "
                >
                    <template v-slot:svg>
                        <i
                            class="section-table-row__svg"
                            @click.stop="openModalDelete(data)"
                        >
                            <svg
                                width="18"
                                height="20"
                                viewBox="0 0 18 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M12.3333 4.99984V4.33317C12.3333 3.39975 12.3333 2.93304 12.1517 2.57652C11.9919 2.26292 11.7369 2.00795 11.4233 1.84816C11.0668 1.6665 10.6001 1.6665 9.66667 1.6665H8.33333C7.39991 1.6665 6.9332 1.6665 6.57668 1.84816C6.26308 2.00795 6.00811 2.26292 5.84832 2.57652C5.66667 2.93304 5.66667 3.39975 5.66667 4.33317V4.99984M1.5 4.99984H16.5M14.8333 4.99984V14.3332C14.8333 15.7333 14.8333 16.4334 14.5608 16.9681C14.3212 17.4386 13.9387 17.821 13.4683 18.0607C12.9335 18.3332 12.2335 18.3332 10.8333 18.3332H7.16667C5.76654 18.3332 5.06647 18.3332 4.53169 18.0607C4.06129 17.821 3.67883 17.4386 3.43915 16.9681C3.16667 16.4334 3.16667 15.7333 3.16667 14.3332V4.99984"
                                    stroke="#FF7C7C"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                        </i>
                    </template>
                </TableRowCmp>
            </template>
            <template v-if="headersStore.numberOfPages !== null">
                <div class="section-page__pagination-wrapper">
                    <PaginationCmp
                        v-if="
                            headersStore.numberOfPages !== null &&
                            headersStore.numberOfPages >= 0
                        "
                        :currentPage="headingsData.currentPage"
                        :pages_count="headingsData.numberOfPages"
                        @change-page="goToPage($event)"
                    />
                    <MarkSelector
                        @select-value="changeSelectorValue($event)"
                        tab-text="разделов"
                        class="tags-page__selector"
                        label="10 разделов на стр."
                        :list="list"
                    />
                </div>
            </template>
        </template>
        <template
            v-else-if="
                !headersStore.headings.length &&
                !searchValue &&
                !headersStore.numberOfPages
            "
        >
            <span class="no-headers">
                Пока нет разделов, но вы можете их добавить
            </span>
        </template>
        <template v-else-if="searchValue && !headersStore.headings.length">
            <span class="no-headers">
                К сожалению, по вашему запросу не найдено ни одного раздела.<br />
                Попробуйте другие параметры поиска.
            </span>
        </template>
    </div>
</template>

<script lang="ts" setup>
import { useStoreModal } from "~/src/stores/storeModal";
import { useHeadersStore } from "~/src/stores/storeSections";
import type { IHeading } from "~/src/ts-interface/storeTags.type";

const list = [10, 15, 20, 25];

const storeModal = useStoreModal();

const headersStore = useHeadersStore();

const headingsData = headersStore.$state;

const searchValue = ref("");

const updateSearchValue = (value: string) => {
    searchValue.value = value;

    headersStore.getHeadings({ text: value });
};

watch(headersStore.$state, () => {
    if (
        !headingsData.headings.length &&
        headingsData.numberOfPages &&
        headingsData.currentPage > headingsData.numberOfPages
    ) {
        headersStore.$patch({
            currentPage: headingsData.currentPage - 1,
        });
        goToPage(headingsData.currentPage);
    }
});

const openModalDelete = (data: IHeading) => {
    console.log(data);

    storeModal.$patch({
        activeModal: "delete-modal",
        label: "Удаление раздела",
        modalProps: {
            data: data,
            modalComponent: "delete-section",
            deleteFunction: headersStore.deleteItem,
        },
    });
    storeModal.openModal();
};

const openAddModalHeader = ({ name = "", description = "", id = 0 }) => {
    storeModal.$patch({
        activeModal: "form-sections",
        label: !name.length ? "Создание раздела" : "Редактирование раздела",
        modalProps: {
            name,
            description,
            edit: !!name.length,
            id,
            isFieldChanged: false,
        },
    });
    storeModal.openModal();
};

const changeSelectorValue = (value: number) => {
    headersStore.$patch((state) => {
        state.nHeadingsPerPage = value;
    });
    headersStore.getHeadings({});
};

const goToPage = (page: number) => {
    headersStore.$patch((state) => {
        state.currentPage = page;
    });
    headersStore.getHeadings({});
};

const startAbomination = () => {
    headersStore.startAbomination();
};

onMounted(() => {
    headersStore.getHeadings({});
});
</script>

<style lang="sass">
.no-headers
    margin-top: rem(24)
    display: block
.section-page
    &__pagination-wrapper
        display: flex
        justify-content: center
        position: relative
        min-height: rem(20)
        margin-top: rem(16)

    &__widget-wrapper
        display: grid
        grid-template-columns: 4fr 1fr
        column-gap: rem(8)
        *
            max-height: rem(40)

    &__search
        min-width: 100%

    .section-table-header
        .oil-head__cell
            padding: 0
            padding: rem(16) rem(8)
            &:nth-child(1)
                flex: 2
                order: 2
            &:nth-child(2)
                flex: 1
                order: 1
            &:nth-child(3)
                flex: 1
                order: 3

    .section-table-row
        cursor: pointer
        position: relative
        transition: all .2s ease-in-out

        &:hover
            background: $basic_light_blue
            .section-table-row__svg
                opacity: 1

        &__svg
            transition: opacity .2s ease-in
            opacity: 0
            position: absolute
            right: rem(16)

        .oil-row__cell
            padding: 0
            padding: rem(16) rem(8)

            &:nth-child(1)
                flex: 1
                order: 0
                a
                    color: $basic_primary

            &:nth-child(2)
                flex: 1
                order: 2

            &:nth-child(3)
                flex: 2
                oreder: 1
</style>
