import { Header, PageNotFound } from "components/commons";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";
import useFavoriteMoviesStore from "stores/useFavoriteMoviesStore";

const Favorites = () => {
  const { t } = useTranslation();

  const favoriteMovies = useFavoriteMoviesStore.pickFrom();

  return (
    <>
      <Header activeTab="Favorites" />
      <div className="max-h-[70vh] overflow-y-auto p-6">
        {isEmpty(favoriteMovies) && (
          <PageNotFound returnHome description={t("error.noFavorite")} />
        )}
        {favoriteMovies.map((movie, index) => (
          <div
            className="mb-4 flex items-center justify-between rounded-lg bg-gray-100 p-4 shadow-sm"
            key={index}
          >
            <span className="text-left font-bold">{movie.Title}</span>
            <span className="text-sm text-gray-600">
              Rating:{" "}
              <span className="text-base font-semibold text-black">
                {movie.imdbRating}
              </span>
            </span>
          </div>
        ))}
      </div>
    </>
  );
};
export default Favorites;
