const blogtrafficApi = function () {
    "use strict";

    const SERVER_URL = "http://blog-api.java21.net";

    const api = new Object();

    const headers = {
      accept: "application/json",
    };

    api.getBlogTraffic = async function () {
        const url = SERVER_URL + "/api/v1/blog/1/access-logs/year/2025";

        const options = {
            method: "GET",
            headers: headers
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
            console.error("GET ERROR :" + error);
            return null;
        }

    }   
    return api;
}