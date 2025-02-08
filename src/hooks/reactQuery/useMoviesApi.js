import { QUERY_KEYS } from "constants/query";

import movieApi from "apis/movie";
import { useQuery } from "react-query";

export const useMoviesApi = searchKey =>
  useQuery({
    queryKey: [QUERY_KEYS.MOVIES, searchKey],
    queryFn: () => movieApi.fetch(searchKey),
  });
