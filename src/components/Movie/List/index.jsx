import { useState, useEffect, useRef } from "react";

import { Header, NoDataShow, PageLoader } from "components/commons";
import ViewHistory from "components/History";
import Card from "components/Movie/Card";
import FilterDropdown from "components/Movie/FilterDropdown";
import { useFetchMovies } from "hooks/reactQuery/useFetchMovies";
import useFuncDebounce from "hooks/useFuncDebounce";
import useQueryParams from "hooks/useQueryParams";
import { filterNonNull } from "neetocist";
import { Search } from "neetoicons";
import { Input, Pagination } from "neetoui";
import { isEmpty, mergeLeft } from "ramda";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { routes } from "routes";
import { buildUrl } from "utils/url";

import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_NUMBER } from "./constants";

const List = () => {
  // useHistory Api for changing the urls as per the query params
  const [searchKey, setSearchKey] = useState("");
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_NUMBER);

  // using useRef here for referring to the input field
  const inputRef = useRef(null);

  const { t } = useTranslation();

  const history = useHistory();

  const queryParams = useQueryParams();

  const { page, searchTerm, year, type } = queryParams;

  // custom hook for fetching the data from the api
  const { data: movies = {}, isLoading } = useFetchMovies({
    searchTerm,
    year,
    type: type?.split(","),
    page: page || DEFAULT_PAGE_NUMBER,
  });

  // to update the query params whenever the user in writing something for the search key.
  const updateQueryParams = useFuncDebounce(value => {
    const params = {
      ...queryParams,
      page: isEmpty(value) ? null : DEFAULT_PAGE_NUMBER,
      searchTerm: value || null,
    };
    setCurrentPage(DEFAULT_PAGE_NUMBER);
    history.replace(buildUrl(routes.home, filterNonNull(params)));
  });

  // to handle the update of query params when page changes
  const handlePageNavigation = page => {
    setCurrentPage(page);
    history.replace(buildUrl(routes.home, mergeLeft({ page }, queryParams)));
  };

  useEffect(() => {
    const handleKeyPress = event => {
      if (event.key === "/") {
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
    <div className="flex h-screen flex-col">
      <div className="w-full">
        <Header activeTab="Home" />
      </div>
      <div className="flex flex-1">
        <div className="m-2 flex flex-1 flex-col">
          <div className="m-2">
            <div className="mx-auto max-w-6xl">
              <div className="flex p-0">
                <Input
                  placeholder={t("labels.searchMovies")}
                  prefix={<Search />}
                  ref={inputRef}
                  type="search"
                  value={searchKey}
                  onChange={({ target: { value } }) => {
                    setSearchKey(value);
                    updateQueryParams(value);
                  }}
                />
                <FilterDropdown />
              </div>
              <div className="mx-auto flex max-w-6xl items-center justify-center">
                {!movies.Search || isEmpty(searchKey) ? (
                  <NoDataShow description={t("error.noMovie")} />
                ) : (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {movies?.Search?.map(movie => {
                      const { imdbID } = movie;

                      return <Card key={imdbID} movie={movie} />;
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="mb-5 self-end">
            <Pagination
              count={isEmpty(searchKey) ? 0 : movies.totalResults}
              navigate={handlePageNavigation}
              pageNo={currentPage || DEFAULT_PAGE_NUMBER}
              pageSize={DEFAULT_PAGE_SIZE}
            />
          </div>
        </div>
        <div className="w-96">
          <ViewHistory />
        </div>
      </div>
    </div>
  );
};

export default List;
