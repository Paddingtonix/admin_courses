export interface Selector {
    text: string | number;
    active: boolean;
}

export interface FormField {
    label: string;
    type: string;
    value: string;
    selector?: Selector[];
    id?: string;
    pattern?: string | RegExp;
    error?: string;
}
