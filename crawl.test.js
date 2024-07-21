import { test, expect } from '@jest/globals'
import { normalizeURL, getURLSFromHTML } from './crawl'

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

test('Find a tag and return the abs url', () => {
  const htmlBody = `<html>
        <body>
         <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
        </body> 
    </html>`
  const baseURL = ['https://blog.boot.dev/']
  const actual = getURLSFromHTML(htmlBody, baseURL)
  expect(actual).toEqual(baseURL)
})

test('Extract absolute URLs from HTML body with valid anchor tags', () => {
  const htmlBody =
    '<a href="http://example.com/page1">Page 1</a><a href="/page2">Page 2</a>'
  const baseURL = 'http://example.com'
  const actual = getURLSFromHTML(htmlBody, baseURL)
  expect(actual).toEqual([
    'http://example.com/page1',
    'http://example.com/page2',
  ])
})

test('No anchor tags provided', () => {
  const htmlBody = '<body><div><h1>Looky here</h1></div></body>'
  const baseUrl = 'http://mywebsite.com'
  const actual = getURLSFromHTML(htmlBody, baseUrl)
  expect(actual).toEqual([])
})
