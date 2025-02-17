import { includes, split } from "ramda";

export const fetchGenres = genres => split(", ", genres);

export const checkFavoriteMovie = (movie, favoriteMovies) =>
  includes(movie, favoriteMovies);
