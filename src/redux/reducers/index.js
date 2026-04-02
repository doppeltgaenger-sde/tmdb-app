import { combineReducers } from "redux";
import { appReducer } from "./appReducer";
import { mediaReducer } from "./mediaReducer";

export const rootReducer = combineReducers({
  app: appReducer,
  media: mediaReducer,
});
