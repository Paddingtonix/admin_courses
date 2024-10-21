<template>
	<section v-if="user_role_store.role === 'Admin'" class="oil-container">
		<div class="oil-page direction-page">
			<h4 class="direction-page__header">Направления курсов</h4>
			<PillCmp
				class="oil-direction-page__pill"
				v-for="(pill, idx) in pill_info"
				:key="idx"
				:text="pill.text"
				:value="pill.value"
			/>
			<div class="oil-direction-page__container">
				<div class="oil-direction-page__settings">
					<SearchCmp
						class="oil-direction-page__settings__search"
						:label="'Поиск'"
						:model-value="search_query"
						@change-value="changeSearchValue"
					/>
					<BtnCmp
						class="oil-direction-page__settings__btn"
						:background_type="'_tertiary'"
						:text="'Добавить направление'"
						@click="sendDirection"
					>
						<svg
							width="20"
							height="20"
							viewBox="0 0 20 20"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M9.9974 4.1665V15.8332M4.16406 9.99984H15.8307"
								stroke="#176DC1"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</BtnCmp>
				</div>
				<div class="oil-direction-page__checkbox">
					<CheckboxCmp
						:id="active_checkbox.show_only_visible.name"
						:active="active_checkbox.show_only_visible.isActive"
						text="Отображающиеся на сайте"
						@set_value="toggleVisible"
					/>
					<CheckboxCmp
						:id="active_checkbox.show_only_invisible.name"
						:active="active_checkbox.show_only_invisible.isActive"
						text="Не отображающиеся на сайте"
						@set_value="toggleVisible"
					/>
				</div>
				<div class="oil-direction-page__course-list">
					<template v-if="filtered_directions?.length">
						<TableHeadCmp
							@sort="onSort"
							class="oil-direction-page__course-list__table-header"
							:lastChangeDateTime="'Дата посл. ред.'"
							:localizedName="'Название'"
							:isVisible="'Отображение на сайте' as unknown as boolean"
							:count="'Кол-во курсов'"
						/>
						<TableRowCmp
							class="oil-direction-page__course-list__table-row"
							v-for="(row, idx) in filtered_directions"
							:key="idx"
							:lastChangeDateTime="
								formatDate(row.lastChangeDateTime)
							"
							:localizedName="row.localizedName"
							:isVisible="
								row.isVisible
									? 'Отображается'
									: 'Не отображается'
							"
							:id="idx"
							:count="row.count.toString()"
							:redirect="false"
							@click="sendDirection(row, true)"
						>
							<template v-slot:svg>
								<i
									class="oil-direction-page__course-list__table-row__svg"
									@click.stop="deleteDirection(row)"
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
					</template>
					<div v-if="!filtered_directions?.length" class="no-results">
						<span>
							К сожалению, по вашему запросу не найдено ни одного
							направления. Попробуйте другие параметры поиска.
						</span>
					</div>
					<div
						v-if="!direction_store.directions.directions?.length"
						class="no-results"
					>
						<span> Не создано ни одного направления. </span>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script lang="ts">
import {
	defineComponent,
	reactive,
	ref,
	computed,
	watch,
	onMounted,
} from "vue";
import { useDirectionStore } from "~/src/stores/storeDirection";
import { useStoreModal } from "~/src/stores/storeModal";
import { formatDate } from "~/src/utils/format-date";
import { sortHeader } from "~/src/utils/sort-header";
import { useUserRoleStore } from "~/src/stores/storeRole";
import { useStoreCourses } from "~/src/stores/storeCourse";
import type { IDirection } from "~/src/ts-interface/direction";
import type { IDeleteModal } from "~/src/ts-interface/storeModal.type";
import type { ILocalizations } from "~/src/ts-interface/direction";
import axios from "axios";

