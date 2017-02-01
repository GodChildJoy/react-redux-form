import initialState from './initialState';

// action come from course Action
export default function courseReducer (state=initialState.courses, action) {
  switch (action.type) {

    case "CREATE_COURSE_SUCCESS":
      return [
        ...state,
        Object.assign({}, action.course)
      ];

    case "UPDATE_COURSE_SUCCESS":
      // course come from action, action include type and course object
      return [
        ...state.filter(course => action.course.id !== course.id),
        Object.assign({}, action.course)
      ];

    case "LOAD_COURSES_SUCCESS":
      return action.courses;

    case "DELETE_COURSE_SUCCESS":
      return [
        ...state.filter(course => action.id !== course.id)
      ];

    default:
      return state;
  }
}
