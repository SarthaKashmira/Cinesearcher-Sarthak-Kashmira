import { includes } from "ramda";
import { create } from "zustand";

const useFavoriteMovies = create(set => ({
  favoriteMovies: [],
  setFavoriteMovie: favoriteMovie =>
    set(({ favoriteMovies }) => {
      if (includes(favoriteMovie, favoriteMovies)) {
        return {
          favoriteMovies: favoriteMovies.filter(
            movie => movie.imdbID !== favoriteMovie.imdbID
          ),
        };
      }

      return { favoriteMovies: [favoriteMovie, ...favoriteMovies] };
    }),
}));
export default useFavoriteMovies;
