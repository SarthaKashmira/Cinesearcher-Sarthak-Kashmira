import { includes, split } from "ramda";

export const fetchGenres = genres => split(", ", genres);

export const checkFavoriteMovie = (movie, favoriteMovies) =>
  includes(movie, favoriteMovies);

export const getMovieModalDetails = ({
  Plot,
  Director,
  Actors,
  BoxOffice,
  Year,
  Runtime,
  Language,
  imdbRating,
}) => [
  { key: "Description", label: "Description", value: Plot },
  { key: "Director", label: "Director", value: Director },
  { key: "Actors", label: "Actors", value: Actors },
  { key: "BoxOffice", label: "BoxOffice", value: BoxOffice },
  { key: "Year", label: "Year", value: Year },
  { key: "Runtime", label: "Runtime", value: Runtime },
  { key: "Language", label: "Language", value: Language },
  { key: "imdbRating", label: "imdbRating", value: imdbRating },
];
