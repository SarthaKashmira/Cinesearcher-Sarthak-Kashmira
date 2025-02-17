import { useState } from "react";

import MovieModal from "components/Movie/Modal";
import { Button } from "neetoui";
import { Trans } from "react-i18next";
import { fetchMoviePoster } from "src/components/Movie/utils";
import useViewMoviesHistoryStore from "stores/useViewMoviesHistoryStore";

const Card = ({ movie }) => {
  const [isOpen, setIsOpen] = useState(false);

  const setMovieHistory = useViewMoviesHistoryStore.pickFrom();

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
        <Trans
          i18nKey="movieCard.Title"
          values={{ Title }}
          components={{
            typography: <h3 className="text-lg font-semibold text-gray-800" />,
          }}
        />
        <Trans
          i18nKey="movieCard.year"
          values={{ Movie: Type.toUpperCase(), Year }}
          components={{
            typography: <p className="mt-1 text-sm text-gray-500" />,
          }}
        />
      </div>
      {/* View Details Button */}
      <div className="mt-auto">
        <Button
          className="rounded-md px-4 py-2 font-bold hover:bg-blue-100 hover:text-blue-600"
          label="View details"
          style="link"
          onClick={handleViewDetailsClick}
        />
        {isOpen && <MovieModal {...{ isOpen, setIsOpen, movie }} />}
      </div>
    </div>
  );
};

export default Card;
