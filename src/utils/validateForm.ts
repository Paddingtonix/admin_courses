import { deepEqual } from "./deepComparsion";

// Это гениальная штука, я собой доволен(лучше бы подключил библиотеку для валидации, если честно)
export const isFormValid = (
	currentForm: Record<string, any>,
	initialForm: Record<string, any>,
	requiredFields: string[] = []
): boolean => {
	const hasChanges = Object.keys(currentForm).some((field) => {
		if (field === "id") return false;

		const currentValue = currentForm[field];
		const initialValue = initialForm[field];

		return !deepEqual(currentValue, initialValue);
	});

	const allFieldsFilled = requiredFields.every((field) => {
		const value = currentForm[field];

		if (typeof value === "string") {
			return value.trim() !== "";
		}
		if (typeof value === "object" && value !== null) {
			return !Object.values(value).some(
				(val) => typeof val === "string" && val.trim() === ""
			);
		}
		return value !== null && value !== undefined;
	});

	return hasChanges && allFieldsFilled;
};
