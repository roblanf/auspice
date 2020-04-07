import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers} from 'redux';
import {HotTable} from '@handsontable/react';
import Handsontable from 'handsontable';
import * as types from "../actions/types";

const localDataHandsontable = (state= {
  data: Handsontable.helper.createSpreadsheetData(5, 3),
  colHeaders: true,
  rowHeaders: true,
  readOnly: false
}, action) => {
  switch (action.type) {
    case types.HANDSON_UPDATE_DATA: {
      const newData = state.data.slice(0);
      for (let[row, column, oldValue, newValue] of action.dataChanges) {
        newData[row][column] = newValue;
      }
      return Object.assign({}, state, {
        data: newData
      });
    }
    case types.HANDSON_UPDATE_READONLY: {
      return Object.assign({}, state, {
        readOnly: action.readOnly
      });
    }
    default:
      return state;
  }
};

export default localDataHandsontable;
