import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers} from 'redux';
import {HotTable} from '@handsontable/react';
import Handsontable from 'handsontable';
import * as types from "../actions/types";

const localDataHandsontable = (state= {
//   data: Handsontable.helper.createSpreadsheetData(6, 10),
  data: [],
  page: 0,
  rowsPerPage: 5,
  dense: false,
  order: 'asc',
  orderBy: 'Strain'
}, action) => {
//   console.log("Action Reducer: ");
  switch (action.type) {
    case types.CHANGE_TABLE_PAGE: {
      return Object.assign({}, state, {
        page: action.page
      });
    }
    case types.CHANGE_TABLE_ROWSPERPAGE: {
      return Object.assign({}, state, {
        rowsPerPage: action.rowsPerPage
      });
    }

    case types.CHANGE_TABLE_DENSE: {
      return Object.assign({}, state, {
        dense: action.dense
      });
    }

    case types.CHANGE_TABLE_ORDER: {
      return Object.assign({}, state, {
        order: action.order
      });
    }

    case types.CHANGE_TABLE_ORDERBY: {
      return Object.assign({}, state, {
        orderBy: action.orderBy
      });
    }

    case types.SAVE_LOCAL_CSV: {
    //   console.log("action.csvData: ", action.csvData);
      return Object.assign({}, state, {
        data: action.data
      });
    }
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
    //   console.log("Reducer: ", types.HANDSON_UPDATE_READONLY);
      return Object.assign({}, state, {
        readOnly: action.readOnly
      });
    }
    default:
      return state;
  }
};

export default localDataHandsontable;
