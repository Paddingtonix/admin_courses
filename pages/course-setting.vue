<template>
    <section class="oil-container">
        <div class="oil-page oil-course-setting">
            <breadCmp 
                :prev_page="'Список курсов'"
                :current_page="'Геологическое моделирование пласта'"
                class="oil-course-setting__bread"
            />
            <div class="oil-course-setting__menubar">
                <!-- <TabSwitcherCmp
                    :switcherArray="switcherArray"
                    @switch-tab="selectTab"
                /> -->
                <!-- <hr> -->
                <tabsCmp 
                    v-for="tab in switcherArray"
                    :key="tab.id"
                    :id="tab.id"
                    :text="tab.text"
                    :active="active_tab"
                    @select-tab="selectTab"
                />
            </div>
            <template v-if="active_tab === 1">
                <div class="oil-course-setting__settings">
                    <div class="oil-course-setting__settings__cards">
                        <CardInfo
                            v-for="(card, card_idx) in course_setting"
                            :key="card_idx"
                            :text="card.text"
                            :count="card.count"
                            :card_type="'texts'"
                        />
                    </div>
                    <div class="oil-course-setting__settings__table">
                        <template v-for="(column, column_idx) in course_table" :key="column_idx">
                            <div v-if="!column_idx" class="oil-course-setting__settings__table__column">
                                <div class="oil-course-setting__settings__table__column__cell">
                                    <span>{{ column.authors }}</span>
                                    <div class="oil-course-setting__settings__table__column__cell__tooltip-container">
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
                                            <div class="oil-course-setting__settings__table__column__cell__tooltip" v-if="tooltip_id === 'authors'">
                                                <span class="oil-course-setting__settings__table__column__cell__tooltip__text" v-html="setTooltipText('authors')"></span>
                                            </div>
                                        </transition>
                                    </div>
                                </div>
                                <div v-if="storeStateCourse.price === 'paid'" class="oil-course-setting__settings__table__column__cell">
                                    <span>{{ column.price }}</span>
                                </div>
                                <div class="oil-course-setting__settings__table__column__cell">
                                    <span>{{ column.duration }}</span>
                                </div>
                                <div class="oil-course-setting__settings__table__column__cell">
                                    <span>{{ column.workload }}</span>
                                </div>
                                <div class="oil-course-setting__settings__table__column__cell">
                                    <span>{{ column.start_end_dates }}</span>
                                    <div class="oil-course-setting__settings__table__column__cell__tooltip-container">
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
                                            <div class="oil-course-setting__settings__table__column__cell__tooltip" v-if="tooltip_id === 'dates_start_end'">
                                                <span class="oil-course-setting__settings__table__column__cell__tooltip__text">{{ setTooltipText('dates_start_end') }}</span>
                                            </div>
                                        </transition>
                                    </div>
                                </div>
                                <div class="oil-course-setting__settings__table__column__cell">
                                    <span>{{ column.removed_date }}</span>
                                    <div class="oil-course-setting__settings__table__column__cell__tooltip-container">
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
                                            <div class="oil-course-setting__settings__table__column__cell__tooltip" v-if="tooltip_id === 'date_removed'">
                                                <span class="oil-course-setting__settings__table__column__cell__tooltip__text">{{ setTooltipText('date_removed') }}</span>
                                            </div>
                                        </transition>
                                    </div>
                                </div>
                                <div class="oil-course-setting__settings__table__column__cell">
                                    <span>{{ column.direction }}</span>
                                    <div class="oil-course-setting__settings__table__column__cell__tooltip-container">
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
                                            <div class="oil-course-setting__settings__table__column__cell__tooltip" v-if="tooltip_id === 'direction'">
                                                <span class="oil-course-setting__settings__table__column__cell__tooltip__text">{{ setTooltipText('direction') }}</span>
                                            </div>
                                        </transition>
                                    </div>
                                </div>
                            </div>
                            <div v-else-if="!storeEditCourseSetting.isEdit" class="oil-course-setting__settings__table__column">
                                <div class="oil-course-setting__settings__table__column__cell">
                                    <span>{{ column.authors }}</span>
                                </div>
                                <div class="oil-course-setting__settings__table__column__cell">
                                    <span v-if="course_table[1].price">{{ column.price }}</span>
                                    <div v-else class="oil-course-setting__settings__table__column__cell__no-data">
                                        <span class="oil-course-setting__settings__table__column__cell__no-data__title">Нет даных</span>
                                        <span class="oil-course-setting__settings__table__column__cell__no-data__subtitle">Пример: 99 999</span>
                                    </div>
                                </div>
                                <div class="oil-course-setting__settings__table__column__cell">
                                    <span v-if="course_table[1].duration">{{ column.duration }}</span>
                                    <div v-else class="oil-course-setting__settings__table__column__cell__no-data">
                                        <span class="oil-course-setting__settings__table__column__cell__no-data__title">Нет даных</span>
                                        <span class="oil-course-setting__settings__table__column__cell__no-data__subtitle">Пример: 100</span>
                                    </div>
                                </div>
                                <div class="oil-course-setting__settings__table__column__cell">
                                    <span v-if="course_table[1].workload">{{ column.workload }}</span>
                                    <div v-else class="oil-course-setting__settings__table__column__cell__no-data">
                                        <span class="oil-course-setting__settings__table__column__cell__no-data__title">Нет даных</span>
                                        <span class="oil-course-setting__settings__table__column__cell__no-data__subtitle">Пример: 50</span>
                                    </div>
                                </div>
                                <div class="oil-course-setting__settings__table__column__cell">
                                    <span v-if="course_table[1].start_date && course_table[1].end_date">{{ column.start_date }}</span>
                                    <span v-if="course_table[1].start_date && course_table[1].end_date">—</span>
                                    <span v-if="course_table[1].start_date && course_table[1].end_date">{{ column.end_date }}</span>
                                    <div v-else class="oil-course-setting__settings__table__column__cell__no-data">
                                        <span class="oil-course-setting__settings__table__column__cell__no-data__title">Нет даных</span>
                                        <span class="oil-course-setting__settings__table__column__cell__no-data__subtitle">Пример: 01.01.24 — 01.02.24</span>
                                    </div>
                                </div>
                                <div class="oil-course-setting__settings__table__column__cell">
                                    <span v-if="course_table[1].removed_date">{{ column.removed_date }}</span>
                                    <div v-else class="oil-course-setting__settings__table__column__cell__no-data">
                                        <span class="oil-course-setting__settings__table__column__cell__no-data__title">Нет даных</span>
                                        <span class="oil-course-setting__settings__table__column__cell__no-data__subtitle">Пример: 01.02.24</span>
                                    </div>
                                </div>
                                <div class="oil-course-setting__settings__table__column__cell" :style="{ pointerEvents: 'none' }">
                                    <div v-if="picked_directions_filtered.length" class="oil-course-setting__settings__table__column__cell__direction">
                                        <DirectionCmp
                                            v-for="(direction, direction_idx) in picked_directions_filtered"
                                            :key="direction_idx"
                                            :text="direction.localizedName"
                                            :id="direction.directionId"
                                            :is_visible="direction.isVisible"
                                            :picked="picked_directions.includes(direction.directionId)"
                                        >{{ direction.localizedName }}</DirectionCmp>
                                    </div>
                                    <div v-else class="oil-course-setting__settings__table__column__cell__no-data">
                                        <span class="oil-course-setting__settings__table__column__cell__no-data__title">Нет даных</span>
                                        <span class="oil-course-setting__settings__table__column__cell__no-data__subtitle">Пример: Геология, Разработка</span>
                                    </div>
                                </div>
                            </div>
                            <div v-else-if="storeEditCourseSetting.isEdit" class="oil-course-setting__settings__table__column">
                                <div class="oil-course-setting__settings__table__column__cell">
                                    <span>{{ column.authors }}</span>
                                </div>
                                <div class="oil-course-setting__settings__table__column__cell" v-for="(input, input_idx) in inputs" :key="input_idx">
                                    <InputCmp 
                                        :placeholder="input.placeholder"
                                        :mask_type="input.mask_type"
                                    />
                                </div>
                                <div class="oil-course-setting__settings__table__column__cell">
                                    <div class="oil-course-setting__settings__table__column__cell__dates">
                                        <CalendarCmp />
                                        <span>—</span>
                                        <CalendarCmp />
                                    </div>
                                </div>
                                <div class="oil-course-setting__settings__table__column__cell">
                                    <CalendarCmp />
                                </div>
                                <div class="oil-course-setting__settings__table__column__cell">
                                    <div class="oil-course-setting__settings__table__column__cell__direction">
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
                        v-if="storeStateCourse.status !== 'Archived' && !storeEditCourseSetting.isEdit"
                        class="oil-course-setting__settings__btn"
                        :text="'Редактировать'"
                        @click="editCourseSetting"
                    />
                    <div class="oil-course-setting__settings__setting-btns" v-if="storeEditCourseSetting.isEdit">
                        <BtnCmp
                            class="oil-course-setting__settings__btn"
                            :text="'Отмена'"
                            :background_type="'_secondary'"
                        />
                        <BtnCmp
                            class="oil-course-setting__settings__btn"
                            :text="'Сохранить'"
                            @click="saveSettings"
                        />
                    </div>
                </div>
            </template>
            <template v-else-if="active_tab === 2">
                <div class="oil-course-setting__info" v-if="!edit_mode.value">
                    <div 
                        class="oil-course-setting__info__fields"
                        v-for="info in course_info"
                        :key="info.id"
                    >
                        <div class="oil-course-setting__info__fields__cell">
                            <span>{{ info.field }}</span>
                        </div>
                        <div class="oil-course-setting__info__fields__cell">
                            <span>{{ info.value ? info.value : 'Нет данных' }}</span>
                        </div>
                    </div>
                    <BtnCmp v-if="storeStateCourse.status !== 'Archived'"
                        class="oil-course-setting__info__btn"
                        :text="'Редактировать'"
                        @click="openEditFrame"
                    />
                </div>
                <div class="oil-course-setting__edit" v-else>
                    <InputCmp 
                        v-for="(field, field_idx) in edit_info.slice(0, 2)"
                        :key="field_idx"
                        :type="field.type"
                        :value="field.value"
                        :label="field.label"
                        :error="field.error"
                    />
                    <div 
                        v-for="(field, field_idx) in edit_info.slice(3)"
                        :key="field_idx"
                    >
                        <TextareaCmp 
                            :type="field.type"
                            :value="field.value"
                            :label="field.label"
                            :error="field.error"
                            class="oil-course-setting__edit__textarea"
                        />
                        <div class="oil-course-setting__edit__example">
                            <div
                                @click="openExample(field_idx)" 
                                class="oil-course-setting__edit__example__btn"
                            >
                                <div class="oil-course-setting__edit__example__btn__frame">
                                    <span>
                                        Пример
                                    </span>
                                    <i>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                            <path d="M3 4.5L6 7.5L9 4.5" stroke="#176DC1" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </i>
                                </div>
                                <div>
                                    {{ edit_info[field_idx].value.length }}
                                    / 470
                                </div>
                            </div>
                            <div 
                                v-if="active_example.value === field_idx" 
                                class="oil-course-setting__edit__example__text">
                                <p>{{ field.example }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="oil-course-setting__edit__btns">
                        <BtnCmp 
                            :text="'Отмена'"
                            @click="openEditFrame"
                            :background_type="'_secondary'"
                        />
                        <BtnCmp 
                            :text="'Сохранить'"
                        />
                    </div>
                </div>
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
import type ISwitcher from '~/src/ts-interface/switcher.type'
 
export default defineComponent({
    setup() {
        const storeEditCourseSetting = useStoreEditCourseSetting()
        const storeStateCourse = useStoreCourses()

        const active_tab = ref<number>(1)
        const show_error = ref<boolean>(false)
        const tooltip_id = ref<string>('')
        const directions = reactive<Direction[]>([])
        const picked_directions = reactive<number[]>([]) // Отправлять этот массив

        const switcherArray: ISwitcher[] = [
            {
                text: 'Общие настройки',
                id: 1,
                isActive: true,
                link: ''
            }, 
            {
                text: 'Информация о курсе',
                id: 2,
                isActive: false,
                link: ''
            },
            {
                text: 'Содержание',
                id: 3,
                isActive: false,
                link: ''
            }
        ]

		const active_example = reactive({
			value: null as number | null,
		});

        const course_info = reactive([
            {
                field: 'Название курса',
                value: 'Геологическое моделирование пласта',
                id: 'course_name'
            },
            {
                field: 'Авторы',
                value: '',
                id: 'author'
            },
            {
                field: 'Описание',
                value: '',
                id: 'description'
            },
            {
                field: 'Целевая аудитория',
                value: '',
                id: 'target_audience'
            },
            {
                field: 'Методика обучения',
                value: '',
                id: 'methodology'
            },
            {
                field: 'Результаты обучения',
                value: '',
                id: 'results'
            },
        ])

		const edit_mode = reactive({
			value: false,
		});

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
                authors: '',
                price: '',
                duration: '',
                workload: '',
                start_date: '',
                end_date: '',
                removed_date: ''
            }
            // {
            //     authors: 'michael.smith@gmail.com',
            //     price: '99 999',
            //     duration: '100',
            //     workload: '50',
            //     start_date: '01.01.24',
            //     end_date: '01.02.24',
            //     removed_date: '01.02.24'
            // },
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

		const edit_info = reactive([
			{
				id: "userName",
				type: "email",
				value: "",
				required: true,
				valid: false,
				pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
				label: "Название курса",
				error: "",
				example: "",
			},
			{
				id: "password",
				type: "text",
				value: "",
				required: true,
				valid: false,
				pattern: "",
				label: "Авторы",
				error: "",
				example: "",
			},
			{
				id: "password",
				type: "password",
				value: "",
				required: true,
				valid: false,
				pattern: "",
				label: "Описание",
				error: "",
				example:
					"Курс посвящен методам и инструментам, применяемым для геологического моделирования нефтяных и газовых месторождений. В рамках курса слушатели ознакомятся с основными принципами и техниками создания геологических моделей, а также научатся анализировать и интерпретировать данные для оптимизации добычи углеводородов.",
			},
			{
				id: "userName",
				type: "email",
				value: "",
				required: true,
				valid: false,
				pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
				label: "Целевая аудитория",
				error: "",
				example:
					"Специалисты с высшим геологическим или геофизическим образованием, инженеры-нефтяники, а также студенты старших курсов профильных вузов. Курс также будет полезен для сотрудников нефтегазовых компаний, работающих в смежных областях и желающих расширить свои знания в области геологического моделирования.",
			},
			{
				id: "password",
				type: "password",
				value: "",
				required: true,
				valid: false,
				pattern: "",
				label: "Методика обучения",
				error: "",
				example:
					"Обучение включает в себя лекционные занятия, проведение семинаров и практических занятий. Участники курса будут работать с современными программными комплексами для моделирования, выполнять практические задания на реальных данных и обсуждать результаты с преподавателями.",
			},
			{
				id: "userName",
				type: "email",
				value: "",
				required: true,
				valid: false,
				pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
				label: "Результаты обучения",
				error: "",
				example:
					"По окончании курса участники смогут: создавать и анализировать геологические модели, используя специализированное программное обеспечение; применять полученные знания для оптимизации процессов разведки и добычи углеводородов; понимать основные методы и подходы к моделированию пластов, а также интегрировать полученные данные в общие проекты разработки месторождений.",
			},
		]);

		const selectTab = (id: number) => {            
			active_tab.value = id;
		};

		const openEditFrame = () => {
			edit_mode.value = !edit_mode.value;
		};

		const openExample = (id: number) => {
			active_example.value = active_example.value === id ? null : id;
		};

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
                    // .get('/admin/v1/Course/9')
                    .then((response) => {
                        course_table[1].authors = response.data[0]
                        // console.log(response, 'response');
                    })
            })
        })
        
        return {
            active_tab,
            course_info,
            active_example,
            edit_mode,
            edit_info,
            selectTab,
            openEditFrame,
            openExample,
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
            show_error,
            switcherArray
        }
    },
})
</script>

