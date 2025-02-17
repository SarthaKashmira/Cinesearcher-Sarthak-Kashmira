import { useState, useEffect, useRef } from "react";

import { Header, PageLoader, PageNotFound } from "components/commons";
import ViewHistory from "components/History";
import MovieCard from "components/Movie/Card";
import { useFetchMovies } from "hooks/reactQuery/useFetchMovies";
import useFuncDebounce from "hooks/useFuncDebounce";
import useQueryParams from "hooks/useQueryParams";
import { filterNonNull } from "neetocist";
import { Search } from "neetoicons";
import { Input, Pagination } from "neetoui";
import { mergeLeft } from "ramda";
import { useHistory } from "react-router-dom";
import { routes } from "routes";
import { buildUrl } from "utils/url";

import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_NUMBER } from "./constants";

import FilterDropdown from "../Filter";

const List = () => {
  // useHistory Api for changing the urls as per the query params
  const history = useHistory();
  const queryParams = useQueryParams();
  const { page, searchTerm: s, year: y, type } = queryParams;

  const [searchKey, setSearchKey] = useState("");

  // using useRef here for referring to the input field
  const inputRef = useRef(null);
  // custom hook for fetching the data from the api
  const { data: movies = {}, isLoading } = useFetchMovies({
    s,
    y,
    type: type?.split(","),
    page: page || DEFAULT_PAGE_NUMBER,
  });

  // to update the query params whenever the user in writing something for the search key.
  const updateQueryParams = useFuncDebounce(value => {
    const params = {
      ...queryParams,
      page: DEFAULT_PAGE_NUMBER,
      searchTerm: value || null,
    };
    history.replace(buildUrl(routes.home, filterNonNull(params)));
  });

  // to handle the update of query params when page changes
  const handlePageNavigation = page => {
    history.replace(buildUrl(routes.home, mergeLeft({ page }, queryParams)));
  };

  useEffect(() => {
    const handleKeyPress = event => {
      if (event.key) {
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  if (isLoading) return <PageLoader />;

  return (
    <div className="flex h-screen">
      <div className="flex flex-1 flex-col">
        <div className="m-2">
          <div className="mx-auto max-w-6xl">
            <Header />
          </div>
          <div className="flex p-0">
            <Input
              placeholder="Search products"
              prefix={<Search />}
              ref={inputRef}
              type="search"
              value={searchKey}
              onChange={({ target: { value } }) => {
                updateQueryParams(value);
                setSearchKey(value);
              }}
            />
            <FilterDropdown />
          </div>
          <div className="mx-auto flex max-w-6xl items-center justify-center">
            {!movies.Search ? (
              <div className="flex h-full items-center justify-center">
                <PageNotFound description="No data to show" />
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {movies?.Search?.map(movie => {
                  const { imdbID } = movie;

                  return <MovieCard key={imdbID} movie={movie} />;
                })}
                {movies?.Actors && <MovieCard movie={movies} />}
              </div>
            )}
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

export default List;
