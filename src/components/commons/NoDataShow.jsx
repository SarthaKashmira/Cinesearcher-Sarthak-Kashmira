import { NoData } from "neetoui";

const NoDataShow = ({ description }) => (
  <div className="flex w-full items-center justify-center">
    <NoData
      image="https://cdn-icons-png.flaticon.com/512/15/15457.png"
      title={description}
    />
  </div>
);

export default NoDataShow;
