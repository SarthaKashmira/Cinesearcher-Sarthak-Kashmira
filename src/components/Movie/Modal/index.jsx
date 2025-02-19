import { PageLoader } from "components/commons";
import { useShowMovie } from "hooks/reactQuery/useShowMovie";
import { Rating, RatingFilled } from "neetoicons";
import { Button, Modal, Typography } from "neetoui";
import { Trans, useTranslation } from "react-i18next";
import { fetchMoviePoster } from "src/components/Movie/utils";
import useFavoriteMoviesStore from "stores/useFavoriteMoviesStore";

import { checkFavoriteMovie, fetchGenres, getMovieModalDetails } from "./utils";

const MovieModal = ({ isOpen, movie, setIsOpen }) => {
  const { t } = useTranslation();

  // needed to destructure here so as to make an api call
  const { imdbID } = movie;

  const { data: movieInformation = {}, isLoading } = useShowMovie(imdbID);

  const { favoriteMovies = [], setFavoriteMovie } =
    useFavoriteMoviesStore.pick();

  const handleAddToFavorites = () => {
    setFavoriteMovie({ imdbID, title, imdbRating });
  };

  const movieDetails = getMovieModalDetails(movieInformation);

  const {
    Poster: poster,
    Title: title,
    Genre: genres,
    imdbRating,
  } = movieInformation;

  const isFavoriteMovie = checkFavoriteMovie(
    { imdbID, title, imdbRating },
    favoriteMovies
  );

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
            {title}
          </Typography>
          <Button
            className="ml-4 rounded px-2 py-1 text-sm"
            icon={() => (isFavoriteMovie ? <RatingFilled /> : <Rating />)}
            style="link"
            tooltipProps={{
              followCursor: "horizontal",
              position: "top",
              content: isFavoriteMovie
                ? t("modal.removeFavorite")
                : t("modal.addFavorite"),
            }}
            onClick={handleAddToFavorites}
          />
        </div>
        {/* Tags section here */}
        <div className="mb-4 flex flex-wrap gap-2">
          {fetchGenres(genres).map((genre, index) => (
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
            alt={title}
            className="h-auto w-full rounded-lg object-cover md:w-48"
            src={fetchMoviePoster(poster)}
          />
        </div>
        <div className="ml-0 mt-4 flex flex-grow flex-col md:ml-6 md:mt-0">
          <div className="space-y-1 text-sm text-gray-600">
            {movieDetails.map(({ key, label, value }) => (
              <Typography key={key}>
                <Trans
                  components={{ typography: <strong /> }}
                  i18nKey="modal.detail"
                  values={{ label, value }}
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
