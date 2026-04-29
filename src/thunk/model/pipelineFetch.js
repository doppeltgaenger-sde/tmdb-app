export const pipelineFetch = async ({
  dispatch,
  getState,
  checkCache,
  startAction,
  successAction,
  errorAction,
  partialAction,
  fetchSource,
  normalizer,
  extraSteps = [],
}) => {
  if (checkCache && checkCache(getState())) {
    return;
  }

  dispatch(startAction());

  try {
    const primaryResponse = await fetchSource();
    const criticalData = normalizer(primaryResponse);

    dispatch(successAction(criticalData));

    extraSteps.forEach(async (step) => {
      try {
        const partialData = await step(primaryResponse);
        if (partialData) {
          dispatch(partialAction(partialData));
        }
      } catch (stepError) {
        console.warn("[Pipeline Step Error]:", stepError);
      }
    });

  } catch (error) {
    dispatch(errorAction(error.message));
  }
};
