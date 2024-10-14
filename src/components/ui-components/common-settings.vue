<template>
    <div class="oil-course-setting__settings">
        <div class="oil-course-setting__settings__cards">
            <CardInfo
                :text="'Тип'"
                :count="
                    _course_type_translation[course_setting.value.CourseType]
                "
                :card_type="'texts'"
            />
            <CardInfo
                :text="'Формат'"
                :count="
                    _course_format_translation[
                        course_setting.value.CourseFormat
                    ]
                "
                :card_type="'texts'"
            />
            <CardInfo
                :text="'Приобретение'"
                :count="course_setting.value.IsFree ? 'Бесплатно' : 'Платно'"
                :card_type="'texts'"
            />
            <CardInfo
                :text="'Доступ'"
                :count="
                    course_setting.value.IsPartialAvailable
                        ? 'Частичный'
                        : 'Полный'
                "
                :card_type="'texts'"
            />
        </div>
        <div
            v-if="course_setting.value.IsPartialAvailable"
            class="oil-course-setting__settings__notification"
        >
            <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g clip-path="url(#clip0_5268_74130)">
                    <circle
                        cx="32"
                        cy="32"
                        r="32"
                        fill="#F9AD4E"
                        fill-opacity="0.1"
                    />
                    <path
                        d="M32.0002 26.9999V33.6666M32.0002 40.3332H32.0169M29.6924 18.4861L15.9843 42.1638C15.224 43.4771 14.8438 44.1338 14.9 44.6727C14.949 45.1428 15.1953 45.57 15.5775 45.8479C16.0158 46.1666 16.7746 46.1666 18.2921 46.1666H45.7084C47.2259 46.1666 47.9847 46.1666 48.423 45.8479C48.8052 45.57 49.0515 45.1428 49.1005 44.6727C49.1567 44.1338 48.7765 43.4771 48.0162 42.1638L34.308 18.4861C33.5504 17.1775 33.1716 16.5232 32.6774 16.3034C32.2463 16.1117 31.7542 16.1117 31.3231 16.3034C30.8289 16.5232 30.4501 17.1775 29.6924 18.4861Z"
                        stroke="#F9AD4E"
                        stroke-width="3.33"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </g>
                <defs>
                    <clipPath id="clip0_5268_74130">
                        <rect width="64" height="64" fill="white" />
                    </clipPath>
                </defs>
            </svg>
            <p class="oil-course-setting__settings__notification__text">
                Обратите внимание, при частичной покупке ученик не сможет
                получить сертификат (участник сможет получить сертификат только
                при покупке всех глав курса)
            </p>
        </div>
        <div class="oil-course-setting__settings__table">
            <template
                v-for="(column, column_idx) in course_table"
                :key="column_idx"
            >
                <div
                    v-if="!column_idx"
                    class="oil-course-setting__settings__table__column"
                >
                    <div
                        class="oil-course-setting__settings__table__column__cell"
                    >
                        <span>{{ column.authors }}</span>
                        <div
                            class="oil-course-setting__settings__table__column__cell__tooltip-container"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                @mouseenter="showTooltip('authors')"
                                @mouseleave="hideTooltip()"
                            >
                                <g clip-path="url(#clip0_799_14059)">
                                    <path
                                        d="M9.99935 13.3327V9.99935M9.99935 6.66602H10.0077M18.3327 9.99935C18.3327 14.6017 14.6017 18.3327 9.99935 18.3327C5.39698 18.3327 1.66602 14.6017 1.66602 9.99935C1.66602 5.39698 5.39698 1.66602 9.99935 1.66602C14.6017 1.66602 18.3327 5.39698 18.3327 9.99935Z"
                                        stroke="#B6C2D0"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_799_14059">
                                        <rect
                                            width="20"
                                            height="20"
                                            fill="white"
                                        />
                                    </clipPath>
                                </defs>
                            </svg>
                            <transition name="fade">
                                <div
                                    class="oil-course-setting__settings__table__column__cell__tooltip"
                                    v-if="tooltip_id === 'authors'"
                                >
                                    <span
                                        class="oil-course-setting__settings__table__column__cell__tooltip__text"
                                        v-html="setTooltipText('authors')"
                                    ></span>
                                </div>
                            </transition>
                        </div>
                    </div>
                    <div
                        v-if="!course_setting.value.IsFree"
                        class="oil-course-setting__settings__table__column__cell"
                    >
                        <span>{{ column.price }}</span>
                    </div>
                    <div
                        class="oil-course-setting__settings__table__column__cell"
                    >
                        <span>{{ column.duration }}</span>
                    </div>
                    <div
                        v-if="
                            course_setting.value.CourseType !== 'Asynchronous'
                        "
                        class="oil-course-setting__settings__table__column__cell"
                    >
                        <span>{{ column.workload }}</span>
                    </div>
                    <div
                        v-if="
                            course_setting.value.CourseType !== 'Asynchronous'
                        "
                        class="oil-course-setting__settings__table__column__cell"
                    >
                        <span>{{ column.start_end_dates }}</span>
                        <div
                            class="oil-course-setting__settings__table__column__cell__tooltip-container"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                @mouseenter="showTooltip('dates_start_end')"
                                @mouseleave="hideTooltip()"
                            >
                                <g clip-path="url(#clip0_799_14059)">
                                    <path
                                        d="M9.99935 13.3327V9.99935M9.99935 6.66602H10.0077M18.3327 9.99935C18.3327 14.6017 14.6017 18.3327 9.99935 18.3327C5.39698 18.3327 1.66602 14.6017 1.66602 9.99935C1.66602 5.39698 5.39698 1.66602 9.99935 1.66602C14.6017 1.66602 18.3327 5.39698 18.3327 9.99935Z"
                                        stroke="#B6C2D0"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_799_14059">
                                        <rect
                                            width="20"
                                            height="20"
                                            fill="white"
                                        />
                                    </clipPath>
                                </defs>
                            </svg>
                            <transition name="fade">
                                <div
                                    class="oil-course-setting__settings__table__column__cell__tooltip"
                                    v-if="tooltip_id === 'dates_start_end'"
                                >
                                    <span
                                        class="oil-course-setting__settings__table__column__cell__tooltip__text"
                                        >{{
                                            setTooltipText("dates_start_end")
                                        }}</span
                                    >
                                </div>
                            </transition>
                        </div>
                    </div>
                    <div
                        class="oil-course-setting__settings__table__column__cell"
                    >
                        <span>{{ column.removed_date }}</span>
                        <div
                            class="oil-course-setting__settings__table__column__cell__tooltip-container"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                @mouseenter="showTooltip('date_removed')"
                                @mouseleave="hideTooltip()"
                            >
                                <g clip-path="url(#clip0_799_14059)">
                                    <path
                                        d="M9.99935 13.3327V9.99935M9.99935 6.66602H10.0077M18.3327 9.99935C18.3327 14.6017 14.6017 18.3327 9.99935 18.3327C5.39698 18.3327 1.66602 14.6017 1.66602 9.99935C1.66602 5.39698 5.39698 1.66602 9.99935 1.66602C14.6017 1.66602 18.3327 5.39698 18.3327 9.99935Z"
                                        stroke="#B6C2D0"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_799_14059">
                                        <rect
                                            width="20"
                                            height="20"
                                            fill="white"
                                        />
                                    </clipPath>
                                </defs>
                            </svg>
                            <transition name="fade">
                                <div
                                    class="oil-course-setting__settings__table__column__cell__tooltip"
                                    v-if="tooltip_id === 'date_removed'"
                                >
                                    <span
                                        class="oil-course-setting__settings__table__column__cell__tooltip__text"
                                        >{{
                                            setTooltipText("date_removed")
                                        }}</span
                                    >
                                </div>
                            </transition>
                        </div>
                    </div>
                    <div
                        class="oil-course-setting__settings__table__column__cell"
                    >
                        <span>{{ column.direction }}</span>
                        <div
                            class="oil-course-setting__settings__table__column__cell__tooltip-container"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                @mouseenter="showTooltip('direction')"
                                @mouseleave="hideTooltip()"
                            >
                                <g clip-path="url(#clip0_799_14059)">
                                    <path
                                        d="M9.99935 13.3327V9.99935M9.99935 6.66602H10.0077M18.3327 9.99935C18.3327 14.6017 14.6017 18.3327 9.99935 18.3327C5.39698 18.3327 1.66602 14.6017 1.66602 9.99935C1.66602 5.39698 5.39698 1.66602 9.99935 1.66602C14.6017 1.66602 18.3327 5.39698 18.3327 9.99935Z"
                                        stroke="#B6C2D0"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_799_14059">
                                        <rect
                                            width="20"
                                            height="20"
                                            fill="white"
                                        />
                                    </clipPath>
                                </defs>
                            </svg>
                            <transition name="fade">
                                <div
                                    class="oil-course-setting__settings__table__column__cell__tooltip"
                                    v-if="tooltip_id === 'direction'"
                                >
                                    <span
                                        class="oil-course-setting__settings__table__column__cell__tooltip__text"
                                        >{{ setTooltipText("direction") }}</span
                                    >
                                </div>
                            </transition>
                        </div>
                    </div>
                </div>
                <div
                    v-else-if="!storeEditCourseSetting.isEdit"
                    class="oil-course-setting__settings__table__column"
                >
                    <div
                        class="oil-course-setting__settings__table__column__cell"
                    >
                        <template v-if="typeof column.authors === 'string'">
                            <span>{{ column.authors }}</span>
                        </template>
                        <template v-else>
                            <span
                                v-for="(author, idx) in column.authors"
                                :key="author"
                                >{{ !idx ? author : `${author}, ` }}</span
                            >
                        </template>
                    </div>
                    <div
                        v-if="!course_setting.value.IsFree"
                        class="oil-course-setting__settings__table__column__cell"
                    >
                        <span v-if="course_table[1].price">
                            {{ column.price }}
                            <div
                                v-if="course_setting.value.IsPartialAvailable"
                                class="oil-course-setting__settings__table__column__cell__partial-available"
                            >
                                <span
                                    class="oil-course-setting__settings__table__column__cell__partial-available__title"
                                    >Суммарная стоимость всех глав, созданных во
                                    вкладке
                                    <a :href="redirectToContent()"
                                        >Содержание</a
                                    ></span
                                >
                            </div>
                        </span>
                        <div
                            v-else-if="!course_setting.value.IsPartialAvailable"
                            class="oil-course-setting__settings__table__column__cell__no-data"
                        >
                            <span
                                class="oil-course-setting__settings__table__column__cell__no-data__title"
                                >Нет данных</span
                            >
                            <span
                                class="oil-course-setting__settings__table__column__cell__no-data__subtitle"
                                >Пример: 99 999</span
                            >
                        </div>

                        <span
                            class="oil-course-setting__settings__table__column__cell__no-data_partial-available"
                            v-else-if="course_setting.value.IsPartialAvailable"
                            >Суммарная стоимость всех глав, созданных во вкладке
                            <a :href="redirectToContent()">Содержание</a></span
                        >
                    </div>
                    <div
                        class="oil-course-setting__settings__table__column__cell"
                    >
                        <span v-if="course_table[1].duration">{{
                            column.duration
                        }}</span>
                        <div
                            v-else
                            class="oil-course-setting__settings__table__column__cell__no-data"
                        >
                            <template v-if="!course_table[1].duration">
                                {{ course_table[1].duration }}
                                <span
                                    class="oil-course-setting__settings__table__column__cell__no-data__title"
                                    >Нет данных</span
                                >
                                <span
                                    class="oil-course-setting__settings__table__column__cell__no-data__subtitle"
                                    >Пример: 100</span
                                >
                            </template>
                            <span v-else> {{ course_table[1].duration }}</span>
                        </div>
                    </div>
                    <div
                        v-if="
                            course_setting.value.CourseType !== 'Asynchronous'
                        "
                        class="oil-course-setting__settings__table__column__cell"
                    >
                        <span v-if="course_table[1].workload">{{
                            column.workload
                        }}</span>
                        <div
                            v-else
                            class="oil-course-setting__settings__table__column__cell__no-data"
                        >
                            <span
                                class="oil-course-setting__settings__table__column__cell__no-data__title"
                                >Нет данных</span
                            >
                            <span
                                class="oil-course-setting__settings__table__column__cell__no-data__subtitle"
                                >Пример: 50</span
                            >
                        </div>
                    </div>
                    <div
                        v-if="
                            course_setting.value.CourseType !== 'Asynchronous'
                        "
                        class="oil-course-setting__settings__table__column__cell"
                    >
                        <span
                            v-if="
                                course_table[1].start_date &&
                                course_table[1].end_date &&
                                column.start_date !== undefined
                            "
                            >{{ formatDate(column.start_date) }}</span
                        >
                        <span
                            v-if="
                                course_table[1].start_date &&
                                course_table[1].end_date
                            "
                            >—</span
                        >
                        <span
                            v-if="
                                course_table[1].start_date &&
                                course_table[1].end_date &&
                                column.end_date
                            "
                            >{{ formatDate(column.end_date) }}</span
                        >
                        <div
                            v-else
                            class="oil-course-setting__settings__table__column__cell__no-data"
                        >
                            <span
                                class="oil-course-setting__settings__table__column__cell__no-data__title"
                                >Нет данных</span
                            >
                            <span
                                class="oil-course-setting__settings__table__column__cell__no-data__subtitle"
                                >Пример: 01.01.24 — 01.02.24</span
                            >
                        </div>
                    </div>
                    <div
                        class="oil-course-setting__settings__table__column__cell"
                    >
                        <span v-if="course_table[1].removed_date">{{
                            formatDate(column.removed_date)
                        }}</span>
                        <div
                            v-else
                            class="oil-course-setting__settings__table__column__cell__no-data"
                        >
                            <span
                                class="oil-course-setting__settings__table__column__cell__no-data__title"
                                >Нет данных</span
                            >
                            <span
                                class="oil-course-setting__settings__table__column__cell__no-data__subtitle"
                                >Пример: 01.02.24</span
                            >
                        </div>
                    </div>
                    <div
                        class="oil-course-setting__settings__table__column__cell"
                        :style="{ pointerEvents: 'none' }"
                    >
                        <div
                            v-if="chooses_direction.value.length"
                            class="oil-course-setting__settings__table__column__cell__direction"
                        >
                            <DirectionCmp
                                v-for="(
                                    direction, direction_idx
                                ) in chooses_direction.value"
                                :key="direction_idx"
                                :text="direction.localizedName"
                                :id="direction.directionId"
                                :picked="true"
                                >{{ direction.localizedName }}</DirectionCmp
                            >
                        </div>
                        <div
                            v-else
                            class="oil-course-setting__settings__table__column__cell__no-data"
                        >
                            <span
                                class="oil-course-setting__settings__table__column__cell__no-data__title"
                                >Нет данных</span
                            >
                            <span
                                class="oil-course-setting__settings__table__column__cell__no-data__subtitle"
                                >Пример: Геология, Разработка</span
                            >
                        </div>
                    </div>
                </div>
                <div
                    v-else-if="storeEditCourseSetting.isEdit"
                    class="oil-course-setting__settings__table__column"
                >
                    <div
                        class="oil-course-setting__settings__table__column__cell"
                    >
                        <span>{{ column.authors }}</span>
                    </div>
                    <!-- tyt тут -->
                    <div
                        v-if="course_setting.value.IsPartialAvailable"
                        class="oil-course-setting__settings__table__column__cell"
                    >
                        <div
                            class="oil-course-setting__settings__table__column__cell__edit-partial-available"
                        >
                            <span
                                class="oil-course-setting__settings__table__column__cell__edit-partial-available__title"
                                >Стоимость курса формируется как сумма стоимости
                                всех глав, созданных во вкладке
                                <a :href="redirectToContent()"
                                    >Содержание</a
                                ></span
                            >
                        </div>
                    </div>
                    <div
                        class="oil-course-setting__settings__table__column__cell"
                        v-for="(input, input_idx) in filtered_inputs"
                        :key="input_idx"
                    >
                        <InputCmp
                            :class="'small-field_error'"
                            v-if="input.mask_type !== undefined"
                            :placeholder="input.placeholder"
                            :mask_type="input.mask_type"
                            :type="input.type"
                            :error="input.error"
                            :model-value="guessingFormDataInput(input.type)"
                            @set_value="updateFormData($event)"
                        />
                    </div>
                    <div
                        v-if="
                            course_setting.value.CourseType !== 'Asynchronous'
                        "
                        class="oil-course-setting__settings__table__column__cell"
                    >
                        <div
                            class="oil-course-setting__settings__table__column__cell__dates"
                        >
                            <CalendarCmp
                                :class="'small-field_error'"
                                :error="dateErrors[0].error"
                                :input_value="UTCDates?.dateStart"
                                @update-date="handleDateUpdate($event, 'start')"
                            />
                            <span>—</span>
                            <CalendarCmp
                                :class="'small-field_error'"
                                :error="dateErrors[1].error"
                                :input_value="UTCDates?.dateEnd"
                                @update-date="handleDateUpdate($event, 'end')"
                            />
                        </div>
                    </div>
                    <div
                        class="oil-course-setting__settings__table__column__cell"
                    >
                        <CalendarCmp
                            :class="'small-field_error'"
                            :error="dateErrors[2].error"
                            :input_value="UTCDates?.dateFinish"
                            @update-date="handleDateUpdate($event, 'remove')"
                        />
                    </div>
                    <div
                        class="oil-course-setting__settings__table__column__cell"
                    >
                        <div
                            class="oil-course-setting__settings__table__column__cell__direction"
                        >
                            <DirectionCmp
                                v-for="(direction, direction_idx) in directions"
                                :key="direction_idx"
                                :text="direction.localizedName"
                                :id="direction.directionId"
                                :is_visible="direction.isVisible"
                                :picked="
                                    picked_directions.includes(
                                        direction.directionId
                                    )
                                "
                                @set_direction="pick_direction"
                                >{{ direction.localizedName }}</DirectionCmp
                            >
                            <span v-if="show_error"
                                >Курсу должно быть присвоено хотя бы одно
                                направлние!</span
                            >
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
        <div
            class="oil-course-setting__settings__setting-btns"
            v-if="storeEditCourseSetting.isEdit"
        >
            <BtnCmp
                class="oil-course-setting__settings__btn"
                :text="'Отмена'"
                :background_type="'_secondary'"
                @click="canselEditCourseSetting"
            />
            <BtnCmp
                class="oil-course-setting__settings__btn"
                :text="'Сохранить'"
                :disabled="!isFormValid || show_error"
                @click="saveSettings"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import axios from "axios";
