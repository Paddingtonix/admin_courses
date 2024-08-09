<template>
  <button style="display: absolute; top: 0; left: 0; border: solid black 2px;" @click="startAbomination">START ABOMINATION!</button>
  <div class="section-page">
		<div class="section-page__widget-wrapper">
			<SearchCmp 
			:modelValue="searchValue" 
			class="section-page__search" 
			label="Поиск" 
			@change-value="updateSearchValue($event)"/>

			<BtnCmp class="tags-page__add-tag-btn" background_type="_tertiary" text="Добавить раздел" @click="openModalSection">
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M9.9974 4.1665V15.8332M4.16406 9.99984H15.8307" stroke="#176DC1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
			</BtnCmp>
		</div>
		<TableHeadCmp
		class="section-table-header"
		:status="'Раздел меток'"
		:name="'Описание раздела'"
		:lang="'Кол-во меток'"
  		/>
	<template v-for="data in headersStore.$state.headings" :key="data.id">
		<TableRowCmp 
		class="section-table-row" 
		:name="data.name" 
		:authors="data.description" 
		:status="data.labelsCount || '0'"
		@click="setHeaderData(data)"
		>
			<template v-slot:svg>
				<i class="section-table-row__svg" @click.stop="openModalDelete(data)">
					<svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M12.3333 4.99984V4.33317C12.3333 3.39975 12.3333 2.93304 12.1517 2.57652C11.9919 2.26292 11.7369 2.00795 11.4233 1.84816C11.0668 1.6665 10.6001 1.6665 9.66667 1.6665H8.33333C7.39991 1.6665 6.9332 1.6665 6.57668 1.84816C6.26308 2.00795 6.00811 2.26292 5.84832 2.57652C5.66667 2.93304 5.66667 3.39975 5.66667 4.33317V4.99984M1.5 4.99984H16.5M14.8333 4.99984V14.3332C14.8333 15.7333 14.8333 16.4334 14.5608 16.9681C14.3212 17.4386 13.9387 17.821 13.4683 18.0607C12.9335 18.3332 12.2335 18.3332 10.8333 18.3332H7.16667C5.76654 18.3332 5.06647 18.3332 4.53169 18.0607C4.06129 17.821 3.67883 17.4386 3.43915 16.9681C3.16667 16.4334 3.16667 15.7333 3.16667 14.3332V4.99984" stroke="#FF7C7C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
				</i>
			</template>
		</TableRowCmp>
		</template>
			<template v-if="headersStore.$state.numberOfPages">
				<div class="tags-page__pagination-wrapper">
					<PaginationCmp :currentPage="headingsData.currentPage" :pages_count="headingsData.numberOfPages" @change-page="goToPage($event)"/>
					<SelectorCmp class="tags-page__selector" label="10 разделов на стр." :list="list" />
				</div>
			</template>
	</div>
		<Teleport to="body">
				<ModalCmp
					v-if="modalComponent === 'form-sections'"
					:modal-close="closeSectionsModal"
					:title="!headerData.id ? 'Добавление раздела' : 'Редактирование раздела'">
						<template v-slot:content>
							<FormsFormSections :close-modal="closeSectionsModal" :element-data="headerData"/>
						</template>
				</ModalCmp>

				<ModalCmp
					v-else
					:modal-close="closeDeleteModal"
					:title="modalDataToDelete.labelsCount ? 'Внимание!' : 'Удаление раздела'"
					>
						<template v-slot:content>
							<DeleteModal
							:deleteData="()=>{deleteSection(modalDataToDelete.id)}"
							:close-modal="closeDeleteModal"
							>
								<template v-slot:text="className">
									<span
									v-if="modalDataToDelete.labelsCount" 
									:class="className.class"
									>
										В выбранном разделе меток есть метки, которые удалятся автоматически, при удалении раздела.
									</span>
									<span :class="className.class">Вы уверены, что хотите удалить раздел {{ modalDataToDelete.name }}?</span>
								</template>
							</DeleteModal>
						</template>
					</ModalCmp>
		</Teleport>
	</template>

<script lang="ts" setup>
import { useStoreModal } from '~/src/stores/storeModal';
import { useHeadersStore } from '~/src/stores/storeSections';
import type { IHeading } from '~/src/ts-interface/storeTags.type';

const list = [
  { text: 10 },
  { text: 20 },
  { text: 30 },
  { text: 40 }
];

const modalStore = useStoreModal();

const headersStore = useHeadersStore();

const headingsData = headersStore.$state;

const searchValue = ref('');

const modalComponent = ref('form-sections'); 

const modalDataToDelete = ref({} as IHeading);

const headerData = ref({} as IHeading);

const setHeaderData = (data: IHeading) => {
    headerData.value = Object.create(data);
    openModalSection();
}

const updateSearchValue = (value: string) => {
    searchValue.value = value;

	headersStore.searchHeading(searchValue.value);
}

const closeDeleteModal = () => {
    modalDataToDelete.value = {} as IHeading;
    modalStore.triggerModal();
}

const closeSectionsModal = () => {
    headerData.value = {} as IHeading;
    modalStore.triggerModal();
}

const openModalSection = () => {
  modalComponent.value = 'form-sections';
  modalStore.triggerModal();
}

const openModalDelete = (data: IHeading) => {
    modalComponent.value = 'delete-modal';
	modalDataToDelete.value = data;
    modalStore.triggerModal();
}

const deleteSection = (id: number) => {
	console.log("clicked!");
	
	headersStore.deleteHeading(id)
	.then(()=>{
		closeDeleteModal();
	})
}

const goToPage = (page: number) => {
  headersStore.getHeadings({page});
  headersStore.$patch((state) => {
    state.currentPage = page
  })
}

const startAbomination = () => {
  headersStore.startAbomination();
}

onMounted(()=>{
  headersStore.getHeadings({});
})

</script>

<style lang="sass">
.section-page
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