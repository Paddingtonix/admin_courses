export const sortHeader = (array, field_key, direction) => {
    return array.sort((a, b) => {
        let field_a = a[field_key];
        let field_b = b[field_key];

        console.log('Сравниваем:', field_a, field_b);

        if (typeof field_a === 'string' && typeof field_b === 'string') {
            field_a = field_a.toLowerCase();
            field_b = field_b.toLowerCase();

            if (field_a < field_b) return direction === 'asc' ? -1 : 1;
            if (field_a > field_b) return direction === 'asc' ? 1 : -1;
            return 0;
        }

        if (field_a instanceof Date && field_b instanceof Date) {
            field_a = field_a.getTime();
            field_b = field_b.getTime();
        }

        if (typeof field_a === 'number' && typeof field_b === 'number') {
            if (field_a < field_b) return direction === 'asc' ? -1 : 1;
            if (field_a > field_b) return direction === 'asc' ? 1 : -1;
            return 0;
        }

        return 0;
    });
};