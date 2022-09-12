const { PROJECT } = require("../constants/path");
const fs = require("fs-extra");

const copyFiles = (origin, destination) => {
  try {
    fs.copySync(origin, destination, { overwrite: true });
    console.log("success!");
  } catch (err) {
    console.error(err);
  }
};

const createFolder = (path) => {
  try {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { overwrite: true });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  copyFiles,
  createFolder,
};
