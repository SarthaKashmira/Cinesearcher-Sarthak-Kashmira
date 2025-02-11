import { useState, useEffect } from "react";

import { Header, PageLoader } from "components/commons";
import MovieCard from "components/MovieCard";
import ViewHistory from "components/ViewHistory";
import { useMoviesApi } from "hooks/reactQuery/useMoviesApi";
import useDebounce from "hooks/useDebounce";
import { Search } from "neetoicons";
import { Input, Toastr } from "neetoui";

const Home = () => {
  const [searchKey, setSearchKey] = useState("Spider Man");
  const debouncedSearchKey = useDebounce(searchKey);

  const { data: movies = {}, isLoading } = useMoviesApi(debouncedSearchKey);

  useEffect(() => {
    if (movies?.Response === "False") {
      Toastr.error(movies.Error, { autoClose: 2000 });
    }
  }, [movies]);

  if (isLoading) return <PageLoader />;

  return (
    <div className="flex h-screen">
      <div className="flex flex-1 flex-col">
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
      <div className="w-96">
        <ViewHistory />
      </div>
    </div>
  );
};

export default Home;
