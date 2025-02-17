import { filterBy, matches, notEquals } from "neetocist";
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
  setRemoveOneMovie: movie =>
    set(({ moviesHistory, recentMovie }) => {
      // Remove the movie from moviesHistory
      const updatedMoviesHistory = filterBy(
        { imdbID: notEquals(movie.imdbID) },
        moviesHistory
      );

      // Update recentMovie if it was the removed movie
      const updatedRecentMovie =
        matches({ imdbID: movie.imdbID }, recentMovie) &&
        updatedMoviesHistory.length > 0
          ? updatedMoviesHistory[0]
          : recentMovie;

      return {
        moviesHistory: updatedMoviesHistory,
        recentMovie: updatedRecentMovie,
      };
    }),
  setRemoveAllMovies: () => set(() => ({ moviesHistory: [], recentMovie: {} })),
}));
export default useViewMoviesHistory;
