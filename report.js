import fs from 'node:fs/promises'

const printReport = async (pages) => {
  console.log('\nGenerating report . . .\n')

  let content = 'Website Report\n'
  for (const url in pages) {
    content += `\nFound ${pages[url]} internal links to ${url}`
  }

  const filename = 'WebsiteReport.txt'

  try {
    await fs.writeFile(filename, content)
    console.log(`Successfully created your ${filename}`)
  } catch (error) {
    console.error(error.message)
  }
}

export { printReport }
