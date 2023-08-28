const createOutputFile = require("./utils/createOutputFile");

(async () => {
  const args = process.argv.slice(2);

  console.log("Command line arguments:", args);

  await createOutputFile(`dist/${args[0]}.json`);
})();
