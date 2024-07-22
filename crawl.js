import { JSDOM } from 'jsdom'

const normalizeURL = (url) => {
  // normalizeURL() function to map all of those same inputs
  // to a single normalized output: blog.boot.dev/path
  // going to be used to compare URLs to see if they are the same page.*

  // const normalizedURL = urls.map((url) => {
  //   let urlObj = new URL(url)
  //   let fullPath = urlObj.hostname + urlObj.pathname
  //   if (fullPath.slice(-1) === '/') {
  //     fullPath = fullPath.slice(0, -1)
  //   }
  //   return fullPath
  // })
  // return normalizedURL
  // refactor the code to take in a single URL rather than a list
  const urlObj = new URL(url)
  let fullPath = urlObj.hostname + urlObj.pathname
  if (fullPath.slice(-1) === '/') {
    fullPath = fullPath.slice(0, -1)
  }
  return fullPath
}

// const getURLSFromHTML = (htmlBody, baseURL) => {
//   const dom = new JSDOM(htmlBody)
//   let urlList = dom.window.document.querySelectorAll('a')
//   urlList.forEach((element) => {
//     console.log(element.href)
//   })
//   return baseURL
// } misunderstood the assignment

const getURLSFromHTML = (htmlBody, baseURL) => {
  const dom = new JSDOM(htmlBody)
  const aTags = dom.window.document.querySelectorAll('a')
  const absUrls = []

  for (const aTag of aTags) {
    let href = aTag.getAttribute('href')
    try {
      href = new URL(href, baseURL).href
      absUrls.push(href)
    } catch (error) {
      console.error(`${error.message} with ${href}`)
    }
  }

  return absUrls
}

const fetchAndParse = async (url) => {
  let options = {
    method: 'GET',
    headers: {
      'Content-Type': 'text/html',
    },
  }
  try {
    let res = await fetch(url, { options })
    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`)
    }
    let data = await res.text()
    return data
  } catch (error) {
    console.error(`An error has occurred: ${error.message}`)
  }
}

const crawlPage = async (baseURL, currentURL = baseURL, pages = {}) => {
  if (currentURL !== baseURL) {
    return pages
  }

  const normalize = normalizeURL(currentURL)

  if (normalize in pages) {
    pages[normalize]++
    return pages
  } else {
    pages[normalize] = 1
  }

  const htmlContent = await fetchAndParse(currentURL)
  const allURLS = getURLSFromHTML(htmlContent, baseURL)

  for (eachURL in allURLS) {
    pages = await crawlPage(eachURL, eachURL, pages)
  }

  return pages
}

export { normalizeURL, getURLSFromHTML, crawlPage }
