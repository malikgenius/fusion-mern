import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loginSocialUser } from '../../actions/authAction';
import clientId from '../../config/Keys';
import axios from 'axios';
import { Alert } from 'reactstrap';
// or
// import { GoogleLogin } from 'react-google-login';
class GoogleOauth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: ''
    };
  }

  componentDidMount = props => {
    if (this.props.auth.isAuthenticated) {
      return this.props.history.push('/dashboard');
    } else {
      console.log('');
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
    const responseGoogle = response => {
      // return console.log(response);
      //
      if (response.Zi.access_token) {
        const access_token = response.Zi.access_token;
        console.log(access_token);
        // this.props.loginUser(access_token, this.props.history);
        axios.post('/api/users/google', { access_token }).then(res => {
          const token = res.data;
          this.props.loginSocialUser(token, this.props.history);
        });
      } else {
        console.log('Error: Axios couldnt get anything from Google');
      }
    };

    return (
      <div className=" mt-5 ">
        <Alert color="info">
          Please allow popups for this site and refresh the page if you dont see
          Google Login page.
        </Alert>
        <div className="container invisible">
          <div className="alert alert-light" role="alert">
            Popup will take you to Google Login page, if you dont see any popup
            please Click on link below.
          </div>
          <GoogleLogin
            clientId={clientId.googleClientID2}
            // buttonText="Login with Google"
            // name="google"
            autoLoad={true}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
          >
            {/* <FontAwesome name="google" />
        <span> Login with Google</span> */}
          </GoogleLogin>
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

// export default GoogleOauth;
export default connect(
  mapStateToProps,
  { loginSocialUser }
)(withRouter(GoogleOauth));
