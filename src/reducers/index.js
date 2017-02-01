import {combineReducers} from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';


const rootReducer = combineReducers({
  // the courseReducer slice of state about courses
  courses,
  authors,
  ajaxCallsInProgress
});

export default rootReducer;
