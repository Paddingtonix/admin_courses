<template>
    <section class="oil-container">
        <div class="oil-page oil-course-setting">
            <breadCmp 
                :prev_page="'Список курсов'"
                :current_page="'Геологическое моделирование пласта'"
                class="oil-course-setting__bread"
            />
            <div class="oil-course-setting__menubar">
                <tabsCmp 
                    v-for="(tab, tab_idx) in tabs" 
                    :key="tab_idx"
                    :text="tab.text"
                />
            </div>
            <!-- <template v-if="active_tab === 1"> -->
            <div class="oil-course-setting__info">
                <div class="oil-course-setting__info__cards">
                    <CardInfo
                        v-for="(card, card_idx) in course_setting"
                        :key="card_idx"
                        :text="card.text"
                        :count="card.count"
                        :card_type="'texts'"
                    />
                </div>
                <div class="oil-course-setting__info__table">
                    <template v-for="(column, column_idx) in course_table" :key="column_idx">
                        <div v-if="!column_idx" class="oil-course-setting__info__table__column">
                            <div class="oil-course-setting__info__table__column__cell">
                                <span>{{ column.authors }}</span>
                                <div class="oil-course-setting__info__table__column__cell__tooltip-container">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" @mouseenter="showTooltip('authors')" @mouseleave="hideTooltip()">
                                        <g clip-path="url(#clip0_799_14059)">
                                            <path d="M9.99935 13.3327V9.99935M9.99935 6.66602H10.0077M18.3327 9.99935C18.3327 14.6017 14.6017 18.3327 9.99935 18.3327C5.39698 18.3327 1.66602 14.6017 1.66602 9.99935C1.66602 5.39698 5.39698 1.66602 9.99935 1.66602C14.6017 1.66602 18.3327 5.39698 18.3327 9.99935Z" stroke="#B6C2D0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_799_14059">
                                            <rect width="20" height="20" fill="white"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <transition name="fade">
                                        <div class="oil-course-setting__info__table__column__cell__tooltip" v-if="tooltip_id === 'authors'">
                                            <span class="oil-course-setting__info__table__column__cell__tooltip__text" v-html="setTooltipText('authors')"></span>
                                        </div>
                                    </transition>
                                </div>
                            </div>
                            <div v-if="storeStateCourse.price === 'paid'" class="oil-course-setting__info__table__column__cell">
                                <span>{{ column.price }}</span>
                            </div>
                            <div class="oil-course-setting__info__table__column__cell">
                                <span>{{ column.duration }}</span>
                            </div>
                            <div class="oil-course-setting__info__table__column__cell">
                                <span>{{ column.workload }}</span>
                            </div>
                            <div class="oil-course-setting__info__table__column__cell">
                                <span>{{ column.start_end_dates }}</span>
                                <div class="oil-course-setting__info__table__column__cell__tooltip-container">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" @mouseenter="showTooltip('dates_start_end')" @mouseleave="hideTooltip()">
                                        <g clip-path="url(#clip0_799_14059)">
                                            <path d="M9.99935 13.3327V9.99935M9.99935 6.66602H10.0077M18.3327 9.99935C18.3327 14.6017 14.6017 18.3327 9.99935 18.3327C5.39698 18.3327 1.66602 14.6017 1.66602 9.99935C1.66602 5.39698 5.39698 1.66602 9.99935 1.66602C14.6017 1.66602 18.3327 5.39698 18.3327 9.99935Z" stroke="#B6C2D0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_799_14059">
                                            <rect width="20" height="20" fill="white"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <transition name="fade">
                                        <div class="oil-course-setting__info__table__column__cell__tooltip" v-if="tooltip_id === 'dates_start_end'">
                                            <span class="oil-course-setting__info__table__column__cell__tooltip__text">{{ setTooltipText('dates_start_end') }}</span>
                                        </div>
                                    </transition>
                                </div>
                            </div>
                            <div class="oil-course-setting__info__table__column__cell">
                                <span>{{ column.removed_date }}</span>
                                <div class="oil-course-setting__info__table__column__cell__tooltip-container">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" @mouseenter="showTooltip('date_removed')" @mouseleave="hideTooltip()">
                                        <g clip-path="url(#clip0_799_14059)">
                                            <path d="M9.99935 13.3327V9.99935M9.99935 6.66602H10.0077M18.3327 9.99935C18.3327 14.6017 14.6017 18.3327 9.99935 18.3327C5.39698 18.3327 1.66602 14.6017 1.66602 9.99935C1.66602 5.39698 5.39698 1.66602 9.99935 1.66602C14.6017 1.66602 18.3327 5.39698 18.3327 9.99935Z" stroke="#B6C2D0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_799_14059">
                                            <rect width="20" height="20" fill="white"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <transition name="fade">
                                        <div class="oil-course-setting__info__table__column__cell__tooltip" v-if="tooltip_id === 'date_removed'">
                                            <span class="oil-course-setting__info__table__column__cell__tooltip__text">{{ setTooltipText('date_removed') }}</span>
                                        </div>
                                    </transition>
                                </div>
                            </div>
                            <div class="oil-course-setting__info__table__column__cell">
                                <span>{{ column.direction }}</span>
                                <div class="oil-course-setting__info__table__column__cell__tooltip-container">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" @mouseenter="showTooltip('direction')" @mouseleave="hideTooltip()">
                                        <g clip-path="url(#clip0_799_14059)">
                                            <path d="M9.99935 13.3327V9.99935M9.99935 6.66602H10.0077M18.3327 9.99935C18.3327 14.6017 14.6017 18.3327 9.99935 18.3327C5.39698 18.3327 1.66602 14.6017 1.66602 9.99935C1.66602 5.39698 5.39698 1.66602 9.99935 1.66602C14.6017 1.66602 18.3327 5.39698 18.3327 9.99935Z" stroke="#B6C2D0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_799_14059">
                                            <rect width="20" height="20" fill="white"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <transition name="fade">
                                        <div class="oil-course-setting__info__table__column__cell__tooltip" v-if="tooltip_id === 'direction'">
                                            <span class="oil-course-setting__info__table__column__cell__tooltip__text">{{ setTooltipText('direction') }}</span>
                                        </div>
                                    </transition>
                                </div>
                            </div>
                        </div>
                        <div v-else-if="!storeEditCourseSetting.isEdit" class="oil-course-setting__info__table__column">
                            <div class="oil-course-setting__info__table__column__cell">
                                <span>{{ column.authors }}</span>
                            </div>
                            <div class="oil-course-setting__info__table__column__cell">
                                <span v-if="course_table[1]">{{ column.price }}</span>
                                <div v-else class="oil-course-setting__info__table__column__cell__no-data">
                                    <span class="oil-course-setting__info__table__column__cell__no-data__title">Нет даных</span>
                                    <span class="oil-course-setting__info__table__column__cell__no-data__subtitle">Пример: 99 999</span>
                                </div>
                            </div>
                            <div class="oil-course-setting__info__table__column__cell">
                                <span v-if="course_table[1]">{{ column.duration }}</span>
                                <div v-else class="oil-course-setting__info__table__column__cell__no-data">
                                    <span class="oil-course-setting__info__table__column__cell__no-data__title">Нет даных</span>
                                    <span class="oil-course-setting__info__table__column__cell__no-data__subtitle">Пример: 100</span>
                                </div>
                            </div>
                            <div class="oil-course-setting__info__table__column__cell">
                                <span v-if="course_table[1]">{{ column.workload }}</span>
                                <div v-else class="oil-course-setting__info__table__column__cell__no-data">
                                    <span class="oil-course-setting__info__table__column__cell__no-data__title">Нет даных</span>
                                    <span class="oil-course-setting__info__table__column__cell__no-data__subtitle">Пример: 50</span>
                                </div>
                            </div>
                            <div class="oil-course-setting__info__table__column__cell">
                                <span v-if="course_table[1]">{{ column.start_date }}</span>
                                <span v-if="course_table[1]">—</span>
                                <span v-if="course_table[1]">{{ column.end_date }}</span>
                                <div v-else class="oil-course-setting__info__table__column__cell__no-data">
                                    <span class="oil-course-setting__info__table__column__cell__no-data__title">Нет даных</span>
                                    <span class="oil-course-setting__info__table__column__cell__no-data__subtitle">Пример: 01.01.24 — 01.02.24</span>
                                </div>
                            </div>
                            <div class="oil-course-setting__info__table__column__cell">
                                <span v-if="course_table[1]">{{ column.removed_date }}</span>
                                <div v-else class="oil-course-setting__info__table__column__cell__no-data">
                                    <span class="oil-course-setting__info__table__column__cell__no-data__title">Нет даных</span>
                                    <span class="oil-course-setting__info__table__column__cell__no-data__subtitle">Пример: 01.02.24</span>
                                </div>
                            </div>
                            <div class="oil-course-setting__info__table__column__cell" :style="{ pointerEvents: 'none' }">
                                <div v-if="picked_directions_filtered.length" class="oil-course-setting__info__table__column__cell__direction">
                                    <DirectionCmp
                                        v-for="(direction, direction_idx) in picked_directions_filtered"
                                        :key="direction_idx"
                                        :text="direction.localizedName"
                                        :id="direction.directionId"
                                        :is_visible="direction.isVisible"
                                        :picked="picked_directions.includes(direction.directionId)"
                                    >{{ direction.localizedName }}</DirectionCmp>
                                </div>
                                <div v-else class="oil-course-setting__info__table__column__cell__no-data">
                                    <span class="oil-course-setting__info__table__column__cell__no-data__title">Нет даных</span>
                                    <span class="oil-course-setting__info__table__column__cell__no-data__subtitle">Пример: Геология, Разработка</span>
                                </div>
                            </div>
                        </div>
                        <div v-else-if="storeEditCourseSetting.isEdit" class="oil-course-setting__info__table__column">
                            <div class="oil-course-setting__info__table__column__cell">
                                <span>{{ column.authors }}</span>
                            </div>
                            <div class="oil-course-setting__info__table__column__cell" v-for="(input, input_idx) in inputs" :key="input_idx">
                                <InputCmp 
                                    :placeholder="input.placeholder"
                                    :mask_type="input.mask_type"
                                />
                            </div>
                            <div class="oil-course-setting__info__table__column__cell">
                                <div class="oil-course-setting__info__table__column__cell__dates">
                                    <CalendarCmp />
                                    <span>—</span>
                                    <CalendarCmp />
                                </div>
                            </div>
                            <div class="oil-course-setting__info__table__column__cell">
                                <CalendarCmp />
                            </div>
                            <div class="oil-course-setting__info__table__column__cell">
                                <div class="oil-course-setting__info__table__column__cell__direction">
                                    <DirectionCmp  
                                        v-for="(direction, direction_idx) in directions" 
                                        :key="direction_idx"
                                        :text="direction.localizedName"
                                        :id="direction.directionId"
                                        :is_visible="direction.isVisible"
                                        :picked="picked_directions.includes(direction.directionId)"
                                        @set_direction="pick_direction"
                                    >{{ direction.localizedName }}</DirectionCmp>
                                    <span v-if="show_error">Курсу должно быть присвоено хотя бы одно направлние!</span>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
                <BtnCmp
                    v-if="!storeEditCourseSetting.isEdit"
                    class="oil-course-setting__info__btn"
                    :text="'Редактировать'"
                    @click="editCourseSetting"
                />
                <div class="oil-course-setting__info__setting-btns" v-if="storeEditCourseSetting.isEdit">
                    <BtnCmp
                        class="oil-course-setting__info__btn"
                        :text="'Отмена'"
                        :background_type="'_secondary'"
                        @click="setCardInfo"
                    />
                    <BtnCmp
                        class="oil-course-setting__info__btn"
                        :text="'Сохранить'"
                        @click="saveSettings"
                    />
                </div>
            </div>
            <!-- <template v-else-if="active_tab === 2"> -->
            <template v-if="active_tab === 2">
                <div class="oil-course-setting__info"></div>
            </template>
            <template v-else-if="active_tab === 3">
                <div class="oil-course-setting__content"></div>
            </template>
        </div>
    </section>
