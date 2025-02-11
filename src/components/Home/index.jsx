import { useState, useEffect } from "react";

import { Header, PageLoader } from "components/commons";
import MovieCard from "components/MovieCard";
import ViewHistory from "components/ViewHistory";
import { useMoviesApi } from "hooks/reactQuery/useMoviesApi";
import useFuncDebounce from "hooks/useFuncDebounce";
import useQueryParams from "hooks/useQueryParams";
import { filterNonNull } from "neetocist";
import { Search } from "neetoicons";
import { Input, Pagination, Toastr } from "neetoui";
import { mergeLeft } from "ramda";
import { useHistory } from "react-router-dom";
import { routes } from "routes";
import { buildUrl } from "utils/url";

import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_NUMBER } from "./constants";

const Home = () => {
  const history = useHistory();

  const queryParams = useQueryParams();
  console.log(queryParams);
  const { page, s } = queryParams;

  const [searchKey, setSearchKey] = useState(s);

  const { data: movies = {}, isLoading } = useMoviesApi({
    s,
    page: Number(page) || DEFAULT_PAGE_NUMBER,
  });

  const updateQueryParams = useFuncDebounce(value => {
    const params = {
      page: DEFAULT_PAGE_NUMBER,
      s: value || null,
    };
    history.replace(buildUrl(routes.home, filterNonNull(params)));
  });

  const handlePageNavigation = page =>
    history.replace(buildUrl(routes.home, mergeLeft({ page }, queryParams)));

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
                  onChange={({ target: { value } }) => {
                    updateQueryParams(value);
                    setSearchKey(value);
                  }}
                />
              }
            />
          </div>
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {movies?.Search?.map(movie => {
                const { imdbID } = movie;

                return <MovieCard key={imdbID} movie={movie} />;
              })}
              {movies?.Actors && <MovieCard movie={movies} />}
            </div>
          </div>
        </div>
        <div className="mb-5 self-end">
          <Pagination
            count={movies.totalResults}
            navigate={handlePageNavigation}
            pageNo={page || DEFAULT_PAGE_NUMBER}
            pageSize={DEFAULT_PAGE_SIZE}
          />
        </div>
      </div>
      <div className="w-96">
        <ViewHistory />
      </div>
    </div>
  );
};

export default Home;
