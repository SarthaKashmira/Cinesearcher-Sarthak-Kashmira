import { useEffect, useRef, useState } from "react";

import { Delete } from "neetoicons";
import { Alert, Button, Label, Typography } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";
import useViewMoviesHistoryStore from "stores/useViewMoviesHistoryStore";

const History = () => {
  const [clearAllAlert, setClearAllAlert] = useState(false);
  const [deleteHistoryAlert, setDeleteHistoryAlert] = useState(false);

  const { t } = useTranslation();
  // to refer the container
  const containerRef = useRef(null);

  // to take the movies present in the store
  const { moviesHistory, recentMovie, setRemoveOneMovie, setRemoveAllMovies } =
    useViewMoviesHistoryStore.pick();

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
      <div className="mx-auto h-screen w-full max-w-md rounded-lg border bg-white p-4 shadow-lg">
        <Label>{t("error.noHistory")}</Label>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-lg border bg-white p-4 shadow-lg">
      {/* Title */}
      <div className="mb-4 flex items-center justify-between">
        <Typography className="text-xl font-bold" style="h1">
          {t("history.viewHistory")}
        </Typography>
        <Button
          className="rounded bg-transparent p-2 text-red-500"
          style="link"
          onClick={() => setClearAllAlert(true)}
        >
          {t("history.clearAll.name")}
        </Button>
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
              <Typography>{Title}</Typography>
              <Button
                className="outline-none items-end bg-transparent"
                iconSize={24}
                size="large"
                style="text"
                icon={() => (
                  <Delete className="neeto-ui-text-gray-800" size={15} />
                )}
                onClick={() => setDeleteHistoryAlert(true)}
              />
              <Alert
                cancelButtonLabel={t("history.deleteHistory.cancel")}
                isOpen={deleteHistoryAlert}
                message={t("history.deleteHistory.message", { title: Title })}
                submitButtonLabel={t("history.deleteHistory.confirm")}
                title={t("history.deleteHistory.title")}
                onClose={() => setDeleteHistoryAlert(false)}
                onSubmit={() => {
                  setRemoveOneMovie({ Title, imdbID });
                  setDeleteHistoryAlert(false);
                }}
              />
            </div>
          );
        })}
      </div>
      <Alert
        cancelButtonLabel={t("history.clearAll.cancel")}
        isOpen={clearAllAlert}
        message={t("history.clearAll.message")}
        submitButtonLabel={t("history.clearAll.confirm")}
        title={t("history.clearAll.title")}
        onClose={() => setClearAllAlert(false)}
        onSubmit={() => setRemoveAllMovies()}
      />
    </div>
  );
};

export default History;
