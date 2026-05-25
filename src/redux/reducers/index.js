import { combineReducers } from "redux";
import { configurationReducer } from "./configurationReducer";
import { collectionDetailsReducer } from "./collectionDetailsReducer";
import { mediaReducer } from "./mediaReducer";
import { mediaDetailsReducer } from "./mediaDetailsReducer";
import { providerDetailsReducer } from "./providerDetailsReducer";
import { peopleReducer } from "./peopleReducer";

export const rootReducer = combineReducers({
  configuration: configurationReducer,
  collectionDetails: collectionDetailsReducer,
  media: mediaReducer,
  mediaDetails: mediaDetailsReducer,
  providerDetails: providerDetailsReducer,
  people: peopleReducer,
});
