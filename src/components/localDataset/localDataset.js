import React from 'react';
import PropTypes from 'prop-types';
import { HotTable } from '@handsontable/react';
import { connect } from "react-redux";
// import {HANDSON_UPDATE_DATA, HANDSON_UPDATE_READONLY} from "../../actions/types";
import { toggleReadOnly, onBeforeHotChange } from "../../actions/localDataHandsontable";

// import {selectLocalData} from "../../actions/localDataset";
// import {handleLocalMetadata} from "../../actions/filesDropped/localMetadata";

@connect((state) => {
  return {
    csvData: state.localDataset.csvData,
    data: state.localDataHandsontable.data,
    localDataHandsontable: state.localDataHandsontable,
    colHeaders: state.localDataHandsontable.colHeaders,
    rowHeaders: state.localDataHandsontable.rowHeaders,
    readOnly: state.localDataHandsontable.readOnly
  };
})
class localDataset extends React.Component {
  constructor(props) {
    super(props);
    this.toggleReadOnly = toggleReadOnly.bind(this);
    this.hotTableComponent = React.createRef();
  }
  static propTypes = {
    csvData: PropTypes.array.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    colHeaders: PropTypes.bool.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    rowHeaders: PropTypes.bool.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    readOnly: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.updateReduxPreview();
  }

  get reduxHotSettings() {
    return this.props.localDataHandsontable;
  }

  // onBeforeHotChange(changes, source) {
  //   this.props.dispatch({
  //     type: HANDSON_UPDATE_DATA,
  //     dataChanges: changes
  //   });
  // }

  // toggleReadOnly(event) {
  //   this.props.dispatch({
  //     type: HANDSON_UPDATE_READONLY,
  //     readOnly: event.target.checked
  //   });
  // }

  updateReduxPreview() {
    // This method serves only as a renderer for the Redux's state dump.
    const previewTable = document.querySelector('#redux-preview table');
    const currentState = this.props.localDataHandsontable;
    console.log("currentState: ", currentState);
    let newInnerHtml = '<tbody>';

    for (const [key, value] of Object.entries(currentState)) {
      newInnerHtml += `<tr><td>`;

      if (key === 'data' && Array.isArray(value)) {
        newInnerHtml += `<strong>data:</strong> <br><table style="border: 1px solid #d6d6d6;"><tbody>`;

        for (let row of value) {
          newInnerHtml += `<tr>`;

          for (let cell of row) {
            newInnerHtml += `<td>${cell}</td>`;
          }

          newInnerHtml += `</tr>`;
        }
        newInnerHtml += `</tbody></table>`;

      } else {
        newInnerHtml += `<strong>${key}:</strong> ${value}`;
      }
      newInnerHtml += `</td></tr>`;
    }
    newInnerHtml += `</tbody>`;
    console.log("newInnerHtml: ", newInnerHtml);

    previewTable.innerHTML = newInnerHtml;
  }

  createListItems() {
    console.log("this.props.csvData: ", this.props.csvData);
    console.log("this.props.data: ", this.props.data);
    return this.props.csvData.map((selectItem) => {
      return (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        <li key={selectItem.id}>1</li>
      );
    }
    );
  }

  // onClick={() => this.props.dispatch(selectLocalData(selectItem))}
  render() {
    return (
      // <div>
      //   <h1> localDataset!!!  </h1>
      //   <ul>
      //     {this.createListItems()}
      //   </ul>
      // </div>
      // className="redux-example-container"
      // id="example-container"
      // id="example-preview" className="hot"
      <div>
        <div>
          <div>
            <div id="toggle-boxes">
              <br/>
              <input onClick={this.props.dispatch(toggleReadOnly)} id="readOnlyCheck" type="checkbox"/><label
                htmlFor="readOnlyCheck"
              > Toggle <code>readOnly</code> for the entire table</label>
            </div>
            <br/>
            {/* beforeChange={this.props.dispatch(onBeforeHotChange)} settings={this.reduxHotSettings} */}
            <HotTable ref={this.hotTableComponent}/>
          </div>
          <div id="redux-preview" className="table-container">
            <h4>Redux store dump:</h4>
            <table>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default localDataset;
