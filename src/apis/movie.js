import axios from "axios";

const fetch = searchKey => axios.get("", { params: { s: searchKey } });

const movieApi = { fetch };

export default movieApi;
