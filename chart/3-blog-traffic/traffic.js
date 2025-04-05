const apiStore = blogtrafficApi();

(function () {
  "use strict";
  google.charts.load("current", { packages: ["bar"] });
  google.charts.setOnLoadCallback(drawBasic);

  async function drawBasic() {
    try {
      const response = await apiStore.getBlogTraffic();

      if (!response) {
        throw new Error("트래픽 데이터를 가져오는데 실패했습니다.");
      }

      const trafficData = response.data || response;
      console.log("트래픽 데이터:", trafficData);

      // 차트 데이터 테이블 생성
      var data = new google.visualization.DataTable();
      data.addColumn("string", "월");
      data.addColumn("number", "접속회수");
      data.addColumn("number", "읽은 페이지");
      data.addColumn("number", "조회수");
        

      trafficData.forEach((item) => {
        data.addRow([
          `${item.month}월`,
          item.accessCount || 0, 
          item.readCount || 0,
          item.viewCount || 0, 
        ]);
      });

      // 차트 옵션 설정
      var options = {
        chart: {
          title: "월별 traffic 현황",
          subtitle: "2025년 1월 ~ 3월 traffic",
        },
        bars: "vertical",
        colors: ["#4285F4", "#DB4437", "#F4B400"],
        vAxis: {
          format: "short",
        },
        height: 400,
        legend: { position: "top" },
      };

      // Material 막대 차트 생성 및 그리기
      var chart = new google.charts.Bar(document.getElementById("chart_div"));
      chart.draw(data, google.charts.Bar.convertOptions(options));

      // 테이블 데이터 표시
      populateTable(trafficData);
    } catch (error) {
      console.error("차트 그리기 오류:", error);
      document.getElementById("chart_div").innerHTML = `
                <div style="color:red; padding:20px; text-align:center; border:1px solid #ddd;">
                    데이터를 불러오는 중 오류가 발생했습니다: ${error.message}
                </div>`;
    }
  }

  // 테이블에 데이터 표시 함수
  function populateTable(trafficData) {
    const tableBody = document.querySelector("#traffic_table tbody");
    if (!tableBody) return;

    tableBody.innerHTML = "";

    trafficData.forEach((item) => {
      tableBody.innerHTML += `
        <tr>
            <td>2025년 ${item.month}월</td>
            <td>${item.accessCount?.toLocaleString() || "0"}</td>
            <td>${item.readCount?.toLocaleString() || "0"}</td>
            <td>${item.viewCount?.toLocaleString() || "0"}</td>
            <td>${
              item.transferSize
                ? (item.transferSize / (1024 * 1024 * 1024)).toFixed(2) + " GB"
                : "0 GB"
            }</td>
        </tr>
      `;
    });
  }
})();
