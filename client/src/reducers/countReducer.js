import {
  GET_ALL_BOXES,
  GET_ALL_RECORDS,
  PROFILE_LOADING,
  CLEAR_ALL_RECORDS
} from '../actions/types';
const initialState = {
  total_records: null,
  boxes: null,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_ALL_RECORDS:
      return {
        ...state,
        total_records: action.payload,
        loading: false
      };
    case GET_ALL_BOXES:
      return {
        ...state,
        records: action.payload,
        loading: false
      };

    case CLEAR_ALL_RECORDS:
      return {
        ...state,
        total_records: null,
        boxes: null
      };

    default:
      return state;
  }
};
