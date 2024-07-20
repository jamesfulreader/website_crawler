import { test, expect } from '@jest/globals'
import { normalizeURL } from './crawl'

const urls = [
  'https://blog.boot.dev/path/',
  'https://blog.boot.dev/path',
  'http://blog.boot.dev/path/',
  'http://blog.boot.dev/path',
]

const expected = [
  'blog.boot.dev/path',
  'blog.boot.dev/path',
  'blog.boot.dev/path',
  'blog.boot.dev/path',
]
const result = normalizeURL(urls)
test('normalize URL', () => {
  expect(result).toEqual(expected)
})
