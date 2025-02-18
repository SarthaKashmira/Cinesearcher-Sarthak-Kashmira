import { Header, NoDataShow } from "components/commons";
import { Typography } from "neetoui";
import { isEmpty } from "ramda";
import { Trans, useTranslation } from "react-i18next";
import useFavoriteMoviesStore from "stores/useFavoriteMoviesStore";

const Favorites = () => {
  const { t } = useTranslation();

  const favoriteMovies = useFavoriteMoviesStore.pickFrom();

  return (
    <>
      <Header activeTab="Favorites" />
      <div className="max-h-[70vh] overflow-y-auto p-6">
        {isEmpty(favoriteMovies) && (
          <NoDataShow description={t("error.noFavorite")} />
        )}
        {favoriteMovies.map(({ imdbID, title, imdbRating }) => (
          <div
            className="mb-4 flex items-center justify-between rounded-lg bg-gray-100 p-4 shadow-sm"
            key={imdbID}
          >
            <Typography className="text-left font-bold">{title}</Typography>
            <Typography className="text-sm text-gray-600">
              <Trans
                i18nKey="favorite.rating"
                values={{ rating: imdbRating }}
                components={{
                  bold: (
                    <Typography
                      className="font-semibold text-black"
                      component="span"
                    />
                  ),
                }}
              />
            </Typography>
          </div>
        ))}
      </div>
    </>
  );
};
export default Favorites;
