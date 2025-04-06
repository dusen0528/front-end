const CONFIG = (function () {
  "use strict";

  return {
    // 디코딩
    API_KEY:
      "uoMxgLP+4t5Emz+xfA829d3iLXt9J31gLGez9dIFNrxsm+DBeclzwyloFwDiMd10Qp7Nx+k7BuJKl9+CJfgX1w==",
    API_ENCODING_KEY:
      "uoMxgLP%2B4t5Emz%2BxfA829d3iLXt9J31gLGez9dIFNrxsm%2BDBeclzwyloFwDiMd10Qp7Nx%2Bk7BuJKl9%2BCJfgX1w%3D%3D",
    BASE_URL: "https://apis.data.go.kr/1360000",
    ENDPOINTS: {
      SHORT_TERM: "/VilageFcstInfoService_2.0/getVilageFcst",
      ULTRA_SHORT_TERM: "/VilageFcstInfoService_2.0/getUltraSrtFcst",
      MID_LAND: "/MidFcstInfoService/getMidLandFcst",
      MID_TEMP: "/MidFcstInfoService/getMidTa",
      UV_INDEX: "/LivingWthrIdxServiceV4/getUVIdxV4",
    },
    DEFAULT_COORDS: { nx: 94, ny: 77 },
    AREA_CODE: "4825054000",
    LOCATION_INFO: {
      province: "경상남도",
      city: "김해시",
      district: "내외동",
      longitude: 128.866722222222,
      latitude: 35.23195,
    },
    REGION_CODES: {
      MID_TERM: "11H20304", // 김해시 중기기온예보 지역코드
      MID_LAND: "11H20000", // 경상남도(부산, 울산, 경남) 중기육상예보 구역코드
    },

    WEATHER_CODES: {
      SKY: {
        1: { label: "맑음", icon: "fas fa-sun" },
        3: { label: "구름많음", icon: "fas fa-cloud-sun" },
        4: { label: "흐림", icon: "fas fa-cloud" },
      },
      PTY: {
        0: { label: "없음", icon: "" },
        1: { label: "비", icon: "fas fa-cloud-showers-heavy" },
        2: { label: "비/눈", icon: "fas fa-cloud-rain" },
        3: { label: "눈", icon: "fas fa-snowflake" },
        4: { label: "소나기", icon: "fas fa-cloud-bolt" },
      },
    },
  };
})();
