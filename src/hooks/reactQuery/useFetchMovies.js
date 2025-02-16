import { QUERY_KEYS } from "constants/query";

import movieApi from "apis/movie";
import { Toastr } from "neetoui";
import { useQuery } from "react-query";

export const useFetchMovies = params =>
  useQuery({
    queryKey: [QUERY_KEYS.MOVIES, params],
    queryFn: () => movieApi.fetch(params),
    keepPreviousData: true, // to keep the previous data
    onSuccess: data => {
      console.log(data);
      if (data?.Response === "False") {
        Toastr.error(data.Error, { autoClose: 2000 });
      }
    },
  });
