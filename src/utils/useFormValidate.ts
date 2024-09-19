import { isNull } from "lodash";
import { deepEqual } from "./deepComparsion";
import { reactive, computed, watch } from "vue";

interface IValidationRule {
    required?: { errorMessage: string };
    min?: { errorMessage?: string; minValue: number };
    max?: { errorMessage?: string; maxValue: number };
    shouldChange?: { errorMessage: string };
    validateNumber?: { errorMessage?: string; range: [number, number] };
    validateString?: { errorMessage: string; regExp: RegExp };
    isObject?: { validationSchema: IValidationRule };
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

        console.log(isFormContainsObject.value);

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
        fieldValue: string | number
    ): string | null => {
        const errorChecks: Record<string, () => string | null> = {
            required: () =>
                typeof fieldValue !== "object" &&
                rules?.required?.errorMessage &&
                !fieldValue
                    ? rules.required.errorMessage
                    : null,
            validateString: () => {
                const currentRegExp = rules.validateString?.regExp;

                return currentRegExp && typeof fieldValue === "string"
                    ? !currentRegExp.test(fieldValue)
                        ? rules.validateString?.errorMessage ||
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
            ? currentForm[isFormContainsObject.value[0]][field] // я тут ишачил, как мог, но пока что это не совсем универсальная валидация. Если вложенных объектов будет больше, то пизда))
            : currentForm[field];

        const error = checkRules(rules, fieldValue);

        error ? (errors[field] = error) : delete errors[field];
    };

    const clearShouldChangeErrors = () =>
        !deepEqual(initialForm, currentForm) &&
        Object.keys(validationSchema).forEach((field) => {
            console.log(errors);

            const shouldChangeError =
                validationSchema[field].shouldChange?.errorMessage;
            errors[field] === shouldChangeError && delete errors[field];
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
