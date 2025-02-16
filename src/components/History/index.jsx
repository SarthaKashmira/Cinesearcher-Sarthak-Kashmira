import { useEffect, useRef } from "react";

import useViewMoviesHistory from "stores/useViewMoviesHistory";
import { shallow } from "zustand/shallow";

const History = () => {
  // to refer the container
  const containerRef = useRef(null);

  // to take the movies present in the store
  const { moviesHistory, recentMovie, setRemoveOneMovie, setRemoveAllMovies } =
    useViewMoviesHistory(
      store => ({
        moviesHistory: store.moviesHistory,
        recentMovie: store.recentMovie,
        setRemoveOneMovie: store.setRemoveOneMovie,
        setRemoveAllMovies: store.setRemoveAllMovies,
      }),
      shallow
    );

  // This is used to perform smooth scrolling of the container
  const smoothScrolling = () => {
    const container = containerRef.current;
    const { imdbID } = recentMovie;
    const target = container.querySelector(`[data-key="${imdbID}"]`);
    if (target) {
      target.scrollIntoView({
        behavior: "smooth", // Smooth scrolling
        block: "center", // Align in the center
      });
    }
  };

  // every time the component is re-rendered this will scroll the container to required element
  useEffect(() => {
    smoothScrolling();
  }, [recentMovie]);

  return (
    <div className="mx-auto  mt-1 w-full max-w-md rounded-lg border bg-white p-4 shadow-lg">
      {/* Title */}
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">View History</h1>
        <button
          className="rounded bg-transparent p-2 text-red-500"
          onClick={() => setRemoveAllMovies()}
        >
          Clear All
        </button>
      </div>
      {/* Scrollable Container */}
      <div className="h-screen space-y-3 overflow-y-auto" ref={containerRef}>
        {moviesHistory.map(item => {
          const { imdbID, Title } = item;

          return (
            <div
              data-key={imdbID}
              key={imdbID}
              className={`flex cursor-pointer items-center justify-between rounded-lg p-4 text-center transition-colors duration-200 ${
                imdbID === recentMovie.imdbID
                  ? "bg-selectViewHistory text-white"
                  : "bg-viewHistory text-black"
              }`}
            >
              <span>{Title}</span>
              <button
                className="rounded bg-transparent p-2 text-red-500"
                onClick={() => setRemoveOneMovie({ Title, imdbID })}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default History;
