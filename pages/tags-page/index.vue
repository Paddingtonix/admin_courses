<template>
	<div class="tags-page__widget-wrapper">
		<SearchCmp
			:model-value="searchValue"
			class="tags-page__search"
			label="Поиск"
			@change-value="changeSearchValue($event)"
		/>
		<FilterCmp
			class="oil-tags__filter"
			v-if="tagsStore?.filters['Язык']"
			:filters="tagsStore.filters"
			@send-fiters="sendFilters($event)"
			@cancel-filters="sendFilters($event)"
		/>
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
		<CheckboxCmp
			:id="active_checkbox.translated.name"
			:active="active_checkbox.translated.isActive"
			text="Переведено"
			@set_value="setActiveCheckbox($event)"
		/>
		<CheckboxCmp
			:id="active_checkbox.not_translated.name"
			:active="active_checkbox.not_translated.isActive"
			@set_value="setActiveCheckbox($event)"
			text="Не переведено"
		/>
	</div>

	<TableHeadCmp
		class="tags-table-header"
		:name="'Раздел'"
		:status="'Метка'"
		:lang="'Перевод метки (RU)'"
		@sort="sortClick($event.field_key)"
	/>

	<template v-for="tag in tagsData.tags" :key="tag.id">
		<TableRowCmp
			class="tags-table-row"
			:id="tag.id"
			:redirect="false"
			:name="checkForFlooding(tag.name, 30)"
			:status="checkForFlooding(tag.headingName, 15)"
			:authors="checkForFlooding(tag.localizations.ru, 30)"
			@click="
				openModalAddTag(
					{
						headingId: tag.headingId,
						id: tag.id,
						headingName: tag.headingName,
						isTranslated: tag.isTranslated,
						name: tag.name,
						localizations: {
							...tag.localizations,
						},
					},
					true
				)
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
			:current-page="tagsData.currentPage"
			@change-page="goToPage($event)"
			:pages_count="tagsStore.$state.numberOfPages"
		/>
		<SelectorCmp
			class="tags-page__selector"
			@setValue="changeTagsPerPage($event)"
			listText="меток на стр."
			label="10 меток на стр."
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
import { useHeadersSort } from "~/src/utils/sort-generator";
import type {
	IDeleteModal,
	IDeleteTag,
} from "~/src/ts-interface/storeModal.type";

import type { ITags } from "~/src/ts-interface/storeTags.type";
import { checkForFlooding } from "~/src/utils/checkForFlooding";

const tagsStore = useTagsStore();

const tagsData = tagsStore.$state;

const tableHeadFields = ["name", "status", "lang"];

enum sortNames {
	name = "ascendingHeadingName",
	status = "ascendingLabelName",
	lang = "ascendingLocalization",
}
const { sortState, sortClick } = useHeadersSort(
	tableHeadFields,
	sortNames,
	//@ts-ignore
	tagsStore.setSort
);

const searchValue = ref("");

const active_checkbox = reactive({
	translated: { name: "translated", isActive: true },
	not_translated: { name: "not_translated", isActive: true },
});

const setActiveCheckbox = ({
	id,
	active,
}: {
	id: "translated" | "not_translated";
	active: boolean;
}) => {
	active_checkbox[id].isActive = active;
};

const setActiveCheckboxSort = (): boolean | null => {
	const isTranslatedActive = active_checkbox.translated.isActive;
	const isNotTranslatedActive = active_checkbox.not_translated.isActive;

	if (isTranslatedActive && !isNotTranslatedActive) {
		return true;
	}

	if (!isTranslatedActive && isNotTranslatedActive) {
		return false;
	}

	return null;
};

watch(active_checkbox, () => {
	tagsStore.$patch({
		isTranslated: setActiveCheckboxSort(),
	});

	tagsStore.getTags({ text: searchValue.value });
});

const changeSearchValue = (text: string) => {
	searchValue.value = text;
	tagsStore.getTags({ text });
};

onMounted(() => {
	tagsStore.getAllHeadings();
	tagsStore.getTags({});
	tagsStore.getFilters().then(() => {
		console.log("tags-store", tagsStore.filters);
	});
});

const modalStore = useStoreModal();

const openModalAddTag = (tagForm?: ITags, edit?: boolean) => {
	modalStore.$patch({
		label: !edit ? "Добавление метки" : "Редактирование метки",
		activeModal: "form-tags",
		modalProps: {
			headers: tagsData.headings,
			tagForm,
			isFormChanged: false,
			edit,
		},
	});
	modalStore.openModal();
};

const openDeleteModal = (data: ITags) => {
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

const changeTagsPerPage = (val: { value: number; type: string }) => {
	console.log(val);

	tagsStore.changeTagsPerPage(val.value);
	tagsStore.getTags({ text: searchValue.value });
};

const sendFilters = (filters: { Язык?: string[]; Разделы?: number[] }) => {
	const formedData = {
		headingIds: filters["Разделы"],
		languageId: filters["Язык"],
	};

	tagsStore.filterTags(formedData);
};

const list = [
	{ text: 10, active: true },
	{ text: 15, active: false },
	{ text: 20, active: false },
	{ text: 25, active: false },
];

const goToPage = (page: number) => {
	tagsStore.$patch((state) => {
		state.currentPage = page;
	});
	tagsStore.getTags({});
};

watch(tagsStore.$state, () => {
	if (
		!tagsStore.tags.length &&
		tagsStore.numberOfPages &&
		tagsStore.currentPage > tagsStore.numberOfPages
	) {
		tagsStore.$patch({
			currentPage: tagsData.currentPage - 1,
		});
		goToPage(tagsData.currentPage);
	}
});
</script>

<style lang="sass">
.tags-page
  &__widget-wrapper
      column-gap: rem(8)
      margin-bottom: rem(8)

      display: grid
      grid-template-columns: 4fr 0fr 1fr
      align-items: center

  .oil-tags__filter
        .oil-filter__body-wrapper
            top: -20%
            transform: translateY(100%)
        .oil-filter__body__frame
            max-height: rem(152)
            overflow-y: scroll
            overflow-x: hidden


  &__checkbox-wrapper
      display: flex
      column-gap: rem(16)

  &__search
      min-width: 100%

  &__add-tag-btn
      max-height: rem(40)
      padding: rem(8) rem(8) rem(8) rem(16) !important

  &__pagination-wrapper
      position: relative
      display: flex
      justify-content: center
      margin-top: rem(16)

  &__selector.oil-selector
      position: absolute
      border: none
      right: 0
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
          span
            color: $basic_text

      &:nth-child(3)
          flex: 3

  &__svg
      transition: opacity .2s ease-in
      opacity: 0
      position: absolute
      right: rem(16)
</style>
