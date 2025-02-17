import { QUERY_KEYS } from "constants/query";

import movieApi from "apis/movie";
import { Toastr } from "neetoui";
import { useQuery } from "react-query";

export const useFetchMovies = ({ searchTerm: s, year: y, page, type }) =>
  useQuery({
    queryKey: [QUERY_KEYS.MOVIES, s, y, page, type],
    queryFn: () => movieApi.fetch({ s, y, page, type }),
    keepPreviousData: true, // to keep the previous data
    onSuccess: data => {
      if (data?.Response === "False" && data?.Error !== "Incorrect IMDb ID.") {
        Toastr.error(data.Error, { autoClose: 2000 });
      }
    },
  });
