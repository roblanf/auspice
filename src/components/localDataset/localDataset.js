import React from 'react';
import PropTypes from 'prop-types';
import { HotTable } from '@handsontable/react';
import { connect } from "react-redux";
import {HANDSON_UPDATE_DATA, HANDSON_UPDATE_READONLY} from "../../actions/types";
import {CHANGE_TABLE_ORDER, CHANGE_TABLE_ORDERBY, CHANGE_TABLE_DENSE, CHANGE_TABLE_PAGE, CHANGE_TABLE_ROWSPERPAGE} from "../../actions/types";
import { lighten, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
// import {selectLocalData} from "../../actions/localDataset";
// import {handleLocalMetadata} from "../../actions/filesDropped/localMetadata";

// eslint-disable-next-line no-unused-vars
const columns = [
  { id: 'Strain', label: 'Strain', minWidth: 100 },
  { id: 'Age', label: 'Age', minWidth: 30 },
  { id: 'Clade', label: 'Clade', minWidth: 30 },
  { id: 'Country', label: 'Country', minWidth: 30 },
  { id: 'Admin Division', label: 'Admin Division', minWidth: 30 },
  { id: 'genbank_accession', label: 'Genbank_accession', minWidth: 50 },
  { id: 'gisaid_epi_isl', label: 'Gisaid_epi_isl', minWidth: 50 },
  { id: 'Host', label: 'Host', minWidth: 30 },
  { id: 'Location', label: 'Location', minWidth: 30 },
  { id: 'Originating Lab', label: 'Originating Lab', minWidth: 140 },
  { id: 'Submission Date', label: 'Submission Date', minWidth: 30 },
  { id: 'Region', label: 'Region', minWidth: 30 },
  { id: 'Sex', label: 'Sex', minWidth: 30 },
  { id: 'Submitting Lab', label: 'Submitting Lab', minWidth: 140 },
  { id: 'url', label: 'Url', minWidth: 30 },
  { id: 'Collection Data', label: 'Collection Data', minWidth: 30 },
  { id: 'Author', label: 'Author', minWidth: 50 }
  // { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
  // {
  //   id: 'population',
  //   label: 'Population',
  //   minWidth: 170,
  //   align: 'right',
  //   format: (value) => value.toLocaleString()
  // },
  // {
  //   id: 'size',
  //   label: 'Size\u00a0(km\u00b2)',
  //   minWidth: 170,
  //   align: 'right',
  //   format: (value) => value.toLocaleString()
  // },
  // {
  //   id: 'density',
  //   label: 'Density',
  //   minWidth: 170,
  //   align: 'right',
  //   format: (value) => value.toFixed(2)
  // }
];

const styles = (theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1)
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark
      },
  title: {
    flex: '1 1 100%'
  }
});

@connect((state) => {
  return {
    // csvData: state.localDataset.csvData,
    data: state.localDataHandsontable.data,
    localDataHandsontable: state.localDataHandsontable,
    page: state.localDataHandsontable.page,
    rowsPerPage: state.localDataHandsontable.rowsPerPage,
    dense: state.localDataHandsontable.dense,
    order: state.localDataHandsontable.order,
    orderBy: state.localDataHandsontable.orderBy
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
    classes: PropTypes.object.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired
  };

  descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => this.descendingComparator(a, b, orderBy)
      : (a, b) => -this.descendingComparator(a, b, orderBy);
  }

  stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
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

  handleRequestSort = (event, property) => {
    const isAsc = this.props.orderBy === property && this.props.order === 'asc';
    this.props.dispatch({
      type: CHANGE_TABLE_ORDER,
      order: isAsc ? 'desc' : 'asc'
    });
    this.props.dispatch({
      type: CHANGE_TABLE_ORDERBY,
      orderBy: property
    });
  };

  handleChangeDense = (event) => {
    console.log("Trigger!!");
    this.props.dispatch({
      type: CHANGE_TABLE_DENSE,
      dense: event.target.checked
    });
  };

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
    const { classes, order, orderBy} = this.props;
    const emptyRows = this.props.rowsPerPage - Math.min(this.props.rowsPerPage, this.props.data.length - this.props.page * this.props.rowsPerPage);
    const createSortHandler = (property) => (event) => {
      this.handleRequestSort(event, property);
    };
    return (
      <div className={classes.root}>
        {this.props.data.length !== 0 &&
        <Paper className={classes.paper} >
          <TableContainer className={classes.container} >
            {/* <Table stickyHeader aria-label="sticky table"> */}
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size={this.props.dense ? 'small' : 'medium'}
              aria-label="enhanced table"
            >
              <TableHead>
                {this.props.data.length !== 0 && columns.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    align={headCell.numeric ? 'right' : 'left'}
                    padding={headCell.disablePadding ? 'none' : 'default'}
                    sortDirection={orderBy === headCell.id ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : 'asc'}
                      onClick={createSortHandler(headCell.id)}
                    >
                      <h2>{headCell.label}</h2>
                      {orderBy === headCell.id ? (
                        <span className={classes.visuallyHidden}>
                          {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                        </span>
                      ) : null}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableHead>
              {/* <TableBody>
                {this.props.data.slice(this.props.page * this.props.rowsPerPage, this.props.page * this.props.rowsPerPage + this.props.rowsPerPage).map((row) => {
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
              </TableBody> */}
              <TableBody>
                {this.stableSort(this.props.data, this.getComparator(order, orderBy))
                  .slice(this.props.page * this.props.rowsPerPage, this.props.page * this.props.rowsPerPage + this.props.rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow
                        hover
                        tabIndex={-1}
                        key={row.name}
                      >
                        {/* <TableCell component="th" id={labelId} scope="row" padding="none">
                          {row.name}
                        </TableCell> */}
                        <TableCell align="right">{row['Strain']}</TableCell>
                        <TableCell align="right">{row['Age']}</TableCell>
                        <TableCell align="right">{row['Clade']}</TableCell>
                        <TableCell align="right">{row['Country']}</TableCell>
                        <TableCell align="right">{row['Admin Division']}</TableCell>
                        <TableCell align="right">{row['genbank_accession']}</TableCell>
                        <TableCell align="right">{row['gisaid_epi_isl']}</TableCell>
                        <TableCell align="right">{row['Host']}</TableCell>
                        <TableCell align="right">{row['Location']}</TableCell>
                        <TableCell align="right">{row['Originating Lab']}</TableCell>
                        <TableCell align="right">{row['Submission Date']}</TableCell>
                        <TableCell align="right">{row['Region']}</TableCell>
                        <TableCell align="right">{row['Sex']}</TableCell>
                        <TableCell align="right">{row['Submitting Lab']}</TableCell>
                        <TableCell align="right">{row['Url']}</TableCell>
                        <TableCell align="right">{row['Collection Data']}</TableCell>
                        <TableCell align="right">{row['Author']}</TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: (this.props.dense ? 33 : 53) * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 100]}
            component="div"
            count={this.props.data.length}
            rowsPerPage={this.props.rowsPerPage}
            page={this.props.page}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </Paper>
        }
        {this.props.data.length !== 0 &&
          <FormControlLabel
            control={<Switch checked={this.props.dense} onChange={this.handleChangeDense} />}
            label="Dense padding"
          />
        }
      </div>
    );
  }
}

export default withStyles(styles)(localDataset);
