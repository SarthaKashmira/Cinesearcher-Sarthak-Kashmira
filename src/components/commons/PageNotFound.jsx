import { NoData } from "neetoui";

const PageNotFound = ({ description }) => (
  <div className="absolute left-1/3 top-1/3">
    <NoData title={description} />
  </div>
);

export default PageNotFound;
