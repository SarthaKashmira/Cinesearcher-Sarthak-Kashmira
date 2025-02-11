import axios from "axios";

const fetch = params => axios.get("", { params });
const show = imdbID => axios.get("", { params: { i: imdbID } });
const movieApi = { fetch, show };

export default movieApi;
