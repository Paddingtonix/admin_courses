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
	tags_form_schema: {
		headingId: {
			shouldChange: { errorMessage: "Вы должны что-то изменить" },
			required: { errorMessage: "Поле обязательно к заполнению" },
			defaultError: "Что-то пошло не так",
		},
		headingName: {
			required: { errorMessage: "Поле обязательно к заполнению" },
			shouldChange: { errorMessage: "Вы должны что-то изменить" },
			defaultError: "Что-то пошло не так",
		},
		name: {
			required: { errorMessage: "Поле обязательно к заполнению" },
			shouldChange: { errorMessage: "Вы должны что-то изменить" },
			isName: {
				errorMessage:
					"Поле может содержать буквы латиницы, символы и цифры",
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
			isObject: {
				validationSchema: {
					required: {
						errorMessage: "Поле обязательно к заполнению",
					},
					isName: {
						errorMessage:
							"Поле может содержать буквы латиницы, символы и цифры",
					},
					defaultError: "Что-то пошло не так",
				},
			},
			defaultError: "Что-то пошло не так",
		},
	},
};
