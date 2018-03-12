const GET_LIST = '@fatih/links-list/GET_LIST';
const REMOVE_ITEM = '@fatih/links-list/REMOVE_ITEM';

const reducer = (state = {}, { type, payload }) => {
  switch (type) {
    case GET_LIST:
      return state;
    case REMOVE_ITEM:
      return state;
    default:
      return state;
  }
}

export const getList = (payload) => ({
  type: GET_LIST,
  payload
});

export const removeItem = (payload) => ({
  type: REMOVE_ITEM,
  payload
});

export default reducer;
