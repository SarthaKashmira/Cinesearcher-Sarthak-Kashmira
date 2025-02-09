import { PageLoader } from "components/commons";
import { useMovieInformation } from "hooks/reactQuery/useMovieInformation";
import { Modal, Typography } from "neetoui";
import { fetchMoviePoster } from "utils/movie";

import { fetchGenres } from "./utils";

const MovieModal = ({ isOpen, movie, setIsOpen }) => {
  const { data: movieInformation = {}, isLoading } = useMovieInformation(
    movie.imdbID
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
    Rated,
  } = movieInformation;

  if (isLoading) return <PageLoader />;

  return (
    <Modal onClose={() => setIsOpen(false)} {...{ isOpen }} size="large">
      <div className="p-6">
        {/* Title here */}
        <h2 className="mb-2 text-2xl font-bold">{Title}</h2>
        {/* Tags section here */}
        <div className="mb-4 flex flex-wrap gap-2">
          {fetchGenres(Genre).map((genre, index) => (
            <span
              className="rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-600"
              key={index}
            >
              {genre}
            </span>
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
          {/* Description here. */}
          <Typography class="mb-4 leading-relaxed text-gray-700">
            {Plot}
          </Typography>
          {/* Other information here. */}
          <div className="space-y-1 text-sm text-gray-600">
            <Typography>
              <strong>Director: {Director}</strong>
            </Typography>
            <Typography>
              <strong>Actors:</strong> {Actors}
            </Typography>
            <Typography>
              <strong>Box Office:</strong> {BoxOffice}
            </Typography>
            <Typography>
              <strong>Year:</strong>
              {Year}
            </Typography>
            <Typography>
              <strong>Runtime:</strong> {Runtime}
            </Typography>
            <Typography>
              <strong>Language:</strong> {Language}
            </Typography>
            <Typography>
              <strong>Rated:</strong> {Rated}
            </Typography>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MovieModal;
