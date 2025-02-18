import { OMDB_API_KEY, OMDB_API_URL } from "constants/axios";

import axios from "axios";
import { keysToCamelCase, serializeKeysToSnakeCase } from "neetocist";
import { evolve } from "ramda";

const setHttpHeaders = () => {
  axios.defaults.headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
};

const setDefaultParams = () => {
  axios.defaults.params = { apikey: OMDB_API_KEY };
};

const transformResponseKeysToCamelCase = response => {
  if (response.data) response.data = keysToCamelCase(response.data);
};

const responseInterceptors = () => {
  axios.interceptors.response.use(
    response => {
      transformResponseKeysToCamelCase(response);

      return response.data;
    },
    error => Promise.reject(error)
  );
};

const requestInterceptors = () => {
  // since all ramda functions are curried by default so
  axios.interceptors.request.use(
    //above function is modified as below
    evolve({ data: serializeKeysToSnakeCase, params: serializeKeysToSnakeCase })
  );
};

export default function initializeAxios() {
  axios.defaults.baseURL = OMDB_API_URL;
  setHttpHeaders();
  setDefaultParams();
  requestInterceptors();
  responseInterceptors();
}
