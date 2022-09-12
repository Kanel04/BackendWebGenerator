const extractComponentName = (name) => {
    return name.replace(".", "-").replace(".js", "");
  };
  
  module.exports = {
    extractComponentName,
  };
  