const base62Chars = 
    [...'0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ']

export const randomBase62 = (length: number): string =>
    Array.from({ length})
        .map(_ => Math.floor(Math.random() * base62Chars.length))
        .reduce((acc, curr) => acc + base62Chars[curr], '')