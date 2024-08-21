<template>
	<section v-if="user_role_store.role === 'Admin'" class="oil-container">
		<div class="oil-page tags-page">
			<h4 class="tags-page__header">Метки</h4>
			<TabSwitcherCmp :switcherArray="switcherArray" />
			<hr class="tags-page__divider" />
			<div class="tags-page__content">
				<NuxtPage />
			</div>
		</div>
	</section>
</template>

<script lang="ts">
import type ISwitcher from "~/src/ts-interface/switcher.type";
import { defineComponent } from "vue";
import { useUserRoleStore } from "~/src/stores/storeRole";

export default defineComponent({
	setup() {
		const switcherArray: ISwitcher[] = [
			{ text: "Метки", id: 1, isActive: true, link: "/tags-page" },
			{
				text: "Разделы",
				id: 2,
				isActive: false,
				link: "tags-page/section-page",
			},
		];

		const list = [
			{ text: "10 меток на стр." },
			{ text: "20 меток на стр." },
			{ text: "30 меток на стр." },
			{ text: "40 меток на стр." },
		];
		const user_role_store = useUserRoleStore();

		return {
			list,
			switcherArray,
			user_role_store,
		};
	},
});

const switcherArray: ISwitcher[] = [
	{ text: "Метки", id: 1, isActive: true, link: "/tags-page" },
	{
		text: "Разделы",
		id: 2,
		isActive: false,
		link: "/tags-page/section-page",
	},
];
</script>

<style lang="sass">

.tags-page
   &__header
       margin-bottom: rem(32)

   &__divider
       margin-bottom: rem(32)

   &__content
       max-width: rem(1140)
</style>
