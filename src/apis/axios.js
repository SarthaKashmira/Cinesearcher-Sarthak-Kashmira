import axios from "axios";
import { keysToCamelCase, serializeKeysToSnakeCase } from "neetocist";
import { evolve } from "ramda";

const setHttpHeaders = () => {
  axios.defaults.headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
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
  axios.defaults.baseURL = process.env.REACT_APP_OMDB_API_KEY;
  setHttpHeaders();
  responseInterceptors();
  requestInterceptors();
}
