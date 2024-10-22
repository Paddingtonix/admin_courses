<template>
	<section class="oil-container">
		<div class="oil-page oil-course-setting">
			<breadCmp
				:prev_page="
					userStore.role !== 'Author' ? 'Список курсов' : 'Мои курсы'
				"
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
import { useUserRoleStore } from "~/src/stores/storeRole";
import type ISwitcher from "~/src/ts-interface/switcher.type";

export default defineComponent({
	setup() {
		const storeEditCourseSetting = useStoreEditCourseSetting();
		const storeCourseSetting = useStoreCourseSettings();
		const userStore = useUserRoleStore();
		const editInput = ref(null) as any;
		const route = useRoute();
		const { query } = route;
		const router = useRouter();
		const active_tab = ref<number>(parseInt(query.tab) || 1);
		const isAdmin = userStore.isAdmin;
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
			isAdmin,
			userStore,
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

.oil-course-setting__settings__table__column__cell
    .oil-input
        height: rem(40)
        width: rem(136)
</style>
