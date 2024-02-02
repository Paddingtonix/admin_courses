<template>
    <div class="admin-course-id oilcase__container">
        <h1 class="admin-course-id__title">Содержание курса ({{ course_lang }})</h1>
        <tabs-cmp 
            :tabs="tabs"
            :id="tab_id.value"
            @select="setTabId"
        />
        <general-setting v-if="tab_id.value === 1" :params="params_course"/>
        <!-- <div class="admin-course-id__main-settings admin-course-id__container" v-if="tab_id.value === 1">
            <h3 class="admin-course-id__main-settings__category">Параметры курса</h3>
            <div class="admin-course-id__main-settings__chips">
                <chips-cmp 
                    v-for="chips in chips_list.list"
                    :key="chips.name"
                    :title="chips.name"
                    :counter="chips.count"
                />
            </div>
            <div class="admin-course-id__main-settings__attention" v-if="credit.value">
                <span>Обратите внимание, при частичной покупке ученик не сможет получить сертификат (участник сможет получить сертификат только при покупке всех глав курса)</span>
            </div>
            <div>
                <div class="admin-course-id__main-settings__block">
                    <div class="admin-course-id__main-settings__block__title">
                        <span>Авторы</span>
                        <span>(у курса должен быть хотя бы один автор)</span>
                    </div>
                    <div class="admin-course-id__main-settings__block__inputs-authors">
                        <div                             
                            v-for="(author, idx) in course_setting.authors"
                            :key="idx"
                            class="admin-course-id__main-settings__block__inputs-authors__field"
                        >
                            <input-cmp 
                                :class="{_readonly: !edit_mod.value}"
                                :input_label="'Email'"
                                :input_value="author.email"
                            >
                                <svg @click="openEmailList(true)" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M3.51501 8.465L12 16.95L20.485 8.465L19.071 7.05L12 14.122L4.92901 7.05L3.51501 8.465Z" fill="#ffffff"/>
                                </svg>
                            </input-cmp>
                            <div class="admin-course-id__main-settings__block__inputs-authors__field__list" v-if="email_list.list" v-click-outside="() => openEmailList(false)">
                                <span v-for="email in emails" :key="email.id" @click="author.email = email.text">{{ email.text }}</span>
                            </div>
                            <svg v-if="course_setting.authors.length > 1" @click="deleteAuthors(idx)" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M17 22H7C5.89543 22 5 21.1046 5 20V7H3V5H7V4C7 2.89543 7.89543 2 9 2H15C16.1046 2 17 2.89543 17 4V5H21V7H19V20C19 21.1046 18.1046 22 17 22ZM7 7V20H17V7H7ZM9 4V5H15V4H9ZM15 18H13V9H15V18ZM11 18H9V9H11V18Z" fill="#ffffff"/>
                            </svg>
                        </div>
                    </div>
                    <div class="admin-course-id__main-settings__block__authors" @click="addAuthors" v-if="course_setting.authors.length !== 2 && edit_mod.value">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M12 8V16M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#B1B3B7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span>Добавить автора</span>
                    </div>
                </div>
                <div class="admin-course-id__main-settings__block" v-if="payment.value">
                    <div class="admin-course-id__main-settings__block__title">
                        <span>Стоимость курса</span>
                    </div>
                    <input-cmp 
                        :class="{_readonly: !edit_mod.value}"
                        :input_label="'Цена'"
                        :input_value="course_setting.price"
                    />
                </div>
                <div class="admin-course-id__main-settings__block">
                    <div class="admin-course-id__main-settings__block__title">
                        <span>Дата снятия курса с витрины</span>
                    </div>
                    <input-cmp 
                        :class="{_readonly: !edit_mod.value}"
                        :input_label="'Академических часов'"
                        :input_value="course_setting.price"
                        @click="openCalendarField(true)"
                        v-click-outside="() => openCalendarField(false)"
                    >
                        <svg v-if="edit_mod.value" xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20" fill="none">
                            <path d="M16 20H2C0.89543 20 0 19.1046 0 18V4C0 2.89543 0.89543 2 2 2H4V0H6V2H12V0H14V2H16C17.1046 2 18 2.89543 18 4V18C18 19.1046 17.1046 20 16 20ZM2 8V18H16V8H2ZM2 4V6H16V4H2ZM14 16H12V14H14V16ZM10 16H8V14H10V16ZM6 16H4V14H6V16ZM14 12H12V10H14V12ZM10 12H8V10H10V12ZM6 12H4V10H6V12Z" fill="#ffffff"/>
                        </svg>
                    </input-cmp>
                    <VCalendar class="admin-course-id__main-settings__block__calendar" v-if="open_calendar.date_end && edit_mod.value" borderless :is-dark="isDark" />
                </div>
                <div class="admin-course-id__main-settings__block">
                    <div class="admin-course-id__main-settings__block__title">
                        <span>Длительность курса</span>
                    </div>
                    <input-cmp 
                        :class="{_readonly: !edit_mod.value}"
                        :input_label="'Академических часов'"
                        :input_value="course_setting.price"
                    >
                    </input-cmp>
                </div>
                <div class="admin-course-id__main-settings__block" v-if="synchronous.value">
                    <div class="admin-course-id__main-settings__block__title">
                        <span>Объём работы</span>
                    </div>
                    <input-cmp 
                        :class="{_readonly: !edit_mod.value}"
                        :input_label="'Рабочих дней'"
                        :input_value="course_setting.price"
                    />
                </div>
                <div class="admin-course-id__main-settings__block" v-if="synchronous.value">
                    <div class="admin-course-id__main-settings__block__title">
                        <span>Дата проведения</span>
                        <span>(начало и завершение курса наступят в указанные даты в 00:00 по времени МСК)</span>
                    </div>
                    <div class="admin-course-id__main-settings__block__dates" @click="openDatesCalendarField(true)" v-click-outside="() => openDatesCalendarField(false)">
                        <input-cmp 
                            :class="{_readonly: !edit_mod.value}"
                            :input_label="'ДД.ММ.ГГГГ'"
                            :input_value="course_setting.dates.start"
                        >
                            <svg v-if="edit_mod.value" xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20" fill="none">
                                <path d="M16 20H2C0.89543 20 0 19.1046 0 18V4C0 2.89543 0.89543 2 2 2H4V0H6V2H12V0H14V2H16C17.1046 2 18 2.89543 18 4V18C18 19.1046 17.1046 20 16 20ZM2 8V18H16V8H2ZM2 4V6H16V4H2ZM14 16H12V14H14V16ZM10 16H8V14H10V16ZM6 16H4V14H6V16ZM14 12H12V10H14V12ZM10 12H8V10H10V12ZM6 12H4V10H6V12Z" fill="#ffffff"/>
                            </svg>
                        </input-cmp>
                        <input-cmp 
                            :class="{_readonly: !edit_mod.value}"
                            :input_label="'ДД.ММ.ГГГГ'"
                            :input_value="course_setting.dates.end"
                        >
                            <svg v-if="edit_mod.value" xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20" fill="none">
                                <path d="M16 20H2C0.89543 20 0 19.1046 0 18V4C0 2.89543 0.89543 2 2 2H4V0H6V2H12V0H14V2H16C17.1046 2 18 2.89543 18 4V18C18 19.1046 17.1046 20 16 20ZM2 8V18H16V8H2ZM2 4V6H16V4H2ZM14 16H12V14H14V16ZM10 16H8V14H10V16ZM6 16H4V14H6V16ZM14 12H12V10H14V12ZM10 12H8V10H10V12ZM6 12H4V10H6V12Z" fill="#ffffff"/>
                            </svg>
                        </input-cmp>
                        <VCalendar 
                            class="admin-course-id__main-settings__block__dates__calendar" 
                            v-if="open_calendar.date && edit_mod.value" 
                            borderless 
                            :is-dark="isDark" 
                            :attributes="attrs" 
                            :color="selectedColor"
                        />
                    </div>
                </div>
                <div class="admin-course-id__main-settings__block">
                    <div class="admin-course-id__main-settings__block__title">
                        <span>Направления курса</span>
                        <span>(выберите минимум одно направление)</span>
                    </div>
                    <selector-cmp 
                        v-for="selector in selector_filter"
                        :key="selector"
                        :selector_list="selector.list"
                        :checkbox="selector.checkbox"
                        :selector_placeholder="selector.placeholder"
                        :selector_type="selector.type"
                        @setSelectorValue="saveStateSelector"
                    />
                    <div class="admin-course-id__main-settings__block__category">
                        <div class="admin-course__filters__selectors__direction" v-for="(direction, idx) in select_directions.value" :key="idx" @click="deleteDirection(idx)">
                            <span>{{ direction.selected_checkbox }}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                <path d="M12.5 4L4.5 12M4.5 4L12.5 12" stroke="#808E9D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <btn-cmp 
                v-if="!edit_mod.value"
                class="admin-course-id__main-settings__edit"
                :btn_text="'Редактировать'"
                @click="openEditBlock(true)"
            />
            <div v-else class="admin-course-id__main-settings__btns">
                 <btn-cmp 
                    v-if="edit_mod.value"
                    class="admin-course-id__main-settings__edit"
                    :btn_text="'Отмена'"
                    :btn_type="'secondary'"
                    @click="openEditBlock(false)"
                />
                 <btn-cmp 
                    v-if="edit_mod.value"
                    class="admin-course-id__main-settings__edit"
                    :btn_text="'Сохранить'"
                />
            </div>
        </div> -->
        <div class="admin-course-id__main-settings admin-course-id__container" v-if="tab_id.value === 2">
            <div class="admin-course-id__main-settings__info">
                <div class="admin-course-id__main-settings__info__field" v-for="info in course_setting.course_info.slice(0, 2)" :key="info">
                    <h3 class="admin-course-id__main-settings__info__field__title">{{ info.title }}</h3>
                    <input-cmp 
                        :input_label="info.label"
                        :input_value="info.text"
                    />
                </div>
                <div class="admin-course-id__main-settings__info__field" v-for="info in course_setting.course_info.slice(2)" :key="info">
                    <h3 class="admin-course-id__main-settings__info__field__title">{{ info.title }}</h3>
                    <textarea-cmp 
                        :textarea_label="info.label"
                        :textarea_value="info.text"
                    />
                </div>
            </div>
            <btn-cmp 
                v-if="!edit_mod.value"
                class="admin-course-id__main-settings__edit"
                :btn_text="'Редактировать'"
                @click="openEditBlock(true)"
            />
            <div v-else class="admin-course-id__main-settings__btns">
                 <btn-cmp 
                    v-if="edit_mod.value"
                    class="admin-course-id__main-settings__edit"
                    :btn_text="'Отмена'"
                    :btn_type="'secondary'"
                    @click="openEditBlock(false)"
                />
                 <btn-cmp 
                    v-if="edit_mod.value"
                    class="admin-course-id__main-settings__edit"
                    :btn_text="'Сохранить'"
                />
            </div>
        </div>
        <div class="admin-course-id__main-settings admin-course-id__container" v-if="tab_id.value === 3">
            <div class="admin-course-id__main-settings__attention">
                <span>Структура курса станет доступным для редактирования после нажатия на кнопку <span :style="{'font-weight': bold}">“Редактировать структуру”</span>.</span>
                <span>Для перехода к наполнению разделов, тестов и дополнительных модулей <span :style="{'font-weight': bold}">нажмите на название модуля</span> и перейдите к редактированию страницы</span>
                <span>Основные модули</span>
                <span>Можно изменить названия модулей (Часть, Глава, Раздел и Тест), а также удалить или добавить их. При добавлении Части автоматически создаётся одна Глава, один Раздел и один Тест в этой Части.</span>
                <span>Дополнительные модули</span>
                <span>Примечание: редактирование названий дополнительных модулей недоступно.</span>
                <ul>
                    <li>Вводная страница - страница, на которой можно разместить общую и/или дополнительную информацию о курсе</li>
                    <li>Входной тест - тест для оценки знаний учеников в начале прохождения курса</li>
                    <li>Итоговый тест - тест для оценки знаний учеников в конце прохождения курса</li>
                    <li>Итоги (страница недоступна для удаления) - страница с дополнительной информацией для учеников, прошедших курс (также на этой странице будет доступна опция скачивания сертификата)</li>
                </ul>
            </div>
            <div class="admin-course-id__main-settings__content">
                <div class="_field">
                    <edit-input-cmp 
                        :label="content.intro"
                        :edit_mod="edit_mod.value"
                    />
                </div>
                <div class="_field">
                    <edit-input-cmp
                        :label="content.intro_test"
                        :input_value="''"
                        :edit_mod="edit_mod.value"
                    /> 
                </div>
                <div class="admin-course-id__main-settings__content__part _field" v-for="(part, idx) in content.part" :key="idx">
                    <div class="_field">
                        <edit-input-cmp
                            :label="part.title"
                            :edit_mod="edit_mod.value"
                        />
                    </div>
                    <div class="admin-course-id__main-settings__content__add" @click="addBlock('part', idx, 0, 0)" v-if="edit_mod.value && content.part.length > 0 ">
                        <svg v-if="edit_mod.value" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M12 8V16M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#B1B3B7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span>Добавить часть</span>
                    </div>
                    <div class="admin-course-id__main-settings__content__part__chapter" v-for="(chapter, chapter_idx) in part.chapter" :key="chapter_idx">
                        <div class="_field">
                            <edit-input-cmp
                                :label="chapter.title"
                                :edit_mod="edit_mod.value"
                            />
                        </div>
                        <div class="admin-course-id__main-settings__content__add" @click="addBlock('chapter', idx, chapter_idx, 0)" v-if="edit_mod.value">
                            <svg v-if="edit_mod.value" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M12 8V16M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#B1B3B7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <span>Добавить главу</span>
                        </div>
                        <div class="admin-course-id__main-settings__content__part__chapter" v-for="(section, section_idx) in chapter.section" :key="section_idx">
                            <div class="_field">
                                <edit-input-cmp
                                    :label="section.title"
                                    :edit_mod="edit_mod.value"
                                />
                            </div>
                            <!-- <div class="admin-course-id__main-settings__content__add" @click="addAuthors" v-if="course_setting.authors.length !== 2 && edit_mod.value"> -->
                            <div class="admin-course-id__main-settings__content__add" @click="addBlock('section', idx, chapter_idx, section_idx)" v-if="edit_mod.value">
                                <svg v-if="edit_mod.value" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 8V16M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#B1B3B7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <span>Добавить раздел</span>
                            </div>
                            <div class="_field">
                                <edit-input-cmp
                                    :label="chapter.test"
                                    :edit_mod="edit_mod.value"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="_field">
                    <edit-input-cmp 
                        :label="content.final_test"
                        :edit_mod="edit_mod.value"
                        :input_value="''"
                    />
                </div>
                <div class="_field">
                    <edit-input-cmp
                        :label="content.final"
                        :edit_mod="edit_mod.value"
                        :input_value="''"
                    />
                </div>
                <btn-cmp 
                    v-if="!edit_mod.value"
                    :btn_text="'Редактировать структуру'"
                    class="admin-course-id__main-settings__edit"
                    @click="openEditBlock(true)"
                />
                <div v-else class="admin-course-id__main-settings__btns">
                    <btn-cmp 
                        v-if="edit_mod.value"
                        class="admin-course-id__main-settings__edit"
                        :btn_text="'Отмена'"
                        :btn_type="'secondary'"
                        @click="openEditBlock(false)"
                    />
                    <btn-cmp 
                        v-if="edit_mod.value"
                        class="admin-course-id__main-settings__edit"
                        :btn_text="'Сохранить'"
                    />
                </div>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import generalSetting from '../../../components/blocks/admin_setting/general-setting/general-setting.vue'
