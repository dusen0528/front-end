const apiStore = chartApi();

window.addEventListener("DOMContentLoaded", async function () {
  google.charts.load("current", { packages: ["gauge"] });
  google.charts.setOnLoadCallback(drawChart);
});

function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ["Label", "Value"],
    ["Memory", 80],
    ["CPU", 50],
    ["Network", 50],
  ]);

  var options = {
    width: 400,
    height: 120,
    redFrom: 90,
    redTo: 100,
    yellowFrom: 75,
    yellowTo: 90,
    minorTicks: 5,
  };

  var chart = new google.visualization.Gauge(
    window.document.getElementById("chart_div")
  );

  chart.draw(data, options);

  setInterval(async function () {
    const response = await fetch("http://chart.java21.net/dummy/computer", {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .catch((error) => console.error(error));

    const computer = response.result;
    const value = (computer.memory / 1024 / 16) * 100;

    data.setValue(0, 1, value);
    data.setValue(1, 1, computer.cpu);
    data.setValue(2, 1, computer.network);
    chart.draw(data, options);
  }, 2000);
}