import { deepEqual } from "./deepComparsion";

type TValidateFormOptions = {
	validateScore?: boolean; // Включает или отключает проверку score
	checkChanges?: boolean; // Включает или отключает проверку изменений
	checkRequiredFields?: boolean; // Включает или отключает проверку обязательных полей
	checkImgTag?: boolean; // Проверяет есть ли тег img в строке
};

// Тип для параметров функции validateForm
type TValidateFormParams = {
	currentForm: Record<string, any>; // Текущие значения полей формы
	initialForm: Record<string, any>; // Исходные значения полей формы
	requiredFields?: string[]; // Список обязательных полей, которые должны быть заполнены
	options?: TValidateFormOptions; // Опции валидации
};

// Тип для функции validateForm
type TValidateForm = (params: TValidateFormParams) => boolean;

const imgTagRegex = /<img\s+[^>]*src="[^"]*"\s+alt="[^"]*"[^>]*>/gi;

const hasImg = (form: Record<string, any>): boolean => {
	return imgTagRegex.test(form.value);
};

const hasChanges = (
	currentForm: Record<string, any>,
	initialForm: Record<string, any>
): boolean => {
	return Object.keys(currentForm).some((field) => {
		if (field === "id") return false; // Пропускаем проверку для поля "id"

		const currentValue = currentForm[field]; // Текущее значение поля
		const initialValue = initialForm[field]; // Исходное значение поля

		// Если текущее и исходное значения не равны, считаем, что форма изменилась
		return !deepEqual(currentValue, initialValue);
	});
};

// Функция для проверки заполненности обязательных полей
const allFieldsFilled = (
	currentForm: Record<string, any>,
	requiredFields: string[]
): boolean => {
	return requiredFields.every((field) => {
		const value = currentForm[field]; // Текущее значение поля

		// Если поле — строка, проверяем, что оно не пустое после удаления пробелов
		if (typeof value === "string") {
			return value.trim() !== "";
		}

		// Если поле — объект, проверяем, что все его строковые значения не пустые
		if (typeof value === "object" && value !== null) {
			return !Object.values(value).some(
				(val) => typeof val === "string" && val.trim() === ""
			);
		}

		// Для других типов данных проверяем, что значение не null и не undefined
		return value !== null && value !== undefined;
	});
};

// Функция для проверки значения score(балл в course-content)
const validateScore = (form: Record<string, any>): boolean => {
	return form.correctAnswerScore > 0 && form.correctAnswerScore <= 3;
};

// Основная функция для проверки формы с дополнительными опциями
export const validateForm: TValidateForm = ({
	currentForm,
	initialForm,
	requiredFields = [],
	options = {},
}) => {
	// Если включена проверка score
	if (options.validateScore && !validateScore(currentForm)) {
		return false;
	}
	// Если включена проверка тега img
	if (options.checkImgTag && !hasImg(currentForm)) {
		return false;
	}

	// Если включена проверка изменений
	const changesValid = options.checkChanges
		? hasChanges(currentForm, initialForm)
		: true;

	// Если включена проверка обязательных полей
	const fieldsFilledValid = options.checkRequiredFields
		? allFieldsFilled(currentForm, requiredFields)
		: true;

	// Возвращаем true, если все включенные проверки проходят, иначе false
	return changesValid && fieldsFilledValid;
};