import tabsCmp from '../../../components/ui-components/tabs-cmp/tabs-cmp.vue'
// import chipsCmp from '../../../components/ui-components/chips-cmp/chips-cmp.vue'
import inputCmp from '../../../components/ui-components/input-cmp/input-cmp.vue'
// import selectorCmp from '../../../components/ui-components/selector-cmp/selector-cmp.vue'
import btnCmp from '../../../components/ui-components/btn-cmp/btn-cmp.vue'
import textareaCmp from '../../../components/ui-components/textarea-cmp/textarea-cmp.vue'
import editInputCmp from '../../../components/ui-components/edit-input-cmp/edit-input-cmp.vue'
import axios from 'axios'

export default defineComponent({
    setup() {
        const course_lang = 'RU'

        const isDark = ref(true)
        
        const tabs = 
        [
            {
                name: 'Общие настройки курса',
                id: 1
            },
            {
                name: 'Информация о курсе',
                id: 2
            },
            {
                name: 'Содержание',
                id: 3
            }
        ]

        // const chips_list = reactive({
        //     list: [] as Array<[
        //         {
        //             name: string,
        //             count: string,
        //         }
        //     ]>
        // })

        const tab_id = reactive({
            value: 1 as number
        })

        const setTabId = (val: number) => {
            tab_id.value = val
        }

        const edit_mod = reactive({
            value: false
        })

        const openEditBlock = (value: boolean) => {
            edit_mod.value = value
        }

        const open_calendar = reactive({
            date_end: false,
            date: false
        })

        const openCalendarField = (state: boolean) => {
            open_calendar.date_end = state
        }

        const openDatesCalendarField = (state: boolean) => {
            open_calendar.date = state
        }

        const emails = reactive([
            {
                id: 1,
                text: 'pochta1'
            },
            {
                id: 2,
                text: 'pochta2'
            },
            {
                id: 3,
                text: 'pochta3'
            },
            {
                id: 4,
                text: 'pochta4'
            },
            {
                id: 5,
                text: 'pochta5'
            },
            {
                id: 5,
                text: 'pochta6'
            },
        ])

        const course_setting = reactive({
            authors: [
                {
                    email: ''
                }
            ],
            price: '',
            date_end: '',
            hourse: '',
            days: '',
            dates: {
                start: '',
                end: ''
            },
            direction: '',
            course_info: [
                {
                    title: 'Название',
                    label: 'Новый курс по геологии',
                    text: 'Текст'
                },
                {
                    title: 'Авторы',
                    label: 'Если авторов больше одного, перечислите ФИО через запятую',
                    text: ''
                },
                {
                    title: 'Описание',
                    label: 'Краткое описание курса',
                    text: ''
                },
                {
                    title: 'Целевая аудитория',
                    label: 'На кого рассчитан курс',
                    text: ''
                },
                {
                    title: 'Методика обучения',
                    label: 'Описание инструментов обучения',
                    text: ''
                },
                {
                    title: 'Результаты обучения',
                    label: 'Описание результатов обучения с помощью глаголов из таксономии Блума',
                    text: ''
                }
            ]
        })

        const addAuthors = () => {
            course_setting.authors.push({
                email: '',
            })
        }

        const deleteAuthors = (idx: number) => {
            course_setting.authors.splice(idx, 1)
        }

        const email_list = reactive({
            list: false
        })

        const openEmailList = (state: boolean) => {
            email_list.list = state
        }

        const deleteDirection = (idx: number) => {
            select_directions.value.splice(idx, 1)
        }

        const selectedColor = ref('blue');

        const attrs = ref([
            {
                key: 'test',
                highlight: true,
                dates: { start: new Date(2019, 3, 15), end: new Date(2019, 3, 19) },
            }
        ]);

        const select_directions = reactive(
            {
                value: []
            }
        )
            
        const selector_filter = [
            {
                placeholder: 'Направление',
                type: 'direaction',
                checkbox: true,
                list: [
                    {
                        id: 1,
                        name: 'Геология'
                    },
                    {
                        id: 2,
                        name: 'Разработка'
                    },
                    {
                        id: 3,
                        name: 'Бурение'
                    },
                    {
                        id: 4,
                        name: 'Технология добычи'
                    },
                    {
                        id: 5,
                        name: 'Шельф'
                    },
                    {
                        id: 6,
                        name: 'Другое'
                    },
                ]
            },
        ]

        const saveStateSelector = (params: { [key: string]: string } | any) => {
            if(params.type === 'direction') {
                select_directions.value = params.direction
            }
        }

        const synchronous = reactive({
            value: false
        })

        const payment = reactive({
            value: true
        })

        const credit = reactive({
            value: true
        })

        const content = reactive({
            intro: 'Вводная страница',
            intro_test: 'Вводный тест',
            part: [
                {
                    title: 'Часть 1',
                    chapter: [
                        {
                            title: 'Глава 11',
                            test: 'test 11',
                            section: [
                                {
                                    title: 'Раздел 111'
                                }
                            ]
                        }
                    ]  
                }
            ],
            final_test: 'Итоговый тест',
            final: 'Итоги'
                
        })

        const save_value_content = reactive({
            value: ''
        }) 

        const editInput = (val: string) => {
            save_value_content.value = val
        }

        /////////////////////integration

        const endpoints = reactive([
            'http://192.168.19.204:8080/admin/v1/course/filters',
            'http://192.168.19.204:8080/admin/v1/course/1',
            'http://192.168.19.204:8080/admin/v1/course/1/info',
            'http://192.168.19.204:8080/admin/v1/course/1/content'
        ])

        const filters = reactive({
            direction: [] as Array<{
                direaction_id: number,
                direction_name: string,
            }>
        })

        const params_course = reactive({
            settings:  [
                {
                    title: 'Тип' as string,
                    count: '' as string,
                },
                {
                    title: 'Формат' as string,
                    count: '' as string,
                },
                {
                    title: 'Приобретение' as string,
                    count: '' as string,
                },
                {
                    title: 'Доступ' as string,
                    count: '' as string,
                },
            ],
            authors: [] as Array<[string]> | null,
            price_in_rubles: 0 as number,
            duration_academic_hours: 0 as number | null,
            sales_termination_date: 0 as number,
            directions: [] as Array<{
                direction_id: number, 
                direction_name: string
            }>
        })


        axios.all(endpoints.map((endpoint) => 
            axios
                .get(endpoint)))
                .then(axios.spread((filters_response, general_response, info_response, content_response) => {
                    filters.direction = filters_response.data.directions

                    params_course.settings[0].count = general_response.data.course_format
                    params_course.settings[1].count = general_response.data.course_type
                    params_course.settings[2].count = general_response.data.is_free ? 'Бесплатно' : 'Платно'
                    params_course.settings[3].count = general_response.data.is_partial_available ? 'Частичный' : 'Полный'
                    params_course.authors = general_response.data.author_emails
                    params_course.price_in_rubles = general_response.data.price_in_rubles
                    params_course.duration_academic_hours = general_response.data.duration_academic_hours
                    params_course.sales_termination_date = general_response.data.sales_termination_date
                    params_course.directions = general_response.data.directions


                    console.log(general_response, info_response, content_response);
                    
                }))
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {})

        ////////////////////////////////
        const addBlock = (type: string, idx: number, chapter_idx: number, section_idx: number) => {   
            console.log(section_idx);
                     
            if(type === 'part') {                                
                content.part.push(
                    {
                        title: 'Часть 1',
                        chapter: [
                            {
                                title: 'Глава 11',
                                test: 'test 11',
                                section: [
                                    {
                                        title: 'Раздел 111'
                                    }
                                ]
                            }
                        ]  
                    })
                
            } else if(type === 'chapter') {
                content.part[idx].chapter.push(
                    {
                        title: 'Глава 11',
                        test: 'test 11',
                        section: [
                            {
                                title: 'Раздел 111'
                            }
                        ]
                    })                
            } else {
                content.part[idx].chapter[chapter_idx].section.push({
                    title: 'Раздел 111'
                })
            }
        }    

        return {
            course_lang,
            tabs,
            setTabId,
            tab_id,
            // chips_list,
            course_setting,
            edit_mod,
            openEditBlock,
            addAuthors,
            deleteAuthors,
            emails,
            openEmailList,
            email_list,
            isDark,
            openCalendarField,
            open_calendar,
            attrs,
            selectedColor,
            openDatesCalendarField,
            selector_filter,
            select_directions,
            deleteDirection,
            saveStateSelector,
            synchronous,
            payment,
            credit,
            content,
            editInput,
            save_value_content,
            addBlock,


            filters,
            params_course
        }
    },
    components: {
        'tabs-cmp': tabsCmp,
        // 'chips-cmp': chipsCmp,
        'input-cmp': inputCmp,
        'btn-cmp': btnCmp,
        // 'selector-cmp': selectorCmp,
        'textarea-cmp': textareaCmp,
        'edit-input-cmp': editInputCmp,


        'general-setting': generalSetting
    }
})
</script>