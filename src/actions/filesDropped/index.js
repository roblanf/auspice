import { warningNotification, successNotification } from "../notifications";
import handleMetadata from "./metadata";
import handleLocalMetadata from "./localMetadata";
import { is_csv_or_tsv } from "./constants";


/**
 * A thunk to handle dropped files and take the appropriate action.
 * @param {*} files DataTransfer object's FileList
 */
const handleFilesDropped = (files) => (dispatch, getState) => {

  if (files.length !== 1) {
    return dispatch(warningNotification({
      message: "More than one file dropped",
      details: "Currently we only allow a single CSV to be used"
    }));
  }

  const file = files[0];
  if (file.name == "custom_data.csv") {
    console.log("file.name: " + file.name)
    return handleLocalMetadata(dispatch, getState, file);
    // return dispatch(successNotification({
    //   message: `${file.name} is successfully added`,
    //   details: `HAHAHA`
    // }));
  } else {
    if (is_csv_or_tsv(file)) {
      return handleMetadata(dispatch, getState, file);
    }
    return dispatch(warningNotification({
      message: `Cannot parse ${file.name}`,
      details: `Currently only CSV & TSV files are allowed, not ${file.type}`
    }));
  }
};

export default handleFilesDropped;
