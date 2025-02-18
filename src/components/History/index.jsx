import { useEffect, useRef, useState } from "react";

import classNames from "classnames";
import { Delete } from "neetoicons";
import { Alert, Button, Label, Typography } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";
import useViewMoviesHistoryStore from "stores/useViewMoviesHistoryStore";

import { smoothScrolling } from "./utils";

const History = () => {
  // here useStates are used to open and close the alert modals before deleting any history
  const [clearAllAlert, setClearAllAlert] = useState(false);
  const [deleteHistoryAlert, setDeleteHistoryAlert] = useState(false);

  const { t } = useTranslation();
  // to refer the container
  const containerRef = useRef(null);

  // to take the movies present in the store
  const { moviesHistory, recentMovie, setRemoveOneMovie, setRemoveAllMovies } =
    useViewMoviesHistoryStore.pick();

  // every time the component is re-rendered this will scroll the container to required element
  useEffect(() => {
    smoothScrolling(containerRef, recentMovie);
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
      {/* Scrollable Container and history items*/}
      <div className="h-screen space-y-3 overflow-y-auto" ref={containerRef}>
        {moviesHistory.map(movie => {
          const { imdbID, Title: title } = movie;
          const { imdbID: imdbIDRecentMovie } = recentMovie;

          return (
            <div
              data-key={imdbID}
              key={imdbID}
              className={classNames(
                "flex cursor-pointer items-center justify-between rounded-lg p-4 text-center transition-colors duration-200",
                {
                  "bg-selectViewHistory text-white":
                    imdbID === imdbIDRecentMovie,
                  "bg-viewHistory text-black": imdbID !== imdbIDRecentMovie,
                }
              )}
            >
              <Typography>{title}</Typography>
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
              {/*Alert modal for deleting a particular history element */}
              <Alert
                cancelButtonLabel={t("history.deleteHistory.cancel")}
                isOpen={deleteHistoryAlert}
                message={t("history.deleteHistory.message", { title })}
                submitButtonLabel={t("history.deleteHistory.confirm")}
                title={t("history.deleteHistory.title")}
                onClose={() => setDeleteHistoryAlert(false)}
                onSubmit={() => {
                  setRemoveOneMovie({ title, imdbID });
                  setDeleteHistoryAlert(false);
                }}
              />
            </div>
          );
        })}
      </div>
      {/* Alert modal for deleting the all history elements at one go. */}
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
