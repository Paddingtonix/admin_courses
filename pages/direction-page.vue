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
           <!-- <BtnCmp-->
<!--                class="direction-page__settings__btn"-->
<!--                background_type="_tertiary"-->
<!--                text="Тестовые направления"-->
<!--                @click="startAbomination">-->
<!--                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--                    <path d="M9.9974 4.1665V15.8332M4.16406 9.99984H15.8307" stroke="#176DC1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>-->
<!--                </svg>-->
<!--            </BtnCmp> -->
            <div class="direction-page__container">
                <div class="direction-page__settings">
                    <SearchCmp
                        class="direction-page__settings__search"
                        :label="'Поиск'"
                        v-model="search_query"
                    />
                    <BtnCmp
                        class="direction-page__settings__btn"
                        :background_type="'_tertiary'"
                        :text="'Добавить направление'"
                        @click="sendDirection">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.9974 4.1665V15.8332M4.16406 9.99984H15.8307" stroke="#176DC1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </BtnCmp>
                </div>
                <div class="direction-page__checkbox">
                    <CheckboxCmp :active="visible_state.show_only_visible" text="Отображающиеся на сайте" @click="toggleVisible('visible')" />
                    <CheckboxCmp :active="visible_state.show_only_invisible" text="Не отображающиеся на сайте" @click="toggleVisible('invisible')" />
                </div>
                <div class="direction-page__course-list">
                    <template v-if="filtered_directions.length">
                        <TableHeadCmp
                            @sort="onSort"
                            class="direction-page__course-list__table-header"
                            :lastChangeDateTime="'Дата посл. ред.'"
                            :localizedName="'Название'"
                            :isVisible="'Отображение на сайте'"
                            :count="'Кол-во курсов'"
                        />
                        <TableRowCmp
                            class="direction-page__course-list__table-row"
                            v-for="(row, idx) in filtered_directions"
                            :key="idx"
                            :lastChangeDateTime="formatDate(row.lastChangeDateTime)"
                            :localizedName="row.localizedName"
                            :isVisible="row.isVisible ? 'Отображается' : 'Не отображается'"
                            :count="row.count.toString()"
                        >
                            <template v-slot:svg>
                                <i class="direction-page__course-list__table-row__svg"  @click="deleteDirection(row.directionId)">
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
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed, watch, onMounted } from 'vue';
import { useDirectionStore } from '~/src/stores/storeDirection';
import { useRouter } from "vue-router";
import { formatDate } from '~/src/utils/format-date';
import { sortHeader } from '~/src/utils/sort-header'
import type { DirectionData } from "~/src/ts-interface/direction-data";

export default defineComponent({
    setup() {
        const router = useRouter()
        const direction_store = useDirectionStore();
        const search_query = ref('')
        const show_only_visible = ref(true)
        const show_only_invisible = ref(true)
        const sort_field = ref('')
        const sort_direction = ref('')

        const visible_state = reactive({
            show_only_visible: true,
            show_only_invisible: true,
        })

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

        const toggleVisible = (state: string) => {
            switch (state) {
                case 'invisible':

                    visible_state.show_only_invisible = !visible_state.show_only_invisible
                    break;
                case 'visible':

                    visible_state.show_only_visible = !visible_state.show_only_visible
                    break;
                default:
                    break;
            }
            
        }

        const onSort = ({ field_key, direction }) => {
            console.log(`Сортировка по ${field_key} в порядке ${direction}`);
            sort_field.value = field_key;
            sort_direction.value = direction;
        };

        const filtered_directions = computed(() => {
            let filtered = filtered_by_visibility.value.filter(direction => {
                return direction.localizedName.toLowerCase().includes(search_query.value.toLowerCase());
            });

            if (sort_field.value && sort_direction.value) {
                filtered = sortHeader(filtered, sort_field.value, sort_direction.value);
                console.log('ну-ка, сука, работай', filtered)
            }

            return filtered;
        })

        const filtered_by_visibility = computed(() => {
            if (visible_state.show_only_visible && visible_state.show_only_invisible) {
                return direction_store.directions;
            }

            return direction_store.directions.filter(direction => {
                if (visible_state.show_only_visible && !visible_state.show_only_invisible) {
                    return direction.isVisible;
                } else {
                    return !direction.isVisible;
                }
            });
        })

        const directions_data = [
            { localizedName: "Frontend Development", lastChangeDateTime: new Date(), isVisible: true, count: 9,  directionId: 1},
            { localizedName: "Backend Development", lastChangeDateTime: new Date(), isVisible: true, count: 8, directionId: 2},
            { localizedName: "Data Science", lastChangeDateTime: new Date(), isVisible: false, count: 12, directionId: 3},
            { localizedName: "Mobile Development", lastChangeDateTime: new Date(), isVisible: true, count: 5, directionId: 4},
            { localizedName: "Cybersecurity", lastChangeDateTime: new Date(), isVisible: false, count: 7, directionId: 5},
        ];

        const startAbomination = () => {
            for (const direction of directions_data) {
                setTimeout(() => {
                    direction_store.addDirection(direction);
                    console.log("Оппа, добавил направление :)", direction.localizedName);
                }, 200);
            }
        };

        const sendDirection = () => {
            directions_data.forEach(direction => {
                const direction_push: DirectionData = {
                    isVisible: direction.isVisible,
                    localizations: {
                        en: '',
                        ru: direction.localizedName,
                        // fr: ''
                    },
                };

                direction_store.createDirection(direction_push);
            });
        }

        const deleteDirection = (id: string) => {
            direction_store.removeDirection(id);
        };

        onMounted(() => {
            direction_store.getDirections();
            // startAbomination();
        })

        return {
            pill_info,
            search_query,
            filtered_directions,
            filtered_by_visibility,
            formatDate,
            direction_store,
            show_only_visible,
            show_only_invisible,
            deleteDirection,
            // startAbomination,
            sendDirection,
            visible_state,
            toggleVisible,
            onSort
        }
    }
})
</script>

<style lang="sass">
.direction-page
    &__header
        margin-bottom: rem(12)

    &__pill
        margin-bottom: rem(32)

    &__container
        max-width: rem(1140)

    &__settings
        @include flex_start()
        gap: rem(12)
        width: rem(816)
        margin-bottom: rem(16)

        *
            max-height: rem(40)

        &__btn
            max-width: rem(280)
            padding: rem(10) rem(16) rem(10) rem(16)

    &__checkbox
        display: flex
        gap: rem(32)
        margin-bottom: rem(24)

    &__course-list
        &__table-header
            .oil-head__cell
                padding: rem(14) rem(8)

                &:nth-child(1)
                    flex: 1

                &:nth-child(2)
                    flex: 3

                &:nth-child(3)
                    flex: 1

                &:nth-child(4)
                    flex: 1

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

            .oil-row__cell
                padding: rem(14) rem(8)

                &:nth-child(1)
                    flex: 1

                &:nth-child(2)
                    flex: 3
                    a
                        color: $basic_primary

                &:nth-child(3)
                    flex: 1

                &:nth-child(4)
                    flex: 1

.no-results
    margin-top: rem(48)
    font-size: rem(16)
    width: rem(576)

</style>
