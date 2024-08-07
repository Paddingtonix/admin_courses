<template>
    <section class="oil-container">
        <div class="oil-page direction-page">
            <h4 class="direction-page__header">Направления курсов</h4>
            <PillCmp
                class="direction-page__pill"
                v-for="(pill, idx) in pill_info"
                :key="idx"
                :text="pill.text"
                :value="pill.value"
            />
            <div class="direction-page__settings">
                <SearchCmp
                    class="direction-page__settings__search"
                    label="Поиск"
                    v-model="searchQuery"
                />
                <BtnCmp
                    class="direction-page__settings__btn"
                    background_type="_tertiary"
                    text="Добавить направление">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.9974 4.1665V15.8332M4.16406 9.99984H15.8307" stroke="#176DC1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </BtnCmp>
            </div>
            <div class="direction-page__checkbox">
                <CheckboxCmp :active="true" text="Отображающиеся на сайте"/>
                <CheckboxCmp :active="true" text="Не отображающиеся на сайте"/>
            </div>
            <div class="direction-page__course-list">
                <template v-if="filteredDirections.length">
                    <TableHeadCmp
                        :date_edit="'Дата посл. ред.'"
                        :name="'Название'"
                        :display_page="'Отображение на сайте'"
                        :courses_number="'Кол-во курсов'"
                    />
                    <TableRowCmp
                        class="direction-page__course-list__table-row"
                        v-for="(row, idx) in filteredDirections"
                        :key="idx"
                        :date_edit="row.lastChangeDateTime"
                        :name="row.localizedName"
                        :display_page="row.isVisible"
                        :courses_number="row.count"
                    >
                        <template v-slot:svg>
                            <i class="direction-page__course-list__table-row__svg">
                                <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.3333 4.99984V4.33317C12.3333 3.39975 12.3333 2.93304 12.1517 2.57652C11.9919 2.26292 11.7369 2.00795 11.4233 1.84816C11.0668 1.6665 10.6001 1.6665 9.66667 1.6665H8.33333C7.39991 1.6665 6.9332 1.6665 6.57668 1.84816C6.26308 2.00795 6.00811 2.26292 5.84832 2.57652C5.66667 2.93304 5.66667 3.39975 5.66667 4.33317V4.99984M1.5 4.99984H16.5M14.8333 4.99984V14.3332C14.8333 15.7333 14.8333 16.4334 14.5608 16.9681C14.3212 17.4386 13.9387 17.821 13.4683 18.0607C12.9335 18.3332 12.2335 18.3332 10.8333 18.3332H7.16667C5.76654 18.3332 5.06647 18.3332 4.53169 18.0607C4.06129 17.821 3.67883 17.4386 3.43915 16.9681C3.16667 16.4334 3.16667 15.7333 3.16667 14.3332V4.99984" stroke="#FF7C7C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </i>
                        </template>
                    </TableRowCmp>
                </template>
                <div v-else class="no-results">
                    <span>
                        К сожалению, по вашему запросу не найдено ни одного направления. Попробуйте другие параметры поиска.
                    </span>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import {defineComponent, reactive, ref, computed, watch, onMounted} from 'vue';
import axios from 'axios'
import {useRouter} from "vue-router";
import type { Direction } from '~/src/ts-interface/direction'

export default defineComponent({
    setup() {
        const router = useRouter()

        const pill_info = reactive([
            {
                text: 'Всего',
                value: '25'
            },
            {
                text: 'На сайте',
                value: '23'
            },
        ])

        // const directions_list = reactive([
        //     {
        //         date_edit: '31.05.2022',
        //         name: 'Геология',
        //         display_page: 'Отображается',
        //         courses_number: '5'
        //     },
        //     {
        //         date_edit: '31.05.2022',
        //         name: 'Разработка',
        //         display_page: 'Отображается',
        //         courses_number: '6'
        //     },
        //     {
        //         date_edit: '31.05.2022',
        //         name: 'Бурение',
        //         display_page: 'Не отображается',
        //         courses_number: '9'
        //     }
        // ])

        const directions_list = reactive<Direction[]>([])

        const searchQuery = ref('')

        const filteredDirections = computed(() => {
            return directions_list && directions_list.filter((direction: Direction) =>
                direction.localizedName.toLowerCase().includes(searchQuery.value.toLowerCase())
            );
        })

        onMounted(() => {
            axios
                .get('admin/v1/Direction')
                .then((response) => {
                    response.data.forEach((element: Direction) => {
                        directions_list.push(element)
                    })
                })
                .catch((error) => {
                    console.error('Ошибка при получении данных:', error)
                })
        })

        return {
            pill_info,
            directions_list,
            searchQuery,
            filteredDirections,
        }
    }
})
</script>

<style lang="sass" scoped>
.direction-page
    &__header
        margin-bottom: rem(12)

    &__pill
        margin-bottom: rem(32)

    &__settings
        @include flex_start()
        gap: rem(12)
        width: rem(816)
        margin-bottom: rem(16)

        *
            max-height: rem(40)

        &__btn
            max-width: rem(248)
            padding: rem(10) rem(16) rem(10) rem(16)

    &__checkbox
        display: flex
        gap: rem(32)
        margin-bottom: rem(24)

    &__course-list
        &__table-row
            cursor: pointer
            position: relative
            transition: all .2s ease-in-out
            &:hover
                background: $basic_light_blue
                .direction-page__course-list__table-row__svg
                    opacity: 1

            &__svg
                transition: opacity .2s ease-in
                opacity: 0
                position: absolute
                right: rem(16)

.no-results
    font-size: rem(16)

</style>