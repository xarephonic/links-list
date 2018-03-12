export const loadState = () => {
  try {
    const stateFromStorage = localStorage.getItem('state');
    return stateFromStorage ? JSON.parse(stateFromStorage) : undefined;
  } catch (err) {
    console.error('Could not load state from storage');
    console.error(err);
    return undefined;
  }
}

export const saveState = (state) => {
  try {
    const stateToSave = JSON.stringify(state);
    localStorage.setItem('state', stateToSave);
  } catch (err){
    console.error('Could not save state to storage');
    console.error(err);
  }
}
