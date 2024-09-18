<template>
    <form class="add-section" action="#">
        <InputCmp
            :model-value="formModel.name"
            class="add-section__input"
            label="Название раздела"
            :error="formErrors.value?.name ? formErrors.value.name : ''"
            :max_length="20"
            @set_value="changeForm({ name: $event })"
        ></InputCmp>
        <TextareaCmp
            :model-value="formModel.description"
            class="add-section__text-area"
            :error="
                formErrors.value?.description
                    ? formErrors.value.description
                    : ''
            "
            :max_length="40"
            @set_textarea="changeForm({ description: $event })"
            label="Описание раздела"
        ></TextareaCmp>
        <div class="add-section__button-wrapper">
            <BtnCmp
                type="button"
                background_type="_secondary"
                text="Отмена"
                @click="storeModal.closeModal()"
            />
            <BtnCmp
                v-if="modalData.modalProps.edit"
                type="submit"
                :disabled="!modalData.modalProps.isFieldChanged"
                text="Сохранить"
                @click.prevent="patchForm"
            />
            <BtnCmp
                v-else
                type="submit"
                text="Добавить"
                :disabled="!modalData.modalProps.isFieldChanged"
                @click.prevent="sendForm"
            />
        </div>
    </form>
</template>

<script lang="ts" setup>
import { useStoreModal } from "~/src/stores/storeModal";
import { useHeadersStore } from "~/src/stores/storeSections";
import type { IFormSection } from "~/src/ts-interface/storeModal.type";
import { useFormValidate } from "~/src/utils/useFormValidate";
import { validateForm } from "~/src/utils/validateForm";

const storeModal = useStoreModal();

const modalData = storeModal.$state as IFormSection;

const formModel = reactive({
    name: modalData.modalProps.name ?? "",
    description: modalData.modalProps.description ?? "",
});

const headersStore = useHeadersStore();

type TInputEvent = {
    value: string;
    type: string;
};

const changeForm = ({
    name,
    description,
}: {
    name?: TInputEvent;
    description?: TInputEvent;
}) => {
    if (name !== undefined) {
        formModel.name = name.value;
    }
    if (description !== undefined) {
        formModel.description = description.value;
    }
};

const startForm = JSON.parse(JSON.stringify(formModel));

// watch(formModel, () => {
// 	const isValid = validateForm({
// 		currentForm: formModel,
// 		initialForm: startForm,
// 		requiredFields: ["name", "description"],
// 		options: { checkChanges: true, checkRequiredFields: true },
// 	});

// 	storeModal.$patch({
// 		modalProps: {
// 			isFieldChanged: isValid,
// 		},
// 	});
// });

const formErrors = reactive({ value: {} } as {
    value: { name: string; description: string };
});

storeModal.$patch({
    modalProps: {
        isFieldChanged: true,
    },
});

const validationSchema = reactive({
    name: {
        required: { errorMessage: "Поле должно быть заполнено" },
        shouldChange: { errorMessage: "Вы должны что-то изменить" },
        min: {
            errorMessage: "Минимальное количество символов: 5",
            minValue: 5,
        },
        max: {
            errorMessage: "Максимальное кол-во символов: 15",
            maxValue: 15,
        },
        defaultError: "Что-то пошло не так",
        isTouched: false,
    },
    description: {
        required: { errorMessage: "Поле должно быть заполнено" },
        shouldChange: { errorMessage: "Вы должны что-то изменить" },
        min: {
            errorMessage: "Минимальное количество символов: 5",
            minValue: 5,
        },
        max: {
            errorMessage: "Максимальное кол-во символов: 15",
            maxValue: 40,
        },
        defaultError: "Что-то пошло не так",
        isTouched: false,
    },
});

watch(formModel, () => {
    const { isFormValid, errors } = useFormValidate(
        formModel,
        validationSchema
    );
    Object.assign(formErrors, errors);
});

const sendForm = () => {
    const { isFormValid, errors } = useFormValidate(
        formModel,
        validationSchema
    );
    console.log(formErrors);

    Object.assign(formErrors, errors);

    if (!isFormValid) {
        Object.assign(formErrors, {});
        headersStore
            .postHeading(formModel)
            .then(() => {
                storeModal.closeModal();
            })
            .catch((err) => {
                console.error("EBANAYA OSHIBKA ", err);
            });
    }
};

const patchForm = () => {
    const { name, description } = formModel;

    headersStore
        .patchHeading({
            name,
            description,
            id: modalData.modalProps.id,
        })
        .then((resp) => {
            console.log("allgoodies", resp);
            storeModal.closeModal();
        })
        .catch((err) => {
            console.log("ДА ЕБАТЬ ЕГО В РОТ НАХУЙ", err);
        });
};
</script>

<style lang="sass" scoped>
.add-section
    width: rem(520)

    &__button-wrapper
        display: flex
        column-gap: rem(8)

    &__input
        margin-bottom: rem(16)

    &__text-area
        margin-bottom: rem(32)
</style>
