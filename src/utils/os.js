const fs = require('fs')
const { PROJECT_PATH } = require('./path')
const { resolve } = require('path')

module.exports = {
    createFolder(name) {
        fs.mkdir(resolve(PROJECT_PATH, name), () => {
            console.log("Folder created")
        })
    }
}