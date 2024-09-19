import type { IValidationSchema } from "~/src/utils/useFormValidate";

const regExps = {
    isName: /^[A-Za-z0-9!@#$%^&*()_+={}\[\]:;"'<>,.?\/\\|`~\-]+$/, //проверка на спец.символы, англ. алфавит, цифры (без пробелов)
    isDescription: /^[A-Za-z0-9\s!@#$%^&*()_+={}\[\]:;"'<>,.?\/\\|`~\-]+$/, //проверка на спец.символы, англ. алфавит, цифры (с пробелами)
    isCDescription:
        /^[а-яА-ЯёЁ0-9\s!@#\$%\^&\*\(\)_\+\-=\[\]\{\};:'",<>\./\?\\\|~`]+$/, //проверка на спец.символы, рус. алфавит, цифры (с пробелами)
};

export const validation_schemas: { [key: string]: IValidationSchema } = {
    form_sections_schema: {
        name: {
            required: { errorMessage: "Поле обязательно к заполнению" },
            shouldChange: { errorMessage: "Вы должны что-то изменить" },
            min: {
                errorMessage: "Минимальное количество символов: 4",
                minValue: 4,
            },
            max: {
                errorMessage: "Максимальное количество символов - 65",
                maxValue: 65,
            },
            validateString: {
                errorMessage:
                    "Поле может содержать буквы латиницы, символы и цифры",
                regExp: regExps.isName,
            },
            defaultError: "Что-то пошло не так",
        },
        description: {
            required: { errorMessage: "Поле обязательно к заполнению" },
            shouldChange: { errorMessage: "Вы должны что-то изменить" },
            min: {
                errorMessage: "Минимальное количество символов - 5",
                minValue: 5,
            },
            max: {
                errorMessage: "Максимальное количество символов - 485",
                maxValue: 485,
            },
            defaultError: "Что-то пошло не так",
        },
    },
    tags_form_schema: {
        headingName: {
            shouldChange: { errorMessage: "Вы должны что-то изменить" },
            required: { errorMessage: "Поле обязательно к заполнению" },
            defaultError: "Что-то пошло не так",
        },
        name: {
            required: { errorMessage: "Поле обязательно к заполнению" },
            shouldChange: { errorMessage: "Вы должны что-то изменить" },
            validateString: {
                errorMessage:
                    "Поле может содержать буквы латиницы, символы и цифры",
                regExp: regExps.isName,
            },
            min: {
                errorMessage: "Минимальное количество символов - 3",
                minValue: 3,
            },
            max: {
                errorMessage: "Максимальное количество символов - 65",
                maxValue: 65,
            },
            defaultError: "Что-то пошло не так",
        },
        localizations: {
            required: {
                errorMessage: "Поле обязательно к заполнению",
            },
            validateString: {
                regExp: regExps.isDescription,
                errorMessage:
                    "Поле может содержать буквы латиницы, символы и цифры",
                specialField: {
                    name: "ru",
                    regExp: regExps.isCDescription,
                    errorMessage:
                        "Поле может содержать буквы кириллицы, символы и цифры",
                },
            },
            defaultError: "Что-то пошло не так",
        },
    },
};
