import React, { Component } from 'react';
import { connect } from 'react-redux';
// Search bar imports
import SpinnerLottie from '../Common/spinnerLottie';
import {
  getDeletedStocks,
  getSearchedProfiles
} from '../../actions/profileAction';
import StockItem from './StockItem';
import Pagination from 'react-js-pagination';
// facebook loader
import { List } from 'react-content-loader';
//Below one is  More famous than react-js-pagination
import ReactPaginate from 'react-paginate';
import SearchBar from '../Common/SearchBar';
import Spinner from '../Common/spinnerLottie';

class DeletedStocks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      activePage: 1,
      pages: '',
      total: '',
      limit: '',
      page: 1
    };
  }
  componentDidMount = () => {
    this.setState({ loading: true });
    this.setState({ page: this.props.profile.page });
    this.props.getDeletedStocks(this.props.profile.page);
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
    if (nextProps.profile.deleted_stocks) {
      this.setState({ loading: false });
    }
  };

  toggleDropDown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  handlePageChange = pageToLoad => {
    // console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageToLoad });
    this.props.getDeletedStocks(pageToLoad);
    // if (pageNumber !== this.state.pages) {
    //   this.setState({ hasMore: true });
    // }
  };

  onSearched = (search, option) => {
    // console.log(formData);
    this.props.getSearchedProfiles(this.state.activePage, search, option);
  };

  render() {
    const { deleted_stocks } = this.props.profile;
    const { loading } = this.state.loading;
    // let profileItems;

    // if (profiles === null || loading) {
    //   profileItems = <SpinnerLottie />;
    // } else {
    //   if (profiles.length <= 0) {
    //     profileItems = <h4>No Profiles Found .. </h4>;
    //     // profileItems = profiles.map(profile => (
    //     // <ProfileItem profiles={profiles} />;
    //     // ));
    //   } else {
    //     <StockItem profiles={profiles} />;
    //   }
    // }

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Stock Records</h1>
              <p className="lead text-center">Search to get required records</p>
              {/* Searchbar to search the stocks ..  */}

              {/* <SearchBar onSearched={this.onSearched} /> */}
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
              {/* in reducer deleted_stocks should be null at initial stage */}
              {deleted_stocks === null ? (
                <List />
              ) : (
                <StockItem stocks={deleted_stocks} />
              )}
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
  { getDeletedStocks, getSearchedProfiles }
)(DeletedStocks);
