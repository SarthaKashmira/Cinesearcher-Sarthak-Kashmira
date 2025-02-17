import { PageLoader } from "components/commons";
import { useShowMovie } from "hooks/reactQuery/useShowMovie";
import { Rating, RatingFilled } from "neetoicons";
import { Button, Modal, Typography } from "neetoui";
import { Trans, useTranslation } from "react-i18next";
import useFavoriteMovies from "stores/useFavoriteMovies";
import { fetchMoviePoster } from "utils/movie";

import { checkFavoriteMovie, fetchGenres } from "./utils";

const MovieModal = ({ isOpen, movie, setIsOpen }) => {
  const { t } = useTranslation();

  const { imdbID } = movie;

  const { data: movieInformation = {}, isLoading } = useShowMovie(imdbID);
  const { favoriteMovies = [], setFavoriteMovie } = useFavoriteMovies(
    store => ({
      favoriteMovies: store.favoriteMovies,
      setFavoriteMovie: store.setFavoriteMovie,
    })
  );

  const {
    Poster,
    Title,
    Genre,
    Plot,
    Director,
    Actors,
    BoxOffice,
    Year,
    Runtime,
    Language,
    imdbRating,
  } = movieInformation;

  const movieDetails = [
    { key: "Description", label: "Description", value: Plot },
    { key: "Director", label: "Director", value: Director },
    { key: "Actors", label: "Actors", value: Actors },
    { key: "BoxOffice", label: "BoxOffice", value: BoxOffice },
    { key: "Year", label: "Year", value: Year },
    { key: "Runtime", label: "Runtime", value: Runtime },
    { key: "Language", label: "Language", value: Language },
    { key: "imdbRating", label: "imdbRating", value: imdbRating },
  ];

  const handleAddToFavorites = () => {
    setFavoriteMovie({ imdbID, Title, imdbRating });
  };

  if (isLoading) {
    return (
      <Modal isOpen={isOpen} size="large" onClose={() => setIsOpen(false)}>
        <div className="flex items-center justify-center p-6">
          <PageLoader />
        </div>
      </Modal>
    );
  }

  return (
    <Modal onClose={() => setIsOpen(false)} {...{ isOpen }} size="large">
      <div className="p-6">
        <div className="flex">
          <Typography className="mb-2 text-2xl font-bold" style="h2">
            {Title}
          </Typography>
          <Button
            className="ml-4 rounded px-2 py-1 text-sm"
            style="link"
            icon={() =>
              checkFavoriteMovie(
                { imdbID, Title, imdbRating },
                favoriteMovies
              ) ? (
                <RatingFilled />
              ) : (
                <Rating />
              )
            }
            tooltipProps={{
              followCursor: "horizontal",
              position: "top",
              content: checkFavoriteMovie(
                { imdbID, Title, imdbRating },
                favoriteMovies
              )
                ? t("modal.removeFavorite")
                : t("modal.addFavorite"),
            }}
            onClick={handleAddToFavorites}
          />
        </div>
        {/* Tags section here */}
        <div className="mb-4 flex flex-wrap gap-2">
          {fetchGenres(Genre).map((genre, index) => (
            <Typography key={index}>
              <Trans
                i18nKey="modal.genre"
                values={{ genre }}
                components={{
                  typography: (
                    <strong className="rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-600" />
                  ),
                }}
              />
            </Typography>
          ))}
        </div>
      </div>
      <div className="mx-auto flex max-w-4xl flex-col rounded-lg bg-white p-6 shadow-lg md:flex-row">
        {/* Image part is here */}
        <div className="flex-shrink-0">
          <img
            alt={Title}
            className="h-auto w-full rounded-lg object-cover md:w-48"
            src={fetchMoviePoster(Poster)}
          />
        </div>
        <div className="ml-0 mt-4 flex flex-grow flex-col md:ml-6 md:mt-0">
          <div className="space-y-1 text-sm text-gray-600">
            {movieDetails.map(({ key, label, value }) => (
              <Typography key={key}>
                <Trans
                  components={{ typography: <strong /> }}
                  i18nKey="modal.detail"
                  values={{ label: t(label), value }}
                />
              </Typography>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MovieModal;
