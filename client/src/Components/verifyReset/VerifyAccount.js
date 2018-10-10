import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { verificationEmail } from '../../actions/authAction';

class VerifyAccount extends Component {
  componentDidMount = () => {
    // console.log(this.props.history);
    this.props.verificationEmail(this.props.history);
  };
  //   componentWillReceiveProps = nextProps => {
  //     if (nextProps.success) {
  //       this.setState({ success: nextProps.success.success });
  //     }
  //     if (nextProps.errors) {
  //       this.setState({ errors: nextProps.errors.error });
  //     }
  //   };

  render() {
    return <div />;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth,
    errors: state.errors,
    success: state.success.success
  };
};

export default connect(
  mapStateToProps,
  { verificationEmail }
)(withRouter(VerifyAccount));
