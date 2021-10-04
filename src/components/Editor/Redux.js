import axios from '../../config';
const ACTION = 'SEND_TAG';
// debugger;
export function fetchSendTag(word) {

  const request = axios.post(`/tags/add`, {data: {'text': word}});
  // debugger;
  return(dispatch => {
    request.then(data => {
      dispatch({type: ACTION, item: data.data})
    }).catch(error => console.log(error.response.data));
  });
}

// export const actions = {
//   fetchServicesGroups,
// };
const ACTION_HANDLERS = {
  [ACTION]: (state, action) => {
    return Object.assign({}, state, {item: action.item })
  }
};

const initialState = {
  item: {},
};

export default function sendTagReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}