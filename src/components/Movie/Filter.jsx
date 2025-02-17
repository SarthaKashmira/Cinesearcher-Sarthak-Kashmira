import { useEffect } from "react";

import useQueryParams from "hooks/useQueryParams";
import { filterNonNull } from "neetocist";
import { Close, Filter } from "neetoicons";
import { Button, Dropdown, Input, Checkbox } from "neetoui";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { routes } from "routes";
import { buildUrl } from "utils/url";

const DEFAULT_PAGE_INDEX = 1;
const DEFAULT_TYPES = ["movie", "series"];

const FilterDropdown = () => {
  const { t } = useTranslation();

  const history = useHistory();

  const queryParams = useQueryParams();

  const filterTypes = [
    { id: "movie", label: t("labels.movie") },
    { id: "series", label: t("labels.series") },
  ];

  const selectedTypes = queryParams.type
    ? queryParams.type.split(",")
    : DEFAULT_TYPES;

  const { year = "" } = queryParams;

  const handleYearChange = ({ target: { value } }) => {
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

  const clearFilters = () => {
    history.replace(
      buildUrl(routes.home, {
        ...queryParams,
        year: null,
        type: DEFAULT_TYPES.join(","),
        page: DEFAULT_PAGE_INDEX,
      })
    );
  };

  useEffect(() => {
    if (!queryParams.type) {
      history.replace(
        buildUrl(routes.home, {
          ...queryParams,
          type: DEFAULT_TYPES.join(","),
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
          <span className="text-lg font-semibold text-gray-700">
            {t("labels.filters")}
          </span>
          <Button
            className="hover:bg-gray-100"
            icon={Close}
            size="small"
            style="text"
            onClick={clearFilters}
          />
        </div>
        <div className="space-y-6">
          <div>
            <Input
              className="transition-all focus:border-indigo-500"
              label={t("labels.year")}
              max={new Date().getFullYear()}
              min="1900"
              placeholder="YYYY"
              type="number"
              value={year}
              onChange={handleYearChange}
            />
          </div>
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">
              {t("labels.type")}
            </label>
            <div className="space-y-3">
              {filterTypes.map(filterType => (
                <Checkbox
                  checked={selectedTypes.includes(filterType.id)}
                  key={filterType.id}
                  label={filterType.label}
                  onChange={() => handleTypeChange(filterType.id)}
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