import { useStoreEditCourseSetting } from "~/src/stores/storeEditCourseSetting";
import type { IDirection } from "~/src/ts-interface/direction";

defineProps({
    course_setting: {
        type: Object,
        default: {},
    },
});

const _course_type_translation = {
    Asynchronous: "Асинхронный",
    Synchronous: "Синхронный",
}; // лоудеш значит, что это трогать нельзя:)

const _course_format_translation = {
    Online: "Онлайн",
    Offline: "Оффлайн",
};

const storeEditCourseSetting = useStoreEditCourseSetting();
const directions = reactive<IDirection[]>([]);
const picked_directions = reactive<any>([]);
const show_error = ref<boolean>(false);
const original_directions = ref<number[]>([]);
const route = useRoute();
const router = useRouter();
const preloader = reactive({
    value: true as boolean,
});
const chooses_direction = reactive({
    value: [] as IDirection[],
});
const course_setting = reactive({
    value: {
        Title: "" as string,
        CourseType: "" as string,
        CourseFormat: "" as string,
        PriceInRubles: 0 as number,
        IsPartialAvailable: false as boolean,
        IsFree: false as boolean,
        DurationAcademicHours: 0 as number,
        DurationWorkDays: 0 as number,
        DateStart: "" as string,
        DateFinish: "" as string,
        SalesTerminationDate: "" as string,
    },
});
const inputs = reactive([
    {
        placeholder: "99 999",
        mask_type: "price",
        max_length: 9,
        type: "price",
        error: "",
    },
    {
        placeholder: "999",
        mask_type: "price",
        max_length: 6,
        type: "duration",
        error: "",
    },
    {
        placeholder: "99",
        mask_type: "price",
        max_length: 5,
        type: "workload",
        error: "",
    },
]);
const filtered_inputs = computed(() => {
    if (course_setting.value.IsPartialAvailable) {
        return inputs.slice(1, 2);
    } else if (
        course_setting.value.CourseType === "Asynchronous" &&
        course_setting.value.IsFree
    ) {
        return inputs.filter((input, input_idx) => input_idx === 1);
    } else if (course_setting.value.CourseType === "Asynchronous") {
        return inputs.slice(0, 2);
    } else if (course_setting.value.IsFree) {
        return inputs.slice(1);
    } else {
        return inputs;
    }
});

