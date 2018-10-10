import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  GET_SUCCESS,
  GET_LOGIN_ERRORS,
  EMAIL_VERIFIED_PASSWORD_RESET,
  GET_SUCCESS_RESET,
  GET_ERRORS_RESET,
  GET_LOGIN_ERROR_RESET
} from './types';

// can use Dispatch in same functions, other way is to use axios in one function and then dispatch to other one.
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(
      res => {
        dispatch({
          type: GET_SUCCESS,
          payload: res.data
        });
        dispatch({
          type: GET_ERRORS_RESET
        });
        history.push('/emailverified');
      }
      // if successful registration we send our users to verification page or login page via history withRouter props.
      // dispatch({
      //   type: GET_USER,
      //   payload: res.data
      // })
    )
    // if errors form backend linke status(400) or status(404) etc will directly go to GET_ERRORS, AXIOS knows how to handle it.
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// to show modal and verification done Message on login Modal, we need to dispatch to ModalOpen from verificationEmail
// otherwise its too fast to be in HeaderNavbar Modal state ... this will slow it down.
export const LoginModalOpen = () => ({
  type: EMAIL_VERIFIED_PASSWORD_RESET
});

// Verification Email Process ....
export const verificationEmail = history => dispatch => {
  console.log(history);
  axios
    .post(`/api/reset/${history.location.pathname}`)
    .then(res => {
      dispatch({
        type: GET_SUCCESS,
        payload: res.data
      });
      dispatch({
        type: GET_ERRORS_RESET
      });
      dispatch(LoginModalOpen());
      history.push('/emailverified');
    })

    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      history.push('/emailverified');
    });
};

// Reset Password Process ....
export const resetPassword = (Email, history) => dispatch => {
  axios
    .post('/api/reset/forgot', Email)
    .then(res => {
      dispatch({
        type: GET_SUCCESS,
        payload: res.data
      });
      dispatch({
        type: GET_ERRORS_RESET
      });
      history.push('/forgotpassword');
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      history.push('/forgotpassword');
    });
};

// Change Password Process ....
export const changePassword = (Password, history) => dispatch => {
  // return console.log(Password);
  axios
    // sending URL params along with post reqest to backend, if i didnt have history in react, couldnt get this.
    // should always use withRouter to get all these values from react router
    .post(`/api/reset/${history.location.pathname}`, Password)
    // .then(res => {console.log(res) });
    .then(res => {
      dispatch({
        type: GET_SUCCESS,
        payload: res.data
      });
      dispatch({
        type: GET_ERRORS_RESET
      });
      // dispatch(LoginModalOpen());
      history.push('/changepassword');
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      history.push('/changepassword');
    });
};

// GET_SUCCESS_RESET will reset modal to false and success message of confirm account verification will go away.
export const getSuccessReset = () => ({
  type: GET_SUCCESS_RESET
});

// GET_ERROR_RESET will reset all the errors in reducer ..
export const getErrorReset = () => ({
  type: GET_ERRORS_RESET
});

export const getLoginErrorReset = () => ({
  type: GET_LOGIN_ERROR_RESET
});

// SET_CURRENT_USER after Login Successful and decoded token is retrieved from loginUser action function.
export const setCurrentUser = decoded => ({
  type: SET_CURRENT_USER,
  payload: decoded
});
// Login Local user ..
export const loginUser = userData => dispatch => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
      const { token } = res.data;
      // save token to localstorage
      localStorage.setItem('jwtToken', token);
      // set it to Auth Header
      setAuthToken(token);
      // Decode Token with jwt-decode and add it to user object in redux store.
      const decoded = jwt_decode(token);
      // set current user
      dispatch(setCurrentUser(decoded));
      dispatch(getSuccessReset());
    })
    .catch(err => {
      dispatch({
        // Login Errors will show only on login Modal, if we dont do that errors will show on page as well where we load Modal.

        type: GET_LOGIN_ERRORS,
        payload: err.response.data
      });
    });
};
// GOOGLE USER LOGIN ..
export const loginSocialUser = token => dispatch => {
  //   return console.log(token);
  // save token to localstorage
  localStorage.setItem('jwtToken', token);
  // set it to Auth Header
  setAuthToken(token);
  // Decode Token with jwt-decode and add it to user object in redux store.
  const decoded = jwt_decode(token);
  // set current user
  dispatch(setCurrentUser(decoded));
};

export const logoutUser = history => dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  history.push('/');
};

export const loginGoogle = (accessToken, history) => dispatch => {
  axios
    .post('/api/users/google', accessToken)
    .then(
      res => console.log(res.data)
      //   dispatch({
      //     type: LOGIN_USER,
      //     payload: res.data
      //   })
    )
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
