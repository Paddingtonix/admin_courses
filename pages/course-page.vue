<template>
    <section class="oil-container oil-course">
        <div class="oil-course__info oil-page">
            <div v-if="user_role_store.role === 'Author'" class="oil-course__title">Мои курсы</div>
            <div v-else class="oil-course__title">Курсы</div>
            <div class="oil-course__info__card">
                <CardInfo
                    v-for="(card, idx) in course_info"
                    :key="idx"
                    :count="card.count"
                    :text="card.text"
                />
            </div>
            <template v-if="!courseStore.course_list.length && !search_value.length">
                <div class="oil-course__info__attention">
                    <i class="oil-course__info__attention__icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                            <path d="M20.0007 26.6673V20.0007M20.0007 13.334H20.0173M36.6673 20.0007C36.6673 29.2054 29.2054 36.6673 20.0007 36.6673C10.7959 36.6673 3.33398 29.2054 3.33398 20.0007C3.33398 10.7959 10.7959 3.33398 20.0007 3.33398C29.2054 3.33398 36.6673 10.7959 36.6673 20.0007Z" stroke="#176DC1" stroke-width="3.33" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </i>
                    <p v-if="user_role_store.role === 'Author'" class="oil-course__info__attention__text">На данный момент у вас нет ни одного созданного курса. Нажмите на кнопку "Создать курс", чтобы начать и поделиться своими знаниями с другими!</p>
                    <p v-else class="oil-course__info__attention__text">На данный момент в системе нет ни одного курса. Как только первые курсы будут созданы, здесь появится таблица, которая позволит управлять их параметрами и содержанием.</p>
                </div>
                <btnCmp
                    :text="'Создать курс'"
                    class="oil-course__info__btn"
                    @click="navigate('/course-create')"
                />
            </template>
            <template v-else>
                <div class="oil-course__settings-container">
                    <div class="oil-course__settings">
                        <SearchCmp
                            :label="'Поиск'"
                            @change-value="updateSearchValue($event)"
                        />
                        <FilterCmp
                            @click="openFilter(true)"
                        />
                    </div>
                    <div class="oil-course__create">
                        <BtnCmp
                            :text="'Создать курс'"
                            @click="navigate('/course-create')"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M12 5V19M5 12H19" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </BtnCmp>
                    </div>
                    <div class="oil-course__filter" v-if="filter_frame.value">
                        <svg @click="openFilter(false)" class="oil-course__filter__close" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M15 5L5 15M5 5L15 15" stroke="#808E9D" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <div class="oil-course__filter__frame">
                            <span class="oil-course__filter__frame__title">Статус</span>
                            <CheckboxCmp
                                v-for="(checkbox, idx) in filter_course.value.slice(0, 6)"
                                :key="idx"
                                :text="checkbox.text"
                                :id="checkbox.id"
                                :active="checkbox.active"
                            />
                        </div>
                        <div class="oil-course__filter__frame">
                            <span class="oil-course__filter__frame__title">Язык</span>
                            <CheckboxCmp
                                v-for="(checkbox, idx) in filter_course.value.slice(7, 10)"
                                :key="idx"
                                :text="checkbox.text"
                                :id="checkbox.id"
                                :active="checkbox.active"
                            />
                        </div>
                        <div class="oil-course__filter__frame">
                            <span class="oil-course__filter__frame__title">Направления</span>
                            <CheckboxCmp
                                v-for="(checkbox, idx) in filter_course.value.slice(11)"
                                :key="idx"
                                :text="checkbox.text"
                                :id="checkbox.id"
                                :active="checkbox.active"
                            />
                        </div>
                        <div class="oil-course__filter__btns">
                            <BtnCmp
                                :background_type="'_secondary'"
                                :text="'Сбросить'"
                            />
                            <BtnCmp
                                :text="'Применить'"
                            />
                        </div>
                    </div>
                </div>
                <div class="oil-course__settings__course-list">
                    <TableHeadCmp
                        :name="'Название'"
                        :status="'Статус'"
                        :authors="'Авторы'"
                        :direction="'Направление'"
                        :lang="'Язык'"
                        :date_edit="'Дата посл. ред.'"
                        :end_date="'Снятие с витрины'"
                    />
                    <TableRowCmp 
                        v-for="(row, idx) in courseStore.course_list"
                        :id="row.courseId"
                        :key="idx"
                        :name="row.title"
                        :status="translateStatus(row.status)"
                        :authors="row.authorEmails[0]"
                        :direction="formatDirectionToString(row.directions)"
                        :lang="row.language.toUpperCase()"
                        :date_edit="formatDate(row.lastChangeDateTime)"
                        :end_date="formatDate(row.salesTerminationDate)"
                    />
                </div>
                <div class="oil-course__settings__pagination">
                    <PaginationCmp
                        :pages_count="paginations_pages!"
                        :currentPage="current_page"
                        @change-page="isCurrentPage"
                    />
                </div>
            </template>
        </div>
    </section>
