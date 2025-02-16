import { includes } from "ramda";
import { create } from "zustand";

const useFavouriteMovies = create(set => ({
  favouriteMovies: [],
  setFavouriteMovie: favouriteMovie =>
    set(({ favouriteMovies }) => {
      if (includes(favouriteMovie, favouriteMovies)) {
        return {
          favouriteMovies: favouriteMovies.filter(
            movie => movie.imdbID !== favouriteMovie.imdbID
          ),
        };
      }

      return { favouriteMovies: [favouriteMovie, ...favouriteMovies] };
    }),
}));
export default useFavouriteMovies;
