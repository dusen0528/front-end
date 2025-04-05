const blogCountryApi = function () {
  "use strict";

  const SERVER_URL = "http://blog-api.java21.net";

  const api = new Object();

  const headers = {
    accept: "application/json",
  };

  api.getCountryTraffic = async function (year = 2025, month = 3) {
    const url = `${SERVER_URL}/api/v1/blog/1/country-logs/year/${year}/month/${month}`;

    const options = {
      method: "GET",
      headers: headers,
    };

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        console.log(response);
        throw new Error(`GET country traffic: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("GET ERROR :" + error);
      return null;
    }
  };
  return api;
};
