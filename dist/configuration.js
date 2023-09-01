function getPathFromUrl() {
  const url = new URL(window.location.href);
  return url.pathname;
}

function getPathValue() {
  const value = getPathFromUrl();

  if (value.includes("chart")) {
    return `../../${value.split("/")[2]}`;
  } else {
    return "ww_top_lifetime_gross";
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  async function fetchWorldwideData() {
    const response = await fetch(`${getPathValue()}.json`);
    const data = await response.json();
    return data;
  }

  const data = await fetchWorldwideData();

  const ctx = document.getElementById("myChart");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: data.map((row) => `${row.rank} - ${row.title} (${row.year})`),
      datasets: [
        {
          label: "Lifetime gross",
          data: data.map((row) => parseInt(row.lifetimeGross.split("$")[1].replaceAll(",", ""))),
          backgroundColor: ["rgba(75, 192, 192, 0.2)", "rgba(54, 162, 235, 0.2)"],
          borderColor: ["rgb(75, 192, 192)", "rgb(54, 162, 235)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      indexAxis: "y",
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });
});
