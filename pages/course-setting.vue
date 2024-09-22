<template>
    <section class="oil-container">
        <div class="oil-page oil-course-setting">
            <breadCmp 
                :prev_page="'Список курсов'"
                :current_page="course_setting.value.Title"
                class="oil-course-setting__bread"
            />
            <div class="oil-course-setting__menubar">
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
                            :text="'Тип'"
                            :count="course_setting.value.CourseType"
                            :card_type="'texts'"
                        />
                        <CardInfo
                            :text="'Формат'"
                            :count="course_setting.value.CourseFormat"
                            :card_type="'texts'"
                        />
                        <CardInfo
                            :text="'Приобретение'"
                            :count="course_setting.value.IsFree ? 'Бесплатно' : 'Платно'"
                            :card_type="'texts'"
                        />
                        <CardInfo
                            :text="'Доступ'"
                            :count="course_setting.value.IsPartialAvailable ? 'Частичный' : 'Полный'"
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
                                <div v-if="!course_setting.value.IsFree" class="oil-course-setting__settings__table__column__cell">
                                    <span>{{ column.price }}</span>
                                </div>
                                <div class="oil-course-setting__settings__table__column__cell">
                                    <span>{{ column.duration }}</span>
                                </div>
                                <div v-if="course_setting.value.CourseType !== 'Asynchronous'" class="oil-course-setting__settings__table__column__cell">
                                    <span>{{ column.workload }}</span>
                                </div>
                                <div v-if="course_setting.value.CourseType !== 'Asynchronous'" class="oil-course-setting__settings__table__column__cell">
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
                                <div v-if="!course_setting.value.IsFree" class="oil-course-setting__settings__table__column__cell">
                                    <span v-if="course_table[1].price">
                                        {{ column.price }}
                                        <div v-if="course_setting.value.IsPartialAvailable" class="oil-course-setting__settings__table__column__cell__partial-available">
                                            <span class="oil-course-setting__settings__table__column__cell__partial-available__title">Суммарная стоимость всех глав, созданных во вкладке <a>Содержание</a></span>
                                        </div>
                                    </span>
                                    <div v-else class="oil-course-setting__settings__table__column__cell__no-data">
                                        <span class="oil-course-setting__settings__table__column__cell__no-data__title">Нет даных</span>
                                        <span class="oil-course-setting__settings__table__column__cell__no-data__subtitle">Пример: 99 999</span>
                                    </div>
                                </div>
                                <div v-if="course_setting.value.CourseType !== 'Asynchronous'" class="oil-course-setting__settings__table__column__cell">
                                    <span v-if="course_table[1].duration">{{ column.duration }}</span>
                                    <div v-else class="oil-course-setting__settings__table__column__cell__no-data">
                                        <template v-if="!course_table[1].duration">
                                            {{ course_table[1].duration }}
                                            <span class="oil-course-setting__settings__table__column__cell__no-data__title">Нет даных</span>
                                            <span class="oil-course-setting__settings__table__column__cell__no-data__subtitle">Пример: 100</span>
                                        </template>
                                        <span v-else> {{ course_table[1].duration }}</span>
                                    </div>
                                </div>
                                <div class="oil-course-setting__settings__table__column__cell">
                                    <span v-if="course_table[1].workload">{{ column.workload }}</span>
                                    <div v-else class="oil-course-setting__settings__table__column__cell__no-data">
                                        <span class="oil-course-setting__settings__table__column__cell__no-data__title">Нет даных</span>
                                        <span class="oil-course-setting__settings__table__column__cell__no-data__subtitle">Пример: 50</span>
                                    </div>
                                </div>
                                <div v-if="course_setting.value.CourseType !== 'Asynchronous'" class="oil-course-setting__settings__table__column__cell">
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
                                    <div v-if="chooses_direction.value.length" class="oil-course-setting__settings__table__column__cell__direction">
                                        <DirectionCmp
                                            v-for="(direction, direction_idx) in chooses_direction.value"
                                            :key="direction_idx"
                                            :text="direction.localizedName"
                                            :id="direction.directionId"
                                            :picked=true
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
                                <div class="oil-course-setting__settings__table__column__cell" v-for="(input, input_idx) in filtered_inputs" :key="input_idx + 1">
                                    <InputCmp 
                                        :placeholder="input.placeholder"
                                        :mask_type="input.mask_type"
                                        @set_value="updateFormData($event, input_idx)"
                                    />
                                </div>
                                <div v-if="course_setting.value.CourseType !== 'Asynchronous'" class="oil-course-setting__settings__table__column__cell">
                                    <div class="oil-course-setting__settings__table__column__cell__dates">
                                        <CalendarCmp
                                            @update-date="handleDateUpdate($event, 'start')"
                                        />
                                        <span>—</span>
                                        <CalendarCmp 
                                            @update-date="handleDateUpdate($event, 'end')"
                                        />
                                    </div>
                                </div>
                                <div class="oil-course-setting__settings__table__column__cell">
                                    <CalendarCmp 
                                        @update-date="handleDateUpdate($event, 'remove')"
                                    />
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
                        v-if="!storeEditCourseSetting.isEdit"
                        class="oil-course-setting__settings__btn"
                        :text="'Редактировать'"
                        @click="openEditCourseSetting"
                    />
                    <div class="oil-course-setting__settings__setting-btns" v-if="storeEditCourseSetting.isEdit">
                        <BtnCmp
                            class="oil-course-setting__settings__btn"
                            :text="'Отмена'"
                            :background_type="'_secondary'"
                            @click="canselEditCourseSetting"
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
                    <BtnCmp
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
                <div class="oil-course-setting__content">
                    <div class="oil-course-setting__content__edu">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#323C46" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span>Как работать с содержанием модуля?</span>
                        <svg class="oil-course-setting__content__edu__chevron" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 9L12 15L18 9" stroke="#374351" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div class="oil-course-setting__content__container" v-if="!preloader.value">
                        <div
                            class="oil-course-setting__content__container__inner"
                            :class="{
                                _filled: content_inner.value.initialPage, 
                                _disable: edit_field.type_field !== '' && edit_field.idx_field !== null
                            }"
                            @mousemove="createBlock($event, 'introductory')"
                        >
                            <template v-if="content_inner.value.initialPage">
                                <span>{{ content_inner.value.initialPage.title === null ? 'Входная страница' : content_inner.value.initialPage.title }}</span>
                                <CourseArchitectureIcons 
                                    :arrow="false"
                                    :delete_id="content_inner.value.initialPage.id"
                                    :delete_type="'Page'"
                                    @delete-trigger="reloadContent"
                                />
                            </template>
                            <transition name="fade">
                                <CourseArchitectureAddBlock 
                                    v-if="!content_inner.value.initialPage"
                                    :style="{top: -15 + 'px'}"
                                    :btn_text="!content_inner.value.initialPage && !content_inner.value.initialTesting ? 'вводную страницу и входной тест' : 'вводную страницу'"
                                    :request_type="{type:'Page', query: 'courseId'}"
                                    :block_id="Number($route.query.course) || undefined"
                                    @request-trigger="reloadContent"
                                />     
                            </transition>
                        </div>
                        <div
                            class="oil-course-setting__content__container__inner"
                            :class="{
                                _filled: content_inner.value.initialTesting,
                                _disable: edit_field.type_field !== '' && edit_field.idx_field !== null
                            }"
                            @mousemove="createBlock($event, 'start_test')"
                        >
                            <template v-if="content_inner.value.initialTesting">
                                <span>{{ content_inner.value.initialTesting.title === null ? 'Вводная страница' : content_inner.value.initialTesting.title }}</span>
                                <CourseArchitectureIcons 
                                    :arrow="false"
                                    :delete_id="content_inner.value.initialTesting.id"
                                    :delete_type="'Testing'"
                                    @delete-trigger="reloadContent"
                                />
                            </template>
                            <transition name="fade">
                                <CourseArchitectureAddBlock 
                                    v-if="!content_inner.value.initialTesting && content_inner.value.initialPage"
                                    :style="{top: -15 + 'px'}"
                                    :btn_text="'входной тест'"
                                    :request_type="{type: 'Testing', query: 'courseId', testing_type: 'Entrance'}"
                                    :block_id="Number($route.query.course) || undefined"
                                    @request-trigger="reloadContent"
                                />       
                            </transition>
                        </div>
                        <template
                            v-for="(part, idx) in content_inner.value.parts"
                            :key="idx"
                        >
                            <div
                                class="oil-course-setting__content__container__inner"
                                @mousemove="createBlock($event, 'part')"
                                :class="{
                                    _filled: part, 
                                    _active: edit_field.type_field === 'Part' && edit_field.idx_field === idx,
                                    _disable: (edit_field.type_field !== 'Part' || edit_field.idx_field !== idx) && edit_field.idx_field !== null
                                }"

                            >
                                <span>{{ part.title === null ? 'Вводная страница' : part.title }}</span>
                                <input 
                                    v-if="edit_field.type_field === 'Part' && edit_field.idx_field === idx"
                                    class="oil-course-setting__content__container__inner__input"
                                    v-model="changes_value.value"
                                />
                                <CourseArchitectureIcons 
                                    :delete_id="part.id"
                                    :delete_type="'Part'"
                                    @delete-trigger="reloadContent"
                                    @edit-trigger="editTitle($event, idx, 'Part', part.id)"
                                    :arrow="{up: !idx ? false: true, down: idx === content_inner.value.parts.length - 1 ? false : true}"
                                />
                                <transition name="fade">
                                    <CourseArchitectureAddBlock 
                                        :btn_text="'часть'"
                                        :request_type="{type:'Part', query: 'courseId'}"
                                        :block_id="Number($route.query.course) || undefined"
                                        @request-trigger="reloadContent"
                                        v-if="idx === content_inner.value.parts.length - 1"
                                    />     
                                </transition>
                            </div>
                            <template v-for="(chapter, idx) in part.chapters" :key="idx">
                                <div 
                                    class="oil-course-setting__content__container__inner _chapter"
                                    @mousemove="createBlock($event, 'chapter')"
                                    :class="{
                                        _filled: chapter, 
                                        _active: edit_field.type_field === 'Chapter' && edit_field.idx_field === idx,
                                        _disable: (edit_field.type_field !== 'Chapter' || edit_field.idx_field !== idx) && edit_field.idx_field !== null}"
                                >
                                    <span>{{ chapter.title === null ? 'Вводная страница' : chapter.title }}</span>
                                    <input 
                                        v-if="edit_field.type_field === 'Chapter' && edit_field.idx_field === idx"
                                        class="oil-course-setting__content__container__inner__input"
                                        v-model="changes_value.value"
                                    />
                                    <CourseArchitectureIcons 
                                        :delete_id="chapter.id"
                                        :delete_type="'Chapter'"
                                        @delete-trigger="reloadContent"
                                        @edit-trigger="editTitle($event, idx, 'Chapter', chapter.id)"
                                        :arrow="{up: !idx ? false: true, down: idx ===  part.chapters.length - 1 ? false : true}"
                                    />
                                    <transition name="fade">
                                        <CourseArchitectureAddBlock 
                                            :btn_text="'главу'"
                                            :request_type="{type:'Chapter', query: 'partId'}"
                                            :block_id="part.id"
                                            @request-trigger="reloadContent"
                                            v-if="idx === part.chapters.length - 1"
                                        />     
                                    </transition>
                                </div>
                                <div 
                                    class="oil-course-setting__content__container__inner _section"
                                    @mousemove="createBlock($event, 'section')"
                                    :class="{
                                        _filled: section, 
                                        _active: edit_field.type_field === 'Section' && edit_field.idx_field === idx,
                                        _disable: (edit_field.type_field !== 'Section' || edit_field.idx_field !== idx) && edit_field.idx_field !== null
                                    }"
                                    v-for="(section, idx) in chapter.sections"
                                    :key="idx"
                                >
                                    <span>{{ section.title === null ? 'Вводная страница' : section.title }}</span>
                                    <input 
                                        v-if="edit_field.type_field === 'Section' && edit_field.idx_field === idx"
                                        class="oil-course-setting__content__container__inner__input"
                                        v-model="changes_value.value"
                                    />
                                    <CourseArchitectureIcons 
                                        :delete_id="section.id"
                                        :delete_type="'Section'"
                                        @delete-trigger="reloadContent"
                                        @edit-trigger="editTitle($event, idx, 'Section', section.id)"
                                        :arrow="{up: !idx ? false: true, down: idx === chapter.sections.length - 1 ? false : true}"
                                    />
                                    <transition name="fade">
                                        <CourseArchitectureAddBlock 
                                            :btn_text="'раздел'"
                                            :request_type="{type:'Section', query: 'chapterId'}"
                                            :block_id="chapter.id"
                                            @request-trigger="reloadContent"
                                            v-if="idx === chapter.sections.length - 1"
                                        />     
                                    </transition>
                                </div>
                                <div 
                                    class="oil-course-setting__content__container__inner _chapter"
                                    :class="{
                                        _filled: chapter, 
                                        _active: edit_field.type_field === 'testing' && edit_field.idx_field === idx,
                                        _disable: edit_field.type_field !== '' && edit_field.idx_field !== null
                                    }"
                                >
                                    <span>{{ chapter.testing.title === null ? 'Вводная страница' : chapter.testing.title }}</span>
                                    <input 
                                        v-if="edit_field.type_field === 'testing' && edit_field.idx_field === idx"
                                        class="oil-course-setting__content__container__inner__input"
                                        v-model="changes_value.value"
                                    />
                                    <CourseArchitectureIcons 
                                        :delete_id="chapter.id"
                                        :delete_type="'Chapter'"
                                        @delete-trigger="reloadContent"
                                    />
                                </div>
                            </template>
                        </template>
                        <div
                            class="oil-course-setting__content__container__inner"
                            :class="{
                                _filled: content_inner.value.finalTesting, 
                                _active: edit_field.type_field === 'final_test' && edit_field.idx_field === idx,
                                _disable: edit_field.type_field !== '' && edit_field.idx_field !== null
                            }"
                            @mousemove="createBlock($event, 'final_test')"
                        >
                            <template v-if="content_inner.value.finalTesting">
                                <span>{{ content_inner.value.finalTesting.title === null ? 'Вводная страница' : content_inner.value.finalTesting.title }}</span>
                                <CourseArchitectureIcons 
                                    :delete_id="content_inner.value.finalTesting.id"
                                    :delete_type="'Testing'"
                                    @delete-trigger="reloadContent"
                                />
                            </template>
                            <transition name="fade">
                                <CourseArchitectureAddBlock 
                                    v-if="!content_inner.value.finalTesting"
                                    :style="{top: -15 + 'px'}"
                                    :btn_text="'итоговый тест'"
                                    :request_type="{type: 'Testing', query: 'courseId', testing_type: 'Final'}"
                                    :block_id="Number($route.query.course) || undefined"
                                    @request-trigger="reloadContent"
                                />     
                            </transition>
                        </div>
                        <div
                            class="oil-course-setting__content__container__inner"
                            :class="{_filled: content_inner.value.finalPage, 
                                _disable: edit_field.type_field !== '' && edit_field.idx_field !== null
                            }"
                        >
                            <span>{{ content_inner.value.finalPage.title === null ? 'Итоги' : content_inner.value.finalPage.title }}</span>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </section>
