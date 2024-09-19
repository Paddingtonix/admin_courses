import { deepEqual } from "./deepComparsion";
import { reactive, computed } from "vue";

interface IValidationRule {
	required?: { errorMessage: string };
	min?: { errorMessage?: string; minValue: number };
	max?: { errorMessage?: string; maxValue: number };
	shouldChange?: { errorMessage: string };
	validateNumber?: { errorMessage?: string; range: [number, number] };
	isName?: { errorMessage: string };
	defaultError: string;
}

export interface IValidationSchema {
	[key: string]: IValidationRule;
}

interface ICurrentForm {
	[key: string]: any;
}

export const useFormValidate = (
	currentForm: ICurrentForm,
	validationSchema: IValidationSchema
) => {
	const initialForm = JSON.parse(JSON.stringify(currentForm));

	const errors = reactive<{ [key: string]: string }>({});

	const isNameRegExp = /^[A-Za-z0-9!@#$%^&*()_+={}\[\]:;"'<>,.?\/\\|`~\-]+$/;

	const touchedFields = reactive<{ [key: string]: boolean }>(
		Object.fromEntries(
			Object.keys(currentForm).map((item) => [item, false])
		)
	);

	// Следим за изменениями каждого поля
	Object.keys(currentForm).forEach((field) => {
		watch(
			() => currentForm[field],
			() => {
				touchedFields[field] = true; // Помечаем поле как изменённое
				validateField(field); // Валидируем это конкретное поле
				clearShouldChangeErrors(); // Убираем ошибки shouldChange со всех полей
			}
		);
	});

	// Валидация конкретного поля
	const validateField = (field: string) => {
		const fieldValue = currentForm[field];
		const rules = validationSchema[field];

		// Убираем старую ошибку для данного поля
		delete errors[field];

		// Обязательное поле
		if (rules.required && !fieldValue) {
			errors[field] = rules.required.errorMessage;
			return;
		}

		// Минимальная длина
		if (
			rules.min?.minValue !== undefined &&
			fieldValue.length < rules.min.minValue
		) {
			errors[field] = rules.min?.errorMessage || rules.defaultError;
		}

		// Максимальная длина
		if (
			rules.max?.maxValue !== undefined &&
			fieldValue.length > rules.max.maxValue
		) {
			errors[field] = rules.max?.errorMessage || rules.defaultError;
		}

		if (rules.isName && !isNameRegExp.test(fieldValue)) {
			errors[field] = rules.isName.errorMessage || rules.defaultError;
		}
		// Валидация числового значения
		if (rules.validateNumber) {
			const [min, max] = rules.validateNumber.range;
			const valueAsNumber = Number(fieldValue);
			if (
				isNaN(valueAsNumber) ||
				valueAsNumber < min ||
				valueAsNumber > max
			) {
				errors[field] =
					rules.validateNumber?.errorMessage || rules.defaultError;
			}
		}

		// Проверка на изменение формы, если поле не пустое
		if (
			rules.shouldChange &&
			fieldValue.trim() !== "" &&
			deepEqual(initialForm, currentForm)
		) {
			errors[field] =
				rules.shouldChange?.errorMessage || rules.defaultError;
		}
	};

	// Убираем ошибки по shouldChange для всех полей, если хоть одно поле изменилось
	const clearShouldChangeErrors = () => {
		if (!deepEqual(initialForm, currentForm)) {
			Object.keys(validationSchema).forEach((field) => {
				if (validationSchema[field].shouldChange) {
					// Убираем ошибку shouldChange только для этого правила
					if (
						errors[field] ===
						validationSchema[field].shouldChange?.errorMessage
					) {
						delete errors[field];
					}
				}
			});
		}
	};

	// Полная валидация перед отправкой формы
	const validateOnSubmit = () => {
		Object.keys(currentForm).forEach((field) => {
			touchedFields[field] = true;
			validateField(field);
		});
	};

	const setCustomError = (field: string, msg: string) => {
		errors[field] = msg;
	};

	const isFormValid = computed(() => {
		return Object.keys(errors).length === 0;
	});

	return { isFormValid, errors, validateOnSubmit, setCustomError };
};
