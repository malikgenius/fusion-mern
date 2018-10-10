import axios from 'axios';

import {
  GET_ERRORS,
  GET_SUCCESS,
  GET_ERRORS_RESET,
  CONTECT_MODAL_CLOSE
} from './types';

// can use Dispatch in same functions, other way is to use axios in one function and then dispatch to other one.
export const contactEmail = (userData, history) => dispatch => {
  console.log(userData, history);
  axios
    .post('/api/reset/contact', userData)
    .then(res => {
      // dispatch({
      //   type: GET_SUCCESS,
      //   payload: res.data
      // });
      dispatch({
        type: GET_ERRORS_RESET
      });
      // below will add success message in store and close the modal as well.
      dispatch({
        type: CONTECT_MODAL_CLOSE,
        payload: res.data
      });
      history.push('/emailverified');
    })
    // if errors form backend linke status(400) or status(404) etc will directly go to GET_ERRORS, AXIOS knows how to handle it.
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      // history.push('/emailverified');
    });
};

// to close the modal and once contact email sent successfully we need to somehow
//close the modal and only show emailverified page.

export const contactEmailModalClose = () => ({
  type: CONTECT_MODAL_CLOSE
});

export const getErrorReset = () => ({
  type: GET_ERRORS_RESET
});
