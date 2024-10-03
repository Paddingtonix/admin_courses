<template>
	<section class="oil-container oil-course">
		<div class="oil-course__info oil-page">
			<div
				v-if="user_role_store.role === 'Author'"
				class="oil-course__title"
			>
				Мои курсы
			</div>
			<div v-else class="oil-course__title">Курсы</div>
			<div class="oil-course__info__card">
				<CardInfo
					v-for="(card, idx) in course_info"
					:key="idx"
					:count="card.count"
					:text="card.text"
				/>
			</div>
			<template
				v-if="
					!courseStore.course_list.length &&
					!search_value.length &&
					!isFiltrationActive
				"
			>
				<div class="oil-course__info__attention">
					<i class="oil-course__info__attention__icon">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="40"
							height="40"
							viewBox="0 0 40 40"
							fill="none"
						>
							<path
								d="M20.0007 26.6673V20.0007M20.0007 13.334H20.0173M36.6673 20.0007C36.6673 29.2054 29.2054 36.6673 20.0007 36.6673C10.7959 36.6673 3.33398 29.2054 3.33398 20.0007C3.33398 10.7959 10.7959 3.33398 20.0007 3.33398C29.2054 3.33398 36.6673 10.7959 36.6673 20.0007Z"
								stroke="#176DC1"
								stroke-width="3.33"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</i>
					<p
						v-if="user_role_store.role === 'Author'"
						class="oil-course__info__attention__text"
					>
						На данный момент у вас нет ни одного созданного курса.
						Нажмите на кнопку "Создать курс", чтобы начать и
						поделиться своими знаниями с другими!
					</p>
					<p v-else class="oil-course__info__attention__text">
						На данный момент в системе нет ни одного курса. Как
						только первые курсы будут созданы, здесь появится
						таблица, которая позволит управлять их параметрами и
						содержанием.
					</p>
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
							@cancel-filters="setFilters"
							@send-fiters="setFilters"
							@click="openFilter(true)"
							:pressed_button="filter_frame.value"
							:filters="courseStore.filters"
						/>
					</div>
					<div class="oil-course__create">
						<BtnCmp
							:text="'Создать курс'"
							@click="navigate('/course-create')"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
							>
								<path
									d="M12 5V19M5 12H19"
									stroke="white"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						</BtnCmp>
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
						@sort="sortClick($event.field_key)"
					/>
					<TableRowCmp
						v-for="(row, idx) in courseStore.course_list"
						class="oil-course__settings__course-list__row"
						:id="row.courseId"
						:key="idx"
						:name="row.title"
						:status="translateStatus(row.status)"
						:authors="row.authorEmails[0]"
						:direction="formatDirectionToString(row.directions)"
						:lang="row.language.toUpperCase()"
						:date_edit="formatDate(row.lastChangeDateTime)"
						:end_date="formatDate(row.salesTerminationDate)"
					>
						<template v-slot:svg>
							<i
								@click.stop="
									openDeleteModal({
										title: row.title,
										id: row.courseId,
									})
								"
								class="oil-course__settings__course-list__row__svg"
							>
								<svg
									width="18"
									height="20"
									viewBox="0 0 18 20"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M12.3333 4.99984V4.33317C12.3333 3.39975 12.3333 2.93304 12.1517 2.57652C11.9919 2.26292 11.7369 2.00795 11.4233 1.84816C11.0668 1.6665 10.6001 1.6665 9.66667 1.6665H8.33333C7.39991 1.6665 6.9332 1.6665 6.57668 1.84816C6.26308 2.00795 6.00811 2.26292 5.84832 2.57652C5.66667 2.93304 5.66667 3.39975 5.66667 4.33317V4.99984M1.5 4.99984H16.5M14.8333 4.99984V14.3332C14.8333 15.7333 14.8333 16.4334 14.5608 16.9681C14.3212 17.4386 13.9387 17.821 13.4683 18.0607C12.9335 18.3332 12.2335 18.3332 10.8333 18.3332H7.16667C5.76654 18.3332 5.06647 18.3332 4.53169 18.0607C4.06129 17.821 3.67883 17.4386 3.43915 16.9681C3.16667 16.4334 3.16667 15.7333 3.16667 14.3332V4.99984"
										stroke="#FF7C7C"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
							</i>
						</template>
					</TableRowCmp>
				</div>
				<div class="oil-course__settings__pagination">
					<PaginationCmp
						:pages_count="paginations_pages!"
						:currentPage="current_page"
						@change-page="isCurrentPage"
					/>
				</div>
				<SelectorCmp
					@setValue="changeCoursePerPage($event)"
					class="tags-page__selector"
					:label="`${list[0].text} курсов на стр.`"
					listText="курсов на стр."
					:list="list"
				/>
			</template>
		</div>
	</section>
