import initialState from './initialState';
import * as types from '../actions/actionTypes';


function actionEndInSuccess (type) {
  if (type.substring(type.length-8) == "_SUCCESS")
  return true;
}
export default function ajaxStatusReducer (state=initialState.ajaxCallsInProgress, action) {
  if (action.type == types.BEGIN_AJAX_CALL) {
    return state + 1;
  }
  else if (action.type == types.AJAX_CALL_ERROR || 
           actionEndInSuccess(action.type)) {
    return state - 1;
  }
  return state;
}
