const fs = require('fs')
const { PROJECT_PATH } = require('./path')
const { resolve } = require('path')

module.exports = {
    readFolder() {
        fs.readdir(PROJECT_PATH ,(err, files) => {
            if (err) throw err;
            console.log(files);
            console.log("Folder read")
        })
    }
}

