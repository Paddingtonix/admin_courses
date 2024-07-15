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
                                <div class="oil-course-setting__info__table__column__cell__tooltip-container" @mouseenter="showTooltip('authors')" @mouseleave="hideTooltip()">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
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
                                        <!-- <div class="oil-course-setting__info__table__column__cell__tooltip"> -->
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
                                <span>{{ column.dates_start_end }}</span>
                                <div class="oil-course-setting__info__table__column__cell__tooltip-container" @mouseenter="showTooltip('dates_start_end')" @mouseleave="hideTooltip()">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
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
                                <span>{{ column.date_removed }}</span>
                                <div class="oil-course-setting__info__table__column__cell__tooltip-container" @mouseenter="showTooltip('date_removed')" @mouseleave="hideTooltip()">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
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
                                <div class="oil-course-setting__info__table__column__cell__tooltip-container" @mouseenter="showTooltip('direction')" @mouseleave="hideTooltip()">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
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
                                <span>{{ column.dates_start_end }}</span>
                            </div>
                            <div class="oil-course-setting__info__table__column__cell">
                                <span>{{ column.date_removed }}</span>
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
                                    class="oil-course-setting__info__table__column__cell__input"
                                />
                            </div>
                            <div class="oil-course-setting__info__table__column__cell">
                                <InputCmp 
                                    class="oil-course-setting__info__table__column__cell__input"
                                />
                            </div>
                            <div class="oil-course-setting__info__table__column__cell">
                                <InputCmp 
                                    class="oil-course-setting__info__table__column__cell__input"
                                />
                            </div>
                            <div class="oil-course-setting__info__table__column__cell">
                                <InputCmp 
                                    class="oil-course-setting__info__table__column__cell__input"
                                />
                            </div>
                            <div class="oil-course-setting__info__table__column__cell">
                                <InputCmp 
                                    class="oil-course-setting__info__table__column__cell__input"
                                />
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
                        :text="'Сохраниеть'"
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
                dates_start_end: 'Даты начала и окончания курса',
                date_removed: 'Дата снятия с витрины',
                direction: 'Направление'
            },
            {
                authors: 'michael.smith@gmail.com',
                price: '20 000',
                duration: '150',
                workload: '25',
                dates_start_end: '01.01.24 — 01.02.24',
                date_removed: '01.02.24',
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
            saveSettings
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
                    padding: rem(24) rem(8)
                    span
                        line-height: rem(24)

                    svg
                        cursor: pointer
                        &:hover
                            path
                                transition: stroke .2s
                                stroke: #398BDB

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
                        bottom: rem(16)
                        box-shadow: rem(0) rem(2) rem(4) rem(-2) rgba(24, 39, 75, 0.12), rem(0) rem(4) rem(4) rem(-2) rgba(24, 39, 75, 0.08)
                        z-index: 1
                        &__text
                            color: $basic_white
                            font-size: 12px
                            width: rem(171)

                        &__input::v-deep .oil-input
                            height: rem(40)

                &:first-child
                    width: rem(360)
                    .oil-course-setting__info__table__column__cell
                        span
                            color: $basic_tab

                &:not(:first-child)
                    flex-grow: 1
                    .oil-course-setting__info__table__column__cell
                        &:nth-child(6n+1)
                            padding: rem(22) rem(8)
                            span
                                background-color: $background-main
                                color: $basic_primary
                                border-radius: rem(16)
                                padding: rem(4) rem(8)
                                line-height: rem(20)

        &__btn
            width: fit-content

        &__setting-btns
            display: flex
            gap: rem(12)
</style>