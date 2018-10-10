import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { changePassword } from '../../actions/authAction';

class ChangePassword extends Component {
  state = {
    password: '',
    password2: '',
    errors: '',
    success: ''
  };

  componentDidMount = () => {
    if (this.props.errors) {
      this.setState({ errors: this.props.errors.error });
    }
    if (this.props.success) {
      this.setState({ success: this.props.success.success });
    }
  };
  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      // console.log(nextProps.errors);
      this.setState({ errors: nextProps.errors.error });
    }
    if (this.props.success) {
      this.setState({ success: this.props.success.success });
    }
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onFocus = () => {
    this.setState({
      errors: ''
    });
  };
  onSubmit = e => {
    e.preventDefault();
    if (this.state.password !== this.state.password2) {
      return this.setState({ errors: 'passwords do not match' });
    }
    const Password = {
      password: this.state.password,
      password2: this.state.password2
    };

    // we can take our history to Action through this way, its different than Andrew Mead React way.
    this.props.changePassword(Password, this.props.history);
  };

  render() {
    const { errors, success } = this.state;
    return (
      <div className="py-5 container">
        <div> {success ? <Alert color="success">{success}</Alert> : ''}</div>
        <div className="row">
          <div className="col-md-4 col-lg-2" />
          <div className="col-md-4 col-lg-8  text-center">
            <div className="card pt-5 border-0">
              <div className="card-body">
                <Alert color="light " className="lead">
                  Change your password{' '}
                </Alert>

                <form className="card-form" onSubmit={this.onSubmit}>
                  <div className="form-group text-light">
                    <input
                      name="password"
                      type="password"
                      className="form-control form-control-lg mb-2 bg-light text-dark"
                      placeholder="new password "
                      value={this.state.password}
                      onChange={this.onChange}
                      onFocus={this.onFocus}
                    />
                    <input
                      name="password2"
                      type="password"
                      className="form-control form-control-lg mb-2 bg-light text-dark"
                      placeholder="confirm password "
                      value={this.state.password2}
                      onChange={this.onChange}
                      onFocus={this.onFocus}
                    />
                    <button
                      type="submit"
                      className="btn btn-secondary btn-block text-white border-light "
                    >
                      {' '}
                      Send{' '}
                    </button>
                    {errors ? (
                      <div className="text-center  text-danger text-sm">
                        {/* <strong>{errors}</strong> */}
                        {errors}
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth,
    errors: state.errors,
    success: state.success
  };
};

export default connect(
  mapStateToProps,
  { changePassword }
)(withRouter(ChangePassword));
