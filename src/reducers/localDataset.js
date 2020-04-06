import * as types from "../actions/types";

// const localDataset = (state = {localData: null}, action) => {
//   switch (action.type) {
//     case types.UPLOAD_LOCAL_CSV:
//       return {localData: []};
//     default:
//       return state;
//   }
// };

// export default localDataset;

const localDataset = (state= {
  csvData: []
}, action) => {
  switch (action.type) {
    case types.SAVE_LOCAL_CSV: {
      const newState = Object.assign({}, state, {
        csvData: action.csvData
      });
      return newState;
    }
    default:
      return state;
  }
};

export default localDataset;
