<template>
  <div class="section-page">
    <div class="section-page__widget-wrapper">
      <SearchCmp class="section-page__search" label="Поиск"/>
      <BtnCmp class="tags-page__add-tag-btn" background_type="_tertiary" text="Добавить раздел">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.9974 4.1665V15.8332M4.16406 9.99984H15.8307" stroke="#176DC1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </BtnCmp>
    </div>
    <TableHeadCmp
    class="section-table-header"
    :name="'Раздел меток'"
    :status="'Кол-во меток'"
    :lang="'Описание раздела'"
  />

  <TableRowCmp class="section-table-row" name="sort" status="course" authors="5">
    <template v-slot:svg>
      <i class="section-table-row__svg">
        <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.3333 4.99984V4.33317C12.3333 3.39975 12.3333 2.93304 12.1517 2.57652C11.9919 2.26292 11.7369 2.00795 11.4233 1.84816C11.0668 1.6665 10.6001 1.6665 9.66667 1.6665H8.33333C7.39991 1.6665 6.9332 1.6665 6.57668 1.84816C6.26308 2.00795 6.00811 2.26292 5.84832 2.57652C5.66667 2.93304 5.66667 3.39975 5.66667 4.33317V4.99984M1.5 4.99984H16.5M14.8333 4.99984V14.3332C14.8333 15.7333 14.8333 16.4334 14.5608 16.9681C14.3212 17.4386 13.9387 17.821 13.4683 18.0607C12.9335 18.3332 12.2335 18.3332 10.8333 18.3332H7.16667C5.76654 18.3332 5.06647 18.3332 4.53169 18.0607C4.06129 17.821 3.67883 17.4386 3.43915 16.9681C3.16667 16.4334 3.16667 15.7333 3.16667 14.3332V4.99984" stroke="#FF7C7C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </i>
    </template>
  </TableRowCmp>

  <div class="tags-page__pagination-wrapper">
    <PaginationCmp :pages_count="10" />
    <SelectorCmp class="tags-page__selector" label="10 меток на стр." :list="list" />
  </div>
  </div>
</template>

<script lang="ts" setup>
const list = [
  { text: '10 меток на стр.' },
  { text: '20 меток на стр.' },
  { text: '30 меток на стр.' },
  { text: '40 меток на стр.' }
];
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