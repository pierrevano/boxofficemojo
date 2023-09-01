const fs = require("fs/promises");

const config = require("./config");
const fetchMultiplePages = require("./fetchMultiplePages");

const createOutputFile = async () => {
  try {
    for (let index = 0; index < config.sections.length; index++) {
      const element = config.sections[index];

      const data = await fetchMultiplePages(element);

      await fs.writeFile(`dist/${element}.json`, JSON.stringify(data));

      console.log(`Box Office Mojo for page ${element} fetched successfully!`);
      console.log();
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = createOutputFile;
