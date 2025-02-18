import dayjs from "dayjs";
import { t } from "i18next";

export const MIN_YEAR = 1900;
export const MAX_YEAR = dayjs().year();

export const FILTER_TYPES = [
  { id: "movie", label: t("labels.movie") },
  { id: "series", label: t("labels.series") },
];

export const DEFAULT_PAGE_INDEX = 1;
export const DEFAULT_TYPES = ["movie", "series"];
