import { deepEqual } from "./deepComparsion";

interface IValidationRule {
    required?: { errorMessage: string };
    min?: { errorMessage?: string; minValue: number };
    max?: { errorMessage?: string; maxValue: number };
    shouldChange?: { errorMessage: string };
    validateNumber?: { errorMessage?: string; range: [number, number] };
    defaultError: string;
    isTouched: boolean;
}

interface IValidationSchema {
    [key: string]: IValidationRule;
}

interface ICurrentForm {
    [key: string]: any;
}

export const useFormValidate = (
    currentForm: ICurrentForm,
    validationSchema: IValidationSchema
) => {
    const initialForm = Object.create(currentForm);

    const errors = reactive<{ value: { [key: string]: string } }>({
        value: {},
    });
    const touchedFields = Object.fromEntries(
        Object.keys(currentForm).map((item) => [item, false])
    );

    (() => {
        errors.value = {};
        const newErrors: { value: { [key: string]: string } } = { value: {} };
        for (const field in validationSchema) {
            const fieldValue = currentForm[field];
            const rules = validationSchema[field];

            if (currentForm[field].length && !touchedFields[field]) {
                return;
            } else {
                touchedFields[field] = true;
            }
            if (rules.required && !fieldValue) {
                newErrors.value[field] = rules.required.errorMessage;
            }

            if (
                rules.min?.minValue !== undefined &&
                fieldValue.length < rules.min.minValue
            ) {
                newErrors.value[field] =
                    rules.min?.errorMessage || rules.defaultError;
            }

            if (
                rules.max?.maxValue !== undefined &&
                fieldValue.length > rules.max.maxValue
            ) {
                newErrors.value[field] =
                    rules.max?.errorMessage || rules.defaultError;
            }

            if (rules.validateNumber) {
                const [min, max] = rules.validateNumber.range;
                const valueAsNumber = Number(fieldValue);
                if (
                    isNaN(valueAsNumber) ||
                    valueAsNumber < min ||
                    valueAsNumber > max
                ) {
                    newErrors.value[field] =
                        rules.validateNumber?.errorMessage ||
                        rules.defaultError;
                }
            }
            if (rules.shouldChange) {
                if (deepEqual(initialForm, currentForm)) {
                    newErrors.value[field] =
                        rules.shouldChange?.errorMessage || rules.defaultError;
                }
            }
        }

        Object.assign(errors, newErrors);
    })();

    const isFormValid = computed(() => {
        return Object.keys(errors.value).length === 0;
    });

    return { isFormValid, errors };
};
