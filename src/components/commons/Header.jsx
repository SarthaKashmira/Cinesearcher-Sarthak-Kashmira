import classNames from "classnames";
import { Button, Typography } from "neetoui";
import { Trans } from "react-i18next";
import { Link } from "react-router-dom";
import { routes } from "routes";

const Header = ({ activeTab }) => {
  const brand = [
    { color: "text-blue-600", value: "Cine" },
    { color: "text-black", value: "Searcher" },
  ];

  return (
    <div className="sticky top-0 flex w-full items-center justify-between bg-white p-4 shadow-md">
      {/* Logo */}
      <div className="text-xl font-bold">
        {brand.map(({ color, value }) => (
          <Trans
            i18nKey="brand.name"
            key={value}
            values={{ value }}
            components={{
              typography: <Typography className={color} component="span" />,
            }}
          />
        ))}
      </div>
      {/* Navigation Tabs */}
      <div className="ml-10 flex flex-grow space-x-6">
        <Link to={routes.home}>
          <Button
            style="link"
            className={classNames("text-lg", {
              "font-bold text-blue-600": activeTab === "Home",
              "text-gray-700": activeTab !== "Home",
            })}
          >
            Home
          </Button>
        </Link>
        <Link to={routes.favorite}>
          <Button
            style="link"
            className={classNames("text-lg", {
              "font-bold text-blue-600": activeTab === "Favorites",
              "text-gray-700": activeTab !== "Favorites",
            })}
          >
            Favorites
          </Button>
        </Link>
      </div>
    </div>
  );
};
export default Header;
