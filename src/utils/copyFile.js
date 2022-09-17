const fs = require('fs')
const { PROJECT_PATH } = require('./path')
const { resolve } = require('path')

module.exports={
 copyFiles (origin, destination){
    try {
      fs.copySync(resolve(PROJECT_PATH , origin , destination),{ overwrite: true });
      console.log("success!");
    } catch (err) {
      console.error(err);
    }
  }
}
  