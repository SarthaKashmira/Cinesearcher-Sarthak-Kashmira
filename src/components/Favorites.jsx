import { Header, PageNotFound } from "components/commons";
import { Typography } from "neetoui";
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
        {favoriteMovies.map(({ imdbID, Title, imdbRating }) => (
          <div
            className="mb-4 flex items-center justify-between rounded-lg bg-gray-100 p-4 shadow-sm"
            key={imdbID}
          >
            <Typography className="text-left font-bold">{Title}</Typography>
            <Typography className="text-sm text-gray-600">
              {t("favorite.rating")}
              <Typography className="text-base font-semibold text-black">
                {imdbRating}
              </Typography>
            </Typography>
          </div>
        ))}
      </div>
    </>
  );
};
export default Favorites;
