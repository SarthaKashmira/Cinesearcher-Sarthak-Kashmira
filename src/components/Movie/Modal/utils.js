import { includes, split } from "ramda";

export const fetchGenres = genres => split(", ", genres);

export const checkFavouriteMovie = (movie, favouriteMovies) =>
  includes(movie, favouriteMovies);
