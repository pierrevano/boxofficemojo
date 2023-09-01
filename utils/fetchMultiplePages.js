const config = require("./config");
const fetchTableData = require("./fetchTableData");

const fetchMultiplePages = async (element) => {
  let offset = 0;
  let allTableData = [];

  for (let i = 0; i < config.maxIterations; i++) {
    const tableData = await fetchTableData(offset, element);

    if (!tableData || tableData.length === 0) break;

    allTableData = allTableData.concat(tableData);

    console.log(`Fetched ${offset} to ${offset + 199}: ${parseInt(((i + 1) / config.maxIterations) * 100)}% complete.`);

    offset += config.offset;
  }

  return allTableData;
};

module.exports = fetchMultiplePages;
