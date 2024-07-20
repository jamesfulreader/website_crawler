import { test, expect } from '@jest/globals'
import { normalizeURL } from './crawl'

// const urls = [
//   'https://blog.boot.dev/path/',
//   'https://blog.boot.dev/path',
//   'http://blog.boot.dev/path/',
//   'http://blog.boot.dev/path',
//   'https://BLOG.boot.dev/path',
//   'http://blog.BOOT.dev/path/',
// ]

// const expected = [
//   'blog.boot.dev/path',
//   'blog.boot.dev/path',
//   'blog.boot.dev/path',
//   'blog.boot.dev/path',
//   'blog.boot.dev/path',
//   'blog.boot.dev/path',
// ]
// const result = normalizeURL(urls)
// test('normalize URL', () => {
//   expect(result).toEqual(expected)
// })

// refactor code to take in single URL than a list that maps through the URLs

test('normalizeURL protocol', () => {
  const input = 'https://blog.boot.dev/path'
  const actual = normalizeURL(input)
  const expected = 'blog.boot.dev/path'
  expect(actual).toEqual(expected)
})

test('normalizeURL slash', () => {
  const input = 'https://blog.boot.dev/path/'
  const actual = normalizeURL(input)
  const expected = 'blog.boot.dev/path'
  expect(actual).toEqual(expected)
})

test('normalizeURL capitals', () => {
  const input = 'https://BLOG.boot.dev/path'
  const actual = normalizeURL(input)
  const expected = 'blog.boot.dev/path'
  expect(actual).toEqual(expected)
})

test('normalizeURL http', () => {
  const input = 'http://BLOG.boot.dev/path'
  const actual = normalizeURL(input)
  const expected = 'blog.boot.dev/path'
  expect(actual).toEqual(expected)
})
