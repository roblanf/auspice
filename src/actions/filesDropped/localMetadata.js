import { errorNotification, successNotification, warningNotification } from "../notifications";
import { UPLOAD_LOCAL_CSV } from "../types";
import {parseCsv} from "./parseCsv";

const handleLocalMetadata = async (dispatch, getState, file) => {
    let csvData, errors, csvMeta;
    try {
      ({data: csvData, errors, meta: csvMeta} = await parseCsv(file));
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
    csvData.forEach((d) => {
      console.log(d);
    });
  



    /* CHECK FOR ERRORS */
    if (strainsToProcess.size === 0 || newColorByNames.length === 0) {
      return dispatch(errorNotification({
        message: `${file.name} had no (relevent) information`,
        details: newColorByNames.length === 0 ? "No columns to add as colorings" : "No taxa which match those in the tree"
      }));
    }
  
    /* DISPATCH APPROPRIATE WARNINGS */
    if (taxaInCsvButNotInTree.length) {
      const n = taxaInCsvButNotInTree.length;
      dispatch(warningNotification({
        message: `Ignoring ${n} taxa which ${n > 1 ? "don't" : "doesn't"} appear in the tree!`,
        details: taxaInCsvButNotInTree.join(", ")
      }));
      console.warn("Ignoring these taxa from the CSV as they don't appear in the tree:", taxaInCsvButNotInTree);
    }
    if (colorBysIgnored.length) {
      dispatch(warningNotification({
        message: `Ignoring ${colorBysIgnored.length} CSV fields as they are already set as colorings or are "special" cases to be ignored`,
        details: colorBysIgnored.join(", ")
      }));
    }
  
    /* DISPATCH NEW COLORINGS & SUCCESS NOTIFICATION */
    const newColorings = {};
    newColorByNames.forEach((title) => {
      // TODO -- let the CSV define the type
      newColorings[title] = {title, type: "categorical"};
    });
    dispatch({type: ADD_COLOR_BYS, newColorings, strains: strainsToProcess, traits: dataToProcess});
    return dispatch(successNotification({
      message: "Adding metadata from " + file.name,
      details: `${newColorByNames.length} new field${newColorByNames.length > 1 ? "s" : ""} for ${strainsToProcess.size} node${strainsToProcess.size > 1 ? "s" : ""}`
    }));
  };
  
  export default handleLocalMetadata;