import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import {} from '../../actions/countAction';

import SpinnerLottie from '../Common/spinnerLottie';

class Login extends Component {
  //   componentDidMount = () => {
  //     this.props.();
  //   };
  render() {
    return (
      <div className="container ">
        <div className="row">
          <div className="col col-md-6 m-auto">
            <div className="display-1  p-0 text-center mt-4">
              {' '}
              Authentication Goes Here..{' '}
            </div>
            <p className="lead-md small-sm text-info text-center">
              in production only authenticated users will pass this page, click
              on button below to access Dashboard.
            </p>{' '}
            <Link to="/dashboard" className=" btn btn-outline-info text-center">
              Dashboard
            </Link>
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
  {}
)(withRouter(Login));
