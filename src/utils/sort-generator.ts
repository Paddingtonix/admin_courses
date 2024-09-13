type TSortNames = {
	[key: string]: string;
};

// Генератор для циклического изменения состояния сортировки
// Сначала state === null => true, затем true => false, затем false => null, и так по кругу.
function* setSortingValue(state: boolean | null) {
	while (true) {
		state = state === null ? true : state === true ? false : null;
		yield state;
	}
}

// Хук useHeadersSort для управления состоянием сортировки и отправки запроса на сервер.
export const useHeadersSort = (
	fields: string[], // Массив полей, которые могут быть отсортированы
	sortNames: TSortNames, // Объект, сопоставляющий названия полей с параметрами сортировки для бэкенда
	sortingRequest: (sortQuery?: string) => Promise<void> // Функция для отправки запроса на сервер с параметрами сортировки
) => {
	// Создаем объекты-генераторы для каждого поля сортировки
	const generators = ref<Record<string, Generator<boolean | null>>>(
		fields.reduce((generatorsObj, field) => {
			// Инициализируем каждый генератор со значением null
			generatorsObj[field] = setSortingValue(null);
			return generatorsObj;
		}, {} as Record<string, Generator<boolean | null>>)
	);

	// Создаем объект для хранения текущего состояния сортировки для каждого поля
	const sortState = reactive<Record<string, boolean | null>>(
		fields.reduce((stateObj, field) => {
			// Изначально все состояния сортировки установлены в null
			stateObj[field] = null;
			return stateObj;
		}, {} as Record<string, boolean | null>)
	);

	// Обработчик клика по заголовку таблицы для изменения сортировки
	const sortClick = (field: string) => {
		// Получаем следующее состояние сортировки из генератора для выбранного поля
		const nextState = generators.value[field].next().value;

		// Обновляем состояние сортировки: у выбранного поля устанавливаем новое состояние, у остальных — null
		for (const key in sortState) {
			sortState[key] = key === field ? nextState : null;
		}

		// Отправляем запрос на сервер с новым состоянием сортировки
		sortOnServer(field, sortState[field]);
	};

	// Функция для отправки запроса на сервер с параметрами сортировки
	const sortOnServer = (field: string, sortStatus: boolean | null) => {
		const backendField = sortNames[field]; // Получаем соответствующее название поля для бэкенда
		// Формируем строку запроса для сортировки
		const sortQuery =
			sortStatus !== null ? `&${backendField}=${sortStatus}` : "";
		// Вызываем функцию сортировки с сформированным запросом
		sortingRequest(sortQuery);
	};

	// Возвращаем объект, содержащий текущее состояние сортировки и функцию для изменения состояния сортировки по клику
	return { sortState: toRefs(sortState), sortClick };
};
