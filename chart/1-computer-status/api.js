const chartApi = function () {
  "use strict";
  const SERVER_URL = "http://chart.java21.net";

  const api = new Object();

  const headers = {
    accept: "application/json",
  };

  api.getGauages = async function () {
    const url = SERVER_URL + "/dummy/computer";

    const options = {
      method: "GET",
      headers: headers,
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      console.log(response);
      throw new Error(`GET computer : ${response.status}`);
    }

    const data = await response.json();

    return data.result;
  };

  return api;
};
