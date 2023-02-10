const store = {
  save: (key, value) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      return false;
    }
  },
  get: (key) => {
    try {
      const item = window.localStorage.getItem(key);
      return JSON.parse(item);
    } catch (error) {
      return false;
    }
  },
  remove: (key) => {
    try {
      window.localStorage.removeItem(key);
      return true;
    } catch (error) {
      return false;
    }
  }
}
export default store;