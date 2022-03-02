const Axios = require("axios");
const log = require("../scripts/log-to-console");

module.exports = ApiCaller = (apiCallerConfig) => {
  Axios.interceptors.request.use(
    async (config) => config,

    (error) => Promise.reject(error)
  );

  Axios.interceptors.response.use(
    (response) => response,

    (error) => {
      log("Unable to fetch data", "red");
      return error.response;
    }
  );

  return Axios.request(apiCallerConfig);
};
