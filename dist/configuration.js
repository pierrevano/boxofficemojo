function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[[\]]/g, "\\$&");
  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
  const results = regex.exec(url);

  if (!results) return null;
  if (!results[2]) return "";

  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function getType() {
  const typeParam = getParameterByName("type");
  return typeParam || "worldwide";
}

document.addEventListener("DOMContentLoaded", async function () {
  async function fetchWorldwideData() {
    const response = await fetch(`./${getType()}.json`);
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
          data: data.map((row) => row.lifetimeGross),
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
