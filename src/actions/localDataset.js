export const selectLocalData = (selectedData) => (dispatch) => {
  console.log("UYou clicked on: ", selectedData.first);
  dispatch({
    type: "LOCAL_DATD_SELECTED",
    payload: selectedData
  });
};

// export const selectLocalData = (selectedData) => {
//   console.log("You clicked on: ", selectedData.first);
//   return {
//     type: "LOCAL_DATD_SELECTED",
//     payload: selectedData
//   };
// };
