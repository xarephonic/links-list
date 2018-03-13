const SHOW_TOAST = '@fatih/links-list/SHOW_TOAST';
const HIDE_TOAST = '@fatih/links-list/HIDE_TOAST';

const reducer = (state = {}, { type, payload }) => {
  switch (type) {
    case SHOW_TOAST:
      return {
        ...state,
        toast: {...payload}
      }
    case HIDE_TOAST:
      return {
        ...state,
        toast: {}
      }
    default:
      return state;
  }
}

export const showToast = (payload) => ({
  type: SHOW_TOAST,
  payload
});

export const hideToast = () => ({
  type: HIDE_TOAST
});

export default reducer;
