<template>
	<div class="oil-row">
		<template v-for="(field, key) in fields" :key="key">
			<div
				class="oil-row__cell"
				v-if="typeof field === 'string' && field.length"
			>
				<a
					v-if="redirect && key === 'name'"
					:href="`/course-setting?search=${id}`"
				>
					{{ field }}
				</a>
				<span
					class="oil-row__cell__status"
					v-else-if="key === 'status'"
					@click="statusChange(field)"
				>
					{{ field }}
				</span>
				<span v-else>{{ field }}</span>
			</div>
		</template>
		<slot name="svg" />
	</div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useStoreModal } from "~/src/stores/storeModal";

export default defineComponent({
    props: {
        id: {
            type: Number,
            required: true,
        },
        redirect: {
            type: Boolean,
            default: true,
        },
        name: {
            type: String,
            default: "",
        },
        lastChangeDateTime: {
            type: String,
            default: "",
        },
        localizedName: {
            type: String,
            default: "",
        },
        status: {
            type: [String, Number],
            default: "",
        },
        authors: {
            type: String,
            default: "",
        },
        direction: {
            type: String,
            default: "",
        },
        lang: {
            type: String,
            default: "",
        },
        date_edit: {
            type: String,
            default: "",
        },
        end_date: {
            type: String,
            default: "",
        },
        isVisible: {
            type: Boolean,
            default: false,
        },
        count: {
            type: [String, Number],
            default: "",
        },
    },
    setup(props) {
        const fields = props;
        const store_modal = useStoreModal();

        const statusChange = (status: string) => {
            switch (status) {
                case "В разработке":
                    store_modal.$patch({
                        label: "Внимание!",
                        activeModal: "development-status",
                        modalProps: {
                            courseId: props.id,
                            status: 'onModeration' // автор может только отправлять курс на модерацию
                        }
                    });
                    store_modal.openModal()
                    break;
                case "На модерации":
                    store_modal.$patch({
                        label: "Изменение статуса",
                        activeModal: "moderation-status",
                        modalProps: {
                            courseId: props.id,
                            status: props.status
                        }
                    });
                    store_modal.openModal()
                    break;
                case "Опубликован":
                    store_modal.$patch({
                        label: "Внимание!",
                        activeModal: "published-status",
                    });
                    store_modal.openModal()
                    break;
                case "Снят с витрины":
                    store_modal.$patch({
                        label: "Внимание!",
                        activeModal: "out-of-stock-status",
                    });
                    store_modal.openModal()
                    break;
                case "В архиве":
                    store_modal.$patch({
                        label: "Внимание!",
                        activeModal: "archived-status",
                    });
                    store_modal.openModal()
                    break;
                default:
                    break;
            }
            return "";
        };

		return {
			fields,
			statusChange,
		};
	},
});
</script>
<style lang="sass">
.oil-row
    position: relative
    z-index: 0
    @include flex_center_spacing()
    border-bottom: rem(1) solid $disabled_basic
    &__cell
        padding: rem(8)

        &__status
            cursor: pointer
            color: $basic_primary

        &:nth-child(1)
            flex: 4
            *
                color: $basic_primary

        &:nth-child(2)
            flex: 2
            color: $basic_primary

        &:nth-child(3)
            flex: 3

        &:nth-child(4)
            flex: 3

        &:nth-child(5)
            flex: 1

        &:nth-child(6)
            flex: 2

        &:nth-child(7)
            flex: 2
</style>