</template>
<script lang="ts">
import { useRouter } from "vue-router";
import { useStoreCourses } from "~/src/stores/storeCourse";
import { useUserRoleStore } from "~/src/stores/storeRole";
import { useStoreModal } from "~/src/stores/storeModal";
import { useHeadersSort } from "~/src/utils/sort-generator";
import type {
	IDeleteModal,
	IDeleteTag,
} from "~/src/ts-interface/storeModal.type";
import { useTagsStore } from "~/src/stores/storeTags";

export default defineComponent({
	setup() {
		const router = useRouter();
		const courseStore = useStoreCourses();

		const user_role_store = useUserRoleStore();

		const modalStore = useStoreModal();

		const filter_frame = reactive({
			value: false as boolean,
		});

		const nCoursesPerPage = ref(10);

		const tagsStore = useTagsStore();

		const tagsData = tagsStore.$state;

		const paginations_pages = ref<number>(
			courseStore.$state.numberOfPages ?? 1
		);
		const current_page = ref<number>(1);

		const search_value = ref("");

		const isCurrentPage = (page: number) => {
			current_page.value = page;
		};

		const updateSearchValue = (value = "") => {
			search_value.value = value;
			courseStore.getCourses(
				`/admin/v1/Course?page=${current_page.value}&searchSubstring=${search_value.value}`
			);
		};

		const list = [
			{ text: 10, active: true },
			{ text: 15, active: false },
			{ text: 20, active: false },
			{ text: 25, active: false },
		];

		const formatDirectionToString = (
			arr: string[] | null | undefined
		): string => {
			if (!arr || arr.length === 0) {
				return "—";
			}
			return arr.join(", ");
		};

		const formatDate = (date_value: string | null) => {
			if (date_value === null) {
				return "—";
			}
			const date = new Date(date_value);
			const day = String(date.getDate()).padStart(2, "0");
			const month = String(date.getMonth() + 1).padStart(2, "0");
			const year = date.getFullYear();
			return `${day}.${month}.${year}`;
		};

		const openFilter = (state: boolean) => {
			filter_frame.value = state;
		};

		const navigate = (url: string) => {
			router.push(url);
		};

		const openDeleteModal = (data: any) => {
			modalStore.$patch({
				label: "Удаление курса",
				activeModal: "delete-modal",
				modalProps: {
					data,
					modalComponent: "delete-course",
					deleteFunction: courseStore.deleteCourse,
				} as unknown as IDeleteTag,
			} as unknown as IDeleteModal);

			modalStore.openModal();
		};

		watch(
			() => courseStore.$state.numberOfPages,
			(newValue) => {
				paginations_pages.value = newValue ?? 1;
			}
		);

		const isFiltrationActive = ref(false);

		const filters = reactive({
			statuses: "",
			languageIds: "",
			directionIds: "",
		});

		const changeCoursePerPage = (val: { value: number; type: string }) => {
			nCoursesPerPage.value = val.value;
			courseStore.getCourses(
				`/admin/v1/Course?page=${current_page.value}&searchSubstring=${search_value.value}&nCoursesPerPage=${nCoursesPerPage.value}`
			);
		};

		watch(current_page, () => {
			courseStore.getCourses(
				`/admin/v1/Course?page=${current_page.value}&searchSubstring=${search_value.value}&nCoursesPerPage=${nCoursesPerPage.value}`
			);
		});

		watch(filters, () => {
			const filter_string =
				`${filters.statuses}${filters.languageIds}${filters.directionIds}`.trim();

			if (filter_string.length) {
				isFiltrationActive.value = true;
				courseStore.getCourses(
					`/admin/v1/Course?page=${current_page.value}${filter_string}&nCoursesPerPage=${nCoursesPerPage.value}&searchSubstring=${search_value.value}`
				);
			} else {
				courseStore.getCourses(
					`/admin/v1/Course?page=${current_page.value}&nCoursesPerPage=${nCoursesPerPage.value}&searchSubstring=${search_value.value}`
				);
				isFiltrationActive.value = false;
			}
		});

		const setFilters = (value: {
			Направления?: number[];
			Статус?: string[];
			Язык?: string[];
		}) => {
			filters.directionIds = !value?.Направления
				? ""
				: (() => {
						return value.Направления
							.map((item) => `&directionIds=${item}`)
							.join("");
				  })();

			filters.languageIds = !value.Язык
				? ""
				: (() => {
						return value.Язык
							.map((item) => `&languageIds=${item}`)
							.join("");
				  })();

			filters.statuses = !value.Статус
				? ""
				: (() => {
						return value.Статус
							.map((item) => `&statuses=${item}`)
							.join("");
				  })();
		};

		const tableHeadFields = ["name", "status", "lang"];

		enum sortNames {
			name = "ascendingHeadingName",
			status = "ascendingLabelName",
			lang = "ascendingLocalization",
		}

		const { sortState, sortClick } = useHeadersSort(
			tableHeadFields,
			sortNames,
			//@ts-ignore
			tagsStore.setSort
		);

		const status_translation: Record<
			| "InDevelopment"
			| "OnModeration"
			| "Published"
			| "Withdrawn"
			| "Archived",
			string
		> = {
			InDevelopment: "В разработке",
			OnModeration: "На модерации",
			Published: "Опубликован",
			Withdrawn: "Снят с витрины",
			Archived: "В архиве",
		};
		const translateStatus = (status: string): string => {
			if (status in status_translation) {
				return status_translation[
					status as keyof typeof status_translation
				];
			}
			return "Неизвестный статус";
		};

		onMounted(() => {
			nextTick(() => {
				courseStore.getFiters();
				courseStore.getCourses("/admin/v1/Course");
				console.log(courseStore.filters);
			});
		});

		return {
			user_role_store,
			navigate,
			filter_frame,
			openFilter,
			formatDirectionToString,
			formatDate,
			paginations_pages,
			current_page,
			isCurrentPage,
			updateSearchValue,
			translateStatus,
			openDeleteModal,
			search_value,
			courseStore,
			setFilters,
			isFiltrationActive,
			list,
			changeCoursePerPage,
			course_info: courseStore.course_info,
		};
	},
});
</script>
<style lang="sass" scoped>
.oil-course
    &__title
        font-size: rem(20)
        line-height: rem(28)
        font-weight: bold
        margin-bottom: rem(32)

    &__info
        position: relative
        .oil-selector
            position: absolute
            bottom: rem(32)
            right: rem(32)

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
        &__selector.oil-selector
            position: absolute
            border: none
            bottom: 0
            right: rem(32)
            transform: translateY(-50%)

    &__settings
        @include flex_start()
        gap: rem(8)
        width: rem(742)

        &__course-list
            margin-bottom: rem(24)
            &__row
                position: relative
                &:hover
                    background: $basic_light_blue
                    .oil-course__settings__course-list__row__svg
                        opacity: 1

                &__svg
                    transition: opacity .2s ease-in
                    opacity: 0
                    position: absolute
                    right: rem(16)
                    cursor: pointer

        &-container
            margin-bottom: rem(16)
            z-index: 9

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
