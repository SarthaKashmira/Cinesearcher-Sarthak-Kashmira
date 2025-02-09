import { split } from "ramda";

export const fetchGenres = genres => split(", ", genres);
