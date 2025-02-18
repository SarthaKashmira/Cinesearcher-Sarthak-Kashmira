import { useEffect, useState } from "react";

import useQueryParams from "hooks/useQueryParams";
import { filterNonNull } from "neetocist";
import { Filter } from "neetoicons";
import { Dropdown, Input, Checkbox, Label, Typography } from "neetoui";
import { isEmpty } from "ramda";
import { Trans, useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { routes } from "routes";
import { buildUrl } from "utils/url";

import {
  MAX_YEAR,
  MIN_YEAR,
  FILTER_TYPES,
  DEFAULT_PAGE_INDEX,
  DEFAULT_TYPES,
} from "./constants";
import { validateYear } from "./utils";

const FilterDropdown = () => {
  const [yearError, setYearError] = useState("");
  const [year, setYear] = useState("");

  const { t } = useTranslation();

  const history = useHistory();

  const queryParams = useQueryParams();
  const { type, searchTerm } = queryParams;

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
      buildUrl(
        routes.home,
        filterNonNull({
          ...queryParams,
          type: updatedTypes.length === 1 ? updatedTypes[0] : null,
          page: DEFAULT_PAGE_INDEX,
        })
      )
    );
  };

  const handleYearValidation = ({ target: { value } }) => {
    if (validateYear(value)) {
      setYearError("");
      handleYearChange(value);
    } else if (isEmpty(value)) {
      handleYearChange(value);
    } else {
      setYearError(
        t("error.invalidYear", { minYear: MIN_YEAR, maxYear: MAX_YEAR })
      );
    }

    setYear(value);
  };

  useEffect(() => {
    if (searchTerm && selectedTypes.length === 1) {
      history.replace(
        buildUrl(routes.home, {
          ...queryParams,
          type: selectedTypes[0],
        })
      );
    }
  }, []);

  return (
    <Dropdown
      closeOnSelect={false}
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
              {FILTER_TYPES.map(({ id, label }) => (
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
