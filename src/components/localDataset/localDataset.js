import React from 'react';
import PropTypes from 'prop-types';
import { HotTable } from '@handsontable/react';
import { connect } from "react-redux";
// import {selectLocalData} from "../../actions/localDataset";

// import {handleLocalMetadata} from "../../actions/filesDropped/localMetadata";

@connect((state) => {
  console.log("state: ", state);
  return {
    csvData: state.csvData
  };
})
class localDataset extends React.Component {
  constructor(props) {
    super(props);
  }
  static propTypes = {
    csvData: PropTypes.array.isRequired
  }
  
  createListItems() {
    console.log("this.props.csvData: ", this.props.csvData);

    return this.props.csvData.map((selectItem) => {
      return (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        <li>1</li>
        // <li key={selectItem.id}>1</li>
      );
    });
  }
  // onClick={() => this.props.dispatch(selectLocalData(selectItem))}
  render() {
    return (
      <div>
        <h1> localDataset!!!  </h1>
        <ul>
          {/* {this.createListItems()} */}
        </ul>
        {/* <div id="hot-app">
          <HotTable data={this.data} colHeaders={true} rowHeaders={true} width="600" height="300" />
        </div> */}
      </div>
    );
  }
}

export default localDataset;
