import { NoData } from "neetoui";

const PageNotFound = ({ description, returnHome = true }) => {
  const primaryButtonProps = returnHome
    ? {
        label: "Back to home",
        className: "bg-neutral-800 hover:bg-neutral-950",
        to: "/",
      }
    : undefined;

  return (
    <div className="flex w-full items-center justify-center">
      <NoData
        image="https://cdn-icons-png.flaticon.com/512/15/15457.png"
        title={description}
        {...(primaryButtonProps && { primaryButtonProps })}
      />
    </div>
  );
};

export default PageNotFound;