<style scoped lang="sass">
.oil-course-setting
    @include flex_column()
    &__menubar
        display: flex
        align-items: baseline
        gap: rem(16)

        margin-bottom: rem(32)

    &__bread 
        margin-bottom: rem(32)

    &__settings
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
                    .oil-course-setting__settings__table__column__cell
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
                    .oil-course-setting__settings__table__column__cell
                        &:first-child
                            padding: rem(14) rem(8)
                            span
                                background-color: $background-main
                                color: $basic_primary
                                border-radius: rem(16)
                                padding: rem(4) rem(8)
                                line-height: rem(20)

                        .oil-course-setting__settings__table__column__cell__dates
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

    &__info
        width: rem(960)
        &__fields
            border-bottom: rem(1) solid $disabled_basic
            @include flex_start()
            &__cell
                padding: rem(16) rem(8)
                &:nth-child(1)
                    width: rem(272)
                    span
                        color: #5B6C7B

        &__btn 
            margin-top: rem(32)        
            width: fit-content

    &__edit 
        width: rem(672)    
        @include flex_column()
        gap: rem(16)
        &__btns
            width: rem(291)
            gap: rem(12)

            @include flex_start()

        &__example
            &__btn
                @include flex_center_spacing()
                span
                    color: $basic_primary
                    cursor: pointer

                p
                    display: inline-flex

                &__frame
                    @include flex_start()
                    gap: rem(2)

            &__text 
                padding-top: rem(7)
                p
                    color: #5B6C7B

        &__textarea
            margin-bottom: rem(8) 

.oil-course-setting__settings__table__column__cell
    .oil-input
        height: rem(40)
        width: rem(136)

</style>
