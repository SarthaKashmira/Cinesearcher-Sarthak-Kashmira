import { useState } from "react";

import Header from "components/commons/Header";
import PageLoader from "components/commons/Pageloader";
import { useMoviesApi } from "hooks/reactQuery/useMoviesApi";
import useDebounce from "hooks/useDebounce";
import { Search } from "neetoicons";
import { Input } from "neetoui";

const Home = () => {
  const [searchKey, setSearchKey] = useState("");
  const debouncedSearchKey = useDebounce(searchKey);

  const { data: movies = {}, isLoading } = useMoviesApi(debouncedSearchKey);
  console.log(movies);
  if (isLoading) return <PageLoader />;

  return (
    <div className="flex h-screen flex-col">
      <div className="m-2">
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
    </div>
  );
};

export default Home;
