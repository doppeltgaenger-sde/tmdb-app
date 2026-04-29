import { useState } from "react";

export const useFetching = (callback) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetching = async (...args) => {
    try {
      setIsLoading(true);
      setError(null);
      await callback(...args);
    } catch (errorInstance) {
      setError(errorInstance.message || "Что-то пошло не так");
    } finally {
      setIsLoading(false);
    }
  };

  return [handleFetching, isLoading, error];
};
