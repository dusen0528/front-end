const apiStore = temperatureApi();

(function () {
  "use strict";

  google.charts.load("current", { packages: ["corechart", "line"] });
  google.charts.setOnLoadCallback(drawBasic);

  async function drawBasic() {
    try {
      const response = await apiStore.getTemperature();

      // 응답 처리
      let temperatureData;
      if (Array.isArray(response)) {
        temperatureData = response;
      } else if (
        response &&
        response.result &&
        Array.isArray(response.result)
      ) {
        temperatureData = response.result;
      } else if (response && response.temp) {
        temperatureData = [response];
      } else {
        temperatureData = [];
      }

      if (temperatureData.length === 0) {
        throw new Error("표시할 온도 데이터가 없습니다");
      }

      var data = new google.visualization.DataTable();
      data.addColumn("string", "날짜");
      data.addColumn("number", "°C");

      // 데이터 행 추가
      temperatureData.forEach((item) => {
        const tempValue = parseInt(item.temp.replace(/[°CF]/g, ""));
        data.addRow([item.date, tempValue]);
      });

      var options = {
        title: "온도 - 일자별 온도변화",
        titleTextStyle: {
          fontSize: 18,
          bold: true,
        },
        curveType: "function",
        hAxis: {
          title: "날짜",
          titleTextStyle: { italic: false },
          gridlines: { color: "#e0e0e0" },
          format: "yyyy-MM-dd", // 날짜 형식
          showTextEvery: 4, // 4개마다 레이블 표시
        },
        vAxis: {
          title: "온도",
          titleTextStyle: { italic: false },
          gridlines: { color: "#e0e0e0" },
          minValue: 30,
          maxValue: 45,
        },
        legend: { position: "right" },
        colors: ["#4285F4"], // 파란색 선
        pointSize: 0, // 데이터 포인트 숨기기
        lineWidth: 2, // 선 굵기
        chartArea: {
          width: "80%",
          height: "70%",
        },
      };

      // 차트 그리기
      var chart = new google.visualization.LineChart(
        document.getElementById("chart_div")
      );
      chart.draw(data, options);

      // 테이블에 데이터 표시
      const tableBody = document.querySelector("#info_tbl tbody");
      if (tableBody) {
        tableBody.innerHTML = "";

        temperatureData.forEach((item) => {
          tableBody.innerHTML += `
                    <tr>
                        <td>${item.date}</td>
                        <td>${item.temp}</td>
                    </tr>
                `;
        });
      }
    } catch (error) {
      console.error("차트 그리기 오류:", error);
      document.getElementById("chart_div").innerHTML = `
            <div class="error-message">
                <h3>차트 로딩 오류</h3>
                <p>${error.message}</p>
            </div>`;
    }
  }
})();
