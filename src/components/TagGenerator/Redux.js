import axios from '../../config';
const ACTION = 'SHOW_TAGS';
export function fetchTags() {
  const request = axios.get(`/tags`);
  return(dispatch => {
    request.then(data => {
      dispatch({type: ACTION, items: data.data.tags})
    }).catch(error => console.log(error));
  });
}

const ACTION_HANDLERS = {
  [ACTION]: (state, action) => {
    return Object.assign({}, state, {items: action.items })
  }
};

const initialState = {
  items: []
};

export default function tagsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}