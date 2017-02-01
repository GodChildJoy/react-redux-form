import * as types from './actionTypes';
import courseApi from '../api/mockCourseApi';
import {beginAjaxCall,ajaxCallError} from './ajaxStatusActions';

export function createCourseSuccess (course) {
  return {type: types.CREATE_COURSE_SUCCESS, course};
}

export function updateCourseSuccess (course) {
    return {type: types.UPDATE_COURSE_SUCCESS, course};
}

export function loadCouresSuccess (courses) {
  return {type: types.LOAD_COURSES_SUCCESS, courses};
}

export function deleteCourseSuccess (id) {
  return { type: types.DELETE_COURSE_SUCCESS, id };
}

// first thunk
export function loadCourses(courses) {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return courseApi.getAllCourses().then(courses =>{
      dispatch(loadCouresSuccess(courses));
    }).catch(error => { throw(error); });
  };
}

// save course thunk
export function saveCourse(course) {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return courseApi.saveCourse(course).then(courseSaved =>{
      course.id ? dispatch(updateCourseSuccess(courseSaved)): dispatch(createCourseSuccess(courseSaved));
    }).catch(error => {
      dispatch(ajaxCallError());
      throw(error);
    });
  };
}

export function deleteCourse(courseId) {
  return (dispatch) => {
    return courseApi.deleteCourse(courseId).then(() => {
      dispatch(deleteCourseSuccess(courseId));
    }).catch(error => {
      throw(error);
    });
  };
}
