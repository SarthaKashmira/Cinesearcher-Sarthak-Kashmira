import { QUERY_KEYS } from "constants/query";

import movieApi from "apis/movie";
import { useQuery } from "react-query";

export const useMovieInformation = imdbID =>
  useQuery({
    queryKey: [QUERY_KEYS.MOVIE_INFORMATION, imdbID],
    queryFn: () => movieApi.show(imdbID),
  });
