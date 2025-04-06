const weatherApi = (function () {
  ("use strict");

  const api = new Object();

  // 단기 예보
  api.getShortTermForecast = async function (date, time, nx, ny) {
    try {
      let url = CONFIG.BASE_URL + CONFIG.ENDPOINTS.SHORT_TERM;
      let queryParams =
        "?" + encodeURIComponent("serviceKey") + "=" + CONFIG.API_ENCODING_KEY; 


      queryParams +=
        "&" + encodeURIComponent("dataType") + "=" + encodeURIComponent("json");

      queryParams +=
        "&" + encodeURIComponent("numOfRows") + "=" + encodeURIComponent("100");

      queryParams +=
        "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent("1");

      queryParams +=
        "&" + encodeURIComponent("base_date") + "=" + encodeURIComponent(date);

      const formattedTime = time.length === 2 ? `${time}00` : time;
      queryParams +=
        "&" +
        encodeURIComponent("base_time") +
        "=" +
        encodeURIComponent(formattedTime);

      queryParams +=
        "&" + encodeURIComponent("nx") + "=" + encodeURIComponent(nx);

      queryParams +=
        "&" + encodeURIComponent("ny") + "=" + encodeURIComponent(ny);

      url += queryParams;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("API 요청 실패: " + response.status);
      }

      const data = await response.json();
      console.log("단기 예보 api 호출 성공 : ", data);
      return data.body.items.item;
    } catch (error) {
      console.error("날씨 데이터 가져오기 실패:", error);
      throw error;
    }
  };

  //중기 기온 예보 
  api.getMidTermTemperature = async function (regId, date, time) {
    try {
      // 발표시각 형식 변환 (YYYYMMDDHHMM)
      const formattedTime = time.length === 2 ? `${time}00` : time;
      const tmFc = date + formattedTime;

      let url = CONFIG.BASE_URL + CONFIG.ENDPOINTS.MID_TEMP;
      let queryParams =
        "?" + encodeURIComponent("serviceKey") + "=" + CONFIG.API_ENCODING_KEY;

      queryParams +=
        "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent("1");

      queryParams +=
        "&" + encodeURIComponent("numOfRows") + "=" + encodeURIComponent("10");

      queryParams +=
        "&" + encodeURIComponent("dataType") + "=" + encodeURIComponent("JSON");

      queryParams +=
        "&" + encodeURIComponent("regId") + "=" + encodeURIComponent(regId);

      queryParams +=
        "&" + encodeURIComponent("tmFc") + "=" + encodeURIComponent(tmFc);

      url += queryParams;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("API 요청 실패: " + response.status);
      }

      const data = await response.json();
      console.log("중기 기온 API 호출 성공 : ", data);
      return data.response.body.items.item[0];
    } catch (error) {
      console.error("중기 기온 데이터 가져오기 실패:", error);
      throw error;
    }
  };

  // 중기 육상 예보 조회
  api.getMidLandForecast = async function (regId, date, time) {
    try {
      // 발표시각 형식 변환 (YYYYMMDDHHMM)
      const formattedTime = time.length === 2 ? `${time}00` : time;
      const tmFc = date + formattedTime;

      let url = CONFIG.BASE_URL + CONFIG.ENDPOINTS.MID_LAND;
      let queryParams =
        "?" + encodeURIComponent("serviceKey") + "=" + CONFIG.API_ENCODING_KEY; 

      queryParams +=
        "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent("1");

      queryParams +=
        "&" + encodeURIComponent("numOfRows") + "=" + encodeURIComponent("10");

      queryParams +=
        "&" + encodeURIComponent("dataType") + "=" + encodeURIComponent("JSON"); 

      queryParams +=
        "&" + encodeURIComponent("regId") + "=" + encodeURIComponent(regId);

      queryParams +=
        "&" + encodeURIComponent("tmFc") + "=" + encodeURIComponent(tmFc);

      url += queryParams;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("API 요청 실패: " + response.status);
      }

      const data = await response.json();
      console.log("중기 육상예보 API 호출 성공 : ", data);
      return data.response.body.items.item[0];
    } catch (error) {
      console.error("중기 육상예보 데이터 가져오기 실패:", error);
      throw error;
    }
  };

  return api;
})();
