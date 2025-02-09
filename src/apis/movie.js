import axios from "axios";

const fetch = searchKey => axios.get("", { params: { s: searchKey } });
const show = imdbID => axios.get("", { params: { i: imdbID } });
const movieApi = { fetch, show };

export default movieApi;
