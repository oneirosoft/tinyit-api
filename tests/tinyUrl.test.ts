import { test, expect } from 'bun:test'
import { create } from '../src/utils/tinyUrl'

test('create', () => {
    const url = URL.parse('https://example.com')
    if (!url)
        throw new Error('Invalid URL')
    const tinyUrl = create(url)

    expect(tinyUrl).toHaveProperty('id')
    expect(tinyUrl.id).toMatch(/^[0-9a-zA-Z]{7}$/)
    expect(tinyUrl).toHaveProperty('url', url)
})