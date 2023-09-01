const createOutputFile = require("./utils/createOutputFile");

(async () => {
  await createOutputFile();

  console.log(`Box Office Mojo all pages fetched successfully!`);
})();
