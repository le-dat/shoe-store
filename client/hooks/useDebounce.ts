import { useEffect, useState } from "react";

const useDebounce = ({ value = "", delay = 500 }) => {
  const [debounce, setDebounce] = useState<string>("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounce(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounce;
};

export default useDebounce;
