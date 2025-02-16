import { PageLoader } from "components/commons";
import { useShowMovie } from "hooks/reactQuery/useShowMovie";
import { Modal, Typography } from "neetoui";
import { Trans, useTranslation } from "react-i18next";
import { fetchMoviePoster } from "utils/movie";

import { fetchGenres } from "./utils";

const MovieModal = ({ isOpen, movie, setIsOpen }) => {
  const { data: movieInformation = {}, isLoading } = useShowMovie(movie.imdbID);

  const { t } = useTranslation();

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
    Rated,
  } = movieInformation;

  const movieDetails = [
    { key: "Description", label: "Description", value: Plot },
    { key: "Director", label: "Director", value: Director },
    { key: "Actors", label: "Actors", value: Actors },
    { key: "BoxOffice", label: "BoxOffice", value: BoxOffice },
    { key: "Year", label: "Year", value: Year },
    { key: "Runtime", label: "Runtime", value: Runtime },
    { key: "Language", label: "Language", value: Language },
    { key: "Rated", label: "Rated", value: Rated },
  ];

  if (isLoading) return <PageLoader />;

  return (
    <Modal onClose={() => setIsOpen(false)} {...{ isOpen }} size="large">
      <div className="p-6">
        {/* Title here */}
        <h2 className="mb-2 text-2xl font-bold">{Title}</h2>
        {/* Tags section here */}
        <div className="mb-4 flex flex-wrap gap-2">
          {fetchGenres(Genre).map((genre, index) => (
            <Typography key={index}>
              <Trans
                components={{ typography: <strong /> }}
                i18nKey="modal.genre"
                values={{ genre }}
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
