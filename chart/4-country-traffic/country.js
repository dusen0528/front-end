const countryTrafficVisualizer = (function () {
  "use strict";

  // 비공개 변수와 객체
  const apiStore = blogCountryApi();
  let currentData = [];

  // 초기화 함수
  function initialize() {
    google.charts.load("current", {
      packages: ["geochart"],
    });
    google.charts.setOnLoadCallback(loadDataAndVisualize);
  }

  // 데이터 로드 및 시각화
  async function loadDataAndVisualize() {
    try {
      // API에서 데이터 가져오기
      const response = await apiStore.getCountryTraffic();

      if (!response) {
        throw new Error("국가별 트래픽 데이터를 가져오는데 실패했습니다.");
      }

      // 데이터 저장
      currentData = response.data || response;
      console.log("국가별 트래픽 데이터:", currentData);

      // 차트와 테이블 업데이트
      drawGeoChart();
      populateTable();
    } catch (error) {
      handleError(error);
    }
  }

  // 지도 차트 그리기
  function drawGeoChart() {
    // 데이터 테이블 생성
    const chartData = [["Country", "Views"]];

    currentData.forEach((item) => {
      if (item.countryCode) {
        chartData.push([item.countryCode, item.viewCount || 0]);
      }
    });

    const data = google.visualization.arrayToDataTable(chartData);

    // 차트 옵션
    const options = {
      colorAxis: { colors: ["#e7f0fa", "#006be6"] },
      defaultColor: "#f5f5f5",
      legend: {
        textStyle: { color: "#333", fontSize: 12 },
      },
    };

    // 차트 그리기
    const chart = new google.visualization.GeoChart(
      document.getElementById("geochart")
    );
    chart.draw(data, options);
  }

  // 테이블 데이터 표시
  function populateTable() {
    const tableBody = document.querySelector("#country_table tbody");
    if (!tableBody) return;

    tableBody.innerHTML = "";

    // 읽은 페이지 기준 내림차순 정렬
    currentData
      .sort((a, b) => b.readCount - a.readCount)
      .forEach((item) => {
        const period = `${item.year}년 ${item.month}월`;
        const countryName = item.countryName || "알 수 없음";
        const readCount = item.readCount?.toLocaleString() || "0";
        const viewCount = item.viewCount?.toLocaleString() || "0";
        const transfer = calculateTransfer(item.dataUse);

        tableBody.innerHTML += `
          <tr>
            <td>${period}</td>
            <td>${countryName}</td>
            <td>${readCount}</td>
            <td>${viewCount}</td>
            <td>${transfer} GB</td>
          </tr>
        `;
      });
  }

  // 전송량 계산 함수 (dataUse 배열이 있는 경우 합산)
  function calculateTransfer(dataUse) {
    if (!dataUse || !Array.isArray(dataUse)) return "0.00";

    const totalTransfer = dataUse.reduce((sum, item) => {
      const value = parseFloat(item.transfer || 0);
      return sum + (isNaN(value) ? 0 : value);
    }, 0);

    return totalTransfer.toFixed(2);
  }

  // 오류 처리
  function handleError(error) {
    console.error("차트 그리기 오류:", error);
    document.getElementById("geochart").innerHTML = `
      <div style="color:red; padding:20px; text-align:center; border:1px solid #ddd;">
        데이터를 불러오는 중 오류가 발생했습니다: ${error.message}
      </div>`;
  }

  // 공개 API
  return {
    init: initialize,
    refresh: loadDataAndVisualize,
  };
})();

// 시각화 초기화
document.addEventListener("DOMContentLoaded", countryTrafficVisualizer.init);
