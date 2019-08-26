import {SET_SEARCHED_ARTWORKS, SET_SEARCHED_QUERY} from './action-types';

let initial = {
  artworks: null,
  query: '',
};

const reducer = (state = initial, action) => {
  switch (action.type) {
    case SET_SEARCHED_ARTWORKS:
      return Object.assign([], state, {artworks: action.artworks});
    case SET_SEARCHED_QUERY:
      return Object.assign({}, state, {query: action.query});
    default:
      return state;
  }
};

export default reducer;
