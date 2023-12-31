const axios = require("axios");
const cheerio = require("cheerio");

const config = require("./config");

async function fetchTableData(offset, element) {
  try {
    const response = await axios.get(`${config.baseURL}/${element}?offset=${offset}`);
    const html = response.data;
    const $ = cheerio.load(html);

    const tableRows = $("tr", config.tableRowsClasses);
    let tableData = [];

    if (tableRows.length === 0) return null;

    tableRows.each((index, row) => {
      if (index === 0) return;

      const rowData = {};

      $(row)
        .find("td")
        .each((i, cell) => {
          const cellText = $(cell).text().trim();

          const indexYear = element.startsWith("ww_") ? 7 : 3;

          rowData.rank = offset + index;
          if (i === 1) rowData.title = cellText;
          if (i === 2) rowData.lifetimeGross = cellText;
          if (i === indexYear) rowData.year = cellText;
        });

      tableData.push(rowData);
    });

    return tableData;
  } catch (error) {
    console.error(`Error fetching data from URL: ${error}`);
  }
}

module.exports = fetchTableData;
