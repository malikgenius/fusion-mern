import React, { Component } from 'react';
import { connect } from 'react-redux';
import SpinnerLottie from '../Common/spinnerLottie';
import { getProfiles } from '../../actions/profileAction';
import ProfileItem from './ProfileItem';
import Pagination from 'react-js-pagination';
// infinite scroll -- lets see if its better than pagination.
// import InfiniteScroll from 'react-infinite-scroll-component';
import InfiniteScroll from 'react-infinite-scroller';

class Profiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      pages: '',
      total: '',
      limit: '',
      hasMore: true
    };
  }
  componentDidMount = () => {
    this.props.getProfiles();
  };
  componentWillReceiveProps = nextProps => {
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

  handlePageChange = pageNumber => {
    // console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
    this.props.getProfiles(pageNumber);
  };

  fetchMoreData = () => {};
  // infinite scroll pulldown function
  refresh = () => {
    this.props.getProfiles();
  };

  render() {
    const { profiles, loading } = this.props.profile;
    let profileItems;

    if (profiles === null || loading) {
      profileItems = <SpinnerLottie />;
    } else {
      if (profiles.length > 0) {
        profileItems = profiles.map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ));
      } else {
        profileItems = <h4>No Profiles Found .. </h4>;
      }
    }
    return (
      <div className="profiles">
        <div className="container d-none d-md-block">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Developer Profiles</h1>
              <p className="lead text-center">
                Browse and connect with developers
              </p>
              {profileItems}
            </div>
          </div>
        </div>

        {/* This will be shown only on middle and big screens ... not on mobile */}
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
                  pageRangeDisplayed={this.state.pages}
                  onChange={this.handlePageChange}
                />
                <div className="alert text-info align-middle">
                  Total records found {this.state.total}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Infite Scroll starts here it will be only on Mobile Phones ..  */}
        <div className="container d-md-none">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Developer Profiles</h1>
              <p className="lead text-center">
                Browse and connect with developers
              </p>
            </div>
          </div>

          <div>
            <InfiniteScroll
              dataLength={profileItems.length} //This is important field to render the next data
              next={this.fetchMoreData}
              hasMore={true}
              loader={<h4>Loading...</h4>}
              endMessage={
                <p style={{ textAlign: 'center' }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
              // below props only if you need pull down functionality
              refreshFunction={this.refresh}
              pullDownToRefresh
              pullDownToRefreshContent={
                <h3 style={{ textAlign: 'center' }}>
                  &#8595; Pull down to refresh
                </h3>
              }
              releaseToRefreshContent={
                <h3 style={{ textAlign: 'center' }}>
                  &#8593; Release to refresh
                </h3>
              }
            >
              {profileItems}
            </InfiniteScroll>
          </div>
        </div>
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
  { getProfiles }
)(Profiles);
