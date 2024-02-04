import { useEffect, useState } from "react";

export function useDebounce(value, delay) {
  const [finalvalue, setFinalValue] = useState("");

  useEffect(() => {
    const timerHandler = setTimeout(() => {
      setFinalValue(value);
    }, delay);

    return () => clearTimeout(timerHandler);
  }, [value, delay]);

  return finalvalue;
}
