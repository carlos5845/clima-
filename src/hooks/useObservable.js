import { useEffect, useState } from "react";

export function useObservable(observable$, initialValue) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const sub = observable$.subscribe(setValue);
    return () => sub.unsubscribe();
  }, [observable$]);

  return value;
}
