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
    let finalData = normalizer(primaryResponse);

    for (const step of extraSteps) {
      try {
        const partialData = await step(primaryResponse);
        
        if (partialData) {
          finalData = {
            ...finalData,
            ...partialData,
          };
        }
      } catch (stepError) {
        console.warn("[Pipeline Step Error]:", stepError);
      }
    }

    dispatch(successAction(finalData));

  } catch (error) {
    dispatch(errorAction(error.message));
  }
};
