<template>
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
                        <span
                            v-for="(author, idx) in column.authors"
                            :key="author"
                            >{{ !idx ? author : `${author}, ` }}</span
                        >
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
                                    вкладке <a>Содержание</a></span
                                >
                            </div>
                        </span>
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
                                >Пример: 99 999</span
                            >
                        </div>
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
                                course_table[1].end_date
                            "
                            >{{ column.start_date }}</span
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
                                course_table[1].end_date
                            "
                            >{{ column.end_date }}</span
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
                            column.removed_date
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
                                <a>Содержание</a></span
                            >
                        </div>
                    </div>
                    <div
                        class="oil-course-setting__settings__table__column__cell"
                        v-for="(input, input_idx) in filtered_inputs"
                        :key="input_idx"
                    >
                        <InputCmp
                            :placeholder="input.placeholder"
                            :mask_type="input.mask_type"
                            :type="input.type"
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
                                @update-date="handleDateUpdate($event, 'start')"
                            />
                            <span>—</span>
                            <CalendarCmp
                                @update-date="handleDateUpdate($event, 'end')"
                            />
                        </div>
                    </div>
                    <div
                        class="oil-course-setting__settings__table__column__cell"
                    >
                        <CalendarCmp
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

const directions = reactive<IDirection[]>([]);
const picked_directions = reactive<any>([]);
const show_error = ref<boolean>(false);
const original_directions = ref<number[]>([]);
const route = useRoute();
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
        type: "price",
    },
    {
        placeholder: "999",
        mask_type: "price",
        type: "duration",
    },
    {
        placeholder: "99",
        mask_type: "price",
        type: "workload",
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
        authors: [] as string[],
        price: "",
        duration: "",
        workload: "",
        start_date: "",
        end_date: "",
        removed_date: "",
    },
]);

const handleDateUpdate = (date: string, type: string) => {
    switch (type) {
        case "start":
            course_table[1].start_date = date;
            break;

        case "end":
            course_table[1].end_date = date;
            break;

        case "remove":
            course_table[1].removed_date = date;
            break;

        default:
            break;
    }
};

const guessingFormDataInput = (type: string) => {
    switch (type) {
        case "price":
            const copyPrice = course_table[1].price;
            return copyPrice;
        case "duration":
            const copyDuration = course_table[1].duration;
            return copyDuration;
        case "workload":
            const copyWorkload = course_table[1].workload;
            return copyWorkload;
    }
};

const updateFormData = (event: { value: string; type: string }) => {
    switch (event.type) {
        case "price":
            course_table[1].price = event.value;
            break;
        case "duration":
            course_table[1].duration = event.value;
            break;
        case "workload":
            course_table[1].workload = event.value;
            break;
    }
};

const pick_direction = (dir: { id: number; picked: boolean }) => {
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

const saveSettings = () => {
    if (picked_directions_filtered.value.length === 0) {
        show_error.value = true;
    } else {
        console.log("qwerty34");

        show_error.value = false;
        storeEditCourseSetting.canselEdit();
        formData.directionIds = picked_directions;
        formData.authorEmails = course_table[1].authors;
        formData.priceInRubles = course_table[1].price
            ? parseFloat(course_table[1].price.replace(/\s/g, ""))
            : null;
        formData.durationAcademicHours = course_table[1].duration
            ? parseFloat(course_table[1].duration.replace(/\s/g, ""))
            : null;
        formData.durationWorkDays = course_table[1].workload
            ? parseFloat(course_table[1].workload.replace(/\s/g, ""))
            : null;
        formData.dateStart = course_table[1].start_date
            ? new Date(course_table[1].start_date!).toISOString()
            : null;
        formData.dateFinish = course_table[1].end_date
            ? new Date(course_table[1].end_date!).toISOString()
            : null;
        formData.salesTerminationDate = new Date(
            course_table[1].removed_date!
        ).toISOString();
        console.log(formData, "formData");
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
                        course_table[1].price = String(
                            info_course.data.PriceInRubles
                        ).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                        course_table[1].duration = String(
                            info_course.data.DurationAcademicHours
                        ).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                        course_table[1].workload = String(
                            info_course.data.DurationWorkDays
                        ).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                        course_table[1].start_date = formatDate(
                            info_course.data.DateStart
                        );
                        course_table[1].end_date = formatDate(
                            info_course.data.DateFinish
                        );
                        course_table[1].removed_date = formatDate(
                            info_course.data.SalesTerminationDate
                        );
                        preloader.value = false;
                        chooses_direction.value =
                            info_course.data.Directions.map(
                                (direction: any) => ({
                                    directionId: direction.id,
                                    localizedName: direction.name,
                                })
                            );
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

const storeEditCourseSetting = useStoreEditCourseSetting();

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
const canselEditCourseSetting = () => {
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
                // Обновление данных в таблице

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
                    ? formatDate(info_course.data.DateStart)
                    : info_course.data.DateStart;
                course_table[1].end_date = info_course.data.DateFinish
                    ? formatDate(info_course.data.DateFinish)
                    : info_course.data.DateFinish;
                course_table[1].removed_date = info_course.data
                    .SalesTerminationDate
                    ? formatDate(info_course.data.SalesTerminationDate)
                    : info_course.data.SalesTerminationDate;
                chooses_direction.value = info_course.data.Directions.map(
                    (direction: { id: number; name: string }) => ({
                        directionId: direction.id,
                        localizedName: direction.name,
                    })
                );
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
    });
});
</script>

<style></style>
