import { Header } from "components/commons";
import useFavouriteMovies from "stores/useFavouriteMovies";

const Favourites = () => {
  const { favouriteMovies } = useFavouriteMovies(store => ({
    favouriteMovies: store.favouriteMovies,
  }));
  console.log(favouriteMovies);

  return (
    <>
      <Header />
      <div className="max-h-[70vh] overflow-y-auto p-6">
        {favouriteMovies.map((movie, index) => (
          <div
            className="mb-4 flex items-center justify-between rounded-lg bg-gray-100 p-4 shadow-sm"
            key={index}
          >
            <span className="text-left font-bold">{movie.Title}</span>
            <span className="text-sm text-gray-600">
              Rating:{" "}
              <span className="text-base font-semibold text-black">
                {movie.Rated}
              </span>
            </span>
          </div>
        ))}
      </div>
    </>
  );
};
export default Favourites;
