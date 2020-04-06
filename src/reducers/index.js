import { combineReducers } from "redux";
import metadata from "./metadata";
import tree from "./tree";
import frequencies from "./frequencies";
import entropy from "./entropy";
import controls from "./controls";
import browserDimensions from "./browserDimensions";
import notifications from "./notifications";
import narrative from "./narrative";
import treeToo from "./treeToo";
import general from "./general";
import localDataset from "./localDataset";
// import localMetaData from "./localMetaData";

const rootReducer = combineReducers({
  metadata,
  tree,
  frequencies,
  controls,
  entropy,
  browserDimensions,
  notifications,
  narrative,
  treeToo,
  general,
  localDataset
});

export default rootReducer;
