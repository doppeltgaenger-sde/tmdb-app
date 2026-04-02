import { useState } from "react";

export const useFetching = (callback) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetching = async () => {
    try {
      setLoading(true);
      await callback();
    } catch (event) {
      setError(event.message);
    } finally {
      setLoading(false);
    }
  };
  return [fetching, loading, error];
};
