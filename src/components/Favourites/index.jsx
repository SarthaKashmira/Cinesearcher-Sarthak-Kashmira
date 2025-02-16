import { Header } from "components/commons";

const Favourites = () => {
  const movies = [
    { title: "Inception", rating: "8.8/10" },
    { title: "Interstellar", rating: "8.6/10" },
    { title: "The Dark Knight", rating: "9.0/10" },
    { title: "Fight Club", rating: "8.8/10" },
  ];

  return (
    <>
      <Header />
      <div className="max-h-[70vh] overflow-y-auto p-6">
        {movies.map((movie, index) => (
          <div
            className="mb-4 flex items-center justify-between rounded-lg bg-gray-100 p-4 shadow-sm"
            key={index}
          >
            <span className="text-left font-bold">{movie.title}</span>
            <span className="text-sm text-gray-600">
              Rating:{" "}
              <span className="text-base font-semibold text-black">
                {movie.rating}
              </span>
            </span>
          </div>
        ))}
      </div>
    </>
  );
};
export default Favourites;
