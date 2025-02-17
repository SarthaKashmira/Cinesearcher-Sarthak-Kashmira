import { MIN_YEAR, MAX_YEAR } from "./constants";

export const validateYear = value => {
  if (value >= MIN_YEAR && value <= MAX_YEAR) {
    return true;
  }

  return false;
};
