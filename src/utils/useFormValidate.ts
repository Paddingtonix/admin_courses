import { isNull } from "lodash";
import { deepEqual } from "./deepComparsion";
import { reactive, computed, watch } from "vue";

interface IValidationRule {
	required?: { errorMessage: string }; //поле обязательно
	min?: { errorMessage?: string; minValue: number }; // минимальное кол-во символов
	max?: { errorMessage?: string; maxValue: number }; // максимальное кол-во символов
	shouldChange?: { errorMessage: string }; // должно ли поле быть изменено или плевать вообще
	validateNumber?: { errorMessage?: string; range: [number, number] }; // валидация числа range [min, max]
	validateString?: {
		// валидация строки по регулярному выражению
		errorMessage: string;
		regExp: RegExp;
		specialField?: {
			// особое поле(как было у меня с ебаным ru)
			name: string;
			errorMessage: string;
			regExp: RegExp;
		};
	};
	validateArray?: {
		customSchema: IValidationRule; //не работает, да мне в принципе, лень переписывать что-то
	};
	defaultError: string; //стандартная ошибка, если вы их не хотите передавать)
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

	const isFormContainsObject = computed(() =>
		Object.keys(currentForm).filter(
			(field) =>
				typeof currentForm[field] === "object" &&
				!isNull(currentForm[field])
		)
	);

	const watchFieldChanges = () => {
		isFormContainsObject.value.forEach((fieldInner) => {
			Object.keys(currentForm[fieldInner]).forEach((lang) => {
				watch(
					() => currentForm[fieldInner][lang],
					() => {
						validateField(lang, validationSchema[fieldInner]);
						clearShouldChangeErrors();
					}
				);
			});
		});

		Object.keys(currentForm).forEach((field) => {
			watch(
				() => currentForm[field],
				() => {
					validateField(field);
					clearShouldChangeErrors();
				}
			);
		});
	};

	const checkRules = (
		rules: IValidationRule,
		fieldValue: string | number,
		fieldName: string
	): string | null => {
		const errorChecks: Record<string, () => string | null> = {
			required: () =>
				typeof fieldValue !== "object" &&
				rules?.required?.errorMessage &&
				!fieldValue
					? rules.required.errorMessage
					: null,
			validateString: () => {
				const specialField = rules.validateString?.specialField;
				const currentRegExp =
					specialField && fieldName === specialField.name
						? specialField.regExp
						: rules.validateString?.regExp;

				return currentRegExp && typeof fieldValue === "string"
					? !currentRegExp.test(fieldValue)
						? fieldName === specialField?.name
							? specialField?.errorMessage || rules.defaultError
							: rules.validateString?.errorMessage ||
							  rules.defaultError
						: null
					: null;
			},

			min: () =>
				typeof fieldValue === "string" &&
				rules.min?.minValue &&
				fieldValue.length < rules.min.minValue
					? rules.min.errorMessage || rules.defaultError
					: null,

			max: () =>
				typeof fieldValue === "string" &&
				rules.max?.maxValue &&
				fieldValue.length > rules.max.maxValue
					? rules.max.errorMessage || rules.defaultError
					: null,

			validateNumber: () => {
				if (!rules?.validateNumber) {
					return null;
				}
				const [min, max] = rules.validateNumber?.range;
				const valueAsNumber = Number(fieldValue);
				return rules.validateNumber &&
					(isNaN(valueAsNumber) ||
						valueAsNumber < min ||
						valueAsNumber > max)
					? rules.validateNumber.errorMessage || rules.defaultError
					: null;
			},
			validateArray: () => {
				if (rules?.validateArray && Array.isArray(fieldValue)) {
					const arrayFieldValue = fieldValue as any[];
					const customSchema = rules.validateArray.customSchema;

					arrayFieldValue.forEach((element, index) => {
						const fieldKey = `${fieldName}[${index}]`; // Правильный ключ для каждого элемента массива

						// Теперь валидируем каждый элемент массива
						Object.keys(customSchema).forEach((rule) => {
							const error = checkRules(
								customSchema,
								element,
								fieldKey
							); // Проверяем правила для элемента массива
							if (error) {
								errors[fieldKey] = error; // Записываем ошибку с правильным ключом
							} else {
								delete errors[fieldKey]; // Удаляем ошибку, если всё ок
							}
						});
					});

					return null; // Возвращаем null, если нет ошибок
				}
				return null; // Возвращаем null, если не массив или нет правила
			},
			shouldChange: () =>
				typeof fieldValue === "string" &&
				fieldValue.trim() !== "" &&
				deepEqual(initialForm, currentForm)
					? rules.shouldChange?.errorMessage || rules.defaultError
					: null,
		};

		return (
			Object.values(errorChecks)
				.map((check) =>
					rules
						? Object.keys(rules).includes(check.name)
							? check()
							: null
						: null
				)
				.filter((error): error is string => error !== null)
				.shift() || null
		);
	};

	const validateField = (
		field: string,
		customSchema?: IValidationRule
	): void => {
		const rules = customSchema || validationSchema[field];
		const fieldValue = customSchema
			? currentForm[isFormContainsObject.value[0]][field]
			: currentForm[field];

		const error = checkRules(rules, fieldValue, field);

		error ? (errors[field] = error) : delete errors[field];
	};

	const clearShouldChangeErrors = () =>
		!deepEqual(initialForm, currentForm) &&
		Object.keys(validationSchema).forEach((field) => {
			const shouldChangeError =
				validationSchema[field].shouldChange?.errorMessage;
			errors[field] === shouldChangeError &&
				Object.keys(errors).forEach((item) => {
					delete errors[item];
				});
		});

	const validateOnSubmit = () => {
		Object.keys(currentForm).forEach((field) =>
			typeof currentForm[field] !== "object" && !isNull(field)
				? validateField(field)
				: null
		);
		isFormContainsObject.value.forEach((fieldInner) => {
			validationSchema[fieldInner];
			Object.keys(currentForm[fieldInner]).forEach((lang) => {
				validateField(lang, validationSchema[fieldInner]);
			});
		});
	};

	const setCustomError = (field: string, msg: string) =>
		(errors[field] = msg);

	const isFormValid = computed(() => !Object.keys(errors).length);

	watchFieldChanges();

	return { isFormValid, errors, validateOnSubmit, setCustomError };
};
