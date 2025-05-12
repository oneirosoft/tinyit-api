export const isNullOrEmpty = (value: string | null | undefined) =>
    value === null || value === undefined || value.trim() === ''