const fs = require('fs');
const process = require('process')

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

// call the function

cat(process.argv[2])

// run in terminal: node step1.js one.txt
