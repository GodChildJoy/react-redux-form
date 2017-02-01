import initialState from './initialState';

// action come from author Action
export default function authorReducer (state = initialState.authors, action) {
  switch (action.type) {
    case "CREATE_AUTHOR_SUCCESS":
      return [
        ...state,
        Object.assign({}, action.author)
      ];
    case "UPDATE_AUTHOR_SUCCESS":
      // author come from action, action include type and author object
      return [
        ...state.filter(author => action.author.id !== author.id),
        Object.assign({}, action.author)
      ];
    case "LOAD_AUTHORS_SUCCESS":
      return action.authors;
    default:
      return state;
  }
}
