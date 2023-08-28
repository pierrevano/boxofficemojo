const fs = require("fs/promises");

const fetchMultiplePages = require("./fetchMultiplePages");

const createOutputFile = async (outputFilename) => {
  try {
    const data = await fetchMultiplePages();

    await fs.writeFile(outputFilename, JSON.stringify(data));
    
    console.log("Box Office Mojo fetched successfully!");
  } catch (error) {
    console.error(error);
  }
};

module.exports = createOutputFile;