export default defineComponent({
	setup() {
		const direction_store = useDirectionStore();
		const search_query = ref("");
		const show_only_visible = ref(true);
		const show_only_invisible = ref(true);
		const sort_field = ref("");
		const sort_direction = ref<"asc" | "desc">("asc");
		const user_role_store = useUserRoleStore();
		const modal_store = useStoreModal();
		const course_store = useStoreCourses();
		const localizations_data = direction_store.localizations;

		const localizations = ref<ILocalizations[]>([]);

		const visible_state = reactive({
			show_only_visible: true,
			show_only_invisible: true,
		});

		const pill_info = computed(() => [
			{
				text: "Всего",
				value: direction_store.directions.totalDirectionsCount,
			},
			{
				text: "На сайте",
				value: direction_store.directions.visibleDirectionsCount,
			},
		]);

		const active_checkbox = reactive({
			show_only_visible: { name: "show_only_visible", isActive: true },
			show_only_invisible: {
				name: "show_only_invisible",
				isActive: true,
			},
		});

		const toggleVisible = ({
			id,
			active,
		}: {
			id: "show_only_visible" | "show_only_invisible";
			active: boolean;
		}) => {
			active_checkbox[id].isActive = active;
			visible_state[id] = active;
		};

		const changeSearchValue = (text: string) => {
			search_query.value = text;
		};

		const onSort = ({ field_key }) => {
			const direction = sort_direction.value === "asc" ? "desc" : "asc";
			console.log(`Сортировка по ${field_key} в порядке ${direction}`);
			sort_field.value = field_key;
			sort_direction.value = direction;
		};

		const filtered_by_visibility = computed(() => {
			const directions = direction_store.directions.directions;

			if (
				visible_state.show_only_visible &&
				visible_state.show_only_invisible
			) {
				return directions;
			}

			if (
				!visible_state.show_only_visible &&
				!visible_state.show_only_invisible
			) {
				return [];
			}

			if (visible_state.show_only_visible) {
				return directions.filter((direction) => direction.isVisible);
			}
			if (visible_state.show_only_invisible) {
				return directions.filter((direction) => !direction.isVisible);
			}

			return directions;
		});

		const filtered_directions = computed(() => {
			let filtered = filtered_by_visibility.value;

			if (search_query.value) {
				filtered = filtered.filter((direction) =>
					direction.localizedName
						.toLowerCase()
						.includes(search_query.value.toLowerCase())
				);
			}

			if (sort_field.value && sort_direction.value) {
				filtered = sortHeader(
					filtered,
					sort_field.value,
					sort_direction.value
				);
			}

			return filtered;
		});

		const sendDirection = async (data?: IDirection, edit?: boolean) => {
			const initialLocalizations = {
				id: 0,
				isVisible: false,
				localizations: { ru: "", en: "", fr: "" },
				description: { ru: "", en: "", fr: "" },
			};

			if (data?.directionId) {
				axios
					.get(`admin/v1/Direction/${data.directionId}`)
					.then((response) => {
						localizations.value = response.data;
						console.log("Локализации получены", response.data);

						modal_store.$patch({
							label: !edit
								? "Добавление направления"
								: "Редактирование направления",
							activeModal: "direction-modal",
							modalProps: {
								localizations,
								edit,
							},
						});
						modal_store.openModal();
					})
					.catch((error) => {
						console.error(
							"Ууупс, ошибка при получении локализаций",
							error
						);
					});
			} else {
				modal_store.$patch({
					label: "Добавление направления",
					activeModal: "direction-modal",
					modalProps: {
						localizations: initialLocalizations,
						edit,
					},
				});
				modal_store.openModal();
			}
		};

		const getRelatedCourses = (localizedName: string) => {
			const courses = course_store.course_list.filter(
				(direction_in_course) => {
					return direction_in_course.directions.includes(
						localizedName
					);
				}
			);
			return courses.length ? courses : [];
		};

		const deleteDirection = (data?: IDirection) => {
			console.log(data.localizedName, "data.localizedName");
			const related_courses = getRelatedCourses(data.localizedName);
			console.log(related_courses, "related_courses");
			if (related_courses.length > 0) {
				modal_store.$patch({
					label: "Невозможно удалить направление",
					activeModal: "warning-delete-modal",
					modalProps: {
						data,
						related_courses,
					},
				} as unknown as IDeleteModal);
				modal_store.openModal();
			} else {
				modal_store.$patch({
					label: "Удаление направления",
					activeModal: "delete-modal",
					modalProps: {
						data,
						modalComponent: "delete-direction",
						deleteFunction: () =>
							direction_store.removeDirection(data.directionId),
					},
				} as unknown as IDeleteModal);
				modal_store.openModal();
			}
		};

		onMounted(() => {
			nextTick(() => {
				direction_store.getDirections();
				course_store.getCourses("/admin/v1/Course");
			});
		});

		return {
			pill_info,
			search_query,
			filtered_directions,
			filtered_by_visibility,
			formatDate,
			direction_store,
			show_only_visible,
			show_only_invisible,
			active_checkbox,
			user_role_store,
			course_store,
			localizations_data,
			localizations,
			deleteDirection,
			sendDirection,
			visible_state,
			toggleVisible,
			changeSearchValue,
			onSort,
		};
	},
});
</script>

<style lang="sass">
.oil-direction-page
    &__header
        margin-bottom: rem(12)

    &__pill
        margin-bottom: rem(32)

    &__container
        max-width: rem(1140)

    &__settings
        @include flex_start()
        gap: rem(12)
        width: rem(816)
        margin-bottom: rem(16)

        *
            max-height: rem(40)

        &__btn
            max-width: rem(280)
            padding: rem(10) rem(16) rem(10) rem(16)

    &__checkbox
        display: flex
        gap: rem(32)
        margin-bottom: rem(24)

    &__course-list
        &__table-header
            .oil-head__cell
                padding: rem(14) rem(8)

                &:nth-child(1)
                    flex: 1

                &:nth-child(2)
                    flex: 3

                &:nth-child(3)
                    flex: 1

                &:nth-child(4)
                    flex: 1

        &__table-row
            cursor: pointer
            position: relative
            transition: all .2s ease-in-out
            &:hover
                background: $basic_light_blue
                .oil-direction-page__course-list__table-row__svg
                    opacity: 1

            &__svg
                transition: opacity .2s ease-in
                opacity: 0
                position: absolute
                right: rem(16)

            .oil-row__cell
                padding: rem(14) rem(8)

                &:nth-child(1)
                    flex: 1
                    span
                        color: $basic_text

                &:nth-child(2)
                    flex: 3
                    span
                        color: $basic_primary

                &:nth-child(3)
                    flex: 1

                &:nth-child(4)
                    flex: 1

.no-results
    margin-top: rem(48)
    font-size: rem(16)
    width: rem(576)
</style>
