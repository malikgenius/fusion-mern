import axios from 'axios';
import {
  GET_ALL_BOXES,
  GET_ALL_RECORDS,
  PROFILE_LOADING,
  CLEAR_ALL_RECORDS
} from './types';
import setAuthToken from '../utils/setAuthToken';

// profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Get All Profiles
export const getTotalCount = page => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/stock/total`)
    .then(res => {
      //   console.log(res.data[0].total_records);
      dispatch({
        type: GET_ALL_RECORDS,
        payload: res.data[0].total_records
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ALL_RECORDS,
        payload: null
      })
    );
};

// Get All Profiles
export const getBoxesCount = page => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/stock/boxes`)
    .then(res => {
      // console.log(res.data);
      dispatch({
        type: GET_ALL_BOXES,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ALL_BOXES,
        payload: null
      })
    );
};

export const clearAllRecords = () => {
  return {
    type: CLEAR_ALL_RECORDS
  };
};