</template>
<script lang="ts">
import { useRouter } from 'vue-router'
import { useStoreCourses } from '~/src/stores/storeCourse'
import { useUserRoleStore } from '~/src/stores/storeRole'
import axios from 'axios'

export default defineComponent({
    // props: {
    //     id: Number,
    //     default: null as null || Number
    // },
	setup() {
		const router = useRouter()
        const courseStore = useStoreCourses()

        const user_role_store = useUserRoleStore()

		const filter_course = reactive({
			value: [
				{
					text: "Все",
					id: "all_status",
					active: false,
				},
				{
					text: "В разработке",
					id: "in developing",
					active: false,
				},
				{
					text: "На модерации",
					id: "on_moderation",
					active: false,
				},
				{
					text: "Опубликован",
					id: "public",
					active: false,
				},
				{
					text: "Снят с витрины",
					id: "removed",
					active: false,
				},
				{
					text: "В архиве",
					id: "archive",
					active: false,
				},
				{
					text: "Все",
					id: "all_lang",
					active: false,
				},
				{
					text: "Русский",
					id: "russian",
					active: false,
				},
				{
					text: "Английский",
					id: "english",
					active: false,
				},
				{
					text: "Французский",
					id: "french",
					active: false,
				},
				{
					text: "Все",
					id: "all_direction",
					active: false,
				},
				{
					text: "Геология",
					id: "geology",
					active: false,
				},
				{
					text: "Разработка",
					id: "develop",
					active: false,
				},
				{
					text: "Бурение",
					id: "drilling",
					active: false,
				},
				{
					text: "Русский",
					id: "russian",
					active: false,
				},
				{
					text: "Технология добычи",
					id: "mining",
					active: false,
				},
				{
					text: "Шельф",
					id: "shelf",
					active: false,
				},
				{
					text: "Другое",
					id: "other",
					active: false,
				},
			],
		})

        const filter_frame = reactive({
            value: false as boolean
        })

        const paginations_pages = ref<number>(courseStore.$state.numberOfPages ?? 1)
        const current_page = ref<number>(1)

        const search_value = ref("")

        const isCurrentPage = (page: number) => {
            current_page.value = page
        }
        
        const updateSearchValue = (value = '') => {            
            search_value.value = value
            courseStore.getCourses(`/admin/v1/Course?page=${current_page.value}&searchSubstring=${search_value.value}`)
        }

        const formatDirectionToString = (arr: string[] | null | undefined): string => {
            if (!arr || arr.length === 0) {
                return '--'
            }
            return arr.join(', ')
        }

        const formatDate = (date_value: string | null) => {
            if (date_value === null) {
                return "--"
            }
            const date = new Date(date_value)
            const day = String(date.getDate()).padStart(2, '0')
            const month = String(date.getMonth() + 1).padStart(2, '0')
            const year = date.getFullYear()
            return `${day}.${month}.${year}`
        }

        const openFilter = (state: boolean) => {
            filter_frame.value = state
        }

		const navigate = (url: string) => {
			router.push(url)
		}
        watch(() => courseStore.$state.numberOfPages, (newValue) => {
            paginations_pages.value = newValue ?? 1
        })

        watch(current_page, () => {
            courseStore.getCourses(`/admin/v1/Course?page=${current_page.value}&searchSubstring=${search_value.value}`)
        })

        const status_translation = {
            'InDevelopment': 'В разработке',
            'OnModeration': 'На модерации',
            'Published': 'Опубликован',
            'Withdrawn': 'Снят с витрины',
            'Archived': 'В архиве'
        };

        const translateStatus = (status: string): string => {
            return status_translation[status]
        };

        // watch(course_list, (new_state) => {
        //     course_list.value = new_state.value
        // })

        onMounted(() => {
            nextTick(() => {
                courseStore.getCourses('/admin/v1/Course')

                // axios
                //     .get<{ inDevelopment: number, onModeration: number, published: number, withdrawn: number, archieved: number }>('/admin/v1/Course/statuses')
                //     .then((response) => {
                //         course_info.find((element: { count: number, text: string }) => element.text === 'В разработке')!.count = response.data.inDevelopment
                //         course_info.find((element: { count: number, text: string }) => element.text === 'На модерации')!.count = response.data.onModeration
                //         course_info.find((element: { count: number, text: string }) => element.text === 'Опубликован')!.count = response.data.published
                //         course_info.find((element: { count: number, text: string }) => element.text === 'Снят с витрины')!.count = response.data.withdrawn
                //         course_info.find((element: { count: number, text: string }) => element.text === 'В архиве')!.count = response.data.archieved
                //         course_info.find((element: { count: number, text: string }) => element.text === 'Всего')!.count = Object.values(response.data).reduce((sum: number, value: number) => sum + value, 0)
                //     })
            })
        })

        return {
            user_role_store,
            navigate,
            filter_course,
            filter_frame,
            openFilter,
            formatDirectionToString,
            formatDate,
            paginations_pages,
            current_page,
            isCurrentPage,
            updateSearchValue,
            translateStatus,
            search_value,
            courseStore,
            course_info: courseStore.course_info,
        }
    }
})
</script>
<style lang="sass" scoped>
.oil-course
    &__title
        font-size: rem(20)
        line-height: rem(28)
        font-weight: bold
        margin-bottom: rem(32)

    &__info
        &__card
            margin-bottom: rem(48)

            @include flex_center_spacing()
            gap: rem(12)

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
                font-size: rem(16)
                line-height: 150%

        &__btn
            max-width: rem(192)

    &__settings
        @include flex_start()
        gap: rem(8)
        width: rem(742)
        &__course-list
            margin-bottom: rem(24)

        &-container
            margin-bottom: rem(16)

            @include flex_center_spacing()
            position: relative
            .oil-btn
                height: rem(38)
                padding: rem(8) rem(24)

        &__pagination
            @include flex_center()

    &__filter
        padding: rem(32)

        background-color: $basic_white
        box-shadow: 0px 8px 18px -6px rgba(24, 39, 75, 0.12), 0px 12px 42px -4px rgba(24, 39, 75, 0.12)
        @include flex_column()
        gap: rem(32)
        position: absolute
        right: 0
        top: rem(-132)
        .oil-checkbox
            width: rem(347)
            &__text
                font-size: rem(14)

        &__frame
            gap: rem(12)

            @include flex_column()
            &__title
                margin-bottom: rem(4)

                font-size: rem(14)

        &__btns
            @include flex_start()
            gap: rem(12)

        &__close
            position: absolute
            top: rem(24)
            right: rem(24)
            cursor: pointer
</style>
