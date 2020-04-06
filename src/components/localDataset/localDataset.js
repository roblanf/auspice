import React from 'react';
import { HotTable } from '@handsontable/react';
import { connect } from "react-redux";

@connect((state) => ({
  localDataset: state.localDataset
}))
class localDataset extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollLeft: 0,
      scrollTop: 0
    };
    this.data = [
      ["", "Ford", "Volvo", "Toyota", "Honda"],
      ["2016", 10, 11, 12, 13],
      ["2017", 20, 11, 14, 13],
      ["2018", 30, 15, 12, 13]
    ];
  }

  render() {
    return (
      <div>
        <h1> localDataset!!!  </h1>
        <div id="hot-app">
          <HotTable data={this.data} colHeaders={true} rowHeaders={true} width="600" height="300" />
        </div>
      </div>
    );
  }
}

export default localDataset;