import { DEFAULT_MOVIE_POSTER } from "./constants";

export const fetchMoviePoster = poster => {
  if (poster === "N/A") {
    return DEFAULT_MOVIE_POSTER;
  }

  return poster;
};
