import { useState } from "react";

import Header from "components/commons/Header";
import PageLoader from "components/commons/Pageloader";
import MovieCard from "components/MovieCard";
import { useMoviesApi } from "hooks/reactQuery/useMoviesApi";
import useDebounce from "hooks/useDebounce";
import { Search } from "neetoicons";
import { Input, Toastr } from "neetoui";

const Home = () => {
  const [searchKey, setSearchKey] = useState("");
  const debouncedSearchKey = useDebounce(searchKey);

  const { data: movies = {}, isLoading } = useMoviesApi(debouncedSearchKey);
  console.log(movies);

  if (isLoading) return <PageLoader />;

  if (movies?.Response === "False") {
    Toastr.error(movies.Error, { autoClose: 2000 });
  }

  return (
    <div className="flex h-screen flex-col">
      <div className="m-2">
        <div className="mx-auto max-w-6xl">
          <Header
            actionBlock={
              <Input
                placeholder="Search products"
                prefix={<Search />}
                type="search"
                value={searchKey}
                onChange={e => setSearchKey(e.target.value)}
              />
            }
          />
        </div>
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {movies?.Search?.map(movie => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
            {movies?.Actors && <MovieCard movie={movies} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
