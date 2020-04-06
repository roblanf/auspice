const localMetaData = (state=null, action) => {
  switch (action.type) {
    case "SELECT_LOCAL_CSV":
      return action.localDataset;
    default:
      return state;
  }
};

export default localMetaData;
