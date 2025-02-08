import { DEFAULT_MOVIE_POSTER } from "./constants";

const MovieCard = ({ movie }) => (
  <div className="flex flex-col rounded-2xl bg-white p-4 shadow-lg">
    {/* Movie Poster */}
    <img
      alt={movie.Title}
      className="h-64 w-full rounded-t-2xl object-cover"
      src={movie.Poster === "N/A" ? DEFAULT_MOVIE_POSTER : movie.Poster}
    />
    {/* Movie Title */}
    <div className="mt-4">
      <h3 className="text-lg font-semibold text-gray-800">{movie.Title}</h3>
      <p className="mt-1 text-sm text-gray-500">
        {movie.Type.toUpperCase()} • {movie.Year}
      </p>
    </div>
    {/* View Details Button */}
    <div className="mt-auto">
      <button className="rounded-md px-4 py-2 font-bold text-blue-500 underline hover:bg-blue-100 hover:text-blue-600">
        View details
      </button>
    </div>
  </div>
);

export default MovieCard;
