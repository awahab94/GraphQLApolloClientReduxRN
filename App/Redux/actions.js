import {SET_SEARCHED_ARTWORKS, SET_SEARCHED_QUERY} from './action-types';

const setSearchredArtWorks = artworks => ({
  type: SET_SEARCHED_ARTWORKS,
  artworks,
});
const setSearchredQuery = query => ({type: SET_SEARCHED_QUERY, query});

export {setSearchredArtWorks, setSearchredQuery};
