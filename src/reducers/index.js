const GET_LIST = '@fatih/links-list/GET_LIST';
const ADD_ITEM = '@fatih/links-list/ADD_ITEM';
const REMOVE_ITEM = '@fatih/links-list/REMOVE_ITEM';

const reducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ADD_ITEM:
      //TODO ADD ESCAPING HERE
      payload.points = 0;
      if(state.data) {
        const existingLink = state.data.find((item) => {
          return item.name === payload.name || item.url === payload.url;
        });

        if(existingLink) {
          return {
            ...state,
            notification: {
              type: 'error',
              message: `The item you are trying to add already exists as ${existingLink.name} - ${existingLink.url}`
            }
          };
        } else {
          return {
            ...state,
            data: [...state.data, payload]
          };
        }
      } else {
        return {
          ...state,
          data: [payload]
        };
      }
    case REMOVE_ITEM:
      return state;
    default:
      return state;
  }
}

export const addItem = (payload) => ({
  type: ADD_ITEM,
  payload
});

export const removeItem = (payload) => ({
  type: REMOVE_ITEM,
  payload
});

export default reducer;
