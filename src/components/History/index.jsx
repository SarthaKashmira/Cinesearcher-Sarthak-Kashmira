import { useEffect, useRef } from "react";

import useViewMoviesHistory from "stores/useViewMoviesHistory";
import { shallow } from "zustand/shallow";

const History = () => {
  // to refer the container
  const containerRef = useRef(null);

  // to take the movies present in the store
  const { moviesHistory, recentMovie } = useViewMoviesHistory(
    store => ({
      moviesHistory: store.moviesHistory,
      recentMovie: store.recentMovie,
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
      <h1 className="mb-4 text-center text-xl font-bold">View History</h1>
      {/* Scrollable Container */}
      <div className="h-screen space-y-3 overflow-y-auto" ref={containerRef}>
        {moviesHistory.map(item => {
          const { imdbID, Title } = item;

          return (
            <div
              data-key={imdbID}
              key={imdbID}
              className={`cursor-pointer rounded-lg p-4 text-center transition-colors duration-200 ${
                imdbID === recentMovie.imdbID
                  ? "bg-selectViewHistory text-white"
                  : "bg-viewHistory text-black"
              }`}
            >
              {Title}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default History;