const course_table = reactive([
    {
        authors: "Автор(ы)",
        price: "Цена (руб)",
        duration: "Длительность (академ. часов)",
        workload: "Объём работы (дней)",
        start_end_dates: "Даты начала и окончания курса",
        removed_date: "Дата снятия с витрины",
        direction: "Направление",
    },
    {
        authors: [] as string[] | string,
        price: 0,
        duration: 0,
        workload: 0,
        start_date: "" as string,
        end_date: "" as string,
        removed_date: "" as string,
    },
]);

const operatingForm = reactive(Object.create(course_table[1]));

const dateErrors = reactive([{ error: "" }, { error: "" }, { error: "" }] as {
    error: string;
}[]);

const isFormValid = ref(
    filtered_inputs.value.every((item) => !item.error.length) &&
        dateErrors.every((item) => !item.error.length)
);

watch(
    filtered_inputs,
    () => {
        isFormValid.value =
            filtered_inputs.value.every((item) => !item.error.length) &&
            dateErrors.every((item) => !item.error.length);
    },
    { deep: true }
);

watch(
    dateErrors,
    () => {
        isFormValid.value =
            filtered_inputs.value.every((item) => !item.error.length) &&
            dateErrors.every((item) => !item.error.length);
    },
    { deep: true }
);
const UTCDates = reactive({
    dateStart: null,
    dateEnd: null,
    dateFinish: null,
});

