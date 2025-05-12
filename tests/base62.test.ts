import { test, expect } from "bun:test"
import { randomBase62 } from "../src/utils/base62"

test('randomBase62', () => {
    const length = 10

    const result = randomBase62(length)

    expect(result.length).toBe(length)
    expect(result).toMatch(/^[0-9a-zA-Z]+$/)
})