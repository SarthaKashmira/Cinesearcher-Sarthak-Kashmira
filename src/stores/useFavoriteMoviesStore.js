import { includes } from "ramda";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useFavoriteMoviesStore = create(
  persist(
    set => ({
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
    }),
    { name: "favorite-movies-store" }
  )
);
export default useFavoriteMoviesStore;