const formValidation = (field: number | string, fieldName: string) => {
    const errorFields = { price: 0, duration: 1, workload: 2 } as {
        [key: string]: number;
    };

    const dateErrorFields = { dateStart: 0, dateEnd: 1, dateFinish: 2 } as {
        [key: string]: number;
    };

    const isFieldDate = fieldName.includes("date");

    function setError(errorMessage: string) {
        if (!isFieldDate) {
            inputs[errorFields[fieldName]].error = errorMessage;
        } else {
            dateErrors[dateErrorFields[fieldName]].error = errorMessage;
        }
    }

    switch (fieldName) {
        case "price":
            if (!field) {
                setError("Обязательно к заполнению");
                return;
            }
            if (typeof field !== "number") {
                return;
            }
            if (field > 1000000 || field < 1) {
                setError("Значение должно быть от 1 - 1 000 000");
            } else {
                setError("");
            }
            break;
        case "duration":
            if (!field) {
                setError("Обязательно к заполнению");
                return;
            }
            if (typeof field !== "number") {
                return;
            }
            if (field > 1000) {
                setError("Значение должно быть от 1 - 1 000");
            } else {
                setError("");
            }
            break;
        case "workload":
            if (!field) {
                setError("Обязательно к заполнению");
                return;
            }
            if (typeof field !== "number") {
                return;
            }
            if (field > 1000) {
                setError("Значение должно быть от 1 - 1000");
            } else {
                setError("");
            }
            break;

        case "dateStart": {
            if (course_setting.value.CourseType === "Asynchronous") return;
            if (!field) {
                setError("Обязательно к заполнению");
                return;
            }
            const currentDate = new Date().getTime();
            const startDate = new Date(field).getTime();
            const dateEnd = operatingForm.end_date
                ? new Date(operatingForm.end_date).getTime()
                : 0;

            const dateFinish = operatingForm.removed_date;

            if (!!dateEnd) {
                formValidation(operatingForm.end_date, "dateEnd");
            }
            if (!!dateFinish) {
                formValidation(operatingForm.removed_date, "dateFinish");
            }

            if (!!startDate && currentDate >= startDate) {
                setError("Дата начала не может быть раньше текущей даты");
                return;
            } else if (!!dateEnd && dateEnd <= startDate) {
                setError("Дата начала не может быть позже даты конца");
                return;
            } else {
                setError("");
            }
            break;
        }

        case "dateEnd": {
            if (course_setting.value.CourseType === "Asynchronous") return;
            if (!field) {
                setError("Обязательно к заполнению");
                break;
            }
            const currentDate = new Date().getTime();
            const dateEnd = new Date(field).getTime();
            const startDate = operatingForm.start_date
                ? new Date(operatingForm.start_date).getTime()
                : 0;
            if (!!startDate && startDate > currentDate) {
                formValidation(operatingForm.start_date, "startDate");
            }
            if (
                !!dateEnd &&
                currentDate >= dateEnd &&
                dateEnd === currentDate
            ) {
                setError("Дата начала не может быть раньше текущей даты");
                return;
            } else if (
                !!startDate &&
                dateEnd !== currentDate &&
                dateEnd < startDate
            ) {
                setError("Дата начала не может быть позже даты конца");
                return;
            } else {
                setError("");
            }
            break;
        }

        case "dateFinish": {
            if (!field) {
                setError("Обязательно к заполнению");
                return;
            }
            const startDate = operatingForm.start_date
                ? new Date(operatingForm.start_date).getTime()
                : 0;

            const finishDate = new Date(field).getTime();
            const currentDate = new Date().getTime();

            if (currentDate >= finishDate) {
                setError(
                    "Дата снятия с витрины не может быть раньше текущей даты"
                );
                return;
            } else if (
                startDate &&
                finishDate >= startDate &&
                course_setting.value.CourseType !== "Asynchronous"
            ) {
                setError(
                    "Дата снятия с витрины не может быть позже даты начала"
                );
                return;
            } else {
                setError("");
            }
            break;
        }
    }
};

