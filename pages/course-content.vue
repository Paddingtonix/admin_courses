<template>
	<section class="oil-container oil-course-content">
		<breadCmp
			:prev_page="['Курсы', `${course_name}`]"
			:current_page="'Создание курса'"
			class="oil-course-content__bread"
		/>
		<div class="oil-course-content__attention">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
			>
				<path
					d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
					stroke="#323C46"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
			<span>Как работать с содержанием раздела?</span>
		</div>
		<editor
			v-if="editorVisible"
			api-key="dz8c47wxakp97jftcugrneq2nl66wpkjv16yn8wgojhfzdw0"
			:init="{
				height: 500,
				menubar: false,
				plugins: [
					'advlist autolink lists link image charmap print preview anchor',
					'searchreplace visualblocks code fullscreen',
					'insertdatetime media table paste code help wordcount',
				],
				toolbar:
					'undo redo | formatselect | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | help',
			}"
		/>
		<btnCmp :text="'Сохранить'" class="oil-course-content__btn" />
	</section>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import Editor from "@tinymce/tinymce-vue";

export default defineComponent({
	props: {
		course_name: {
			type: String,
			default: "Геологическое моделирование пласта",
		},
	},
	setup() {
		const editorVisible = ref(false);

		onMounted(() => {
			editorVisible.value = true;
		});

		return {
			editorVisible,
		};
	},
	components: {
		Editor,
	},
});
</script>

<style lang="sass">
.oil-course-content
    @include flex_column()
    gap: rem(32)
    &__attention
        width: rem(924)
        padding: rem(16) rem(24)

        display: flex
        align-items: center
        gap: rem(12)
        background-color: $basic_light_gray
        border-radius: rem(8)
        border: rem(1) solid $light_gray

    &__btn
        width: fit-content
</style>
