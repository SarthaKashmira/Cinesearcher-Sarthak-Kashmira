import { NoData } from "neetoui";

const PageNotFound = ({ description }) => (
  <div className="flex w-full items-center justify-center">
    <NoData
      image="https://cdn-icons-png.flaticon.com/512/15/15457.png"
      title={description}
      primaryButtonProps={{
        label: "Back to home",
        className: "bg-neutral-800 hover:bg-neutral-950",
        to: "/",
      }}
    />
  </div>
);

export default PageNotFound;