const handleDateUpdate = (date: string, type: string) => {
    switch (type) {
        case "start":
            operatingForm.start_date = date;
            formValidation(date, "dateStart");
            break;

        case "end":
            operatingForm.end_date = date;
            formValidation(date, "dateEnd");
            break;

        case "remove":
            operatingForm.removed_date = date;
            formValidation(date, "dateFinish");
            console.log("date:", date, "errors:", dateErrors);

            break;

        default:
            break;
    }
};

const guessingFormDataInput = (type: string) => {
    switch (type) {
        case "price":
            return operatingForm.price;
        case "duration":
            return operatingForm.duration;
        case "workload":
            return operatingForm.workload;
    }
};

const updateFormData = (event: { value: string; type: string }) => {
    switch (event.type) {
        case "price":
            const valueParsed = parseInt(event.value.replace(/\s/g, ""));
            formValidation(valueParsed, event.type);
            operatingForm.price = isNaN(valueParsed) ? 0 : valueParsed;
            break;
        case "duration":
            const valueParsedD = parseInt(event.value.replace(/\s/g, ""));
            formValidation(valueParsedD, event.type);
            operatingForm.duration = isNaN(valueParsedD) ? 0 : valueParsedD;
            break;
        case "workload":
            const valueParsedW = parseInt(event.value.replace(/\s/g, ""));
            formValidation(valueParsedW, event.type);
            operatingForm.workload = isNaN(valueParsedW) ? 0 : valueParsedW;
            break;
    }
};

