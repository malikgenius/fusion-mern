import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../Cards/CardList';
import { withRouter, Link } from 'react-router-dom';

import { getTotalCount, getBoxesCount } from '../../actions/countAction';

import SpinnerLottie from '../Common/spinnerLottie';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
    this.props.getTotalCount();
    this.props.getBoxesCount();
  };
  render() {
    return (
      <div className="container ">
        <div className="row">
          <div className="col col-md-12 m-auto">
            <div className="display-4  p-0 text-center mt-4">
              {' '}
              Inventory System Dashboard
            </div>
            <div className="alert alert-light text-center h6">
              Total records found{' '}
              <span className="badge badge-secondary" style={{ width: '50%' }}>
                {this.props.count.total_records}
              </span>
            </div>{' '}
            <div>
              {this.props.count ? (
                <CardList boxes={this.props.count.records} />
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    count: state.count
  };
};
export default connect(
  mapStateToProps,
  { getTotalCount, getBoxesCount }
)(withRouter(Dashboard));
