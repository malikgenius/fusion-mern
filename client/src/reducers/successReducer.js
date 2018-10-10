import {
  GET_SUCCESS,
  EMAIL_VERIFIED_PASSWORD_RESET,
  GET_SUCCESS_RESET,
  CONTECT_MODAL_CLOSE
} from '../actions/types';

const initialState = { modal: false, success: '' };

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SUCCESS:
      return {
        ...state,
        success: action.payload
        // modal: true
      };
    case EMAIL_VERIFIED_PASSWORD_RESET:
      return {
        ...state,
        modal: true
      };
    case GET_SUCCESS_RESET:
      return {
        ...state,
        success: '',
        modal: false
      };
    // Contact Us email modal, if email sent below reducer will close the modal &
    // update the success store with message from backend !
    // contact modal close after successful email sent and success will get message as well
    case CONTECT_MODAL_CLOSE:
      return {
        ...state,
        success: action.payload,
        modal: false
      };
    default: {
      return state;
    }
  }
};
