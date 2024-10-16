<template>
    <section class="oil-container">
        <div class="oil-page oil-course-setting">
            <breadCmp
                :prev_page="'Список курсов'"
                :current_page="storeCourseSetting.Title"
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
                    :class="{
                        _disable:
                            storeEditCourseSetting.isEdit || edit_mode.value,
                    }"
                />
            </div>
            <CommonSettings
                v-if="active_tab === 1"
                :course_setting="course_setting"
            />
            <CourseInfo v-else-if="active_tab === 2" />
            <CourseContent
                :course_setting="course_setting"
                v-else-if="active_tab === 3"
            />
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStoreCourseSettings } from "~/src/stores/storeCourseSettings";
import { useStoreEditCourseSetting } from "~/src/stores/storeEditCourseSetting";
import type ISwitcher from "~/src/ts-interface/switcher.type";

export default defineComponent({
    setup() {
        const storeEditCourseSetting = useStoreEditCourseSetting();
        const storeCourseSetting = useStoreCourseSettings();
        const editInput = ref(null) as any;
        const route = useRoute();
        const { query } = route;
        const router = useRouter();
        const active_tab = ref<number>(parseInt(query.tab) || 1);

        const switcherArray: ISwitcher[] = [
            {
                text: "Общие настройки",
                id: 1,
                isActive: true,
                link: "",
            },
            {
                text: "Информация о курсе",
                id: 2,
                isActive: false,
                link: "",
            },
            {
                text: "Содержание",
                id: 3,
                isActive: false,
                link: "",
            },
        ];

        const edit_mode = reactive({
            value: false,
        });

        const course_setting = reactive({
            value: storeCourseSetting.$state,
        });
        const edit_field = reactive({
            idx_field: null as null | number,
            type_field: null as null | string,
        });

        const selectTab = (id: number) => {
            router.push({ path: route.path, query: { ...query, tab: id } });

            active_tab.value = id;
        };

        watch(edit_field, () => {
            nextTick(() => {
                if (editInput.value) {
                    editInput.value.focus();
                }
            });
        });

        onMounted(() => {
            nextTick(() => {
                storeCourseSetting.getCourseSetting(query.search);
            });
        });

        return {
            active_tab,
            edit_mode,
            course_setting,
            storeEditCourseSetting,
            switcherArray,
            selectTab,
            storeCourseSetting,
            query,
        };
    },
});
</script>

<style lang="sass">
.oil-course-setting
    @include flex_column()
    &__menubar
        display: flex
        align-items: baseline
        gap: rem(16)

        margin-bottom: rem(32)
        ._disable
            opacity: .4
            pointer-events: none

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

                        &_partial-available
                            color: #9AA7BB
                            font-size: rem(12)
                            a
                                color: $light_primary

                    &__direction
                        display: flex
                        flex-wrap: wrap
                        gap: rem(8)
                        min-height: rem(40)
                        align-items: center
                        span
                            bottom: rem(-6)
                            font-size: rem(14)
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
                                color: #03AEE2

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
                                // top: rem(10)
                                // left: rem(16)

                            .oil-input
                                padding: rem(0) rem(16) rem(0) rem(44)

                        &__inputs
                            display: flex
                            gap: 24px

                        &__edit-partial-available
                            font-size: rem(12)
                            top: rem(42)
                            margin: rem(8) rem(0)
                            &__title
                                color: #9AA7BB

                            a
                                color: $light_primary
                                cursor: pointer
                                transition: color 0.2s
                                &:hover
                                    color: #03AEE2



        &__btn
            width: fit-content

        &__setting-btns
            display: flex
            gap: rem(12)

        &__notification
            display: flex
            flex-direction: row
            gap: rem(10)
            place-items: center
            padding: rem(16) rem(24)
            width: 100%
            background-color: #FFC0711A
            border: rem(1) solid #FFCE91
            border-radius: rem(12)
            svg
                flex-shrink: 0

            &__text
                line-height: rem(24)

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
        &__info
            &__attention
                padding: rem(16) rem(24)
                margin-bottom: rem(32)

                border: 1px solid $basic-primary
                background-color: $disabled_basic
                max-width: rem(972)
                @include flex_center()
                gap: rem(10)
                border-radius: rem(12)

                &__icon
                    padding: rem(12)

                    border-radius: 50%
                    background-color: #176DC10D
                    @include flex_center()

                &__text
                    min-width: rem(640)
                    font-size: rem(16)
                    line-height: 150%

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
                @include flex_center_spacing()
                width: 100%

                gap: rem(16)
                position: relative

                span
                    width: 100%
                    white-space: nowrap
                    text-overflow: ellipsis
                    overflow: hidden
                    font-weight: bold

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
                &__chapter-price
                    flex-shrink: 3
                    span
                        color: $light_gray
                &__input
                    border: rem(1) solid $light_gray
                    border-radius: rem(4)
                    width: 100%
                    padding: rem(1) rem(16)
                    min-height: rem(20)
                    max-height: rem(24)
                &__input__price
                    border: rem(1) solid $light_gray
                    position: relative
                    border-radius: rem(4)
                    width: 100%
                    padding: rem(1) rem(16)
                    min-height: rem(20)
                    max-height: rem(24)
                    flex-shrink: 4
                    input::-webkit-outer-spin-button,
                    input::-webkit-inner-spin-button
                        -webkit-appearance: none
                        margin: 0
                        position: relative

                    &::after
                        position: absolute
                        right: 11%
                        content: 'RUB'
                        font-weight: bold
                        color: $light_gray

        &__final-price
            display: block
            margin-top: rem(32)
            font-weight: bold
            font-size: rem(20)
            span
                color: $basic_gray





.oil-course-setting__settings__table__column__cell
    .oil-input
        height: rem(40)
        width: rem(136)
</style>
