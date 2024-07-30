export interface Form {
    id: string,
    type: string,
    value: string,
    required: boolean,
    valid: boolean,
    pattern: string | RegExp,
    label: string,
    error: string
}