const pick_direction = (dir: { id: number; picked: boolean }) => {
    show_error.value = false;
    if (dir.picked) {
        picked_directions.push(dir.id);
    } else {
        picked_directions.splice(picked_directions.indexOf(dir.id), 1);
    }
    console.log("Выбранные направления:", picked_directions);
};

const formData = reactive({
    directionIds: [] as number[],
    authorEmails: [] as string[] | string,
    priceInRubles: 0 as number | null,
    durationAcademicHours: 0 as number | null,
    durationWorkDays: 0 as number | null,
    dateStart: "" as string | null,
    dateFinish: "" as string | null,
    salesTerminationDate: "" as string | null,
});

const formatDate = (date_value: string): string => {
    const date = new Date(date_value);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);

    return `${day}.${month}.${year}`;
};

const picked_directions_filtered = computed(() =>
    directions.filter((direction) =>
        picked_directions.includes(direction.directionId)
    )
);

const editReplace = (editingValue: number | string, regExp: RegExp) =>
    String(editingValue).replace(regExp, " ");

const saveSettings = () => {
    for (const index in filtered_inputs.value) {
        formValidation(
            operatingForm[filtered_inputs.value[index].type],
            filtered_inputs.value[index].type
        );
        console.log("errors:", filtered_inputs.value);
    }

    for (const fieldName in UTCDates) {
        const translation = {
            dateStart: "start_date",
            dateEnd: "end_date",
            dateFinish: "removed_date",
        };
        formValidation(operatingForm[translation[fieldName]], fieldName);
        console.log(fieldName);
    }

    if (!isFormValid) {
        return;
    }
    if (picked_directions_filtered.value.length === 0) {
        show_error.value = true;
    } else {
        const formNubmer = (value: string) => {
            return parseInt(value.replace(" ", ""));
        };

        show_error.value = false;
        formData.directionIds = picked_directions;
        formData.authorEmails =
            typeof operatingForm.authors === "string"
                ? [operatingForm.authors]
                : operatingForm.authors;
        formData.priceInRubles = operatingForm.price
            ? typeof operatingForm.price === "string"
                ? formNubmer(operatingForm.price)
                : operatingForm.price
            : null;
        formData.durationAcademicHours = operatingForm.duration
            ? typeof operatingForm.duration === "string"
                ? formNubmer(operatingForm.duration)
                : operatingForm.duration
            : null;
        formData.durationWorkDays = operatingForm.workload
            ? typeof operatingForm.workload === "string"
                ? formNubmer(operatingForm.workload)
                : operatingForm.workload
            : null;
        formData.dateStart = operatingForm?.start_date
            ? new Date(operatingForm.start_date!).toISOString()
            : null;
        formData.dateFinish = operatingForm.end_date
            ? new Date(operatingForm.end_date!).toISOString()
            : null;
        console.log("date:", operatingForm?.removed_date);

        formData.salesTerminationDate = operatingForm?.removed_date
            ? new Date(operatingForm.removed_date!).toISOString()
            : null;

        axios
            .patch(`/admin/v1/Course/${route.query.search}/settings`, formData)
            .then((response) => {
                storeEditCourseSetting.canselEdit();
                original_directions.value = [...picked_directions];
                console.log(response.data, "info_course.data");
            })
            .catch((error) => {
                console.error("Ошибка при сохранении настроек курса:", error);
            })
            .finally(() => {
                axios
                    .get(`/admin/v1/Course/${route.query.search}`)
                    .then((info_course) => {
                        course_setting.value = info_course.data;

                        course_table[1].price = editReplace(
                            info_course.data.PriceInRubles,
                            /\B(?=(\d{3})+(?!\d))/g
                        );

                        course_table[1].duration = editReplace(
                            info_course.data.DurationAcademicHours,
                            /\B(?=(\d{3})+(?!\d))/g
                        );

                        course_table[1].workload = editReplace(
                            info_course.data.DurationWorkDays,
                            /\B(?=(\d{3})+(?!\d))/g
                        );

                        course_table[1].start_date = info_course.data.DateStart;
                        course_table[1].end_date = info_course.data.DateFinish;
                        //TODO: формат даты изменяется
                        course_table[1].removed_date =
                            info_course.data.SalesTerminationDate;
                        preloader.value = false;
                        chooses_direction.value =
                            info_course.data.Directions.map(
                                (direction: any) => ({
                                    directionId: direction.id,
                                    localizedName: direction.name,
                                })
                            );
                        Object.assign(UTCDates, {
                            dateStart: info_course.data.DateStart,
                            dateEnd: info_course.data.DateFinish,
                            dateFinish: info_course.data.SalesTerminationDate,
                        });
                        storeEditCourseSetting.canselEdit();
                        console.log(info_course.data, "info_course.data");
                    })
                    .catch((error) => {
                        console.error(
                            "Ошибка при загрузке данных курса:",
                            error
                        );
                    });
            });
    }
};

