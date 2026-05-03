import { combineReducers } from "redux";
import { configurationReducer } from "./configurationReducer";
import { collectionDetailsReducer } from "./collectionDetailsReducer";
import { mediaReducer } from "./mediaReducer";
import { mediaDetailsReducer } from "./mediaDetailsReducer";

export const rootReducer = combineReducers({
  configuration: configurationReducer,
  collectionDetails: collectionDetailsReducer,
  media: mediaReducer,
  mediaDetails: mediaDetailsReducer,
});
