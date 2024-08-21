<template>
    <div class="tags-page__widget-wrapper">
        <SearchCmp
            :model-value="searchValue"
            class="tags-page__search"
            label="Поиск"
            @change-value="changeSearchValue($event)"
        />
        <FilterCmp />
        <BtnCmp
            class="tags-page__add-tag-btn"
            background_type="_tertiary"
            text="Добавить метку"
            @click="openModalAddTag()"
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

    <div class="tags-page__checkbox-wrapper">
        <CheckboxCmp :active="true" text="Переведено" />
        <CheckboxCmp :active="true" text="Не переведено" />
    </div>

    <TableHeadCmp
        class="tags-table-header"
        :name="'Раздел'"
        :status="'Метка'"
        :lang="'Перевод метки (RU)'"
    />

    <template v-for="tag in tagsData.tags" :key="tag.id">
        <TableRowCmp
            class="tags-table-row"
            :id="tag.id"
            :name="tag.name"
            :status="tag.headingName"
            :authors="tag.localizationRu"
            @click="
                openModalAddTag({
                    headingId: tag.headingId,
                    id: tag.id,
                    headingName: tag.headingName,
                    name: tag.name,
                    localizations: {
                        ru: tag.localizationRu,
                    },
                })
            "
        >
            <template v-slot:svg>
                <i
                    @click.stop="openDeleteModal(tag)"
                    class="tags-table-row__svg"
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
    <div
        v-if="tagsStore.$state.numberOfPages !== null"
        class="tags-page__pagination-wrapper"
    >
        <PaginationCmp
            v-if="
                tagsStore.$state.numberOfPages !== null &&
                tagsStore.$state.numberOfPages >= 0
            "
            @change-page="tagsStore.changePageTags($event)"
            :pages_count="tagsStore.$state.numberOfPages"
        />
        <SelectorCmp
            @select-value="changeTagsPerPage($event)"
            class="tags-page__selector"
            :label="`${list[0]} меток на стр.`"
            :list="list"
        />
        <span
            v-if="!tagsData.tags.length && !searchValue.length"
            class="no-headers"
        >
            Пока меток нет, но вы можете их добавить
        </span>

        <span
            v-else-if="searchValue && !tagsData.tags.length"
            class="no-headers"
        >
            К сожалению, по вашему запросу не найдено ни одной метки.<br />
            Попробуйте другие параметры поиска.
        </span>
    </div>
</template>

<script lang="ts" setup>
import { useStoreModal } from "~/src/stores/storeModal";
import { useTagsStore } from "~/src/stores/storeTags";
import type {
    IDeleteModal,
    IDeleteTag,
} from "~/src/ts-interface/storeModal.type";
import type { IResponseTags, ITags } from "~/src/ts-interface/storeTags.type";

const tagsStore = useTagsStore();

const tagsData = tagsStore.$state;

const searchValue = ref("");

const changeSearchValue = (text: string) => {
    searchValue.value = text;
    tagsStore.getTags({ text });
};

onMounted(() => {
    tagsStore.getAllHeadings();
    tagsStore.getTags({});
});

console.log(tagsStore.$state);

const modalStore = useStoreModal();

console.log(tagsData);

const openModalAddTag = (tagForm?: ITags) => {
    modalStore.$patch({
        label: "Добавить метку",
        activeModal: "form-tags",
        modalProps: {
            headers: tagsData.headings,
            tagForm,
            isFormChanged: false,
        },
    });
    modalStore.openModal();
};

const openDeleteModal = (data: IResponseTags) => {
    modalStore.$patch({
        label: "Удаление метки",
        activeModal: "delete-modal",
        modalProps: {
            data,
            modalComponent: "delete-tag",
            deleteFunction: tagsStore.deleteTag,
        } as unknown as IDeleteTag,
    } as unknown as IDeleteModal);
    console.log(data);

    modalStore.openModal();
};

const changeTagsPerPage = (val: number) => {
    tagsStore.changeTagsPerPage(val);
    tagsStore.getTags({ text: searchValue.value });
};

const list = [
    { text: 10, active: true },
    { text: 15, active: false },
    { text: 20, active: false },
    { text: 25, active: false },
];
</script>

<style lang="sass">
.tags-page
  &__widget-wrapper
      column-gap: rem(8)
      max-height: rem(40)
      margin-bottom: rem(8)

      display: grid
      grid-template-columns: 4fr 0fr 1fr
      align-items: center

      *
          max-height: rem(40)

  &__checkbox-wrapper
      display: flex
      column-gap: rem(16)

  &__search
      min-width: 100%

  &__add-tag-btn
      padding: rem(8) rem(8) rem(8) rem(16) !important

  &__pagination-wrapper
      position: relative
      display: flex
      justify-content: center
      margin-top: rem(16)

  &__selector
      position: absolute !important
      right: 0
      border: none !important
      *
          cursor: pointer

.tags-table-header
  .oil-head__cell
      padding: 0
      padding: rem(16) rem(8)
      &:nth-child(1)
          flex: 1

.tags-table-row
  cursor: pointer
  position: relative
  transition: all .2s ease-in-out
  &:hover
      background: $basic_light_blue
      .tags-table-row__svg
          opacity: 1


  .oil-row__cell
      padding: 0
      padding: rem(16) rem(8)

      &:nth-child(1)
          flex: 2
          a
              color: $basic_primary

      &:nth-child(2)
          flex: 1
          order: -1

      &:nth-child(3)
          flex: 3

  &__svg
      transition: opacity .2s ease-in
      opacity: 0
      position: absolute
      right: rem(16)
</style>
