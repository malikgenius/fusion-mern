import React, { Component } from 'react';
import { connect } from 'react-redux';
// import './SearchStock.css';
import {
  Button,
  InputGroup,
  InputGroupButtonDropdown,
  Input,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
// Search bar imports
import SpinnerLottie from '../Common/spinnerLottie';
import {
  getProfiles,
  getSearchedProfiles,
  getIntStocks,
  clearAllProfiles
} from '../../actions/profileAction';
// import StockItem from './StockItem';
import StockItem from '../Profiles/StockItem';
import Pagination from 'react-js-pagination';
//Below one is  More famous than react-js-pagination
import ReactPaginate from 'react-paginate';

class SearchStocks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      splitButtonOpen: false,
      search: '',
      option: 'bay',
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
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  // sending data to Stocks like search and option.
  onSearchClicked = () => {
    const search = this.state.search;
    const option = this.state.option;
    // if search for _id and box which are ObjectID and Int we need to change route as regex doesnt like int and it will only search through string.
    // getIntStocks will take us to /api/stock/int where we are not using regex but normal search..
    if (this.state.option === 'box') {
      console.log(`Going to getIntStocks ${this.state.option}`);
      this.props.getIntStocks(this.state.activePage, search, option);
    } else if (this.state.option === '_id') {
      this.props.getIntStocks(this.state.activePage, search, option);
    } else {
      console.log('not going to check if statements');
      this.props.getSearchedProfiles(this.state.activePage, search, option);
    }
    // this.props.getSearchedProfiles(this.state.activePage, search, option);
  };

  handlePageChange = pageToLoad => {
    const search = this.state.search;
    const option = this.state.option;
    this.setState({ activePage: pageToLoad });
    this.props.getSearchedProfiles(pageToLoad, search, option);
    // if (pageNumber !== this.state.pages) {
    //   this.setState({ hasMore: true });
    // }
  };

  render() {
    const { profiles, loading } = this.props.profile;

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Stock Records</h1>
              <p className="lead text-center">Search to get required records</p>

              {/* Searchbar to search the stocks ..  */}
              <div style={{ marginTop: 50, marginBottom: 50 }}>
                <InputGroup>
                  <InputGroupButtonDropdown
                    addonType="append"
                    isOpen={this.state.dropdownOpen}
                    toggle={this.toggleDropDown}
                  >
                    <Button
                      className="btn btn-outline-info btn-lg"
                      onClick={this.onSearchClicked}
                    >
                      {this.state.option}
                    </Button>
                    <DropdownToggle split outline caret />
                    <DropdownMenu>
                      <DropdownItem
                        value="_id"
                        name="option"
                        onClick={this.onChange}
                        // onClick={this.props.sortByChange}
                      >
                        ID
                      </DropdownItem>
                      {/* <DropdownItem value="department" onClick={this.props.sortByChange}>Department</DropdownItem> */}
                      <DropdownItem
                        value="bay"
                        name="option"
                        onClick={this.onChange}
                        // onClick={this.props.searchchange}
                      >
                        BAY
                      </DropdownItem>
                      <DropdownItem
                        value="box"
                        name="option"
                        onClick={this.onChange}
                        // onClick={this.props.searchchange}
                      >
                        BOX
                      </DropdownItem>
                      <DropdownItem
                        value="row"
                        name="option"
                        onClick={this.onChange}
                        // onClick={this.props.searchchange}
                      >
                        ROW
                      </DropdownItem>
                      <DropdownItem
                        value="column"
                        name="option"
                        onClick={this.onChange}
                        // onClick={this.props.searchchange}
                      >
                        COLUMN
                      </DropdownItem>
                    </DropdownMenu>
                  </InputGroupButtonDropdown>
                  {/* <input
                    type="text"
                    name="search"
                    className="p-4 border-0"
                    placeholder={
                      <i className="fab fa-searchengin text-info fa-lg" />
                    }
                    onChange={this.onChange}
                    value={this.state.search}
                  /> */}
                  <Input
                    name="search"
                    className="p-4"
                    placeholder="search stock"
                    onChange={this.onChange}
                    value={this.state.search}
                  />
                  <div className="input-group-prepend">
                    <span
                      className="input-group-text btn"
                      onClick={this.onSearchClicked}
                    >
                      <i className="fab fa-searchengin text-info fa-lg" />
                    </span>
                  </div>
                </InputGroup>
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
  { getProfiles, getSearchedProfiles, getIntStocks, clearAllProfiles }
)(SearchStocks);
