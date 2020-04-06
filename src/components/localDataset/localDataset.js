import React from 'react';
import { HotTable } from '@handsontable/react';
import { connect } from "react-redux";
import {selectLocalData} from "../../actions/localDataset";

@connect((state) => ({
  localDataset: state.localDataset
}))
class localDataset extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     scrollLeft: 0,
  //     scrollTop: 0
  //   };
  //   this.data = [
  //     ["", "Ford", "Volvo", "Toyota", "Honda"],
  //     ["2016", 10, 11, 12, 13],
  //     ["2017", 20, 11, 14, 13],
  //     ["2018", 30, 15, 12, 13]
  //   ];
  // }

  createListItems() {
    return this.props.localDataset.map((user) => {
      return (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        <li key={user.id}
          onClick={() => this.props.dispatch(selectLocalData(user))}
        >{user.first} {user.last}</li>
      );
    });
  }

  render() {
    return (
      <div>
        <h1> localDataset!!!  </h1>
        <ul>
          {this.createListItems()}
        </ul>
        {/* <div id="hot-app">
          <HotTable data={this.data} colHeaders={true} rowHeaders={true} width="600" height="300" />
        </div> */}
      </div>
    );
  }
}

export default localDataset;
