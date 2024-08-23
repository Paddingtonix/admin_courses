type TUseHeadersSort = {
    [key: symbol]: boolean | null;
};

type TSortNames = {
    [key: string]: string;
};

function* setSortingValue(state: boolean | null) {
    while (true) {
        state = state === null ? true : state === true ? false : null;
        yield state;
    }
}

export const useHeadersSort = (
    fields: string[],
    sortNames: TSortNames,
    sortingRequest: (sortQuery?: string) => Promise<void>
) => {
    const generators = ref<Record<string, Generator<boolean | null>>>(
        fields.reduce((generatorsObj, field) => {
            generatorsObj[field] = setSortingValue(null);
            return generatorsObj;
        }, {} as Record<string, Generator<boolean | null>>)
    );

    const sortState = reactive<Record<string, boolean | null>>(
        fields.reduce((stateObj, field) => {
            stateObj[field] = null;
            return stateObj;
        }, {} as Record<string, boolean | null>)
    );

    const sortClick = (field: string) => {
        const nextState = generators.value[field].next().value;

        for (const key in sortState) {
            sortState[key] = key === field ? nextState : null;
        }

        sortOnServer(field, sortState[field]);
        console.log("ДА ЕБАНЫЙ В РОТ ОНО НЕ ОБНОВЛЯЕТСЯ:", sortState);
    };

    const sortOnServer = (field: string, sortStatus: boolean | null) => {
        const backendField = sortNames[field];
        const sortQuery =
            sortStatus !== null ? `&${backendField}=${sortStatus}` : "";
        sortingRequest(sortQuery);
    };

    return { sortState: toRefs(sortState), sortClick };
};
