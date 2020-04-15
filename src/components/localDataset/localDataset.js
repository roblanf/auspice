import React from 'react';
import PropTypes from 'prop-types';
import { HotTable } from '@handsontable/react';
import { connect } from "react-redux";
import {HANDSON_UPDATE_DATA, HANDSON_UPDATE_READONLY} from "../../actions/types";
import {CHANGE_TABLE_PAGE, CHANGE_TABLE_ROWSPERPAGE} from "../../actions/types";
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
// import {selectLocalData} from "../../actions/localDataset";
// import {handleLocalMetadata} from "../../actions/filesDropped/localMetadata";

// eslint-disable-next-line no-unused-vars
const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
  {
    id: 'population',
    label: 'Population',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString()
  },
  {
    id: 'size',
    label: 'Size\u00a0(km\u00b2)',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString()
  },
  {
    id: 'density',
    label: 'Density',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2)
  }
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];

const styles = theme => ({
  root: {
    width: '100%'
  },
  container: {
    maxHeight: 440
  }
});

@connect((state) => {
  return {
    // csvData: state.localDataset.csvData,
    data: state.localDataHandsontable.data,
    localDataHandsontable: state.localDataHandsontable,
    page: state.localDataHandsontable.page,
    rowsPerPage: state.localDataHandsontable.rowsPerPage
  };
})
class localDataset extends React.Component {
  constructor(props) {
    super(props);
    this.toggleReadOnly = this.toggleReadOnly.bind(this);
    this.hotTableComponent = React.createRef();
    // console.log("this.toggleReadOnly: ", this.toggleReadOnly);
  }
  static propTypes = {
    data: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
  };

  // componentDidMount() {
  //   this.updateReduxPreview();
  // }

  get reduxHotSettings() {
    console.log("this.props.localDataHandsontable: ", this.props.localDataHandsontable);
    return this.props.localDataHandsontable;
  }

  toggleReadOnly(event) {
    console.log("this.props.data: ", this.props.data);
    this.props.dispatch({
      type: HANDSON_UPDATE_READONLY,
      readOnly: event.target.checked
    });
  }

  onBeforeHotChange(changes, source) {
    this.props.dispatch({
      type: HANDSON_UPDATE_DATA,
      dataChanges: changes
    });
    return false;
  }

  handleChangePage = (event, newPage) => {
    // this.setState({count: newPage});
    this.props.dispatch({
      type: CHANGE_TABLE_PAGE,
      page: newPage
    });
  };

  handleChangeRowsPerPage = (event) => {
    // this.setState({rowsPerPage: +event.target.value});
    // this.setState({count: 0});
    this.props.dispatch({
      type: CHANGE_TABLE_ROWSPERPAGE,
      rowsPerPage: +event.target.value
    });
    this.props.dispatch({
      type: CHANGE_TABLE_PAGE,
      page: 0
    });
  };


  // updateReduxPreview() {
  //   // This method serves only as a renderer for the Redux's state dump.
  //   const previewTable = document.querySelector('#redux-preview table');
  //   const currentState = this.props.localDataHandsontable;
  //   // console.log("currentState: ", currentState);
  //   let newInnerHtml = '<tbody>';

  //   for (const [key, value] of Object.entries(currentState)) {
  //     newInnerHtml += `<tr><td>`;

  //     if (key === 'data' && Array.isArray(value)) {
  //       newInnerHtml += `<strong>data:</strong> <br><table style="border: 1px solid #d6d6d6;"><tbody>`;

  //       for (let row of value) {
  //         newInnerHtml += `<tr>`;

  //         for (let cell of row) {
  //           newInnerHtml += `<td>${cell}</td>`;
  //         }

  //         newInnerHtml += `</tr>`;
  //       }
  //       newInnerHtml += `</tbody></table>`;

  //     } else {
  //       newInnerHtml += `<strong>${key}:</strong> ${value}`;
  //     }
  //     newInnerHtml += `</td></tr>`;
  //   }
  //   newInnerHtml += `</tbody>`;
  //   // console.log("newInnerHtml: ", newInnerHtml);

  //   previewTable.innerHTML = newInnerHtml;
  // }

  createListItems() {
    return this.props.data.map((selectItem) => {
      return (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        <li key={selectItem.id}>1</li>
      );
    }
    );
  }


  // onClick={() => this.props.dispatch(selectLocalData(selectItem))}
  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root} >
        <TableContainer className={classes.container} >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(this.props.page * this.props.rowsPerPage, this.props.page * this.props.rowsPerPage + this.props.rowsPerPage).map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number' ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={this.props.rowsPerPage}
          page={this.props.page}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

export default withStyles(styles)(localDataset);
