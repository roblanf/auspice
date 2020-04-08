import { errorNotification, successNotification, warningNotification } from "../notifications";
import { UPLOAD_LOCAL_CSV, SAVE_LOCAL_CSV } from "../types";
import {parseCsv} from "./parseCsv";

const handleLocalMetadata = async (dispatch, getState, file) => {
  let data, errors, csvMeta;
  try {
    ({data: data, errors, meta: csvMeta} = await parseCsv(file));
    if (errors.length) {
      console.error(errors);
      throw new Error(errors.map((e) => e.message).join(", "));
    }
  } catch (err) {
    return dispatch(errorNotification({
      message: `Parsing of ${file.name} failed`,
      details: err.message
    }));
  }

  const {controls, tree} = getState();
  /* currently we cannot process metadata fields which are defined as properties on a node, rather than trait properties
  These could be included on a case-by-case basis */
  // csvData.forEach((d) => {
  //   console.log(d);
  // });

  console.log("trigger update csvData: ", data);
  dispatch({type: SAVE_LOCAL_CSV, data});
  return dispatch(successNotification({
    message: "Adding local csv metadata from " + file.name,
    details: "New local csv metadata is added"
  }));
  // /* DISPATCH NEW COLORINGS & SUCCESS NOTIFICATION */
  // dispatch({type: ADD_COLOR_BYS, newColorings, strains: strainsToProcess, traits: dataToProcess});
  // return dispatch(successNotification({
  //   message: "Adding metadata from " + file.name,
  //   details: `${newColorByNames.length} new field${newColorByNames.length > 1 ? "s" : ""} for ${strainsToProcess.size} node${strainsToProcess.size > 1 ? "s" : ""}`
  // }));
};

export default handleLocalMetadata;
