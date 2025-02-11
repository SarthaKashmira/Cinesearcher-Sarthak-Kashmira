import { includes } from "ramda";
import { create } from "zustand";

const useViewMoviesHistory = create(set => ({
  moviesHistory: [],
  recentMovie: {},
  setMovieHistory: movie =>
    set(({ moviesHistory }) => {
      if (!includes(movie, moviesHistory)) {
        return { moviesHistory: [movie, ...moviesHistory], recentMovie: movie };
      }

      return { moviesHistory, recentMovie: movie };
    }),
}));
export default useViewMoviesHistory;
