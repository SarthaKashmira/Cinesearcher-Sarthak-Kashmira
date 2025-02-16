import { useState } from "react";

import MovieModal from "components/Movie/Modal";
import { Button } from "neetoui";
import { useTranslation } from "react-i18next";
import useViewMoviesHistory from "stores/useViewMoviesHistory";
import { fetchMoviePoster } from "utils/movie";

const Card = ({ movie }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const setMovieHistory = useViewMoviesHistory(store => store.setMovieHistory);

  const { Poster, Year, Title, imdbID, Type } = movie;

  const handleViewDetailsClick = () => {
    setMovieHistory({ Title, imdbID });
    setIsOpen(true);
  };

  return (
    <div className="flex flex-col rounded-2xl bg-white p-4 shadow-lg">
      {/* Movie Poster */}
      <img
        alt={Title}
        className="h-48 w-full rounded-t-2xl object-cover"
        src={fetchMoviePoster(Poster)}
      />
      {/* Movie Title */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {t("movieCard.Title", { Title })}
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          {t("movieCard.year", { Movie: Type.toUpperCase(), Year })}
        </p>
      </div>
      {/* View Details Button */}
      <div className="mt-auto">
        <Button
          className="rounded-md px-4 py-2 font-bold hover:bg-blue-100 hover:text-blue-600"
          onClick={handleViewDetailsClick}
        >
          View details
        </Button>
        {isOpen && <MovieModal {...{ isOpen, setIsOpen, movie }} />}
      </div>
    </div>
  );
};

export default Card;
