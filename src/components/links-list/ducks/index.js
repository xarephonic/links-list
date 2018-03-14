import { showToast } from '../../notifications/ducks/index.js';

const GET_LIST_PAGE = '@fatih/links-list/GET_LIST_PAGE';
const UPVOTE = '@fatih/links-list/UPVOTE';
const DOWNVOTE = '@fatih/links-list/DOWNVOTE';
const ADD_ITEM = '@fatih/links-list/ADD_ITEM';
const REMOVE_ITEM = '@fatih/links-list/REMOVE_ITEM';
const ORDER_BY = '@fatih/links-list/ORDER_BY';

const linkItemComparator = (linkObjA, linkObjB) => {
  return linkObjA.name === linkObjB.name && linkObjA.url === linkObjB.url && linkObjA.points === linkObjB.points
}

const reducer = (state = { orderMode: -1 }, { type, payload }) => {
  const itemsPerPage = 5;
  let linksArr = [];
  switch (type) {
    case GET_LIST_PAGE:
      linksArr = state.linksArr;
      const currentPage = linksArr.slice(itemsPerPage * payload, itemsPerPage * payload + itemsPerPage);
      const availablePages = Math.ceil(linksArr.length / itemsPerPage);
      return {
        ...state,
        currentPageInd: payload,
        currentPage,
        availablePages
      }
    case UPVOTE:
      linksArr = state.linksArr;
      const upvotedIndex = linksArr.findIndex((item) => linkItemComparator(item, payload));
      upvotedIndex !== -1 && linksArr[upvotedIndex].points++;
      if(state.orderMode !== "-1" && state.orderMode !== undefined) {
        linksArr.unshift(...linksArr.splice(upvotedIndex, 1));
      }
      return {
        ...state,
        linksArr
      };
    case DOWNVOTE:
      linksArr = state.linksArr;
      const downvotedIndex = linksArr.findIndex((item) => linkItemComparator(item, payload));
      downvotedIndex !== -1 && linksArr[downvotedIndex].points--;
      if(state.orderMode !== "-1" && state.orderMode !== undefined) {
        linksArr.unshift(...linksArr.splice(upvotedIndex, 1));
      }
      return {
        ...state,
        linksArr
      };
    case ADD_ITEM:
      linksArr = state.linksArr ? [payload].concat(state.linksArr) : [payload];
      return {
        ...state,
        linksArr
      };
    case REMOVE_ITEM:
      linksArr = state.linksArr;
      const indexToRemove = linksArr.findIndex((item) => linkItemComparator(item, payload));
      indexToRemove !== -1 && linksArr.splice(indexToRemove, 1);
      return {
        ...state,
        linksArr
      };
    case ORDER_BY:
      linksArr = state.linksArr;
      if(linksArr) {
        payload === "0" && linksArr.sort((a, b) => { return b.points - a.points });
        payload === "1" && linksArr.sort((a, b) => { return a.points - b.points });
      }
      return {
        ...state,
        linksArr,
        orderMode: payload
      };
    default:
      return state;
  }
}

export const upvote = (payload) => {
  return (dispatch, getState) => {
    dispatch({
      type: UPVOTE,
      payload
    });

    dispatch(
      orderBy(getState().linksList.orderMode || "-1")
    );

    dispatch(
      getListPage(getState().linksList.currentPageInd)
    );
  };
}

export const downvote = (payload) => {
  return (dispatch, getState) => {
    dispatch({
      type: DOWNVOTE,
      payload
    });

    dispatch(
      orderBy(getState().linksList.orderMode || "-1")
    );

    dispatch(
      getListPage(getState().linksList.currentPageInd)
    );
  };
};

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
            color: 'danger'
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
    dispatch(
      orderBy(getState().linksList.orderMode || "-1")
    );
  }
};

export const removeItem = (payload) => {
  return (dispatch, getState) => {
    dispatch(
      showToast({
          message: `${payload.name} deleted`,
          color: 'success'
      })
    );

    dispatch({
      type: REMOVE_ITEM,
      payload
    });

    dispatch(
      getListPage(getState().linksList.currentPageInd)
    );
  }
};

export const orderBy = (payload) => ({
  type: ORDER_BY,
  payload
});

export default reducer;
