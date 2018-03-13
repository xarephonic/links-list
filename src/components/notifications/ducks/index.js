const SHOW_TOAST = '@fatih/links-list/SHOW_TOAST';
const HIDE_TOAST = '@fatih/links-list/HIDE_TOAST';
const SHOW_BINARY_QUESTION = '@fatih/links-list/SHOW_BINARY_QUESTION';
const HIDE_BINARY_QUESTION = '@fatih/links-list/HIDE_BINARY_QUESTION';

const reducer = (state = {}, { type, payload }) => {
  switch (type) {
    case SHOW_TOAST:
      return {
        ...state,
        showToast: true,
        toast: {...payload}
      }
    case HIDE_TOAST:
      return {
        ...state,
        showToast: false,
        toast: {}
      }
    case SHOW_BINARY_QUESTION:
      return {
        ...state,
        showBinaryQuestion: true,
        binaryQuestion: {...payload}
      }
    case HIDE_BINARY_QUESTION:
      return {
        ...state,
        showBinaryQuestion: false,
        binaryQuestion: {}
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

export const showBinaryQuestion = (payload) => ({
  type: SHOW_BINARY_QUESTION,
  payload
});

export const hideBinaryQuestion = () => ({
  type: HIDE_BINARY_QUESTION
});

export default reducer;