const tooltip_id = ref<string>("");

const showTooltip = (id: string) => {
    tooltip_id.value = id;
};

const hideTooltip = () => {
    tooltip_id.value = "";
};

const tooltips = ref<{ id: string; text: string }[]>([
    {
        id: "authors",
        text: "Макс. количество авторов: 2<br>Мин. количество авторов: 1",
    },
    {
        id: "dates_start_end",
        text: "Начало и завершение курса наступят в указанные даты в 00:00 по времени МСК",
    },
    {
        id: "date_removed",
        text: "Курс будет снят с витрины при наступлении указанной даты в 00:00 по времени МСК",
    },
    {
        id: "direction",
        text: "Должно быть указано минимум одно направление",
    },
]);

const setTooltipText = computed(() => {
    return (id: string) => {
        const tooltip = tooltips.value.find((item) => item.id === id);
        return tooltip ? tooltip.text : null;
    };
});

const openEditCourseSetting = () => {
    storeEditCourseSetting.edit();

    original_directions.value = [...picked_directions];
};

const redirectToContent = () => {
    return router.resolve({
        path: route.path,
        query: { ...route.query, tab: 3 },
    }).href;
};

const canselEditCourseSetting = () => {
    Object.assign(operatingForm, {
        ...operatingForm,
        price: course_table[1].price,
        duration: course_table[1].duration,
        workload: course_table[1].workload,
        start_date: course_table[1].start_date,
        end_date: course_table[1].end_date,
        removed_date: course_table[1].removed_date,
    });
    storeEditCourseSetting.canselEdit();
    picked_directions.splice(
        0,
        picked_directions.length,
        ...original_directions.value
    );
};

