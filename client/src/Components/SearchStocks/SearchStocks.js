import React, { Component } from 'react';
import { connect } from 'react-redux';
// Material UI imports
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
// Search bar imports
import SpinnerLottie from '../Common/spinnerLottie';
import {
  getProfiles,
  getSearchedProfiles,
  getIntStocks,
  getFreeSearch,
  clearAllProfiles
} from '../../actions/profileAction';
// import StockItem from './StockItem';
import StockItem from '../Profiles/StockItem';
import Pagination from 'react-js-pagination';

// react-input-range goes here ..
const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  searchField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 700
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
});

const options = [
  {
    value: null,
    label: 'All'
  },
  {
    value: 'bay',
    label: 'Bay'
  },
  {
    value: 'box',
    label: 'Box'
  },
  {
    value: 'row',
    label: 'Row'
  },
  {
    value: 'column',
    label: 'Column'
  },
  {
    value: 'depth.min',
    label: 'Min-Depth'
  },
  {
    value: 'depth.max',
    label: 'Max-Depth'
  },
  {
    value: 'well',
    label: 'Well'
  },
  {
    value: 'side',
    label: 'Side'
  },
  {
    value: 'sample',
    label: 'Sample'
  },
  {
    value: 'status',
    label: 'Status'
  }
];

