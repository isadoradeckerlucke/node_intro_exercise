const fs = require('fs');
const process = require('process')
const axios = require('axios')

// read file with a certain path, print out the contents of that file
function cat(path){
    fs.readFile(path, 'utf8', function(err, data){
        if (err) { //if there is an error, print it out, and then exit the process
            console.error(`error reading ${path}: ${err}`);
            process.exit(1)
        } else {
            console.log(data)
        }
    })
}
// run in terminal: node step2.js one.txt



async function webCat(url){
    try {
        let response = await axios.get(url)
        console.log(response.data)
    } catch(err) {
        console.error(`error fetching ${url}: ${err}`)
        process.exit(1)
    }
}

let path = process.argv[2]
// check if path is a url, if not assume string and run cat
if (path.slice(0, 4) === 'http') {
    webCat(path);
  } else {
    cat(path);
  }
  
