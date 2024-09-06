import { deepEqual } from "./deepComparsion";

// Функция для проверки валидности формы
export const isFormValid = (
	currentForm: Record<string, any>, // Текущие значения полей формы
	initialForm: Record<string, any>, // Исходные значения полей формы
	requiredFields: string[] = [] // Список обязательных полей, которые должны быть заполнены
): boolean => {
	if(requiredFields.find(value => {value === 'score'})){
		
		return (currentForm.score > 0 && currentForm.score <= 3)
	}
	// Проверка на наличие изменений в форме
	const hasChanges = Object.keys(currentForm).some((field) => {
		if (field === "id") return false; // Пропускаем проверку для поля "id"

		const currentValue = currentForm[field]; // Текущее значение поля
		const initialValue = initialForm[field]; // Исходное значение поля

		// Если текущее и исходное значения не равны, считаем, что форма изменилась
		return !deepEqual(currentValue, initialValue);
	});

	// Проверка на заполненность всех обязательных полей
	const allFieldsFilled = requiredFields.every((field) => {
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

	// Возвращаем true, если форма изменилась и все обязательные поля заполнены, иначе false
	return hasChanges && allFieldsFilled;
};


