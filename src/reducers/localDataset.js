// import * as types from "../actions/types";

// const localDataset = (state = {localData: null}, action) => {
//   switch (action.type) {
//     case types.UPLOAD_LOCAL_CSV:
//       return {localData: []};
//     default:
//       return state;
//   }
// };

// export default localDataset;

export default function () {
  return [
    {
      id: 1,
      first: "Howard",
      age: 22,
      description: "GG"
    },
    {
      id: 2,
      first: "Howard 2",
      age: 10,
      description: "GG2"
    }
  ];
}
