import { useEffect, useState } from "react";

import useQueryParams from "hooks/useQueryParams";
import { filterNonNull } from "neetocist";
import { Close, Filter } from "neetoicons";
import { Button, Dropdown, Input, Checkbox, Label, Typography } from "neetoui";
import { Trans, useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { routes } from "routes";
import { buildUrl } from "utils/url";

import { MAX_YEAR, MIN_YEAR } from "./constants";
import { validateYear } from "./utils";

const DEFAULT_PAGE_INDEX = 1;
const DEFAULT_TYPES = ["movie", "series"];

const FilterDropdown = () => {
  const [closeDropdown, setCloseDropdown] = useState(false);
  const [yearError, setYearError] = useState("");
  const [year, setYear] = useState("");

  const { t } = useTranslation();

  const history = useHistory();

  const queryParams = useQueryParams();
  const { type, searchTerm } = queryParams;
  const filterTypes = [
    { id: "movie", label: t("labels.movie") },
    { id: "series", label: t("labels.series") },
  ];

  const selectedTypes = !type ? DEFAULT_TYPES : type.split(",");

  const handleYearChange = value => {
    const params = {
      ...queryParams,
      year: value || null,
    };
    history.replace(buildUrl(routes.home, filterNonNull(params)));
  };

  const handleTypeChange = typeId => {
    const updatedTypes = selectedTypes.includes(typeId)
      ? selectedTypes.filter(type => type !== typeId)
      : [...selectedTypes, typeId];

    history.replace(
      buildUrl(routes.home, {
        ...queryParams,
        type: updatedTypes.join(","),
        page: DEFAULT_PAGE_INDEX,
      })
    );
  };

  const handleYearValidation = ({ target: { value } }) => {
    if (validateYear(value)) {
      setYearError("");
      handleYearChange(value);
    } else {
      setYearError(
        t("error.invalidYear", { minYear: MIN_YEAR, maxYear: MAX_YEAR })
      );
    }
    setYear(value);
  };

  useEffect(() => {
    if (!type && searchTerm && selectedTypes.length === 1) {
      history.replace(
        buildUrl(routes.home, {
          ...queryParams,
          type: selectedTypes.join(","),
        })
      );
    } else {
      history.replace(
        buildUrl(routes.home, {
          ...queryParams,
          type: undefined,
        })
      );
    }
  }, []);

  return (
    <Dropdown
      closeOnSelect={closeDropdown}
      position="bottom-end"
      buttonProps={{
        icon: Filter,
        style: "text",
        size: "small",
        className: "hover:bg-gray-100 transition-colors duration-200",
      }}
    >
      <div className="flex w-80 flex-col gap-4 rounded-lg bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2">
          <Trans
            i18nKey="labels.filters"
            values={{ Filters: "Filters" }}
            components={{
              typography: (
                <Typography
                  className="text-lg font-semibold text-gray-700"
                  component="span"
                />
              ),
            }}
          />
          <Button
            className="hover:bg-gray-100"
            icon={Close}
            size="small"
            style="text"
            onClick={() => {
              setCloseDropdown(true);
            }}
          />
        </div>
        <div className="space-y-6">
          <div>
            <Input
              className="transition-all focus:border-indigo-500"
              label={t("labels.year")}
              max={MAX_YEAR}
              min={MIN_YEAR}
              placeholder="YYYY"
              type="number"
              value={year}
              onChange={handleYearValidation}
            />
            {yearError && (
              <Typography className="text-red-500">{yearError}</Typography>
            )}
          </div>
          <div className="space-y-3">
            <Trans
              i18nKey="labels.type"
              values={{ Type: "Type" }}
              components={{
                typography: (
                  <Label className="text-sm font-medium text-gray-700" />
                ),
              }}
            />
            <div className="space-y-3">
              {filterTypes.map(({ id, label }) => (
                <Checkbox
                  checked={selectedTypes.includes(id)}
                  key={id}
                  {...{ label }}
                  onChange={() => handleTypeChange(id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Dropdown>
  );
};
export default FilterDropdown;