onMounted(() => {
    nextTick(() => {
        axios
            .get("admin/v1/user/authors")
            .then((response) => {
                console.log(response, "looking for authors emails");
                course_table[1].authors = response.data[0];
            })
            .catch((error) => {
                console.error(error, "Ошибка, нас заскамили");
            });
        axios
            .get(`/admin/v1/Course/${route.query.search}`)
            .then((info_course) => {
                course_setting.value = info_course.data;
                (course_table[1].authors = info_course.data.AuthorEmails),
                    (course_table[1].price = info_course.data.PriceInRubles
                        ? String(info_course.data.PriceInRubles).replace(
                              /\B(?=(\d{3})+(?!\d))/g,
                              " "
                          )
                        : info_course.data.PriceInRubles);
                course_table[1].duration = info_course.data
                    .DurationAcademicHours
                    ? String(info_course.data.DurationAcademicHours).replace(
                          /\B(?=(\d{3})+(?!\d))/g,
                          " "
                      )
                    : info_course.data.DurationAcademicHours;
                course_table[1].workload = info_course.data.DurationWorkDays
                    ? String(info_course.data.DurationWorkDays).replace(
                          /\B(?=(\d{3})+(?!\д))/g,
                          " "
                      )
                    : info_course.data.DurationWorkDays;
                course_table[1].start_date = info_course.data.DateStart
                    ? info_course.data.DateStart
                    : info_course.data.DateStart;
                course_table[1].end_date = info_course.data.DateFinish
                    ? info_course.data.DateFinish
                    : info_course.data.DateFinish;
                course_table[1].removed_date = info_course.data
                    .SalesTerminationDate
                    ? info_course.data.SalesTerminationDate
                    : info_course.data.SalesTerminationDate;

                chooses_direction.value = info_course.data.Directions.map(
                    (direction: { id: number; name: string }) => ({
                        directionId: direction.id,
                        localizedName: direction.name,
                    })
                );

                chooses_direction.value.map((item) => {
                    picked_directions.push(item.directionId);
                });

                Object.assign(UTCDates, {
                    dateStart: info_course.data.DateStart,
                    dateEnd: info_course.data.DateFinish,
                    dateFinish: info_course.data.SalesTerminationDate,
                });

                preloader.value = false;
                console.log(info_course.data, "info_course.data");
                console.log(course_table[1], "course_table[1]");
            })
            .catch((error) => {
                console.error("Ошибка при загрузке данных курса:", error);
            });
        axios
            .get("admin/v1/direction")
            .then((response) => {
                directions.splice(
                    0,
                    directions.length,
                    ...response.data.directions.filter(
                        (direction: { isVisible: boolean }) =>
                            direction.isVisible
                    )
                );
            })
            .catch((error) => {
                console.error(
                    "Ошибка при получении данных направлений:",
                    error
                );
            });
        console.log("datesInit", course_table[1]);
    });
});
</script>

<style lang="sass">
.small-field_error
	.oil-input__message
		width: max-content
		transform: translateY(29%)
</style>
