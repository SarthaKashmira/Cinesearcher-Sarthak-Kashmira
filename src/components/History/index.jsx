import { useEffect, useRef } from "react";

import { Delete } from "neetoicons";
import { Button, Label } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";
import useViewMoviesHistory from "stores/useViewMoviesHistory";
import { shallow } from "zustand/shallow";

const History = () => {
  const { t } = useTranslation();
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
    const target = container?.querySelector(`[data-key="${imdbID}"]`);
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

  if (isEmpty(moviesHistory)) {
    return (
      <div className="mx-auto  mt-4 h-screen w-full max-w-md rounded-lg border bg-white p-4 shadow-lg">
        <Label>{t("error.noHistory")}</Label>
      </div>
    );
  }

  return (
    <div className="mx-auto  mt-1 w-full max-w-md rounded-lg border bg-white p-4 shadow-lg">
      {/* Title */}
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">{t("history.viewHistory")}</h1>
        <button
          className="rounded bg-transparent p-2 text-red-500"
          onClick={() => setRemoveAllMovies()}
        >
          {t("history.clearAll")}
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
              <Button
                className="outline-none items-end bg-transparent"
                iconSize={24}
                size="large"
                style="text"
                icon={() => (
                  <Delete className="neeto-ui-text-gray-800" size={15} />
                )}
                onClick={() => setRemoveOneMovie({ Title, imdbID })}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default History;
