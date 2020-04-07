import { errorNotification, successNotification, warningNotification } from "../notifications";
import { HANDSON_UPDATE_DATA, HANDSON_UPDATE_READONLY } from "../types";

const handleLocalDataHandsontable = async (dispatch, getState, file) => {
  const {data, colHeaders, rowHeaders, readOnly} = getState();

  console.log("data: ", data);
  console.log("colHeaders: ", colHeaders);
  console.log("rowHeaders: ", rowHeaders);
  console.log("readOnly: ", readOnly);
//   const reduxHotSettings = () => {
//     return getState().updates;
//   };
  toggleReadOnly(event) {
    dispatch({
      type: HANDSON_UPDATE_READONLY,
      readOnly: event.target.checked
    });
  }
  // console.log("csvData: ", csvData);
  dispatch({type: HANDSON_UPDATE_DATA, data});
//   return dispatch(successNotification({
//     message: "Adding local csv metadata from " + file.name,
//     details: "New local csv metadata is added"
//   }));
  // /* DISPATCH NEW COLORINGS & SUCCESS NOTIFICATION */
  // dispatch({type: ADD_COLOR_BYS, newColorings, strains: strainsToProcess, traits: dataToProcess});
  // return dispatch(successNotification({
  //   message: "Adding metadata from " + file.name,
  //   details: `${newColorByNames.length} new field${newColorByNames.length > 1 ? "s" : ""} for ${strainsToProcess.size} node${strainsToProcess.size > 1 ? "s" : ""}`
  // }));
};

const onBeforeHotChange = (changes, source) =z> {
  dispatch({
    type: HANDSON_UPDATE_DATA,
    dataChanges: changes
  });
  return false;
}

export default handleLocalDataHandsontable;
