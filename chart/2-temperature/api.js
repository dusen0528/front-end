const temperatureApi = function () {
    "use strict";
    const SERVER_URL = "http://chart.java21.net";

    const api = new Object();

    const headers = {
      accept: "application/json",
    };

    api.getTemperature = async function () {
        const url =
            SERVER_URL + "/dummy/temperature?startDate=2024-02-01&endDate=2024-02-25";

        const options = {
            method: "GET",
            headers: headers,
        };

        try {
          const response = await fetch(url, options);

          if (!response.ok) {
            console.log(response);
            throw new Error(`GET temperature : ${response.status}`);
          }

          const data = response.json();

            return data;
        } catch (error) {
          console.error("GET error:" + error);
          return null;
        }
    };

    return api;
}