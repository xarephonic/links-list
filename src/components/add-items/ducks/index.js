const ADD_ITEM = '@fatih/add-item/ADD_ITEM';

const reducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ADD_ITEM:
      return state;
    default:
      return state;
  }
}

export const addItem = (payload) => ({
  type: ADD_ITEM,
  payload
});

export default reducer;