class SearchStocks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      splitButtonOpen: false,
      search: '',
      option: 'option',
      activePage: 1,
      pages: '',
      total: '',
      limit: '',
      page: 1
    };
  }
  componentDidMount = () => {
    // this.setState({ page: this.props.profile.page });
    this.props.clearAllProfiles(this.props.profile.page);
    if (this.props.location.search) {
      this.setState({
        option: this.props.location.hash
      });
    }
  };
  componentWillReceiveProps = nextProps => {
    // this will define which page user was on the last time.
    if (nextProps.profile.page) {
      this.setState({ page: nextProps.profile.page });
    }
    if (nextProps.profile.pages) {
      this.setState({ pages: nextProps.profile.pages });
    }
    if (nextProps.profile.total) {
      this.setState({ total: nextProps.profile.total });
    }
    if (nextProps.profile.limit) {
      this.setState({ limit: nextProps.profile.limit });
    }
  };

  toggleDropDown = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  // search onChange options..
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  //Would like to trigger this once 'Enter' key is pressed while focused inside `<input/>`
  enterPressed = event => {
    const code = event.keyCode || event.which;
    const search = this.state.search;
    const option = this.state.option;
    if (code === 13) {
      this.props.clearAllProfiles();
      //13 is the enter keycode
      if (this.state.option === 'option') {
        this.props.getFreeSearch(this.state.activePage, search);
      } else if (this.state.option === 'box') {
        this.props.getIntStocks(this.state.activePage, search, option);
      } else if (this.state.option === 'depth.min') {
        this.props.getIntStocks(this.state.activePage, search, option);
      } else if (this.state.option === 'depth.max') {
        this.props.getIntStocks(this.state.activePage, search, option);
      } else if (this.state.option === '_id') {
        this.props.getIntStocks(this.state.activePage, search, option);
      } else {
        this.props.getSearchedProfiles(this.state.activePage, search, option);
      }
    }
  };
  // sending data to Stocks like search and option.
  onSearchClicked = () => {
    const search = this.state.search;
    const option = this.state.option;
    this.props.clearAllProfiles();
    // if search for _id and box which are ObjectID and Int we need to change route as regex doesnt like int and it will only search through string.
    // getIntStocks will take us to /api/stock/int where we are not using regex but normal search..
    if (this.state.option === 'option') {
      this.props.getFreeSearch(this.state.activePage, search);
    } else if (this.state.option === 'box') {
      this.props.getIntStocks(this.state.activePage, search, option);
    } else if (this.state.option === 'depth.min') {
      this.props.getIntStocks(this.state.activePage, search, option);
    } else if (this.state.option === 'depth.max') {
      this.props.getIntStocks(this.state.activePage, search, option);
    } else if (this.state.option === '_id') {
      this.props.getIntStocks(this.state.activePage, search, option);
    } else {
      this.props.getSearchedProfiles(this.state.activePage, search, option);
    }
    // this.props.getSearchedProfiles(this.state.activePage, search, option);
  };

  handlePageChange = pageToLoad => {
    const search = this.state.search;
    const option = this.state.option;
    this.setState({ activePage: pageToLoad });
    if (this.state.option === 'option') {
      this.props.getFreeSearch(this.state.activePage, search);
    } else if (this.state.option === 'box') {
      this.props.getIntStocks(this.state.activePage, search, option);
    } else if (this.state.option === 'depth.min') {
      this.props.getIntStocks(this.state.activePage, search, option);
    } else if (this.state.option === 'depth.max') {
      this.props.getIntStocks(this.state.activePage, search, option);
    } else if (this.state.option === '_id') {
      this.props.getIntStocks(this.state.activePage, search, option);
    } else {
      this.props.getSearchedProfiles(this.state.activePage, search, option);
    }
    // this.props.getSearchedProfiles(pageToLoad, search, option);
    // if (pageNumber !== this.state.pages) {
    //   this.setState({ hasMore: true });
    // }
  };

  render() {
    const { profiles, loading } = this.props.profile;
    const { classes } = this.props;

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Stock Records</h1>
              <p className="lead text-center">Search to get required records</p>

              {/* Searchbar to search the stocks ..  */}
              <div className="text-center">
                <div style={{ marginTop: 50, marginBottom: 50 }}>
                  <TextField
                    id="standard-select-Side"
                    name="option"
                    select
                    label="Option"
                    className={classes.textField}
                    value={this.state.option}
                    onChange={this.handleChange}
                    SelectProps={{
                      MenuProps: {
                        className: classes.menu
                      }
                    }}
                    helperText="select search option"
                    margin="normal"
                  >
                    {options.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    name="search"
                    label="Search"
                    className={classes.searchField}
                    onChange={this.handleChange}
                    onKeyPress={this.enterPressed}
                    value={this.state.search}
                    margin="normal"
                    //   width="500"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <i
                            className="fas fa-search"
                            style={{ cursor: 'pointer' }}
                            onClick={this.onSearchClicked}
                          />
                        </InputAdornment>
                      )
                    }}
                  />
                </div>
              </div>

              {/* This will be shown only on Mobile and small screens ... not on Desktop */}
              <div className="container d-md-none">
                <div className="row">
                  <div className="col-md-12">
                    {this.state.total ? (
                      <div className="alert text-muted align-middle  text-center">
                        Total records found{' '}
                        <span className="badge badge-pill badge-info h4">
                          {this.state.total}{' '}
                        </span>
                      </div>
                    ) : (
                      <div className="alert text-muted align-middle  text-center">
                        <span className="badge badge-pill badge-danger h4">
                          0
                        </span>{' '}
                        records found{' '}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* if no stock found we should not load StockItem as its maping through profiles, will generate error  */}
              {profiles !== null ? <StockItem profiles={profiles} /> : ''}
            </div>
          </div>
        </div>

        {/* This will be shown only on middle and big screens ... not on mobile */}
        {this.state.pages === 1 ? (
          <div className="container d-none d-md-block">
            <div className="row">
              <div className="col-4 m-auto">
                {this.state.total ? (
                  <div className="alert text-muted align-middle  text-center">
                    Total records found{' '}
                    <span className="badge badge-pill badge-info h4">
                      {this.state.total}{' '}
                    </span>
                  </div>
                ) : (
                  <div className="alert text-muted align-middle  text-center">
                    <span className="badge badge-pill badge-danger h4">0</span>{' '}
                    records found{' '}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="container d-none d-md-block">
            <div className="row">
              <div className="col-4 m-auto">
                <div>
                  <Pagination
                    className="pagination align-items-center d-sm-flex"
                    hideDisabled
                    prevPageText="prev"
                    nextPageText="next"
                    firstPageText="first"
                    lastPageText="last"
                    activePage={this.state.activePage}
                    itemsCountPerPage={this.state.limit}
                    totalItemsCount={this.state.total}
                    pageRangeDisplayed="5"
                    onChange={this.handlePageChange}
                  />

                  {this.state.total ? (
                    <div className="alert text-muted align-middle  text-center">
                      Total records found{' '}
                      <span className="badge badge-pill badge-info h4">
                        {this.state.total}{' '}
                      </span>
                      <p className="text-muted">
                        you are on page{' '}
                        <span className="badge badge-pill badge-info h4">
                          {this.state.activePage}{' '}
                        </span>
                      </p>
                    </div>
                  ) : (
                    <div className="alert text-muted align-middle  text-center">
                      <span className="badge badge-pill badge-danger h4">
                        0
                      </span>{' '}
                      records found{' '}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {this.state.pages === 1 ? (
          ''
        ) : (
          <div className="container d-md-none">
            <div className="row">
              <div className="col-4 mr-auto">
                <div>
                  <Pagination
                    // we dont want to see prev next page options on mobile.
                    className="pagination align-items-center d-sm-flex"
                    hideDisabled
                    // prevPageText="prev"
                    // nextPageText="next"
                    // firstPageText="first"
                    // lastPageText="last"
                    activePage={this.state.activePage}
                    itemsCountPerPage={this.state.limit}
                    totalItemsCount={this.state.total}
                    pageRangeDisplayed={this.state.pages}
                    onChange={this.handlePageChange}
                  />
                  {/* <div className="alert text-info align-middle">
                  Total records found {this.state.total}
                </div> */}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    profile: state.profile
  };
};
export default connect(
  mapStateToProps,
  {
    getProfiles,
    getSearchedProfiles,
    getFreeSearch,
    getIntStocks,
    clearAllProfiles
  }
)(withStyles(styles)(SearchStocks));