</template>

<script lang="ts">
import axios from 'axios'
import { defineComponent } from 'vue'
import { useStoreCourses } from '~/src/stores/storeCourse'
import { useStoreEditCourseSetting } from '~/src/stores/storeEditCourseSetting'
import type { Direction } from '~/src/ts-interface/direction'
import type ISwitcher from '~/src/ts-interface/switcher.type'
import { useRoute } from 'vue-router'
 
export default defineComponent({
    setup() {
        const storeEditCourseSetting = useStoreEditCourseSetting()
        const storeStateCourse = useStoreCourses()

        const route = useRoute()
        const active_tab = ref<number>(3)
        const show_error = ref<boolean>(false)
        const tooltip_id = ref<string>('')
        const editInput = ref(null) as any
        const directions = reactive<Direction[]>([])
        const original_directions = ref<number[]>([])
        const picked_directions = reactive<any>([])
        const chooses_direction = reactive({
            value: [] as Direction[]
        })

        const reload_state = reactive({
            value: false as boolean
        })

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
		})

        const course_setting = reactive({
            value: {
                Title: '' as string,
                CourseType: '' as string,
                CourseFormat: '' as string,
                PriceInRubles: 0 as number,
                IsPartialAvailable: false as boolean,
                IsFree: false as boolean,
                DurationAcademicHours: 0 as number,
                DurationWorkDays: 0 as number,
                DateStart: '' as string,
                DateFinish: '' as string,
                SalesTerminationDate: '' as string,
            }
        })

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
        ])

        const preloader = reactive({
            value: true as boolean
        })

        const content_inner = reactive({
            value: [] as any
        })

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

        const filtered_inputs = computed(() => {
            if (course_setting.value.CourseType === 'Asynchronous' && course_setting.value.IsFree) {
                return inputs.filter((_, input_idx) => input_idx === 1)

            } else if (course_setting.value.CourseType === 'Asynchronous') {
                return inputs.slice(0, 2)

            } else if (course_setting.value.IsFree) {
                return inputs.slice(1)

            } else {
                return inputs
            }
        })

        const visible_block = reactive({
            value: ''
        })

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
		])

        const edit_field = reactive({
            idx_field: null as null | number,
            type_field: null as null | string
        })


        const changes_value = reactive({
            value: ''
        })

		const selectTab = (id: number) => {            
			active_tab.value = id;
		};

		const openEditFrame = () => {
			edit_mode.value = !edit_mode.value
		};

		const openExample = (id: number) => {
			active_example.value = active_example.value === id ? null : id
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

        const openEditCourseSetting = () => {
            storeEditCourseSetting.edit()
            original_directions.value = [...picked_directions]
        }

        const canselEditCourseSetting = () => {
            storeEditCourseSetting.canselEdit()
            picked_directions.splice(0, picked_directions.length, ...original_directions.value)
        }

        const handleDateUpdate = (date: string, type: string) => {
            switch (type) {
                case 'start':                    
                    course_table[1].start_date = date
                    break
            
                case 'end':
                    course_table[1].end_date = date
                    break
            
                case 'remove':
                    course_table[1].removed_date = date
                    break
            
                default:
                    break
            }
        }

        const editTitle = (state: boolean, idx: number, type: string, id: number) => {
            if(state) {
                edit_field.idx_field = idx
                edit_field.type_field = type
            } else {
                axios
                    .patch(`/admin/v1/${edit_field.type_field}/${id}`, {
                        title: changes_value.value
                    })
                    .then((resp) => {
                        console.log(resp)
                    })
                    .finally(() => {
                        edit_field.idx_field = null
                        edit_field.type_field = null
                    })
            }
        }

        const formatDate = (date_value: string): string => {
            const date = new Date(date_value)
            const day = String(date.getDate()).padStart(2, '0')
            const month = String(date.getMonth() + 1).padStart(2, '0')
            const year = String(date.getFullYear()).slice(-2)

            return `${day}.${month}.${year}`
        }

        // объект собирающий данные для POST запроса
        const formData = reactive({
            directionIds: [] as number[],
            authorEmails: [] as string[],
            priceInRubles: 0 as number,
            durationAcademicHours: 0 as number,
            durationWorkDays: 0 as number,
            dateStart: '',
            dateFinish: '',
            salesTerminationDate: '',
        })

        const updateFormData = (event: { value: string, type: string }, index: number) => {
            switch(index) {
                case 0:
                    course_table[1].price = event.value
                    break
                case 1:
                    course_table[1].duration = event.value
                    break
                case 2:
                    course_table[1].workload = event.value
                    break
            }
        }

        const saveSettings = () => {
            if (picked_directions_filtered.value.length === 0) {
                show_error.value = true
            } else {
                show_error.value = false
                storeEditCourseSetting.canselEdit()
                formData.directionIds = picked_directions
                formData.authorEmails = [course_table[1].authors]
                formData.priceInRubles = parseFloat(course_table[1].price.replace(/\s/g, ''))
                formData.durationAcademicHours = parseFloat(course_table[1].duration.replace(/\s/g, ''))
                formData.durationWorkDays = parseFloat(course_table[1].workload.replace(/\s/g, ''))
                formData.dateStart = new Date(course_table[1].start_date!).toISOString()
                formData.dateFinish = new Date(course_table[1].end_date!).toISOString()
                formData.salesTerminationDate = new Date(course_table[1].removed_date!).toISOString()
                console.log(formData, 'formData')
                axios
                    .patch(`/admin/v1/Course/${route.query.search}/settings`, formData)
                    .then(response => {
                        storeEditCourseSetting.canselEdit()
                        original_directions.value = [...picked_directions]
                        console.log(response.data, 'info_course.data')
                    })
                    .catch(error => {
                        console.error('Ошибка при сохранении настроек курса:', error)
                    })
                    .finally(() => {
                        axios
                            .get(`/admin/v1/Course/${route.query.search}`)
                            .then((info_course) => {
                                course_setting.value = info_course.data
                                course_table[1].price = String(info_course.data.PriceInRubles).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
                                course_table[1].duration = String(info_course.data.DurationAcademicHours).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
                                course_table[1].workload = String(info_course.data.DurationWorkDays).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
                                course_table[1].start_date = formatDate(info_course.data.DateStart)
                                course_table[1].end_date = formatDate(info_course.data.DateFinish)
                                course_table[1].removed_date = formatDate(info_course.data.SalesTerminationDate)
                                preloader.value = false
                                chooses_direction.value = info_course.data.Directions.map((direction: any) => ({
                                    directionId: direction.id,
                                    localizedName: direction.name
                                }))
                                console.log(info_course.data, 'info_course.data');
                            })
                            .catch(error => {
                                console.error('Ошибка при загрузке данных курса:', error)
                            })
                    })
            }
        }

        const reloadContent = (val: boolean) => {
            reload_state.value = val
        }

        const createBlock = (e: { offsetY: number; }, block_type: string) => {
            if(e.offsetY <= 50 && e.offsetY >= 40) {
                visible_block.value = block_type
            }
        }
        
        watch(picked_directions_filtered, (new_value) => {
            if (new_value.length > 0) {
                show_error.value = false
            }
        })

        watch(reload_state, () => {            
            if(reload_state.value) {
                axios
                    .get(`/admin/v1/Course/${route.query.search}/content`)
                    .then((struct_response) => {
                        content_inner.value = struct_response.data
                        reload_state.value = false
                    })
            }
        })

        watch(edit_field, () => {
            nextTick(() => {
                if(editInput.value) {
                    editInput.value.focus()
                }
            })
        })

        const pick_direction = (dir: { id: number, picked: boolean }) => {
            if (dir.picked) {
                picked_directions.push(dir.id)
            } else {
                picked_directions.splice(picked_directions.indexOf(dir.id), 1)
            }
            console.log('Выбранные направления:', picked_directions)
        }

        onMounted(() => {
            nextTick(() => {
                axios
                    .get('admin/v1/direction')
                    .then((response) => {
                        directions.splice(0, directions.length, ...response.data.directions)
                        console.log(response.data.directions, 'server-direction')
                    })
                    .catch((error) => {
                        console.error('Ошибка при получении данных направлений:', error)
                    })

                // ЗАПРОС АВТОРА КУРСА
                axios
                    .get('admin/v1/user/authors')
                    .then((response) => {
                        course_table[1].authors = response.data[0]
                    })
                
                
                axios
                    .get(`/admin/v1/Course/${route.query.search}/content`)
                    .then((struct_response) => {
                        content_inner.value = struct_response.data
                        preloader.value = false
                    })
                    
                axios
                    .get(`/admin/v1/Course/${route.query.search}`)
                    .then((info_course) => {
                        course_setting.value = info_course.data
                        // Обновление данных в таблице
                        course_table[1].price = String(info_course.data.PriceInRubles).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
                        course_table[1].duration = String(info_course.data.DurationAcademicHours).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
                        course_table[1].workload = String(info_course.data.DurationWorkDays).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
                        course_table[1].start_date = formatDate(info_course.data.DateStart)
                        course_table[1].end_date = formatDate(info_course.data.DateFinish)
                        course_table[1].removed_date = formatDate(info_course.data.SalesTerminationDate)
                        chooses_direction.value = info_course.data.Directions.map((direction: {id: number, name: string}) => ({
                            directionId: direction.id,
                            localizedName: direction.name
                        }))
                        preloader.value = false
                        console.log(chooses_direction.value, 'chooses_direction.value');
                        console.log(info_course.data.Directions, 'info_course.data.Directions');
                        console.log(info_course.data, 'info_course.data');
                    })
                    .catch(error => {
                        console.error('Ошибка при загрузке данных курса:', error)
                    })
            })})
        
        return {
            active_tab,
            course_info,
            active_example,
            edit_mode,
            edit_info,
            content_inner,
            course_setting,
            course_table,
            tooltip_id,
            tooltips,
            setTooltipText,
            storeEditCourseSetting,
            storeStateCourse,
            inputs,
            directions,
            picked_directions,
            picked_directions_filtered,
            show_error,
            switcherArray,
            visible_block,
            preloader,
            edit_field,
            changes_value,
            chooses_direction,
            filtered_inputs,
            selectTab,
            openEditFrame,
            openExample,
            showTooltip,
            hideTooltip,
            openEditCourseSetting,
            saveSettings,
            pick_direction,
            createBlock,
            reloadContent,
            editTitle,
            canselEditCourseSetting,
            updateFormData,
            handleDateUpdate,
            formatDate
        }}})
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
                        flex-wrap: wrap
                        gap: rem(8)
                        min-height: rem(40)
                        align-items: center
                        span
                            position: absolute
                            bottom: rem(-6)
                            font-size: 12px
                            line-height: 16px
                            color: $basic_error

                    &__partial-available
                        position: absolute
                        font-size: rem(12)
                        top: rem(42)
                        &__title
                            color: #9AA7BB
                        
                        a
                            color: $light_primary
                            cursor: pointer
                            transition: color 0.2s
                            &:hover
                                color: $basic_primary

                &:first-child
                    width: rem(360)
                    flex-shrink: 0
                    display: flex
                    flex-direction: column
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
                                    
                        &:last-child
                            flex-grow: 1
                            align-items: center

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

    &__content
        &__edu 
            padding: rem(16) rem(24)
            @include flex_start()
            gap: rem(12)
            max-width: rem(972)
            margin-bottom: rem(32)

            border-radius: rem(8)
            border: rem(1) solid $light_gray
            background-color: $basic_light_gray
            position: relative
            &__chevron 
                position: absolute
                right: rem(24)
                top: 50%
                transform: translateY(-50%)

        &__container 
            border: rem(1) solid $light_gray
            border-radius: rem(8)
            position: relative

            max-width: rem(972)
            &__inner
                background-color: $basic_light_gray
                @include flex_start()
                gap: rem(4)
                position: relative

                &._filled
                    padding: rem(16) rem(24)
         
                    cursor: pointer
                    transition: background .2s
                    .oil-architecture__icons
                        opacity: 0
                        transition: opacity .2s

                    .oil-architecture__btn
                        bottom: 0
                        opacity: 0
                        transition: opacity .2s
                
                &._disable 
                    opacity: .4
                    pointer-events: none
                
                &:hover 
                    background-color: $disabled_basic
                    .oil-architecture__icons
                        opacity: 1
                    
                    .oil-architecture__btn
                        opacity: 1
                
                &._active 
                    .oil-architecture__icons
                        opacity: 0
                    
                    .oil-architecture__btn
                        opacity: 0

                &:first-child
                    border-radius: rem(8) rem(8) 0 0

                &:not(:last-child)
                    border-bottom: rem(1) solid $light_gray
                
                &:last-child
                    border-radius:0 0 rem(8) rem(8) 
                
                &._chapter
                    padding-left: rem(48)
                
                &._section 
                    padding-left: rem(64)
                
                &__text 
                    color: $basic_primary
                    font-weight: bold

                &__input 
                    border: rem(1) solid $light_gray
                    border-radius: rem(4)
                    width: calc(100% - rem(140))
                    padding: rem(1) rem(16)
                // &__icons 
                //     @include flex_start()
                //     gap: rem(16)

                // &__line 
                //     position: absolute
                //     bottom: 0
                //     left: 0
                //     width: 100%
                //     height: rem(2)
                //     background-color: $light_primary

                // &__create 
                //     padding: rem(8) rem(16)
                //     border: rem(1) solid $light_primary
                //     border-radius: rem(8)
                //     @include flex_start()

                //     cursor: pointer
                //     gap: rem(8)
                //     background-color: $basic_white
                //     position: absolute
                //     top: rem(32)
                //     left: 50%
                //     transform: translateX(-50%)
                //     z-index: 2
                //     span 
                //         color: $light_primary
                //         font-weight: bold

.oil-course-setting__settings__table__column__cell
    .oil-input
        height: rem(40)
        width: rem(136)

</style>
