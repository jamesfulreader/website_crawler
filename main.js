import { argv } from 'node:process'
const main = () => {
  // take in BASE_URL arg from cli
  // if num of cli args < 1 print error EXIT
  if (argv.length < 3) {
    console.log('Please enter a URL')
    return
    // if num of cli args > 1 print error EXIT
  } else if (argv.length > 3) {
    console.log('Please enter only 1 URL')
    return
  }
  // if num cli args === 1 baseURL = arg print "processing now. . ."
  const baseURL = process.argv[2]
  console.log('processing your request now. . .')
}

main()