</template>

<script lang="ts">
import axios from 'axios'
import { defineComponent } from 'vue'
import { useStoreCourses } from '~/src/stores/storeCourse';
import { useStoreEditCourseSetting } from '~/src/stores/storeEditCourseSetting'
import type { Direction } from '~/src/ts-interface/direction'
 
export default defineComponent({
    setup() {
        const storeEditCourseSetting = useStoreEditCourseSetting()
        const storeStateCourse = useStoreCourses()

        const active_tab = ref<number | null>(null)
        const show_error = ref<boolean>(false)
        const tooltip_id = ref<string>('')
        const directions = reactive<Direction[]>([])
        const picked_directions = reactive<number[]>([]) // Отправлять этот массив

        const tabs = reactive([
            {
                id: 1,
                text: 'Общие настройки'
            },
            {
                id: 2,
                text: 'Информация о курсе'
            },
            {
                id: 3,
                text: 'Содержание'
            },
        ])

        const course_setting = reactive([
            {
                count: 'Синхронный',
                text: 'Тип'
            },
            {
                count: 'Онлайн',
                text: 'Формат'
            },
            {
                count: 'Платно',
                text: 'Приобретение'
            },
            {
                count: 'Полный',
                text: 'Доступ'
            }
        ])

        const course_table = reactive([
            {
                authors: 'Автор(ы)',
                price: 'Цена (руб)',
                duration: 'Длительность (академ. часов)',
                workload: 'Объём работы (дней)',
                start_end_dates: 'Даты начала и окончания курса',
                removed_date: 'Дата снятия с витрины',
                direction: 'Направление'
            },
            {
                authors: 'michael.smith@gmail.com',
                price: ' 99 999',
                duration: '100',
                workload: '50',
                start_date: '01.01.24',
                end_date: '01.02.24',
                removed_date: '01.02.24'
            }
        ])


        const tooltips = ref<{ id: string, text: string}[]>([
            {
                id: 'authors',
                text: 'Макс. количество авторов: 2<br>Мин. количество авторов: 1'
            },
            {
                id: 'dates_start_end',
                text: 'Начало и завершение курса наступят в указанные даты в 00:00 по времени МСК'
            },
            {
                id: 'date_removed',
                text: 'Курс будет снят с витрины при наступлении указанной даты в 00:00 по времени МСК'
            },
            {
                id: 'direction',
                text: 'Должно быть указано минимум одно направление'
            }
        ])

        const inputs = reactive([
            {
                placeholder: '99 999',
                mask_type: 'price'
            },
            {
                placeholder: '999',
                mask_type: 'price'
            },
            {
                placeholder: '999',
                mask_type: 'price'
            }
        ])

        const picked_directions_filtered = computed(() =>
            directions.filter((direction) => picked_directions.includes(direction.directionId))
        )

        const showTooltip = (id: string) => {
            tooltip_id.value = id
        }

        const hideTooltip = () => {
            tooltip_id.value = ''
        }

        const setTooltipText = computed(() => {
            return (id: string) => {
                const tooltip = tooltips.value.find(item => item.id === id)
                return tooltip ? tooltip.text : null
            }
        })

        const editCourseSetting = () => {
            storeEditCourseSetting.edit()
        }

        const saveSettings = () => {
            if (picked_directions_filtered.value.length === 0) {
                show_error.value = true
            } else {
                show_error.value = false
                storeEditCourseSetting.saveSetting()
            }
        }
        
        watch(picked_directions_filtered, (new_value) => {
            if (new_value.length > 0) {
                show_error.value = false
            }
        })

        const pick_direction = (dir: { id: number, picked: boolean }) => {
            if (dir.picked) {
                picked_directions.push(dir.id)
            } else {
                picked_directions.splice(picked_directions.indexOf(dir.id), 1)
            }
        }
        
        const setCardInfo = () => {
            // console.log('Запрос отправлен')
            // axios
            //         .get('admin/v1/direction')
            //         .then((response) => {
            //             console.log('Ответ получен:', response.data)
            //             response.data.forEach((element: Direction) => {
            //                 directions.push(element)
            //                 console.log(element, 'ya');
            //             })
            //         })
            //         .catch((error) => {
            //             console.error('Ошибка при получении данных:', error)
            //         })
        }

        onMounted(() => {
            nextTick(() => {
                axios
                    .get('admin/v1/direction')
                    .then((response) => {
                        response.data.forEach((element: Direction) => {
                            directions.push(element)
                        })
                    })
                    .catch((error) => {
                        console.error('Ошибка при получении данных:', error)
                    })

                axios
                    .get('admin/v1/user/authors')
                    .then((response) => {
                        console.log(response, 'admin/v1/user/authors')
                    })
            })


        })
        
        return {
            active_tab,
            tabs,
            course_setting,
            course_table,
            tooltip_id,
            tooltips,
            showTooltip,
            hideTooltip,
            setTooltipText,
            storeEditCourseSetting,
            storeStateCourse,
            editCourseSetting,
            saveSettings,
            inputs,
            directions,
            picked_directions,
            pick_direction,
            picked_directions_filtered,
            setCardInfo,
            show_error
        }
    },
})
</script>

