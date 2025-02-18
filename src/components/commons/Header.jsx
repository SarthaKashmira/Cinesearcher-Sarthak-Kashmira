import classNames from "classnames";
import { Button, Typography } from "neetoui";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { routes } from "routes";

import { BRAND, NAVLINKS } from "./constants";

const Header = ({ activeTab }) => {
  const { t } = useTranslation();

  return (
    <div className="sticky top-0 flex w-full items-center justify-between bg-white p-4 shadow-md">
      {/* Logo */}
      <div className="text-xl font-bold">
        {BRAND.map(({ color, value }) => (
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
      <div className="ml-10 flex flex-grow space-x-6">
        {NAVLINKS.map(({ value }, index) => (
          <Link key={index} to={routes[value]}>
            <Button
              style="link"
              className={classNames("text-lg", {
                "font-bold text-blue-600": activeTab === t(`header.${value}`),
                "text-gray-700": activeTab !== t(`header.${value}`),
              })}
            >
              {t(`header.${value}`)}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Header;
