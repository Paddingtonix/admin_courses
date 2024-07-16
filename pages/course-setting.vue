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
                            <div class="oil-course-setting__info__table__column__cell">
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
                                <span>{{ column.price }}</span>
                            </div>
                            <div class="oil-course-setting__info__table__column__cell">
                                <span>{{ column.duration }}</span>
                            </div>
                            <div class="oil-course-setting__info__table__column__cell">
                                <span>{{ column.workload }}</span>
                            </div>
                            <div class="oil-course-setting__info__table__column__cell">
                                <span>{{ column.start_date }}</span>
                                —
                                <span>{{ column.end_date }}</span>
                            </div>
                            <div class="oil-course-setting__info__table__column__cell">
                                <span>{{ column.removed_date }}</span>
                            </div>
                            <div class="oil-course-setting__info__table__column__cell">
                                <span>{{ column.direction }}</span>
                            </div>
                        </div>
                        <div v-else-if="storeEditCourseSetting.isEdit" class="oil-course-setting__info__table__column">
                            <div class="oil-course-setting__info__table__column__cell">
                                <span>{{ column.authors }}</span>
                            </div>
                            <div class="oil-course-setting__info__table__column__cell">
                                <InputCmp 
                                    placeholder="99 999"
                                />
                            </div>
                            <div class="oil-course-setting__info__table__column__cell">
                                <InputCmp 
                                    placeholder="999"
                                />
                            </div>
                            <div class="oil-course-setting__info__table__column__cell">
                                <InputCmp 
                                    placeholder="999"
                                />
                            </div>
                            <div class="oil-course-setting__info__table__column__cell">
                                <div class="oil-course-setting__info__table__column__cell__dates">
                                    <InputCmp 
                                        placeholder="ДД.ММ.ГГ"
                                        :mask_date="true"
                                        @error="err_mess"
                                    />
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M17.5 8.33268H2.5M13.3333 1.66602V4.99935M6.66667 1.66602V4.99935M6.5 18.3327H13.5C14.9001 18.3327 15.6002 18.3327 16.135 18.0602C16.6054 17.8205 16.9878 17.4381 17.2275 16.9677C17.5 16.4329 17.5 15.7328 17.5 14.3327V7.33268C17.5 5.93255 17.5 5.23249 17.2275 4.69771C16.9878 4.2273 16.6054 3.84485 16.135 3.60517C15.6002 3.33268 14.9001 3.33268 13.5 3.33268H6.5C5.09987 3.33268 4.3998 3.33268 3.86502 3.60517C3.39462 3.84485 3.01217 4.2273 2.77248 4.69771C2.5 5.23249 2.5 5.93255 2.5 7.33268V14.3327C2.5 15.7328 2.5 16.4329 2.77248 16.9677C3.01217 17.4381 3.39462 17.8205 3.86502 18.0602C4.3998 18.3327 5.09987 18.3327 6.5 18.3327Z" stroke="#B6C2D0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </div>
                                —
                                <div class="oil-course-setting__info__table__column__cell__dates">
                                    <InputCmp 
                                        placeholder="ДД.ММ.ГГ"
                                        :mask_date="true"
                                        @error="err_mess"
                                    />
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M17.5 8.33268H2.5M13.3333 1.66602V4.99935M6.66667 1.66602V4.99935M6.5 18.3327H13.5C14.9001 18.3327 15.6002 18.3327 16.135 18.0602C16.6054 17.8205 16.9878 17.4381 17.2275 16.9677C17.5 16.4329 17.5 15.7328 17.5 14.3327V7.33268C17.5 5.93255 17.5 5.23249 17.2275 4.69771C16.9878 4.2273 16.6054 3.84485 16.135 3.60517C15.6002 3.33268 14.9001 3.33268 13.5 3.33268H6.5C5.09987 3.33268 4.3998 3.33268 3.86502 3.60517C3.39462 3.84485 3.01217 4.2273 2.77248 4.69771C2.5 5.23249 2.5 5.93255 2.5 7.33268V14.3327C2.5 15.7328 2.5 16.4329 2.77248 16.9677C3.01217 17.4381 3.39462 17.8205 3.86502 18.0602C4.3998 18.3327 5.09987 18.3327 6.5 18.3327Z" stroke="#B6C2D0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </div>
                            </div>
                            <div class="oil-course-setting__info__table__column__cell">
                                <div class="oil-course-setting__info__table__column__cell__dates">
                                    <InputCmp 
                                        placeholder="ДД.ММ.ГГ"
                                        :mask_date="true"
                                        @error="err_mess"
                                    />
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M17.5 8.33268H2.5M13.3333 1.66602V4.99935M6.66667 1.66602V4.99935M6.5 18.3327H13.5C14.9001 18.3327 15.6002 18.3327 16.135 18.0602C16.6054 17.8205 16.9878 17.4381 17.2275 16.9677C17.5 16.4329 17.5 15.7328 17.5 14.3327V7.33268C17.5 5.93255 17.5 5.23249 17.2275 4.69771C16.9878 4.2273 16.6054 3.84485 16.135 3.60517C15.6002 3.33268 14.9001 3.33268 13.5 3.33268H6.5C5.09987 3.33268 4.3998 3.33268 3.86502 3.60517C3.39462 3.84485 3.01217 4.2273 2.77248 4.69771C2.5 5.23249 2.5 5.93255 2.5 7.33268V14.3327C2.5 15.7328 2.5 16.4329 2.77248 16.9677C3.01217 17.4381 3.39462 17.8205 3.86502 18.0602C4.3998 18.3327 5.09987 18.3327 6.5 18.3327Z" stroke="#B6C2D0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </div>
                            </div>
                            <div class="oil-course-setting__info__table__column__cell">
                                <span>{{ column.direction }}</span>
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
                        @click="saveSettings"
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
import { defineComponent } from 'vue'
import { useStoreEditCourseSetting } from '~/src/stores/storeEditCourseSetting'
 
export default defineComponent({
    setup() {
        const storeEditCourseSetting = useStoreEditCourseSetting()

        const active_tab = ref<number | null>(null)

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
                price: '20 000',
                duration: '150',
                workload: '25',
                start_date: '01.01.24',
                end_date: '01.02.24',
                removed_date: '01.02.24',
                // direction: 'Геология, Разработка, Другое'
                direction: 'Геология'
            }
        ])

        const tooltip_id = ref<string>('')

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
            storeEditCourseSetting.saveSetting()
        }

        const err_mess = (err: string) => {
            console.log(err, 'ya')
        }
        
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
            editCourseSetting,
            saveSettings,
            err_mess
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

                &:first-child
                    width: rem(360)
                    .oil-course-setting__info__table__column__cell
                        span
                            color: $basic_tab

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
                        &:nth-child(6n+1)
                            padding: rem(14) rem(8)
                            span
                                background-color: $background-main
                                color: $basic_primary
                                border-radius: rem(16)
                                padding: rem(4) rem(8)
                                line-height: rem(20)

                        &:nth-child(5)
                            display: flex
                            gap: rem(8)
                            align-items: center

                        .oil-course-setting__info__table__column__cell__dates
                            position: relative
                            svg
                                position: absolute
                                top: rem(10)
                                left: rem(16)
                            
                            .oil-input
                                padding: rem(0) rem(16) rem(0) rem(44)

                                
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