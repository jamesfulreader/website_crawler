const normalizeURL = (urls) => {
  // normalizeURL() function to map all of those same inputs
  // to a single normalized output: blog.boot.dev/path
  // going to be used to compare URLs to see if they are the same page.*

  const normalizedURL = urls.map((url) => {
    let urlObj = new URL(url)
    let fullPath = urlObj.hostname + urlObj.pathname
    if (fullPath.slice(-1) === '/') {
      fullPath = fullPath.slice(0, -1)
    }
    return fullPath
  })
  return normalizedURL
}

export { normalizeURL }
