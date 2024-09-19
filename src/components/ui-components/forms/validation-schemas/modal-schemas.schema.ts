import type { IValidationSchema } from "~/src/utils/useFormValidate";

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
			isName: {
				errorMessage:
					"Поле может содержать буквы латиницы, символы и цифры",
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
};
