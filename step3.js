const fs = require('fs');
const process = require('process')
const axios = require('axios')

// function to write to a file if 'out' parameter entered, otherwise print the text
function handleOutput(text, out){
    if (out) {
        fs.writeFile(out, text, 'utf8', function(err) {
            if (err) {
                console.error(`couldn't write ${out}: ${err}`)
                process.exit(1)
            }
        })
    } else {
        console.log(text)
    }
}

// read file with a certain path, print out the contents of that file
function cat(path, out){
    fs.readFile(path, 'utf8', function(err, data){
        if (err) { //if there is an error, print it out, and then exit the process
            console.error(`error reading ${path}: ${err}`);
            process.exit(1)
        } else {
            handleOutput(data, out)
        }
    })
}
// run in terminal: node step2.js one.txt



async function webCat(url, out){
    try {
        let response = await axios.get(url)
        handleOutput(response.data, out)
    } catch(err) {
        console.error(`error fetching ${url}: ${err}`)
        process.exit(1)
    }
}

let path;
let out;

// if there's an out flag included, the two argvs after it are out and path. otherwise the second argv is path and there is no out
if (process.argv[2] == '--out') {
    out = process.argv[3]
    path = process.argv[4]
} else {
    path = process.argv[2]
}

// check if path is a url, if not assume string and run cat
if (path.slice(0, 4) === 'http') {
    webCat(path, out);
  } else {
    cat(path, out);
  }
  
