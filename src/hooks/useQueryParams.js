import { keysToCamelCase } from "neetocist";
import { parse } from "qs";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const useQueryParams = () => {
  const history = useHistory();
  const queryParams = parse(history.location.search, {
    ignoreQueryPrefix: true,
  });

  return keysToCamelCase(queryParams);
};

export default useQueryParams;
