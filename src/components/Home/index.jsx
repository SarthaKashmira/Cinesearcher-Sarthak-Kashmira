import Header from "components/commons/Header";
import { Search } from "neetoicons";
import { Input } from "neetoui";

const Home = () => (
  <div className="flex h-screen flex-col">
    <div className="m-2">
      <Header
        actionBlock={
          <Input
            placeholder="Search products"
            prefix={<Search />}
            type="search"
          />
        }
      />
    </div>
  </div>
);

export default Home;
