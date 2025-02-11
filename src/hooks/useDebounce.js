import { useState, useEffect } from "react";

const useDebounce = value => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, 2000);

    return () => {
      clearTimeout(timerId);
    };
  }, [value]);

  return debouncedValue;
};

export default useDebounce;
