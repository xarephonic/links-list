import { showToast } from '../../notifications/ducks/index.js';

const GET_LIST_PAGE = '@fatih/links-list/GET_LIST_PAGE';
const UPVOTE = '@fatih/links-list/UPVOTE';
const DOWNVOTE = '@fatih/links-list/DOWNVOTE';
const ADD_ITEM = '@fatih/links-list/ADD_ITEM';
const REMOVE_ITEM = '@fatih/links-list/REMOVE_ITEM';

const reducer = (state = {}, { type, payload }) => {
  switch (type) {
    case GET_LIST_PAGE:
      return state;
    case UPVOTE:
      return state;
    case DOWNVOTE:
      return state;
    case ADD_ITEM:
      const linksArr = state.linksArr ? [payload].concat(state.linksArr) : [payload];
      return {
        ...state,
        linksArr
      };
    case REMOVE_ITEM:
      return state;
    default:
      return state;
  }
}

export const upvote = (payload) => ({
  type: UPVOTE,
  payload
});

export const downvote = (payload) => ({
  type: DOWNVOTE,
  payload
});

export const getListPage = (payload) => ({
  type: GET_LIST_PAGE,
  payload
});

export const addItem = (payload) => {
  return (dispatch, getState) => {
    const linksArr = getState().linksList.linksArr;
    if(linksArr) {
      const existingLink = linksArr.find((item) => {
        return item.name === payload.name || item.url === payload.url;
      });

      if(existingLink) {
        dispatch(
          showToast({
            message: `The item you are trying to add already exists as ${existingLink.name} - ${existingLink.url}`,
            color: 'red'
          })
        );
        return;
      }
    }

    payload.points = 0;

    dispatch({
      type: ADD_ITEM,
      payload
    });
    dispatch(
      showToast({
        message: `${payload.name} added.`,
        color: 'green'
      })
    );
  }
};

export const removeItem = (payload) => ({
  type: REMOVE_ITEM,
  payload
});

export default reducer;