<style scoped lang="sass">
.oil-course-setting
    @include flex_column()
    &__menubar 
        @include flex_start()
        gap: rem(12)

    &__info
        @include flex_column()
        width: rem(972)
        gap: rem(24)
        &__cards
            display: flex
            gap: rem(12)
            flex: 1

        &__table
            display: flex
            &__column
                &__cell
                    display: flex
                    position: relative
                    gap: rem(8)
                    border-bottom: rem(1) solid $background-main
                    padding: rem(16) rem(8)
                    span
                        line-height: rem(24)
                        margin: rem(8) 0

                    &__tooltip-container
                        position: relative
                        display: inline-block

                    &__tooltip
                        position: absolute
                        display: flex
                        background-color: $basic_light_gray
                        border-radius: rem(8)
                        padding: rem(8) rem(12)
                        left: rem(12)
                        bottom: rem(24)
                        box-shadow: rem(0) rem(2) rem(4) rem(-2) rgba(24, 39, 75, 0.12), rem(0) rem(4) rem(4) rem(-2) rgba(24, 39, 75, 0.08)
                        z-index: 1
                        &__text
                            color: $basic_white
                            font-size: 12px
                            width: rem(171)

                    &__no-data
                        display: flex
                        flex-direction: column
                        gap: rem(2)
                        height: rem(40)
                        align-content: center
                        span
                            line-height: initial
                            margin: initial
                            
                        &__title
                            color: #5B6C7B
                            font-size: 16px
                            font-weight: 500
                            line-height: 24px
                            margin: 0

                        &__subtitle
                            color: #9AA7BB
                            font-size: 12px
                            font-weight: 400
                            line-height: 16px
                            margin: 0

                    &__direction
                        display: flex
                        gap: rem(8)
                        height: rem(40)
                        align-items: center
                        span
                            position: absolute
                            bottom: rem(-6)
                            font-size: 12px
                            line-height: 16px
                            color: $basic_error

                &:first-child
                    width: rem(360)
                    .oil-course-setting__info__table__column__cell
                        span
                            color: $basic_gray

                        svg
                            cursor: pointer
                            margin: rem(10) 0
                            &:hover
                                path
                                    transition: stroke .2s
                                    stroke: #398BDB

                &:not(:first-child)
                    flex-grow: 1
                    .oil-course-setting__info__table__column__cell
                        &:first-child
                            padding: rem(14) rem(8)
                            span
                                background-color: $background-main
                                color: $basic_primary
                                border-radius: rem(16)
                                padding: rem(4) rem(8)
                                line-height: rem(20)

                        .oil-course-setting__info__table__column__cell__dates
                            display: flex
                            gap: rem(8)
                            align-items: center
                            position: relative
                            svg
                                position: absolute
                                top: rem(10)
                                left: rem(16)
                            
                            .oil-input
                                padding: rem(0) rem(16) rem(0) rem(44)

                        &__inputs
                            display: flex
                            gap: 24px

        &__btn
            width: fit-content

        &__setting-btns
            display: flex
            gap: rem(12)

.oil-course-setting__info__table__column__cell
    .oil-input
        height: rem(40)
        width: rem(136)

</style>