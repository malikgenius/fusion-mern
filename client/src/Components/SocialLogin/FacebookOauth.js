import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loginSocialUser } from '../../actions/authAction';
import clientId from '../../config/Keys';
import axios from 'axios';
import { Alert } from 'reactstrap';

class FacebookOauth extends Component {
  constructor() {
    super();
    this.state = {
      errors: ''
    };
  }

  componentDidMount = () => {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors.error });
    }
  };

  render() {
    const responseFacebook = response => {
      // console.log(JSON.stringify({ access_token: responseFacebook }));
      if (response.accessToken) {
        const access_token = response.accessToken;
        console.log(access_token);
        axios.post('/api/users/facebook', { access_token }).then(res => {
          const token = res.data;
          this.props.loginSocialUser(token, this.props.history);
        });
      } else {
        console.log('Error: Axios couldnt get anything from Facebook');
      }
    };

    return (
      <div className=" mt-5 ">
        <Alert color="info">
          Please allow popups for this site and refresh the page if you dont see
          Facebook Login page.
        </Alert>
        <div className="container invisible">
          <div className="alert alert-light" role="alert" size="large">
            <h4>
              Popup will take you to Facebook Login page, if you dont see any
              popup please Click on link below.
            </h4>
          </div>

          <FacebookLogin
            appId={clientId.facebookClientID}
            autoLoad={true}
            fields="name,email,picture"
            scope="public_profile, email"
            callback={responseFacebook}
          >
            {/* <i
              className="fa fa-facebook"
              style={{
                marginLeft: '5px'
              }}
            />
            <span>&nbsp;&nbsp;Sign In with Facebook</span> */}
          </FacebookLogin>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth,
    errors: state.errors
  };
};
export default connect(
  mapStateToProps,
  { loginSocialUser }
)(withRouter(FacebookOauth));
