import * as types from './actionTypes';
import authorApi from '../api/mockAuthorApi';


export function loadAuthorsSuccess (authors) {
  return {type: types.LOAD_AUTHORS_SUCCESS, authors};
}

// first thunk
export function loadAuthors(authors) {
  return (dispatch) => {
    return authorApi.getAllAuthors().then(authors =>{
      dispatch(loadAuthorsSuccess(authors));
    }).catch(error => { throw(error); });
  };
}

export function createAuthorSuccess(author) {
  return {type: types.CREATE_AUTHOR_SUCCESS, author};
}

export function updateAuthorSuccess(author) {
  return {type: types.UPDATE_AUTHOR_SUCCESS, author};
}
// save author thunk
export function saveAuthor(author) {
  return (dispatch) => {
    return authorApi.saveAuthor(author).then(author =>{
      author.id ? dispatch(updateAuthorSuccess(author)) :
      dispatch(createAuthorSuccess(author));
    }).catch(error => { throw(error); });
  };
}
