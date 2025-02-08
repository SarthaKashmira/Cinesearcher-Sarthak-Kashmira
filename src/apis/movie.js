import axios from "axios";

const fetch = params => axios.get("movies", { params });

const show = slug => axios.get(`products/${slug}`);

const productsApi = { show, fetch };
export default productsApi;
