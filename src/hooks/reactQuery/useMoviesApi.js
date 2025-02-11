import { QUERY_KEYS } from "constants/query";

import movieApi from "apis/movie";
import { useQuery } from "react-query";

export const useMoviesApi = params =>
  useQuery({
    queryKey: [QUERY_KEYS.MOVIES, params],
    queryFn: () => movieApi.fetch(params),
    keepPreviousData: true, // to keep the previous data
  });
