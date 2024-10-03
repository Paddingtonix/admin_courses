<template>
	<div class="oil-pagination">
		<template v-if="pagesArray.length > 6">
			<template v-if="currentPage > 3">
				<div
					class="oil-pagination__cell"
					v-for="(page, idx) in pagesArray.slice(0, 2)"
					:key="idx"
					:class="{ _active: currentPage === page }"
					@click="changePage(page)"
				>
					{{ page }}
				</div>
			</template>
			<span v-if="currentPage > 4">...</span>
			<div
				class="oil-pagination__cell"
				v-for="(page, idx) in pagesArray.slice(
					visiblePagesBefore(),
					visiblePagesAfter()
				)"
				:key="idx"
				:class="{ _active: currentPage === page }"
				@click="changePage(page)"
			>
				<span>{{ page }}</span>
			</div>

			<span
				v-if="currentPage + 2 < pagesArray.length - 1"
				class="oil-pagination__cell"
				>...</span
			>
			<template v-if="currentPage + 3 <= pagesArray.length">
				<div
					class="oil-pagination__cell"
					v-for="(page, idx) in pagesArray.slice(-2)"
					:key="idx"
					:class="{ _active: currentPage === page }"
					@click="changePage(page)"
				>
					{{ page }}
				</div>
			</template>
		</template>
		<template v-else>
			<div
				class="oil-pagination__cell"
				v-for="(page, idx) in pagesArray"
				:key="idx"
				@click="changePage(page)"
				:class="{ _active: currentPage === page }"
			>
				<span>{{ page }}</span>
			</div>
		</template>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
	props: {
		pages_count: {
			type: [Number, null] as PropType<null | number>,
			required: true,
		},
		currentPage: {
			type: Number,
			default: 1,
		},
	},
	emits: ["change-page"],
	setup(props, { emit }) {
		const numberOfPages = ref(props.pages_count);
		const localCurrentPage = ref(props.currentPage);

		const pagesArray = ref<number[]>([]);

		const updatePagesArray = (pagesCount: number | null) => {
			pagesArray.value = Array.from(
				{ length: pagesCount ? pagesCount : 0 },
				(_, i) => i + 1
			);
		};

		const changePage = (page: number) => {
			localCurrentPage.value = page;
			emit("change-page", page);
		};

		const visiblePagesBefore = () => {
			if (props.currentPage - 3 <= 0) {
				return 0;
			} else {
				if (props.currentPage + 3 >= pagesArray.value.length) {
					return props.currentPage - 3;
				}
				return props.currentPage - 2;
			}
		};

		const visiblePagesAfter = () => {
			if (props.currentPage + 3 <= pagesArray.value.length) {
				if (props.currentPage - 3 <= 0) {
					return 4;
				}
				return props.currentPage + 1;
			} else {
				return pagesArray.value.length;
			}
		};

		watch(
			() => props.pages_count,
			(newVal) => {
				numberOfPages.value = newVal;
				updatePagesArray(newVal);
			},
			{ immediate: true }
		);

		watch(
			() => props.currentPage,
			(newVal) => {
				localCurrentPage.value = newVal;
			}
		);

		return {
			pagesArray,
			numberOfPages,
			changePage,
			localCurrentPage,
			visiblePagesBefore,
			visiblePagesAfter,
		};
	},
});
</script>
<style lang="sass">
.oil-pagination
    max-width: rem(292)
    user-select: none

    @include flex_center_spacing()
    gap: rem(2)
    &__cell
        width: rem(40)
        height: rem(40)

        border-radius: 50%
        cursor: pointer
        @include flex_center()
        span
            font-size: rem(14)

        &._active
            background-color: #E5F0FB
            *
                color: #176DC1
</style>
