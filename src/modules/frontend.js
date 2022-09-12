const { readdirSync, lstatSync } = require("fs-extra");
const { COMPONENTS } = require("../constants/path");
const { resolve } = require("path");
const { readFileSync } = require("fs");
const { extractComponentName } = require("../utils/strings");

const loadComponentList = () => {
  const components = readdirSync(COMPONENTS);
  let componentsList = [];
  for (let index = 0; index < components.length; index++) {
    const dirPath = resolve(COMPONENTS, components[index]);
    componentsList.push({
      category: components[index],
    });

    if (lstatSync(dirPath).isDirectory()) {
      const innercomponents = readdirSync(dirPath);
      innercomponents.forEach((component) => {
        componentsList[index].components = {
          name: extractComponentName(component),
          content: readFileSync(resolve(dirPath, component)).toString(),
        };
      });
    }
  }

  return componentsList;
};

module.exports = {
  loadComponentList,
};
